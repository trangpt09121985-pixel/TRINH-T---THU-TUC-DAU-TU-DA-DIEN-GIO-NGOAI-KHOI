# -*- coding: utf-8 -*-
"""Chuyển tài liệu chi tiết hóa Giai đoạn 01 (markdown) thành dữ liệu website:
data/buoc_chi_tiet.csv, data/bieu_mau.csv, data/tieu_chi_cong.csv, data/can_cu_giai_doan.csv, data/quy_trinh_giai_doan.js
Chạy: python3 build_gd01.py <src.md> <thu_muc_data>"""
import re, json, csv, sys, io
sys.path.insert(0, '/home/claude/gd01')
from gd01_conv import convert

SRC, OUT = sys.argv[1], sys.argv[2]
md = open(SRC, encoding='utf-8').read()
NGAY = '2026-10-12'

# ---------- tiện ích ----------
def label(s):
    s = s.replace('\\<', '<').replace('\\_', '_').replace('\\&', '&')
    s = re.sub(r'<CẦN_XÁC_MINH\s*([^>]*)>', lambda m: 'CẦN XÁC MINH' + (' ' + m.group(1).strip() if m.group(1).strip() else ''), s)
    s = re.sub(r'<CHƯA_CÓ_HƯỚNG_DẪN_CHI_TIẾT>', 'CHƯA CÓ HƯỚNG DẪN CHI TIẾT', s)
    s = re.sub(r'<CẦN_Ý_KIẾN_CƠ_QUAN_CÓ_THẨM_QUYỀN>', 'CẦN Ý KIẾN CƠ QUAN CÓ THẨM QUYỀN', s)
    s = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'\1', s)   # bỏ liên kết markdown
    s = s.replace('(Đ2 k3 QĐ)', '(QĐ giao biển cho PVN Đ2 k3)').replace('Điều 52 k4 Luật Dầu khí 2026', 'Luật Dầu khí 2026 Đ52 k4').replace('theo Đ52 k4', 'theo Luật Dầu khí 2026 Đ52 k4').replace('bốn điều kiện Đ52 k2 Luật Dầu khí 2026', 'bốn điều kiện Luật Dầu khí 2026 Đ52 k2').replace('bốn điều kiện Đ52 k2', 'bốn điều kiện Luật Dầu khí 2026 Đ52 k2').replace('NĐ 247/2026/NĐ-CP', 'NĐ 274/2026/NĐ-CP (tên tệp trong Project ghi 247 – CẦN XÁC MINH số hiệu)')
    return s.strip()

BAN = r'(?:Ban|ban) (?:Pháp chế|KH-ĐT|Kế hoạch – Đầu tư|TC-KT|Tài chính – Kế toán|Thăm dò(?:/Phát triển mỏ)?|Phát triển mỏ|KT|Kỹ thuật|An toàn – Môi trường|phụ trách quản trị rủi ro)'
def no_ban(s):
    """Không ghi tên ban cụ thể (quy ước trách nhiệm PVEP)."""
    s = re.sub(BAN + r'(?:,\s*' + r'(?:Pháp chế|KH-ĐT|TC-KT|Thăm dò|Phát triển mỏ|KT|Kế hoạch – Đầu tư))*', 'ban chuyên môn', s)
    s = s.replace('các Ban chuyên môn', 'các ban chuyên môn').replace('các Ban', 'các ban chuyên môn').replace('Ban phụ trách quản trị rủi ro', 'ban chuyên môn')
    s = re.sub(r'ban chuyên môn(?: chuyên môn)+', 'ban chuyên môn', s)
    return s

def phoi_hop(s):
    out = []
    for p in [x.strip() for x in s.split(';') if x.strip()]:
        if p == 'ĐM':
            v = 'Ban PT&KD Sản phẩm mới (đầu mối)'
        elif p.startswith('Ban') or p.lower().startswith('các ban'):
            v = 'Các ban chuyên môn của PVEP'
        elif p == 'PVN':
            v = 'Petrovietnam'
        elif p.startswith('NN:'):
            v = 'Cơ quan nhà nước: ' + p[3:].strip()
        elif p == 'ĐT/TV':
            v = 'Đối tác, tư vấn'
        else:
            v = no_ban(p)
        if v not in out:
            out.append(v)
    return '; '.join(out)

def txt(s):            # trường văn bản thường
    return convert(no_ban(label(s)))

def cc(s):             # trường căn cứ: chuẩn hóa dẫn chiếu
    return convert(no_ban(label(s)))

def tables():
    res = []; cur = None; sec = ''
    for ln in md.split('\n'):
        if ln.startswith('#'):
            sec = ln.strip('# ').strip()
        if ln.startswith('|'):
            cells = [c.strip() for c in ln.strip().strip('|').split(' | ')]
            if cur is None:
                cur = {'sec': sec, 'head': cells, 'rows': []}
            elif not set(''.join(cells)) <= set('-: '):
                cur['rows'].append(cells)
        elif cur:
            res.append(cur); cur = None
    if cur:
        res.append(cur)
    return res

T = tables()
def tab(prefix):
    return [t for t in T if t['sec'].startswith(prefix)]

def write_csv(name, rows, cols):
    with open(f'{OUT}/{name}', 'w', encoding='utf-8-sig', newline='') as f:
        w = csv.DictWriter(f, fieldnames=cols); w.writeheader(); w.writerows(rows)
    print('Ghi', name, len(rows), 'dòng')

# ---------- 1. Bước chi tiết ----------
NHANH = {
 'TT-1.1.4': 'Vận hành 2025–2030 → Thủ tướng chấp thuận chủ trương đồng thời chấp thuận nhà đầu tư (Điều 11 NQ 253/2025; Điều 9 NĐ 272/2026) | Vận hành 2031–2035 → Chủ tịch UBND tỉnh nơi có điểm gom (Điều 12 NQ 253/2025; Điều 10 NĐ 272/2026) | Ngoài danh mục → pháp luật giao khu vực biển chung (khoản 2 Điều 13 NĐ 272/2026)',
 'TT-1.1.5': 'Đã giao cho chủ thể khác (không phải Petrovietnam/PVEP) → DỪNG luồng đầu tư mới, chuyển xét hợp tác (L2) hoặc M&A (L3) | Không/chưa rõ → tiếp tục TT-1.1.6',
 'TT-1.2.1': 'Đã xác định điểm gom → TT-1.2.3 | Chưa xác định → TT-1.2.2 (HOLD)',
 'TT-1.2.2': 'HOLD: UBND tỉnh đề xuất, Bộ Công Thương thống nhất (điểm b khoản 3 Điều 12 NQ 253/2025) → đưa vào danh sách xin ý kiến TT-1.7.3',
 'TT-1.3.7': 'Đỏ → NO-GO hoặc điều chỉnh ranh giới | Vàng → danh sách xin ý kiến (TT-1.7.3) | Xanh → tiếp tục',
 'TT-1.5.1': 'Đủ 4 điều kiện và luật đã có hiệu lực (từ 01/3/2027) → L4, chờ nghị định hướng dẫn | Không đủ hoặc chưa có hiệu lực → dự án điện gió ngoài khơi độc lập (khoản 4 Điều 52 Luật Dầu khí 10/2026)',
 'TT-1.5.4': 'L1 Đầu tư mới | L2 Hợp tác, liên danh, liên doanh | L3 M&A | L4 Công trình năng lượng gắn hoạt động dầu khí',
}
DIEM_DUNG = {'TT-1.1.5': 'X1 – khu vực đã giao cho chủ thể khác', 'TT-1.2.2': 'HOLD – chưa có điểm gom', 'TT-1.3.7': 'X2 – chồng lấn loại trừ', 'TT-1.5.1': 'L4 – chưa có hướng dẫn chi tiết'}
B_COLS = ['ma', 'thuoc', 'giai_doan_10', 'thu_tu', 'cong_viec', 'muc_tieu', 'luong', 'dau_vao', 'phoi_hop', 'can_cu', 'ho_so', 'dau_ra',
          'dieu_kien_chuyen_buoc', 'rui_ro', 'trang_thai_phap_ly', 'loai_buoc', 're_nhanh', 'diem_dung', 'de_xuat', 'ngay_cap_nhat']
buoc = []; n = 0
for t in T:
    if t['head'][:2] != ['Mã bước nhỏ', 'Thuộc đầu việc']:
        continue
    for r in t['rows']:
        if r[0] == 'G1':
            continue
        n += 1
        ma = r[0]
        thuoc = 'TT-1.4' if ma.startswith('ĐX') else r[1]
        buoc.append({'ma': ma, 'thuoc': thuoc, 'giai_doan_10': '1', 'thu_tu': str(n), 'cong_viec': txt(r[2]), 'muc_tieu': txt(r[3]),
                     'luong': r[4], 'dau_vao': txt(r[5]), 'phoi_hop': phoi_hop(label(r[6])), 'can_cu': cc(r[7]), 'ho_so': txt(r[8]),
                     'dau_ra': txt(r[9]), 'dieu_kien_chuyen_buoc': txt(r[10]), 'rui_ro': txt(r[11]), 'trang_thai_phap_ly': txt(r[12]),
                     'loai_buoc': 'Quyết định' if ma in NHANH else 'Công việc', 're_nhanh': NHANH.get(ma, ''), 'diem_dung': DIEM_DUNG.get(ma, ''),
                     'de_xuat': 'Có' if ma.startswith('ĐX') else '', 'ngay_cap_nhat': NGAY})
write_csv('buoc_chi_tiet.csv', buoc, B_COLS)

# ---------- 2. Hồ sơ, biểu mẫu ----------
F_COLS = ['ma', 'giai_doan_10', 'ten', 'loai', 'co_quan', 'can_cu', 'thanh_phan', 'co_mau_phap_dinh', 'van_ban_mau', 'duong_dan', 'thoi_diem', 'pham_vi', 'mau_noi_bo']
bm = []
for r in tab('5.')[0]['rows']:
    k = int(r[0])
    mau = re.search(r'Mẫu (\d)', r[5] + ' ' + r[7])
    bm.append({'ma': f'HS{k:02d}', 'giai_doan_10': '1', 'ten': txt(r[1]), 'loai': txt(r[2]), 'co_quan': txt(r[3]), 'can_cu': cc(r[4]),
               'thanh_phan': txt(r[5]), 'co_mau_phap_dinh': txt(r[6]), 'van_ban_mau': txt(r[7]), 'duong_dan': txt(r[8]), 'thoi_diem': txt(r[9]),
               'pham_vi': 'Giai đoạn 01 (nội bộ)' if k <= 12 else 'Bước tiếp theo (chuẩn bị dữ liệu)', 'mau_noi_bo': f'M{mau.group(1)}' if mau and k <= 12 else ''})
write_csv('bieu_mau.csv', bm, F_COLS)

# ---------- 3. Tiêu chí cổng ----------
G_COLS = ['ma', 'cong', 'tieu_chi', 'cau_hoi', 'go', 'hold', 'no_go', 'can_cu', 'quyet_dinh_no_go']
gc = []
for r in tab('7.1')[0]['rows']:
    gc.append({'ma': r[0], 'cong': 'G1', 'tieu_chi': txt(r[1]), 'cau_hoi': txt(r[2]), 'go': txt(r[3]), 'hold': txt(r[4]), 'no_go': txt(r[5]),
               'can_cu': cc(r[6]), 'quyet_dinh_no_go': 'Có' if r[0] in ('G1-01', 'G1-02', 'G1-03', 'G1-05', 'G1-09') else ''})
write_csv('tieu_chi_cong.csv', gc, G_COLS)

# ---------- 4. Căn cứ pháp lý theo giai đoạn ----------
VBMAP = {1: 'VB01', 2: 'VB02', 3: 'VB03', 4: 'VB04', 5: 'VB05', 6: 'VB16', 7: 'VB11', 8: 'VB28', 9: 'VB15;VB31', 10: 'VB27', 11: 'VB18;VB17',
         12: 'VB19;VB30', 13: 'VB23', 14: 'VB12', 15: 'VB13', 16: 'VB06', 17: 'VB07', 18: 'VB32', 19: 'VB14', 20: 'VB29;VB08;VB09;VB10', 21: 'VB25', 22: ''}
ALIAS_PREFIX = {1: 'Luật Điện lực', 2: 'NĐ 58/2025', 3: 'NĐ 243/2026', 4: 'NQ 253/2025', 5: 'NĐ 272/2026', 6: 'Luật Đầu tư 143/2025', 14: 'QĐ 138/QĐ-BNNMT', 16: 'Luật Dầu khí 10/2026', 19: 'NĐ 57/2025'}
OVR_DK = {2: 'khoản 1 Điều 25 NĐ 58/2025 (ưu đãi: chấp thuận chủ trương trước 01/01/2031, thuộc 6.000 MW trong quy hoạch); khoản 1 Điều 26 NĐ 58/2025; khoản 1, 5, 6 Điều 27 NĐ 58/2025 (nội dung khảo sát, gồm điểm e: ảnh hưởng tuyến cáp, công trình và lô/mỏ dầu khí); Điều 28 NĐ 58/2025; khoản 1–5 Điều 29 NĐ 58/2025; Điều 30 NĐ 58/2025; khoản 3 Điều 32 NĐ 58/2025',
 3: 'khoản 3 Điều 2 NĐ 243/2026 (thay Điều 9 NĐ 58/2025); khoản 18 Điều 2 NĐ 243/2026 (sửa điểm a khoản 1 Điều 26 NĐ 58/2025 – nội dung đề án khảo sát); khoản 19 Điều 2 NĐ 243/2026 (sửa điểm b khoản 3, khoản 4, 5 Điều 27 NĐ 58/2025); khoản 20 Điều 2 NĐ 243/2026 (sửa khoản 1 Điều 28 NĐ 58/2025); khoản 29 Điều 2 NĐ 243/2026; khoản 7 Điều 3 NĐ 243/2026'}
C_COLS = ['ma', 'giai_doan_10', 'thu_tu', 'ma_vb', 'van_ban', 'co_quan_ngay', 'dieu_khoan', 'tinh_trang', 'nguon', 'muc_do', 'nhan_dinh']
cg = []
for t in tab('2.'):
    for r in t['rows']:
        k = int(r[0])
        dk = label(r[3])
        if k in ALIAS_PREFIX and re.search(r'Đ\d', dk):
            dk = convert('; '.join(ALIAS_PREFIX[k] + ' ' + s.strip() for s in dk.split(';')))
        if k in OVR_DK: dk = OVR_DK[k]
        nd = cc(r[7]) if k not in ALIAS_PREFIX else convert(no_ban(label(r[7])), ALIAS_PREFIX[k])
        if k == 16: nd = 'khoản 2 Điều 52 Luật Dầu khí 10/2026: nhà thầu được triển khai công trình năng lượng ngoài khơi trong diện tích phát triển mỏ của hợp đồng dầu khí hiện hữu, phục vụ nhu cầu hoạt động dầu khí của mỏ hiện hữu và mỏ lân cận; khoản 3 Điều 52 Luật Dầu khí 10/2026: chi phí được tính vào chi phí được phép thu hồi; khoản 4 Điều 52 Luật Dầu khí 10/2026: dự án độc lập theo pháp luật liên quan; khoản 2 Điều 8 Luật Dầu khí 10/2026: vùng cấm xâm nhập 500 m, vùng cấm thả neo 02 hải lý quanh công trình dầu khí trên biển – dùng cho lớp GIS chồng lấn'
        if k == 21: nd = 'Ban PT&KD Sản phẩm mới chủ trì, các ban chuyên môn phối hợp bổ sung trước khi trình G1'
        tt = convert(no_ban(label(r[4])), ALIAS_PREFIX.get(k))
        if k == 2: tt = 'Còn hiệu lực, đã sửa đổi bởi NĐ 243/2026 (bãi bỏ khoản 6 Điều 29 NĐ 58/2025)'
        cg.append({'ma': f'CC1-{k:02d}', 'giai_doan_10': '1', 'thu_tu': str(k), 'ma_vb': VBMAP[k], 'van_ban': txt(r[1]), 'co_quan_ngay': convert(label(r[2]), ALIAS_PREFIX.get(k)),
                   'dieu_khoan': dk, 'tinh_trang': tt, 'nguon': txt(r[5]), 'muc_do': txt(r[6]), 'nhan_dinh': nd})
write_csv('can_cu_giai_doan.csv', cg, C_COLS)

# ---------- 5. Nội dung mô tả (JS) ----------
def bullets(after, until):
    s = md.split(after, 1)[1].split(until, 1)[0]
    return [cc(re.sub(r'^\s*(?:-|\d+\.)\s+', '', l)) for l in s.split('\n') if re.match(r'^\s*(?:-|\d+\.)\s+', l)]
def rows(prefix, conv_cols=()):
    t = tab(prefix)[0]
    return {'cot': t['head'], 'dong': [[(cc(c) if i in conv_cols else txt(c)) for i, c in enumerate(r)] for r in t['rows']]}
mau = []
for blk in re.split(r'\n### Mẫu ', md.split('## 6.', 1)[1].split('## 7.', 1)[0])[1:]:
    head, body = blk.split('\n', 1)
    m = re.match(r'(\d)\. (.+)', head)
    items = []
    for l in body.split('\n'):
        if re.match(r'^- ', l):
            items.append({'t': cc(l[2:]), 'con': []})
        elif re.match(r'^\s+\d+\. ', l) and items:
            items[-1]['con'].append(cc(re.sub(r'^\s+\d+\.\s+', '', l)))
    mau.append({'ma': 'M' + m.group(1), 'ten': m.group(2).strip(), 'muc': items})
intro = md.split('\n', 4)[4].split('## 1.', 1)[0].strip()
QT = {'1': {
    'ten': 'Giai đoạn 01 – Khởi tạo dự án · Nhánh 1 – Sàng lọc và xác lập cơ hội',
    'ngay_ra_soat': NGAY,
    'tom_tat': txt(intro),
    'pham_vi': bullets('### 1.1. Phạm vi', '### 1.2.'),
    'lop_quyen': rows('1.2', conv_cols=(3,)),
    'moc_phap_ly': bullets('### 1.3.', '### 1.4.'),
    'nguyen_tac': bullets('### 1.4. Nguyên tắc làm việc', '## 2.'),
    'luong': rows('4.1', conv_cols=(2, 3)),
    'mau_noi_bo': mau,
    'quy_tac_cong': bullets('### 7.2. Quy tắc ra quyết định', '### 7.3.'),
    'dau_ra_go': rows('7.3', conv_cols=(2, 3)),
    'xin_y_kien': rows('8.1', conv_cols=(2, 3)),
    'tu_xac_minh': rows('8.2'),
    'ket_luan': bullets('### 8.3. Kết luận', '\n\n\n') if '### 8.3.' in md else [],
}}
# 8.2: đơn vị thực hiện theo quy ước
for r in QT['1']['tu_xac_minh']['dong']:
    r[2] = 'Ban PT&KD Sản phẩm mới chủ trì; các ban chuyên môn phối hợp' + ('; qua Petrovietnam' if 'PVN' in r[2] else '')
open(f'{OUT}/quy_trinh_giai_doan.js', 'w', encoding='utf-8').write(
    '/* Nội dung chi tiết hóa giai đoạn (sinh từ tài liệu GĐ01 ngày 12/10/2026). Bảng bước, hồ sơ, tiêu chí cổng nằm trong các tệp CSV. */\n'
    'window.QT_GIAI_DOAN = ' + json.dumps(QT, ensure_ascii=False, indent=1) + ';\n')
print('Ghi quy_trinh_giai_doan.js')
