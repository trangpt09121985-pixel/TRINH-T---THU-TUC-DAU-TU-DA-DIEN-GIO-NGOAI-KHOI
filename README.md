# PVEP · Bản đồ trình tự và thủ tục pháp lý đầu tư dự án điện gió ngoài khơi (phiên bản 2.4)

Website tĩnh hướng dẫn trình tự, thủ tục pháp lý đầu tư dự án điện gió ngoài khơi, có dẫn chiếu điều, khoản văn bản pháp luật Việt Nam. Gồm các phân hệ: Tổng quan lãnh đạo · Bản đồ quy trình (hành trình 10 giai đoạn, toàn cảnh, sơ đồ cây 6 nhánh) · Quy trình chi tiết theo giai đoạn · Sơ đồ pháp lý · Danh mục thủ tục · Ma trận pháp lý · Rủi ro và nội dung xin ý kiến · Lộ trình hành động; kèm trang Dữ liệu và nhật ký.

Thư mục `data/` trong bộ mã là **bộ dữ liệu công khai**, dùng được cho GitHub Pages. Bộ dữ liệu nội bộ được bàn giao riêng và không đưa lên GitHub.

## Điểm mới phiên bản 2.4
- Đối chiếu bản gốc QĐ 768/QĐ-TTg (kèm Phụ lục I, III) và QĐ 1509/QĐ-BCT: danh mục dự án ĐGNK, điểm gom, giai đoạn vận hành (Bảng 17, Bảng 18) bấm xem trực tiếp; QĐ 768 Điều 2, Điều 3 có nguyên văn.
- Thẻ “Tổng quan” Giai đoạn 01 viết lại ngắn gọn: một câu tóm tắt, 4 thẻ thông tin, 7 đầu việc, 4 luồng, 4 điều cần nhớ; phần chi tiết thu gọn.
- Mẫu 1 – Phiếu tiếp nhận và đăng ký cơ hội (tệp `mau/M1_Phieu_tiep_nhan_co_hoi_DGNK.docx`) đính kèm tại bước TT-1.1.1, tải về điền trên Word.
- Cột mới “Cơ sở tra cứu, nguồn dữ liệu” cho các bước kiểm tra tọa độ, quy hoạch, điểm gom, chồng lấn: hệ VN-2000 (QĐ 83/2000/QĐ-TTg, TT 973/2001/TT-TCĐC), Luật Đo đạc và bản đồ, nguồn dữ liệu biển.
- Thẻ mới “Tài chính, chi phí” (bảng `tai_chinh`): 8 nội dung chuẩn bị và thủ tục tài chính nội bộ của Giai đoạn 01, có căn cứ.
- Dẫn chiếu dạng “Bảng 18 Phụ lục II.1”, “mục III.8” tự gắn nút xem trích đoạn (tệp `tools/trich_doan.json`).

## Điểm mới phiên bản 2.3
- Phân hệ mới “Quy trình chi tiết”: chi tiết hóa Giai đoạn 01 – Khởi tạo dự án (Sàng lọc và xác lập cơ hội) thành 36 bước nhỏ thuộc 7 đầu việc TT-1.1 đến TT-1.7 và nhóm đề xuất bổ sung ĐX-1.4.x; thể hiện bước quyết định, rẽ nhánh, điểm dừng và Cổng G1 (GO/HOLD/NO-GO).
- 7 thẻ: Tổng quan (6 lớp quyền, mốc pháp lý, 4 luồng cơ hội) · Trình tự các bước · Bảng chi tiết (tải CSV) · Hồ sơ, biểu mẫu (16 hồ sơ, 6 khung mẫu nội bộ, nơi quy định mẫu) · Căn cứ pháp lý (22 văn bản) · Cổng quyết định (11 tiêu chí G1) · Cần xác minh, xin ý kiến (kết luận 3 mức).
- 4 bảng dữ liệu mới: `buoc_chi_tiet`, `bieu_mau`, `tieu_chi_cong`, `can_cu_giai_doan`; tệp nội dung `data/quy_trinh_giai_doan.js`. Các giai đoạn khác bổ sung bằng cách thêm dòng vào cùng các bảng này.
- Danh mục văn bản bổ sung VB27–VB32; kho nguyên văn bổ sung Điều 3, 4, 5, 8, 62 Luật Dầu khí 10/2026.

## Điểm mới phiên bản 2.2
- Mọi dẫn chiếu điều, khoản, điểm (ví dụ “khoản 2 Điều 27 Luật Điện lực”) là nút bấm. Bấm vào sẽ mở toàn bộ nguyên văn Điều luật, tô vàng khoản/điểm được dẫn chiếu, kèm nội dung sửa đổi (ví dụ NĐ 58/2025 được sửa bởi NĐ 243/2026) và tình trạng hiệu lực.
- Trách nhiệm PVEP thống nhất: đầu mối Ban PT&KD Sản phẩm mới; phối hợp các ban chuyên môn của PVEP.
- Cột mới `can_cu_ho_so`: căn cứ quy định mẫu đơn, đề án, hồ sơ cho từng thủ tục; ghi rõ trường hợp văn bản không ban hành mẫu.
- Phân hệ mới “Sơ đồ pháp lý”: hệ thống văn bản 5 tầng và quan hệ hướng dẫn/sửa đổi; chuỗi 7 quyết định xác lập quyền; thẩm quyền từng cơ quan.

## Chạy thử
Mở `index.html` bằng Edge hoặc Chrome.

## Cấu trúc
```
index.html                    Khung giao diện
assets/styles.css, app.js     Giao diện và xử lý chính; logo PVEP
assets/legal.js               Nhận diện dẫn chiếu, cửa sổ nguyên văn điều khoản
data/*.csv, *.xlsx            12 bảng dữ liệu công khai và tệp Excel mẫu
data/data.js                  Sinh tự động từ CSV – không sửa tay
data/dieu_khoan.js            Kho nguyên văn điều khoản (sinh tự động) – tải khi bấm lần đầu
data/so_do_phap_ly.js         Nội dung chuỗi xác lập quyền và thẩm quyền cơ quan
data/quy_trinh_giai_doan.js   Nội dung tổng quan, khung mẫu nội bộ, quy tắc cổng của từng giai đoạn chi tiết
tools/build_data.py           Kiểm tra dữ liệu, sinh data.js, chuyển CSV ↔ Excel
tools/build_dieu_khoan.py     Dựng kho nguyên văn từ văn bản nguồn
tools/nguon_ocr_da_soat.json  Nguyên văn đã soát của NĐ 272/2026 và Luật Dầu khí 10/2026 (bản scan)
tools/check_refs.js           Kiểm tra mọi dẫn chiếu: điều, khoản, điểm có tồn tại trong nguyên văn
tools/test_app.py             Kiểm thử tự động giao diện
tools/trich_doan.json         Trích đoạn mục, bảng, phụ lục của QĐ 768, QĐ 1509
tools/build_mau1.js           Sinh tệp Mẫu 1 (.docx)
mau/                          Biểu mẫu nội bộ tải về (.docx)
tools/build_gd01.py, gd01_conv.py  Công cụ chuyển tài liệu GĐ01 (Markdown) thành dữ liệu – dùng khi tài liệu nguồn thay đổi
docs/so_do_GD01.mmd           Sơ đồ Mermaid trình tự Giai đoạn 01
docs/HUONG_DAN_GITHUB.md      Đăng và cập nhật GitHub Pages
docs/HUONG_DAN_QUAN_TRI.md    Quản trị dữ liệu, cách ghi dẫn chiếu để tự gắn nút
docs/DANH_SACH_CAN_XAC_MINH.md  Nội dung cần xác minh
docs/BAO_CAO_KIEM_THU.md      Kết quả kiểm thử
```

## Cập nhật dữ liệu
```
python tools/build_data.py --from-xlsx data/PVEP_DGNK_du_lieu_mau.xlsx
node tools/check_refs.js
```
