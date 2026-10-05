# PVEP · Bản đồ trình tự và thủ tục pháp lý đầu tư dự án điện gió ngoài khơi (phiên bản 2)

Website tĩnh hướng dẫn trình tự, thủ tục pháp lý đầu tư dự án điện gió ngoài khơi, có dẫn chiếu điều, khoản văn bản pháp luật Việt Nam. Gồm 6 phân hệ: Tổng quan lãnh đạo · Bản đồ quy trình dạng cây · Danh mục thủ tục · Ma trận pháp lý · Rủi ro và nội dung xin ý kiến · Lộ trình hành động; kèm trang Dữ liệu và nhật ký.

Thư mục `data/` trong bộ mã là **bộ dữ liệu công khai**, dùng được cho GitHub Pages. Bộ dữ liệu nội bộ được bàn giao riêng và không đưa lên GitHub.

## Chạy thử
Mở `index.html` bằng Edge hoặc Chrome.

## Cấu trúc
```
index.html                 Khung giao diện
assets/                    Giao diện (styles.css), xử lý (app.js), logo PVEP
data/*.csv, *.xlsx         6 bảng dữ liệu công khai và tệp Excel mẫu
data/data.js               Sinh tự động – không sửa tay
tools/build_data.py        Kiểm tra dữ liệu, sinh data.js, chuyển CSV ↔ Excel
tools/test_app.py          Kiểm thử tự động
docs/HUONG_DAN_GITHUB.md   Đăng GitHub Pages từng bước
docs/HUONG_DAN_QUAN_TRI.md Quản trị dữ liệu, cập nhật căn cứ pháp lý
docs/DANH_SACH_CAN_XAC_MINH.md  Nội dung cần Ban Pháp chế xác minh
docs/BAO_CAO_KIEM_THU.md   Kết quả kiểm thử
```

## Cập nhật dữ liệu
```
python tools/build_data.py --from-xlsx data/PVEP_DGNK_du_lieu_mau.xlsx
```
