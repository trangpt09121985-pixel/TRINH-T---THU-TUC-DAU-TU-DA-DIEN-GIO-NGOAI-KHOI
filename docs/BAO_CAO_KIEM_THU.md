# Báo cáo kiểm thử chức năng – phiên bản 2

Kết quả: **51/51 trường hợp đạt, 0 trường hợp không đạt.** Kiểm thử tự động ngày 05/10/2026 bằng Chromium (Playwright) trên bộ dữ liệu công khai (44 đầu việc, 10 giai đoạn, 6 cổng quyết định, 26 văn bản, 28 dòng ma trận, 14 rủi ro, 14 việc lộ trình); máy tính 1440×900 và điện thoại 390×844.

Trong quá trình kiểm thử có 1 lỗi được phát hiện và đã sửa: trên điện thoại, ô chọn bộ lọc có nội dung dài làm trang tràn ngang (rộng 799 px). Sau khi sửa, trang vừa khung 390 px (KT42).

## Kết quả chi tiết

| Mã | Trường hợp kiểm thử | Kết quả | Ghi nhận |
| --- | --- | --- | --- |
| KT01 | Tải trang, 5 chỉ số KPI khớp dữ liệu | ĐẠT | KPI=44,17,25,0,24 |
| KT02 | Không lỗi JavaScript khi tải | ĐẠT |  |
| KT03 | Phân loại Mô hình 1/2 hiển thị đầu trang | ĐẠT |  |
| KT04 | Hướng dẫn nhanh: 5 câu hỏi và bảng phân biệt khái niệm | ĐẠT |  |
| KT05 | Nhãn bộ dữ liệu hiển thị | ĐẠT | Bộ dữ liệu công khai |
| KT06 | Lọc theo giai đoạn cập nhật KPI | ĐẠT |  |
| KT07 | Lọc theo nhãn xác minh | ĐẠT |  |
| KT08 | 05 việc ưu tiên và cổng quyết định gần nhất | ĐẠT |  |
| KT09 | Liên kết trong Hướng dẫn nhanh mở chi tiết thủ tục | ĐẠT |  |
| KT10 | Sơ đồ cây đủ nút (thủ tục + 6 cổng) | ĐẠT | 50 nút |
| KT11 | Nhánh 3 rẽ hai luồng A/B; Nhánh 4 tách ngoài khơi/trên bờ | ĐẠT | Chung cho hai luồng xác định luồng, điều kiện NĐT / Luồng A Vận hành 2025–2030 / Luồng B Vận hành 2031–2035 / Chung ngoài khơi và trên bờ / Phần ngoài khơi tua- |
| KT12 | Chi tiết hiển thị luồng, điều kiện tiên quyết, căn cứ, thẻ văn bản | ĐẠT |  |
| KT13 | Bấm mã điều kiện tiên quyết chuyển sang thủ tục đó | ĐẠT |  |
| KT14 | Thu gọn nhánh 4 | ĐẠT |  |
| KT15 | Điều khiển bằng bàn phím (Enter thu gọn nhánh 1) | ĐẠT |  |
| KT16 | Nút không khớp bộ lọc được làm mờ | ĐẠT |  |
| KT17 | Mở chi tiết cổng quyết định | ĐẠT |  |
| KT18 | Danh mục 16 cột (15 cột yêu cầu + quan hệ trình tự) | ĐẠT |  |
| KT19 | Tìm kiếm theo căn cứ “Điều 30 NĐ 58” | ĐẠT | TT-1.6,TT-3.4,TT-3.8 |
| KT20 | Không có kết quả thì hiện thông báo | ĐẠT |  |
| KT21 | Xuất CSV danh mục đang lọc (UTF-8 tiếng Việt) | ĐẠT | 15 dòng |
| KT22 | Bấm dòng danh mục mở chi tiết | ĐẠT |  |
| KT23 | Cảnh báo văn bản sửa đổi, chưa kiểm chứng, thiếu liên kết | ĐẠT |  |
| KT24 | Có liên kết nguồn chính thức cho văn bản đã tra cứu | ĐẠT |  |
| KT25 | So sánh “Quy định đã rõ” và “Khoảng trống” | ĐẠT | 18 quy định đã rõ · 10 khoảng trống |
| KT26 | Tìm văn bản trong danh mục văn bản | ĐẠT |  |
| KT27 | Xuất danh sách CẦN XÁC MINH | ĐẠT | 63 nội dung |
| KT28 | Bảng rủi ro đủ 13 trường; bản đồ nhiệt đủ mã | ĐẠT |  |
| KT29 | Lọc rủi ro theo nhóm | ĐẠT |  |
| KT30 | Xuất “Nội dung cần xin ý kiến Lãnh đạo PVEP/Petrovietnam” | ĐẠT | 24 nội dung |
| KT31 | Kanban 4 cột, đủ thẻ | ĐẠT |  |
| KT32 | Bảng tiến độ có thanh thời gian | ĐẠT |  |
| KT33 | Danh sách quá hạn hoạt động | ĐẠT |  |
| KT34 | Người xem không thấy khung cập nhật | ĐẠT |  |
| KT35 | Người cập nhật đổi tình trạng công việc | ĐẠT |  |
| KT36 | Nhật ký ghi người sửa, thời gian, giá trị cũ và mới | ĐẠT |  |
| KT37 | Người cập nhật không được nhập tệp | ĐẠT |  |
| KT38 | Quản trị viên nhập CSV hợp lệ | ĐẠT |  |
| KT39 | Từ chối CSV sai cấu trúc | ĐẠT |  |
| KT40 | Xóa thay đổi cục bộ, trở về dữ liệu gốc | ĐẠT |  |
| KT41 | Phóng chữ tối đa 150% (cỡ gốc 17px) | ĐẠT | 25.5px |
| KT42 | Điện thoại: không tràn ngang, có nút menu và logo | ĐẠT | scrollWidth=390 |
| KT43 | Điện thoại: mở menu, chuyển phân hệ, menu tự đóng | ĐẠT |  |
| KT44 | Không lỗi JavaScript trong toàn bộ phiên kiểm thử | ĐẠT |  |
| KT45 | Hành trình hiển thị đủ 10 giai đoạn, tên tiếng Việt | ĐẠT |  |
| KT46 | Mỗi thủ tục thuộc đúng một giai đoạn | ĐẠT |  |
| KT47 | Chọn giai đoạn 5 hiển thị đúng thủ tục và cổng G3 | ĐẠT | 9 thủ tục |
| KT48 | Bấm thủ tục trong giai đoạn mở khung chi tiết có nhãn giai đoạn | ĐẠT |  |
| KT49 | Nút “Giai đoạn tiếp theo” chuyển sang giai đoạn 6 | ĐẠT |  |
| KT50 | Điều khiển hành trình bằng phím mũi tên | ĐẠT |  |
| KT51 | Toàn cảnh 10 cột chứa đủ thủ tục và 6 cổng | ĐẠT |  |

## Giới hạn

- Chưa kiểm thử trên Firefox, Safari và máy tính bảng.
- Việc quá hạn (KT33) chỉ kiểm tra màn hình hoạt động: bộ dữ liệu công khai không ghi hạn cụ thể; bộ nội bộ có hạn từ 15/11/2026.
- Phân quyền chỉ kiểm thử ở mức giao diện.
- Chạy lại: `python tools/test_app.py` (cần Playwright: `pip install playwright` và `playwright install chromium`).
