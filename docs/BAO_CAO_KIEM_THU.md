# Báo cáo kiểm thử chức năng – phiên bản 2.2

Kết quả: **63/63 trường hợp đạt, 0 trường hợp không đạt.** Kiểm thử tự động ngày 06/10/2026 bằng Chromium (Playwright) trên bộ dữ liệu công khai (44 đầu việc, 10 giai đoạn, 6 cổng quyết định, 26 văn bản, 28 dòng ma trận, 14 rủi ro, 14 việc lộ trình); máy tính 1440×900 và điện thoại 390×844. Bộ dữ liệu nội bộ chạy cùng bộ kiểm thử: 63/63 đạt.

Kiểm tra dẫn chiếu (`node tools/check_refs.js`): 332 đích dẫn chiếu (điều, khoản, điểm) trong 7 bảng dữ liệu, trang tổng quan và sơ đồ pháp lý đều tồn tại trong nguyên văn; 0 lỗi.

Lỗi phát hiện và đã sửa trong phiên bản 2.2:
- Dữ liệu: “khoản 4 Điều 7 NĐ 272/2026” (Điều 7 chỉ có 3 khoản) sửa thành khoản 3; dẫn chiếu phương án cảng sửa thành điểm b khoản 1, điểm b khoản 3 Điều 7.
- Giao diện: kiểu nút của thẻ thủ tục ghi đè lên nút dẫn chiếu; đã giới hạn phạm vi kiểu. Dẫn chiếu căn cứ được đưa ra ngoài nút thẻ để bấm riêng.

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
| KT45 | Hành trình hiển thị đủ 10 giai đoạn, tên tiếng Việt | ĐẠT |  |
| KT46 | Mỗi thủ tục thuộc đúng một giai đoạn | ĐẠT |  |
| KT47 | Chọn giai đoạn 5 hiển thị đúng thủ tục và cổng G3 | ĐẠT | 9 thủ tục |
| KT48 | Bấm thủ tục trong giai đoạn mở khung chi tiết có nhãn giai đoạn | ĐẠT |  |
| KT49 | Nút “Giai đoạn tiếp theo” chuyển sang giai đoạn 6 | ĐẠT |  |
| KT50 | Điều khiển hành trình bằng phím mũi tên | ĐẠT |  |
| KT51 | Toàn cảnh 10 cột chứa đủ thủ tục và 6 cổng | ĐẠT |  |
| KT10 | Sơ đồ cây đủ nút (thủ tục + 6 cổng) | ĐẠT | 50 nút |
| KT11 | Nhánh 3 rẽ hai luồng A/B; Nhánh 4 tách ngoài khơi/trên bờ | ĐẠT |            Chung cho hai luồng           xác định luồng, điều kiện NĐT |            Luồng A           Vận hành 2025–2030 |            Luồng B           Vận hành 2031–2035 |            Chung           ngoài khơi và trên bờ |            Phần ngoài khơi           tua-bin, cáp biển, biển |            Phần trên bờ           trạm biến áp, đất, cảng |
| KT12 | Chi tiết hiển thị luồng, điều kiện tiên quyết, căn cứ, thẻ văn bản | ĐẠT |  |
| KT13 | Bấm mã điều kiện tiên quyết chuyển sang thủ tục đó | ĐẠT |  |
| KT14 | Thu gọn nhánh 4 | ĐẠT |  |
| KT15 | Điều khiển bằng bàn phím (Enter thu gọn nhánh 1) | ĐẠT |  |
| KT16 | Nút không khớp bộ lọc được làm mờ | ĐẠT |  |
| KT17 | Mở chi tiết cổng quyết định | ĐẠT |  |
| KT18 | Danh mục 17 cột (15 cột yêu cầu + căn cứ mẫu hồ sơ + quan hệ trình tự) | ĐẠT |  |
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
| KT52 | Danh mục: dẫn chiếu điều khoản được gắn nút bấm | ĐẠT | 179 nút |
| KT53 | Chi tiết thủ tục: trách nhiệm PVEP đúng quy ước (đầu mối Ban PT&KD SPM, phối hợp các ban chuyên môn) | ĐẠT |  |
| KT54 | Mọi thủ tục có trách nhiệm theo quy ước và có căn cứ mẫu đơn, hồ sơ | ĐẠT |  |
| KT55 | Hồ sơ đầu vào hiển thị căn cứ quy định mẫu đơn, đề án khảo sát | ĐẠT |  |
| KT56 | Bấm dẫn chiếu mở toàn bộ nguyên văn Điều luật | ĐẠT |  |
| KT57 | Tô sáng đúng điểm được dẫn chiếu và hiện nội dung sửa đổi | ĐẠT |  |
| KT58 | Liên kết lồng trong cửa sổ nguyên văn và nút Quay lại | ĐẠT |  |
| KT59 | Quay lại đúng điều trước; Esc đóng cửa sổ nhưng giữ khung chi tiết | ĐẠT |  |
| KT60 | Các nhãn căn cứ tĩnh ở trang tổng quan được gắn nút | ĐẠT | 27 |
| KT61 | Sơ đồ pháp lý: đủ văn bản theo 5 tầng, rê chuột hiện quan hệ | ĐẠT | 26 văn bản |
| KT62 | Sơ đồ pháp lý: chuỗi 7 bước xác lập quyền và thẻ thẩm quyền cơ quan có dẫn chiếu | ĐẠT |  |
| KT42 | Điện thoại: không tràn ngang, có nút menu và logo | ĐẠT | scrollWidth=390 |
| KT43 | Điện thoại: mở menu, chuyển phân hệ, menu tự đóng | ĐẠT |  |
| KT63 | Điện thoại: sơ đồ pháp lý và cửa sổ nguyên văn không tràn ngang | ĐẠT | 390/390 |
| KT44 | Không lỗi JavaScript trong toàn bộ phiên kiểm thử | ĐẠT |  |

## Giới hạn

- Chưa kiểm thử trên Firefox, Safari và máy tính bảng.
- Mũi tên quan hệ trong Sơ đồ pháp lý ẩn trên màn hình hẹp hơn 900 px; quan hệ vẫn ghi bằng chữ trên từng thẻ văn bản.
- Kho nguyên văn chưa có các luật chuyên ngành ngoài bộ tài liệu (Luật Đầu tư 143/2025, Luật Bảo vệ môi trường, Luật Biển, Bộ luật Hàng hải…); dẫn chiếu tới các văn bản này hiện thông báo CẦN XÁC MINH.
- Phân quyền chỉ kiểm thử ở mức giao diện.
- Chạy lại: `python tools/test_app.py` và `node tools/check_refs.js`.
