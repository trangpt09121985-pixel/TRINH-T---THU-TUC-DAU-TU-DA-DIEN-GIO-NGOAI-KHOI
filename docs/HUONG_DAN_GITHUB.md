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

## Bước 6. Cập nhật dữ liệu

1. Sửa tệp `data/PVEP_DGNK_du_lieu_mau.xlsx` trên máy.
2. Mở **Command Prompt** tại thư mục dự án, chạy:
   `python tools/build_data.py --from-xlsx data/PVEP_DGNK_du_lieu_mau.xlsx`
   (cần Python và thư viện openpyxl; nhờ Ban CNTT cài nếu chưa có).
3. Trên GitHub, vào thư mục **data** → **Add file → Upload files** → kéo thả `data.js`, các tệp CSV và tệp Excel (tệp cùng tên được ghi đè) → **Commit changes**.
4. Chờ 1–3 phút, mở lại trang và bấm **Ctrl + F5**.

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
