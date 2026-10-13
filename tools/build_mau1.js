// Sinh tệp Mẫu 1 – Phiếu tiếp nhận cơ hội ĐGNK (.docx). Chạy: node tools/build_mau1.js [đường_dẫn_ra] (cần thư viện npm docx)
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, VerticalAlign, Footer, PageNumber, TabStopType } = require('docx');
const F = 'Times New Roman', NAVY = '005088';
const W = 9638; // A4 nội dung (lề 2cm trái 3cm? dùng 1134/1134)
const t = (s, o = {}) => new TextRun({ text: s, font: F, size: o.size || 24, bold: o.b, italics: o.i, color: o.c });
const P = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [t(runs, o)], alignment: o.al, spacing: { before: o.before ?? 40, after: o.after ?? 40, line: 276 }, indent: o.ind ? { left: o.ind } : undefined, keepNext: o.keepNext });
const bd = { style: BorderStyle.SINGLE, size: 4, color: '7F8C9A' };
const borders = { top: bd, bottom: bd, left: bd, right: bd };
const cell = (content, w, o = {}) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders, verticalAlign: VerticalAlign.CENTER,
  shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined, columnSpan: o.span,
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: (Array.isArray(content) ? content : [content]).map(c => typeof c === 'string' ? P([t(c, { b: o.b, size: o.size || 22, c: o.color })], { al: o.al, before: 0, after: 0 }) : c) });
const table = (widths, rows) => new Table({ width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths, rows });
const head = s => new Paragraph({ children: [t(s, { b: true, c: NAVY, size: 24 })], spacing: { before: 200, after: 80 }, keepNext: true,
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 2 } } });
const box = '☐ ';
const kv = (rows) => table([3200, W - 3200], rows.map(([k, v]) => new TableRow({ children: [cell(k, 3200, { fill: 'EEF3F8', b: true }), cell(v || '', W - 3200)] })));
const note = s => P([t(s, { i: true, size: 20, c: '41506A' })], { before: 20, after: 20 });

const children = [
  table([5600, 4038], [new TableRow({ children: [
    new TableCell({ width: { size: 5600, type: WidthType.DXA }, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
      children: [P([t('TỔNG CÔNG TY THĂM DÒ KHAI THÁC DẦU KHÍ', { size: 22 })], { al: AlignmentType.CENTER, before: 0, after: 0 }), P([t('BAN PHÁT TRIỂN VÀ KINH DOANH SẢN PHẨM MỚI', { b: true, size: 22 })], { al: AlignmentType.CENTER, before: 0, after: 0 })] }),
    new TableCell({ width: { size: 4038, type: WidthType.DXA }, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
      children: [P([t('Mẫu 1 – Giai đoạn 01 (TT-1.1.1)', { b: true, size: 22, c: NAVY })], { al: AlignmentType.RIGHT, before: 0, after: 0 }), P([t('Biểu mẫu nội bộ đề xuất', { i: true, size: 20 })], { al: AlignmentType.RIGHT, before: 0, after: 0 })] })] })]),
  P([t('PHIẾU TIẾP NHẬN VÀ ĐĂNG KÝ CƠ HỘI ĐẦU TƯ', { b: true, size: 28, c: NAVY })], { al: AlignmentType.CENTER, before: 240, after: 0 }),
  P([t('DỰ ÁN ĐIỆN GIÓ NGOÀI KHƠI', { b: true, size: 28, c: NAVY })], { al: AlignmentType.CENTER, before: 0, after: 60 }),
  P([t('Số phiếu (mã cơ hội): ', { b: true }), t('ĐGNK-……-……')], { al: AlignmentType.CENTER, after: 40 }),
  note('Quy tắc cấp mã đề xuất: ĐGNK-[năm tiếp nhận]-[số thứ tự 3 chữ số], ví dụ ĐGNK-2026-001. Mã này dùng xuyên suốt hồ sơ, sổ theo dõi và mã tập hợp chi phí của cơ hội. Quy tắc cần PVEP xác nhận khi ban hành quy trình.'),

  head('A. THÔNG TIN TIẾP NHẬN'),
  kv([['Ngày tiếp nhận', ''], ['Người tiếp nhận (họ tên, chức danh)', ''],
      ['Hình thức tiếp nhận', box + 'Văn bản đến   ' + box + 'Thư điện tử   ' + box + 'Cuộc họp, làm việc   ' + box + 'Chỉ đạo trực tiếp'],
      ['Số, ngày văn bản/thư đến (nếu có)', '']]),

  head('B. NGUỒN CƠ HỘI'),
  kv([['Nguồn (chọn một)', box + 'Chỉ đạo của Lãnh đạo PVEP\n'],
  ]),
];
// thay hàng B bằng danh sách chọn
children.pop();
children.push(table([3200, W - 3200], [
  new TableRow({ children: [cell('Nguồn (chọn một)', 3200, { fill: 'EEF3F8', b: true }), cell([
    P([t(box + 'Chỉ đạo của Lãnh đạo PVEP', { size: 22 })], { before: 0, after: 0 }),
    P([t(box + 'Giao nhiệm vụ hoặc ý kiến của Petrovietnam (số, ngày văn bản): ……………', { size: 22 })], { before: 0, after: 0 }),
    P([t(box + 'Đối tác đề xuất', { size: 22 })], { before: 0, after: 0 }),
    P([t(box + 'Cơ quan nhà nước, địa phương', { size: 22 })], { before: 0, after: 0 }),
    P([t(box + 'PVEP tự phát hiện qua rà soát quy hoạch', { size: 22 })], { before: 0, after: 0 })], W - 3200)] }),
  new TableRow({ children: [cell('Tên pháp nhân đề xuất, quốc tịch', 3200, { fill: 'EEF3F8', b: true }), cell('', W - 3200)] }),
  new TableRow({ children: [cell('Có yếu tố nhà đầu tư nước ngoài?', 3200, { fill: 'EEF3F8', b: true }), cell(box + 'Có   ' + box + 'Không   ' + box + 'Chưa rõ', W - 3200)] }),
  new TableRow({ children: [cell('Đầu mối liên hệ của bên đề xuất', 3200, { fill: 'EEF3F8', b: true }), cell('', W - 3200)] })]));
children.push(note('Có yếu tố nước ngoài: lưu ý điều kiện tại khoản 1 Điều 28 NĐ 58/2025/NĐ-CP và cơ chế lấy ý kiến Bộ Quốc phòng, Bộ Công an, Bộ Ngoại giao ở bước sau.'));

children.push(head('C. THÔNG TIN DỰ ÁN THEO NGUỒN'),
  kv([['Tên dự án, khu vực theo nguồn', ''],
      ['Tên tương ứng trong Kế hoạch thực hiện QHĐ VIII điều chỉnh', box + 'Có, tên: ……………   ' + box + 'Không có   ' + box + 'Chưa đối chiếu'],
      ['Vùng; tỉnh ven biển liên quan', box + 'Bắc Bộ   ' + box + 'Nam Trung Bộ   ' + box + 'Nam Bộ   ' + box + 'Khác; tỉnh: ……………'],
      ['Công suất dự kiến (MW)', ''], ['Giai đoạn vận hành dự kiến', box + '2025–2030   ' + box + '2031–2035   ' + box + 'Ngoài danh mục   ' + box + 'Chưa rõ'],
      ['Điểm gom công suất dự kiến', ''], ['Khoảng cách bờ, độ sâu nước (theo nguồn)', '']]),
  note('Đối chiếu: Bảng 17, Bảng 18 Phụ lục III.1 Quyết định 768/QĐ-TTg ngày 15/4/2025 (tên dự án, công suất, điểm gom, giai đoạn vận hành; nội dung trùng Bảng 17, 18 Phụ lục II.1 Kế hoạch kèm Quyết định 1509/QĐ-BCT ngày 30/5/2025); mục III.1.b Điều 1 Quyết định 768/QĐ-TTg (tổng công suất). Kiểm tra quyết định điều chỉnh cập nhật mới nhất trước khi kết luận.'));

children.push(head('D. TỌA ĐỘ, HỆ QUY CHIẾU VÀ DIỆN TÍCH THEO NGUỒN'),
  kv([['Hệ tọa độ của dữ liệu nguồn', box + 'VN-2000 (X, Y) – kinh tuyến trục: ……… – múi chiếu: ' + box + '3°  ' + box + '6°'],
      ['', box + 'WGS-84 (vĩ độ, kinh độ) – định dạng: ' + box + 'độ thập phân  ' + box + 'độ-phút-giây'],
      ['', box + 'Hệ khác: ………   ' + box + 'Không ghi rõ (phải hỏi lại bên cung cấp)'],
      ['Tệp tọa độ gốc (tên tệp, định dạng)', ''], ['Diện tích theo nguồn (ha hoặc km²)', '']]));
const pts = [['Điểm góc', 'X hoặc vĩ độ', 'Y hoặc kinh độ', 'Ghi chú']];
for (let i = 1; i <= 6; i++) pts.push([String(i), '', '', '']);
children.push(P([t('Bảng tọa độ các điểm góc (chép đúng như nguồn, chưa chuyển đổi):', { b: true, size: 22 })], { before: 100, keepNext: true }),
  table([1500, 2900, 2900, W - 7300], pts.map((r, i) => new TableRow({ children: r.map((c, j) => cell(c, [1500, 2900, 2900, W - 7300][j], i === 0 ? { fill: NAVY, color: 'FFFFFF', b: true, al: AlignmentType.CENTER } : { al: j === 0 ? AlignmentType.CENTER : undefined })) }))),
  note('Lưu ý: Ghi chú Bảng 17, Bảng 18 Phụ lục III.1 QĐ 768/QĐ-TTg nêu tọa độ vị trí dự án ĐGNK được xác định ở giai đoạn chuẩn bị dự án, bảo đảm không chồng lấn quy hoạch khác. Tọa độ của nguồn chỉ là dữ liệu tham khảo; kiểm chứng và chuyển về hệ VN-2000 tại bước TT-1.1.2 (Quyết định 83/2000/QĐ-TTg; Thông tư 973/2001/TT-TCĐC). Không gửi tọa độ ra ngoài khi chưa xác định mức độ mật.'));

children.push(head('E. PHÂN LOẠI SƠ BỘ'),
  kv([['Mô hình dự án', box + 'ĐGNK độc lập (Luật Điện lực)   ' + box + 'Công trình gắn hoạt động dầu khí (Điều 52 Luật Dầu khí 10/2026)   ' + box + 'Chưa xác định'],
      ['Luồng cơ hội', box + 'L1 Đầu tư mới   ' + box + 'L2 Hợp tác, liên danh   ' + box + 'L3 M&A   ' + box + 'L4 Gắn dầu khí'],
      ['Mục đích tiêu thụ', box + 'Bán lên hệ thống điện quốc gia   ' + box + 'Xuất khẩu   ' + box + 'Mua bán điện trực tiếp   ' + box + 'Sản xuất năng lượng mới']]),
  note('Phân loại tại phiếu này là sơ bộ; kết luận chính thức tại TT-1.5.'));

const docs = [['STT', 'Tên tài liệu', 'Bên cung cấp', 'Định dạng', 'Ngày nhận', 'Mức bảo mật']];
for (let i = 1; i <= 5; i++) docs.push([String(i), '', '', '', '', '']);
const dw = [700, 3138, 1700, 1200, 1300, 1600];
children.push(head('F. BẢO MẬT VÀ DANH MỤC TÀI LIỆU ĐÃ NHẬN'),
  kv([['Thỏa thuận bảo mật (NDA)', box + 'Đã ký (số, ngày): ………   ' + box + 'Chưa ký   ' + box + 'Không áp dụng'],
      ['Mức độ bảo mật của tài liệu', box + 'Thông thường   ' + box + 'Hạn chế nội bộ   ' + box + 'Có dấu hiệu thuộc bí mật nhà nước (xử lý theo quy chế bảo vệ bí mật nhà nước của PVEP)']]),
  P([t('Danh mục tài liệu:', { b: true, size: 22 })], { before: 100, keepNext: true }),
  table(dw, docs.map((r, i) => new TableRow({ children: r.map((c, j) => cell(c, dw[j], i === 0 ? { fill: NAVY, color: 'FFFFFF', b: true, al: AlignmentType.CENTER, size: 20 } : { al: j === 0 ? AlignmentType.CENTER : undefined })) }))));

children.push(head('G. THEO DÕI CHI PHÍ'),
  kv([['Phát sinh chi phí ở bước sàng lọc?', box + 'Không   ' + box + 'Có (thuê tư vấn, mua dữ liệu, công tác…): ………'],
      ['Mã tập hợp chi phí', 'Dùng mã cơ hội ở đầu phiếu']]),
  note('Tập hợp chi phí riêng theo từng cơ hội ngay từ đầu để phục vụ hạch toán và kiểm toán khi phát sinh hoàn trả chi phí khảo sát, chi phí lập hồ sơ (khoản 1 Điều 10 NQ 253/2025/QH15; khoản 1 Điều 6 NĐ 272/2026/NĐ-CP). Nguồn kinh phí và thẩm quyền phê duyệt theo quy chế tài chính PVEP (cần xác minh).'));

children.push(head('H. ĐỀ XUẤT XỬ LÝ'),
  kv([['Đề xuất', box + 'Chuyển sàng lọc nhanh (Mẫu 2)   ' + box + 'Đề nghị bên đề xuất bổ sung thông tin   ' + box + 'Lưu hồ sơ, không tiếp tục – lý do: ………'],
      ['Người phụ trách được phân công', ''], ['Thời hạn hoàn thành Mẫu 2 (theo chỉ đạo)', '']]),
  note('Phiếu tiếp nhận không xác lập quyền khảo sát, quyền sử dụng khu vực biển, tư cách nhà đầu tư hoặc chủ trương đầu tư cho PVEP.'));

const sw = [3212, 3213, 3213];
const sigCell = (a, b) => new TableCell({ width: { size: 3212, type: WidthType.DXA }, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  children: [P([t(a, { b: true, size: 22 })], { al: AlignmentType.CENTER, before: 240, after: 0 }), P([t(b, { i: true, size: 20 })], { al: AlignmentType.CENTER, before: 0, after: 900 }), P([t('……………………', { size: 22 })], { al: AlignmentType.CENTER })] });
children.push(P([t('……, ngày …… tháng …… năm 20……', { i: true, size: 22 })], { al: AlignmentType.RIGHT, before: 240 }),
  table(sw, [new TableRow({ children: [sigCell('NGƯỜI LẬP', '(ký, ghi rõ họ tên)'), sigCell('TRƯỞNG PHÒNG', '(ký, ghi rõ họ tên)'), sigCell('LÃNH ĐẠO BAN', '(phê duyệt đề xuất xử lý)')] })]));

const doc = new Document({
  styles: { default: { document: { run: { font: F, size: 24 } } } },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [t('PVEP · Mẫu 1 – Phiếu tiếp nhận cơ hội ĐGNK · Trang ', { size: 18, c: '6B7A90' }), new TextRun({ children: [PageNumber.CURRENT], font: F, size: 18, color: '6B7A90' })] })] }) },
    children }]
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[2] || 'mau/M1_Phieu_tiep_nhan_co_hoi_DGNK.docx', b); console.log('ok', b.length); });
