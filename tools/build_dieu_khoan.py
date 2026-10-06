# -*- coding: utf-8 -*-
"""Dựng kho nguyên văn điều khoản (data/dieu_khoan.js) từ văn bản nguồn.
Nguồn: văn bản số (docx/PDF có lớp chữ) và bản OCR đã soát (NĐ 272/2026, Luật Dầu khí 10/2026).
Chạy: python3 build_dieu_khoan.py <thu_muc_nguon> <file_dau_ra.js>
"""
import re, json, sys, os

SRC = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/t'
OUT = sys.argv[2] if len(sys.argv) > 2 else '/home/claude/v2/data/dieu_khoan.js'

ART_RE = re.compile(r'^Điều\s+(\d+[a-z]?)\s*[\.:]\s*(.*)$')
END_RE = re.compile(r'^(PHỤ LỤC|Phụ lục|TM\. CHÍNH PHỦ|TM\. QUỐC HỘI|CHỦ TỊCH QUỐC HỘI|Nơi nhận|KT\. BỘ TRƯỞNG|BỘ TRƯỞNG)\b')


def strip_md(s):
    s = s.replace('\\', '')
    s = re.sub(r'\*+', '', s)
    s = re.sub(r'^#+\s*', '', s)
    s = s.replace('\t', ' ')
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def paras_from_md(path):
    out = []
    for ln in open(path, encoding='utf-8').read().split('\n'):
        if ln.strip().startswith('|'):
            continue
        t = strip_md(ln)
        if t:
            out.append(t)
    return out


def paras_from_layout(path):
    """pdftotext -layout: dòng thụt đầu dòng >=3 khoảng trắng là đầu đoạn mới."""
    out = []
    cur = None
    for ln in open(path, encoding='utf-8').read().split('\n'):
        if 'CÔNG BÁO/' in ln or re.match(r'^\s*\d{1,3}\s*$', ln):
            continue
        if re.match(r'^\s*(Người ký|Email|Cơ quan|Thời gian ký):', ln):
            continue
        if not ln.strip():
            if cur:
                out.append(cur); cur = None
            continue
        indent = len(ln) - len(ln.lstrip(' '))
        t = re.sub(r'\s+', ' ', ln.strip())
        new_para = indent >= 3 or cur is None or ART_RE.match(t)
        if new_para:
            if cur:
                out.append(cur)
            cur = t
        else:
            cur = cur + ' ' + t
    if cur:
        out.append(cur)
    return out


def split_articles(paras, stop_after=None):
    arts = {}
    order = []
    cur = None
    chuong = ''
    started = False
    for p in paras:
        m = ART_RE.match(p)
        if re.match(r'^Chương\s+[IVXLC]+\b', p):
            chuong = p
            continue
        if m:
            started = True
            n = m.group(1)
            base = int(re.match(r'\d+', n).group())
            prev = int(re.match(r'\d+', order[-1]).group()) if order else None
            ok = prev is None or base == prev + 1 or (n[-1].isalpha() and base == prev)
            if not ok:
                if cur is not None: cur['p'].append(p)
                continue
            if n in arts:  # gặp lại số Điều (biểu mẫu phụ lục) -> dừng
                break
            cur = {'t': m.group(2).strip(), 'p': [], 'c': chuong}
            arts[n] = cur
            order.append(n)
            continue
        if not started:
            continue
        if END_RE.match(p):
            break
        if cur is not None:
            # tên điều kéo dài nhiều dòng (văn bản số đã gộp dòng) – giữ nguyên
            if re.match(r'^(MỤC|Mục)\s+\d+', p) or re.match(r'^[A-ZÀ-Ỹ\s,\-–]{12,}$', p):
                continue
            cur['p'].append(p)
    return arts, order


def amendments(arts_amend, dieu_no, target_label):
    """Tách các khoản của Điều sửa đổi -> {điều bị sửa: [ {k, tom_tat, noi_dung[]} ]}."""
    res = {}
    art = arts_amend.get(dieu_no)
    if not art:
        return res
    groups = []
    for p in art['p']:
        if re.match(r'^\d{1,2}\.\s', p):
            groups.append([p])
        elif groups:
            groups[-1].append(p)
    for g in groups:
        head = g[0]
        k = re.match(r'^(\d{1,2})\.', head).group(1)
        # chỉ lấy phần trước "như sau"
        h = head.split('như sau')[0]
        targets = re.findall(r'Điều\s+(\d+[a-z]?)', h)
        for t in dict.fromkeys(targets):
            res.setdefault(t, []).append({'k': k, 'tom_tat': head, 'noi_dung': g[1:]})
    return res


DOCS = {}

def add(ma, paras, nguon, chat_luong, ghi_chu=''):
    arts, order = split_articles(paras)
    DOCS[ma] = {'nguon': nguon, 'chat_luong': chat_luong, 'ghi_chu': ghi_chu,
                'thu_tu': order, 'dieu': arts, 'sua_doi': {}}
    return arts

# VB01 Luật Điện lực 61/2024/QH15 – PDF Công báo có lớp chữ
add('VB01', paras_from_layout(f'{SRC}/luat_dien_luc.txt'),
    'Công báo số 1531+1532 ngày 30/12/2024 (PDF có lớp chữ)', 'van_ban_so',
    'Nguyên văn theo văn bản gốc khi ban hành. Các luật sửa đổi sau đó (theo VBHN 07/VBHN-VPQH – nguồn thứ cấp) chưa được đối chiếu nguyên văn: CẦN XÁC MINH.')
# VB02 NĐ 58/2025 – docx
add('VB02', paras_from_md(f'{SRC}/nd58.md'),
    'Tệp docx trong bộ tài liệu dự án', 'van_ban_so',
    'Nguyên văn khi ban hành. Các điều bị sửa đổi bởi NĐ 243/2026 được hiển thị kèm nội dung sửa đổi.')
# VB03 NĐ 243/2026 – PDF Công báo
a243 = add('VB03', paras_from_layout(f'{SRC}/nd243.txt'),
    'Công báo số 380 ngày 10/07/2026 (PDF có lớp chữ)', 'van_ban_so')
# VB04 NQ 253/2025/QH15 – docx
add('VB04', paras_from_md(f'{SRC}/nq253.md'), 'Tệp docx trong bộ tài liệu dự án', 'van_ban_so')
# VB09 Luật 90/2025/QH15 – docx
add('VB09', paras_from_md(f'{SRC}/luat90.md'), 'Tệp docx trong bộ tài liệu dự án', 'van_ban_so',
    'Luật sửa đổi nhiều luật. Lưu ý: các khoản sửa đổi Luật Đầu tư số 61/2020/QH14 (Điều 6) cần đối chiếu với Luật Đầu tư số 143/2025/QH15 đang được các nghị định năm 2026 viện dẫn – CẦN XÁC MINH.')
# VB10 NĐ 274/2026 – docx
add('VB10', paras_from_md(f'{SRC}/nd274.md'), 'Tệp docx trong bộ tài liệu dự án', 'van_ban_so')
# VB12 QĐ 138/QĐ-BNNMT – PDF có lớp chữ
add('VB12', paras_from_layout(f'{SRC}/qd138.txt'), 'Bản PDF trong bộ tài liệu dự án', 'van_ban_so',
    'Văn bản cá biệt giao khu vực biển cho Petrovietnam; chỉ dùng làm tiền lệ, không phải căn cứ quy phạm cho PVEP.')

# VB05, VB06 – OCR đã soát với ảnh trang
ocr = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'nguon_ocr_da_soat.json'), encoding='utf-8'))
for ma, nguon, gc in [('VB05', 'Bản scan PDF (OCR, đã soát với ảnh trang)',
                       'Chỉ đưa vào các điều được dẫn chiếu trong bộ dữ liệu (Điều 5–10, 13, 14). Văn bản OCR – khi trích dẫn chính thức cần đối chiếu bản gốc.'),
                      ('VB06', 'Bản scan PDF có chữ ký số ngày 04/09/2026 (OCR, đã soát)',
                       'Chỉ đưa vào các điều được dẫn chiếu (Điều 52, 56, 57, 59, 60, 61). Luật có hiệu lực từ 01/03/2027 (khoản 1 Điều 61).')]:
    arts = {n: {'t': a['tieu_de'], 'p': a['doan'], 'c': ''} for n, a in ocr[ma].items()}
    DOCS[ma] = {'nguon': nguon, 'chat_luong': 'ocr_da_soat', 'ghi_chu': gc,
                'thu_tu': list(arts.keys()), 'dieu': arts, 'sua_doi': {}}

# Luật 90: chỉ giữ các điều liên quan (Đấu thầu, Đầu tư, hiệu lực, chuyển tiếp)
d=DOCS['VB09']; d['thu_tu']=[n for n in d['thu_tu'] if n in ('1','6','9','10')]; d['dieu']={n:d['dieu'][n] for n in d['thu_tu']}
d['ghi_chu']+=' Chỉ lưu Điều 1 (Luật Đấu thầu), Điều 6 (Luật Đầu tư), Điều 9, Điều 10.'
# Sửa đổi NĐ 58 bởi Điều 2 NĐ 243
DOCS['VB02']['sua_doi'] = {t: [dict(x, boi='VB03', dieu_boi='2') for x in v]
                           for t, v in amendments(a243, '2', 'NĐ 58').items()}

# kiểm tra
for ma, d in DOCS.items():
    print(ma, len(d['dieu']), 'điều', d['thu_tu'][:3], '...', d['thu_tu'][-2:], 'sửa đổi:', sorted(d['sua_doi'].keys())[:40])

payload = {'phien_ban': '2.2', 'ngay_dung': '2026-10-06', 'vb': DOCS}
js = '/* Kho nguyên văn điều khoản – sinh tự động bởi tools/build_dieu_khoan.py. Không sửa tay. */\n'
js += 'window.DIEU_KHOAN = ' + json.dumps(payload, ensure_ascii=False, separators=(',', ':')) + ';\n'
open(OUT, 'w', encoding='utf-8').write(js)
print('Ghi', OUT, round(len(js.encode()) / 1024), 'KB')
