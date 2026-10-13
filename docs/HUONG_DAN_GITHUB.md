# Hướng dẫn đăng website lên GitHub Pages (công khai)

Dành cho người không chuyên CNTT. Thời gian thực hiện khoảng 15 phút.

> **Lưu ý trước khi đăng:** khi để công khai, bất kỳ ai có đường link đều xem và tải được toàn bộ nội dung trong kho. Chỉ đăng **bộ dữ liệu công khai** (thư mục `data/` đi kèm bộ mã này). Không đưa bộ dữ liệu nội bộ (`PVEP_DGNK_du_lieu_noi_bo`) lên GitHub.

## Bước 1. Chuẩn bị tệp

1. Giải nén tệp `PVEP_DGNK_website.zip` (chuột phải → **Extract All** → **Extract**).
2. Mở thư mục vừa giải nén, kiểm tra thấy đúng 6 mục: `assets`, `data`, `docs`, `tools`, `index.html`, `README.md`.
3. Mở thử `index.html`. Góc trên trang phải có nhãn xanh **“Bộ dữ liệu công khai”**. Nếu thấy nhãn đỏ “Bộ dữ liệu NỘI BỘ”, dừng lại và thay thư mục `data/` bằng bộ công khai.

## Bước 2. Đăng nhập GitHub

1. Mở **Edge** hoặc **Chrome**, vào **github.com**.
2. Đã có tài khoản: bấm **Sign in**. Chưa có: bấm **Sign up**, nhập email, mật khẩu, tên tài khoản (ngắn, không dấu), xác nhận qua email.

## Bước 3. Tạo kho công khai

1. Bấm dấu **+** ở góc trên bên phải → **New repository**.
2. **Repository name**: `pvep-dgnk-dashboard`.
3. **Visibility**: chọn **Public**.
4. Không tích “Add a README file”.
5. Bấm **Create repository**.

## Bước 4. Tải mã lên

1. Trên trang kho mới, bấm dòng chữ xanh **uploading an existing file**.
2. Trong thư mục đã giải nén, bấm **Ctrl + A** chọn cả 6 mục.
3. Kéo thả cả 6 mục vào khung **“Drag files here”**.
   - Kéo cả 4 thư mục, không mở từng thư mục để kéo lẻ tệp.
   - Không dùng nút “choose your files” (nút này không chọn được thư mục).
4. Chờ tải xong; danh sách phải hiện đường dẫn như `assets/app.js`, `data/data.js`.
5. Ô **Commit changes** ghi: `Phiên bản 2`. Bấm **Commit changes**.
6. Kiểm tra: cấp ngoài cùng của kho có 4 thư mục và 2 tệp; cạnh tên kho có nhãn **Public**.

## Bước 5. Bật GitHub Pages

1. Trong kho, bấm **Settings** (hàng menu trên cùng).
2. Menu bên trái → mục **Code and automation** → **Pages**.
3. **Source**: chọn **Deploy from a branch**. **Branch**: chọn **main**, thư mục **/ (root)**. Bấm **Save**.
4. Chờ 1–3 phút, bấm **F5**. Phía trên hiện **“Your site is live at …”**, dạng `https://<tên-tài-khoản>.github.io/pvep-dgnk-dashboard/`.
5. Bấm **Visit site**. Gửi đường link này cho đồng nghiệp; người xem không cần tài khoản GitHub.

### Kiểm tra sau khi đăng

- Logo PVEP ở góc trên bên trái; nhãn “Bộ dữ liệu công khai”.
- Trang Tổng quan hiện hai thẻ Mô hình 1, Mô hình 2 và 5 chỉ số.
- Bản đồ quy trình: Nhánh 3 có hai luồng A/B, Nhánh 4 có nhóm ngoài khơi/trên bờ; bấm một nút mở được khung chi tiết.
- Bấm một dẫn chiếu điều khoản (chữ nền xanh nhạt, gạch chân chấm) mở được cửa sổ nguyên văn Điều luật.
- Menu có mục “Sơ đồ pháp lý”.

## Bước 6. Cập nhật dữ liệu

1. Sửa tệp `data/PVEP_DGNK_du_lieu_mau.xlsx` trên máy.
2. Mở **Command Prompt** tại thư mục dự án, chạy:
   `python tools/build_data.py --from-xlsx data/PVEP_DGNK_du_lieu_mau.xlsx`
   (cần Python và thư viện openpyxl; nhờ bộ phận CNTT cài nếu chưa có).
3. Trên GitHub, vào thư mục **data** → **Add file → Upload files** → kéo thả `data.js`, các tệp CSV (12 bảng) và tệp Excel (tệp cùng tên được ghi đè) → **Commit changes**.
4. Chờ 1–3 phút, mở lại trang và bấm **Ctrl + F5**.

## Cập nhật từ phiên bản 2.3 lên 2.4 (Tổng quan rút gọn, Mẫu 1, nguồn tra cứu, tài chính)

Phiên bản 2.4 có thêm thư mục mới `mau` (chứa Mẫu 1). Cách làm giống bản 2.3, tải lên toàn bộ để ghi đè:

1. Giải nén `PVEP_DGNK_website_v2.4.zip`. Thư mục giải nén có 7 mục: `index.html`, `README.md`, `assets`, `data`, `docs`, `mau`, `tools`.
2. Mở trang chính của kho trên GitHub → **Add file → Upload files**.
3. Chọn cả 7 mục, kéo thả vào vùng tải lên. Bắt buộc có thư mục `mau`; thiếu thư mục này thì nút “Tải mẫu” báo lỗi 404.
4. Ghi nội dung commit: `Cập nhật phiên bản 2.4` → **Commit changes**.
5. Chờ thẻ **Actions** báo dấu tích xanh, mở website và bấm **Ctrl + F5**.
6. Kiểm tra nhanh:
   - Thanh thông báo ghi “phiên bản 2.4”.
   - Quy trình chi tiết → Tổng quan: thấy 4 thẻ và 7 đầu việc.
   - Trình tự các bước → TT-1.1.1: có nút “Tải Mẫu 1 (.docx)”; bấm tải được tệp Word.
   - TT-1.1.2: có mục “Cơ sở tra cứu, nguồn dữ liệu”; bấm “Bảng 18 Phụ lục II.1” mở bảng danh mục dự án.
   - Có thẻ “Tài chính, chi phí” với 8 dòng.

Tệp mới hoặc thay đổi trong phiên bản 2.4:

| Thư mục | Tệp mới | Tệp thay đổi |
| --- | --- | --- |
| (gốc) | – | `index.html`, `README.md` |
| `mau` (mới) | `M1_Phieu_tiep_nhan_co_hoi_DGNK.docx` | – |
| `assets` | – | `app.js`, `styles.css`, `legal.js` |
| `data` | `tai_chinh.csv` | `data.js`, `dieu_khoan.js`, `quy_trinh_giai_doan.js`, `van_ban.csv`, `buoc_chi_tiet.csv`, `bieu_mau.csv`, `tieu_chi_cong.csv`, `can_cu_giai_doan.csv`, `PVEP_DGNK_du_lieu_mau.xlsx` |
| `tools` | `trich_doan.json`, `build_mau1.js` | `build_data.py`, `build_dieu_khoan.py`, `check_refs.js`, `test_app.py`, `nguon_ocr_da_soat.json` |
| `docs` | – | 4 tệp hướng dẫn |

Nếu GitHub báo không tải được thư mục rỗng hoặc bỏ sót thư mục `mau`: vào kho → **Add file → Create new file** → gõ tên `mau/tam.txt` để tạo thư mục → **Commit**; sau đó vào thư mục `mau` → **Add file → Upload files** → kéo tệp `M1_Phieu_tiep_nhan_co_hoi_DGNK.docx` → **Commit**; xóa tệp `tam.txt`.

Gói `PVEP_DGNK_du_lieu_noi_bo_v2.4.zip` chỉ lưu nội bộ, không tải lên GitHub.

## Cập nhật từ phiên bản 2.2 lên 2.3

Bộ mã 2.3 giữ nguyên cấu trúc thư mục. Cách làm an toàn nhất là tải lên toàn bộ, tệp cùng tên sẽ được ghi đè.

1. Giải nén `PVEP_DGNK_website_v2.3.zip` trên máy. Mở thư mục vừa giải nén, thấy các mục `index.html`, `README.md`, `assets`, `data`, `docs`, `tools`.
2. Mở kho trên GitHub (trang chính của kho, không vào thư mục con) → **Add file → Upload files**.
3. Chọn cả 6 mục trên trong cửa sổ thư mục máy tính và kéo thả vào vùng tải lên. GitHub giữ nguyên thư mục con. Không kéo thả thư mục cha `PVEP_DGNK_website_v2.3` (nếu kéo, các tệp sẽ nằm sai cấp và trang báo 404).
4. Chờ danh sách tệp hiện đầy đủ (khoảng 50 tệp), ô **Commit changes** ghi: `Cập nhật phiên bản 2.3 – Quy trình chi tiết GĐ01` → bấm **Commit changes**.
5. Vào thẻ **Actions**, chờ dòng “pages build and deployment” chuyển dấu tích xanh (1–3 phút).
6. Mở trang website, bấm **Ctrl + F5**. Kiểm tra:
   - Thanh thông báo ghi “phiên bản 2.3”.
   - Menu trái có mục **Quy trình chi tiết**; mở ra thấy 7 thẻ, thẻ **Trình tự các bước** hiện 36 bước và Cổng G1.
   - Bấm một bước → ngăn chi tiết mở; bấm một dẫn chiếu điều khoản → cửa sổ nguyên văn mở.
   - Bản đồ quy trình → Hành trình 10 giai đoạn → Giai đoạn 01 có nút “Quy trình chi tiết giai đoạn (36 bước)”.

Tệp mới hoặc thay đổi trong phiên bản 2.3 (để đối chiếu nếu chỉ muốn tải từng tệp):

| Thư mục | Tệp mới | Tệp thay đổi |
| --- | --- | --- |
| (gốc) | – | `index.html`, `README.md` |
| `assets` | – | `app.js`, `styles.css`, `legal.js` |
| `data` | `buoc_chi_tiet.csv`, `bieu_mau.csv`, `tieu_chi_cong.csv`, `can_cu_giai_doan.csv`, `quy_trinh_giai_doan.js` | `data.js`, `dieu_khoan.js`, `van_ban.csv`, `PVEP_DGNK_du_lieu_mau.xlsx` |
| `tools` | `build_gd01.py`, `gd01_conv.py` | `build_data.py`, `build_dieu_khoan.py`, `check_refs.js`, `test_app.py`, `nguon_ocr_da_soat.json` |
| `docs` | `so_do_GD01.mmd`, `anh_quy_trinh_chi_tiet.png`, `anh_cong_G1.png`, `anh_ho_so_GD01.png` | 4 tệp hướng dẫn |

Lưu ý bảo mật: chỉ tải gói `PVEP_DGNK_website_v2.3.zip`. Gói `PVEP_DGNK_du_lieu_noi_bo_v2.3.zip` lưu trên máy nội bộ hoặc SharePoint của PVEP, không đưa lên GitHub.

Sự cố riêng của bản 2.3:

| Hiện tượng | Cách xử lý |
| --- | --- |
| Không thấy mục “Quy trình chi tiết” | Chưa tải `index.html` mới hoặc trình duyệt còn bộ nhớ đệm: tải lại `index.html`, bấm Ctrl + F5 |
| Mục có nhưng báo “Giai đoạn này chưa được chi tiết hóa” | Thiếu `data/data.js` mới hoặc `data/buoc_chi_tiet.csv` chưa được dựng vào `data.js`: tải lại `data/data.js` |
| Thẻ Tổng quan, Khung mẫu nội bộ trống | Thiếu `data/quy_trinh_giai_doan.js` |
| Giao diện thẻ bước không có màu, khung | Thiếu `assets/styles.css` mới |

## Cập nhật từ phiên bản 2.1 lên 2.2

Tải lên (ghi đè) các tệp sau, giữ đúng thư mục:

| Thư mục trên GitHub | Tệp |
| --- | --- |
| (gốc) | `index.html`, `README.md` |
| `assets` | `app.js`, `styles.css`, `legal.js` (mới) |
| `data` | `data.js`, `dieu_khoan.js` (mới), `so_do_phap_ly.js` (mới), 7 tệp CSV, `PVEP_DGNK_du_lieu_mau.xlsx` |
| `tools` | `build_data.py`, `test_app.py`, `check_refs.js` (mới), `build_dieu_khoan.py` (mới), `nguon_ocr_da_soat.json` (mới) |
| `docs` | 4 tệp hướng dẫn |

Cách nhanh nhất: mở thư mục đã giải nén trên máy, vào từng thư mục con trên GitHub → **Add file → Upload files** → kéo thả toàn bộ tệp của thư mục con tương ứng → **Commit changes**. Sau 1–3 phút bấm **Ctrl + F5**. Thiếu tệp `assets/legal.js` hoặc `data/dieu_khoan.js` thì dẫn chiếu không bấm được hoặc cửa sổ báo “Không tải được data/dieu_khoan.js”.

## Chuyển về riêng tư khi cần

**Settings** → kéo xuống **Danger Zone** → **Change visibility** → **Change to private**. Với tài khoản miễn phí, trang Pages sẽ ngừng hoạt động.

## Lỗi thường gặp

| Hiện tượng | Cách xử lý |
| --- | --- |
| Không thấy **Settings** | Chưa đăng nhập hoặc đang xem kho khác. Bấm ảnh đại diện → **Your repositories** |
| Báo lỗi **404** | Chờ thêm vài phút; kiểm tra `index.html` nằm ở cấp ngoài cùng |
| “Không tải được data/data.js” | Thư mục `data` chưa tải lên hoặc tệp bị đặt lẫn ở cấp ngoài cùng; xóa kho (**Settings → Danger Zone → Delete this repository**) và làm lại Bước 3–4 |
| Thiếu logo | Tải lại thư mục `assets` qua **Add file → Upload files** |
| Dữ liệu chưa đổi sau cập nhật | Chờ 1–3 phút, bấm **Ctrl + F5** |
