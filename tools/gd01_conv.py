# -*- coding: utf-8 -*-
"""Chuyển dẫn chiếu dạng rút gọn ("NQ 253 Đ11 k2–k3") sang dạng đầy đủ ("khoản 2–3 Điều 11 NQ 253/2025")."""
import re
DOCS=[ # (regex, tên đầy đủ hiển thị)
 (r'Luật Dầu khí(?: số)? 10/2026(?:/QH16)?|Luật Dầu khí 2026', 'Luật Dầu khí 10/2026'),
 (r'Luật Dầu khí(?: số)? 12/2022(?:/QH15)?|Luật Dầu khí 2022', 'Luật Dầu khí 12/2022'),
 (r'Luật Điện lực(?: số 61/2024/QH15)?', 'Luật Điện lực'),
 (r'Luật Đầu tư(?: số)? 143/2025(?:/QH15)?', 'Luật Đầu tư 143/2025/QH15'),
 (r'NĐ 58(?:/2025)?(?:/NĐ-CP)?', 'NĐ 58/2025'),
 (r'NĐ 243(?:/2026)?(?:/NĐ-CP)?', 'NĐ 243/2026'),
 (r'NĐ 272(?:/2026)?(?:/NĐ-CP)?', 'NĐ 272/2026'),
 (r'NĐ 57(?:/2025)?(?:/NĐ-CP)?', 'NĐ 57/2025'),
 (r'NQ 253(?:/2025)?(?:/QH15)?', 'NQ 253/2025'),
 (r'QĐ giao biển(?: cho PVN)?|QĐ 138(?:/QĐ-BNNMT)?', 'QĐ 138/QĐ-BNNMT'),
]
DOC_RE='|'.join('(?:%s)'%d for d,_ in DOCS)
def full(name):
    for d,f in DOCS:
        if re.fullmatch(d,name): return f
    return name
ART=r'Đ(\d+)((?:\s*k\d+[a-z]?(?:\s*(?:–|-)\s*k?\d+)?(?:\s*điểm\s*[a-zđ](?:\s*,\s*[a-zđ](?!\d))*)?(?:\s*,\s*k\d+[a-z]?(?:\s*(?:–|-)\s*k?\d+)?(?:\s*điểm\s*[a-zđ](?:\s*,\s*[a-zđ](?!\d))*)?)*)?)'
def chunk_to_full(dieu, ks):
    ks=ks.strip()
    if not ks: return f'Điều {dieu}'
    groups=re.findall(r'k(\d+)([a-z]?)(?:\s*(?:–|-)\s*k?(\d+))?(?:\s*điểm\s*([a-zđ](?:\s*,\s*[a-zđ](?!\d))*))?',ks)
    parts=[]
    for a,l,b,d in groups:
        k=f'{a}–{b}' if b else a
        diem=(d.replace(' ','').replace(',',', ') if d else l)
        parts.append((f'điểm {diem} ' if diem else '')+f'khoản {k}')
    # gộp các khoản không có điểm liền nhau: "khoản 1, khoản 3" -> "khoản 1, 3"
    merged=[]
    for p in parts:
        if merged and p.startswith('khoản ') and merged[-1].startswith('khoản '): merged[-1]+=', '+p[6:]
        else: merged.append(p)
    return ', '.join(merged)+f' Điều {dieu}'
def convert(text, default=None):
    out=[]; cur=full(default) if default else None
    for seg in re.split(r'(;)',text):
        if seg==';': out.append(seg); continue
        # tìm các cụm "DOC (Đ.. ...)+" hoặc "(Đ...)+" không có DOC (dùng DOC đoạn trước)
        res=''; pos=0
        pat=re.compile(r'(?P<doc>'+DOC_RE+r')?\s*(?P<arts>'+ART+r'(?:\s*(?:,|và|–)\s*'+ART+r')*)')
        for m in pat.finditer(seg):
            if not m.group('arts') or not re.search(r'Đ\d',m.group('arts')): continue
            prev=list(re.finditer(DOC_RE,seg[pos:m.start()]))
            if prev: cur=full(prev[-1].group(0).strip())
            doc=m.group('doc')
            if doc: cur=full(doc.strip())
            if not cur: continue
            arts=m.group('arts')
            rng=re.fullmatch(r'Đ(\d+)\s*–\s*Đ(\d+)',arts.strip())
            if rng: chunks=[f'Điều {rng.group(1)}–{rng.group(2)}']
            else: chunks=[chunk_to_full(a,k) for a,k in re.findall(ART,arts)]
            res+=seg[pos:m.start()]+(' ' if m.start()>0 and seg[m.start()-1:m.start()]!=' ' and res else '')+', '.join(chunks)+' '+cur
            pos=m.end()
        res+=seg[pos:]
        out.append(res)
    s=''.join(out)
    s=re.sub(r'\s+',' ',s).replace(' ,',',').replace('( ','(').strip()
    s=re.sub(r';(?=\S)','; ',s)
    return s
if __name__=='__main__':
    for t in ['NQ 253/2025/QH15 Đ3 k2, Đ4','Luật Điện lực Đ27 k2; NĐ 58/2025 Đ26 (sđ bởi NĐ 243/2026); NĐ 272/2026 Đ5, Đ9, Đ10, Đ13 k2','NĐ 272 Đ9 k1, k3; Đ13 k2–k3','Luật Dầu khí 2026 Đ3 k31, Đ52 k2–k3, Đ61 k1, Đ62','NĐ 58 Đ26 k1a (sđ NĐ 243 Đ2 k18); NĐ 272 Đ13 k2','NĐ 272 Đ5 k2 điểm a, k3; Đ8 k1–k2; NĐ 58 Đ28, Đ30 k2','Luật Điện lực Đ28; NQ 253 Đ11, Đ12; NĐ 272 Đ7–Đ10','NĐ 243 Đ2 k19 điểm c, Đ3 k7','Luật Điện lực Đ27 k2a, Đ28 k1a; NĐ 58 Đ30 k1 điểm a, b; NĐ 272 Đ5 k2 điểm c','QĐ giao biển cho PVN Đ2 k3','Quy chế nội bộ PVEP <CẦN_XÁC_MINH>']:
        print(t,'\n  →',convert(t))
