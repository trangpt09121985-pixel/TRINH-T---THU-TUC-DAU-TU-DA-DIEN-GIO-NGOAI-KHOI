# Báo cáo kiểm thử chức năng – phiên bản 2.5

Kết quả: **86/86 trường hợp đạt, 0 trường hợp không đạt.** Kiểm thử tự động ngày 13/10/2026 bằng Chromium (Playwright) trên bộ dữ liệu công khai (44 đầu việc, 37 văn bản, 36 bước chi tiết, 11 tiêu chí cổng, 27 căn cứ giai đoạn, 8 nội dung tài chính); máy tính 1440×900 và điện thoại 390×844. Bộ dữ liệu nội bộ: 86/86 đạt.

Kiểm tra dẫn chiếu (`node tools/check_refs.js`): 737 đích dẫn chiếu đều tồn tại trong kho nguyên văn; 0 lỗi; 27 đích thuộc văn bản chưa có nguyên văn trong bộ tài liệu.

Điểm mới được kiểm thử trong phiên bản 2.5: sơ đồ thác nước (KT82, KT83); cổng quyết định tiếng Việt (KT84); câu hỏi lãnh đạo (KT83, KT85); nguyên văn Luật Đo đạc và bản đồ 27/2018/QH14 (KT86).

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
| KT27 | Xuất danh sách CẦN XÁC MINH | ĐẠT | 74 nội dung |
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
| KT52 | Danh mục: dẫn chiếu điều khoản được gắn nút bấm | ĐẠT | 182 nút |
| KT53 | Chi tiết thủ tục: trách nhiệm PVEP đúng quy ước (đầu mối Ban PT&KD SPM, phối hợp các ban chuyên môn) | ĐẠT |  |
| KT54 | Mọi thủ tục có trách nhiệm theo quy ước và có căn cứ mẫu đơn, hồ sơ | ĐẠT |  |
| KT55 | Hồ sơ đầu vào hiển thị căn cứ quy định mẫu đơn, đề án khảo sát | ĐẠT |  |
| KT56 | Bấm dẫn chiếu mở toàn bộ nguyên văn Điều luật | ĐẠT |  |
| KT57 | Tô sáng đúng điểm được dẫn chiếu và hiện nội dung sửa đổi | ĐẠT |  |
| KT58 | Liên kết lồng trong cửa sổ nguyên văn và nút Quay lại | ĐẠT |  |
| KT59 | Quay lại đúng điều trước; Esc đóng cửa sổ nhưng giữ khung chi tiết | ĐẠT |  |
| KT60 | Các nhãn căn cứ tĩnh ở trang tổng quan được gắn nút | ĐẠT | 27 |
| KT61 | Sơ đồ pháp lý: đủ văn bản theo 5 tầng, rê chuột hiện quan hệ | ĐẠT | 37 văn bản |
| KT62 | Sơ đồ pháp lý: chuỗi 7 bước xác lập quyền và thẻ thẩm quyền cơ quan có dẫn chiếu | ĐẠT |  |
| KT64 | Quy trình chi tiết GĐ01: đủ các bước nhỏ, nhóm theo đầu việc và Cổng G1 | ĐẠT | 36 bước |
| KT65 | Bước quyết định, điểm dừng và rẽ nhánh được thể hiện | ĐẠT |  |
| KT66 | Bấm một bước mở ngăn chi tiết có căn cứ bấm được và nút chuyển bước | ĐẠT |  |
| KT67 | Căn cứ trong ngăn bước mở nguyên văn điều luật | ĐẠT |  |
| KT68 | Hồ sơ, biểu mẫu: 16 hồ sơ và 6 khung mẫu nội bộ | ĐẠT |  |
| KT69 | Căn cứ pháp lý giai đoạn: đủ văn bản theo dữ liệu, tên văn bản mở được nguyên văn | ĐẠT |  |
| KT70 | Cổng quyết định: 11 tiêu chí có cột GO/HOLD/NO-GO | ĐẠT |  |
| KT71 | Cần xác minh: kết luận theo ba mức | ĐẠT |  |
| KT72 | Bảng chi tiết có đủ cột và tải được CSV | ĐẠT |  |
| KT73 | Ngăn thủ tục TT-1.1 liệt kê bước chi tiết và dẫn sang quy trình chi tiết | ĐẠT | 6 |
| KT75 | Tổng quan rút gọn: 4 thẻ, 7 đầu việc + Cổng G1, phần chi tiết thu gọn | ĐẠT |  |
| KT76 | Bước TT-1.1.1 có Mẫu 1 đính kèm (.docx) và xem nhanh nội dung | ĐẠT | mau/M1_Phieu_tiep_nhan_co_hoi_DGNK.docx |
| KT77 | Tải được tệp Mẫu 1 | ĐẠT | M1_Phieu_tiep_nhan_co_hoi_DGNK.docx |
| KT78 | Bước TT-1.1.2 ghi rõ cơ sở tra cứu tọa độ, hệ quy chiếu VN-2000 | ĐẠT |  |
| KT79 | Trích đoạn Bảng 18 Phụ lục III.1 (QĐ 768) mở được, có bảng danh mục | ĐẠT |  |
| KT80 | Thẻ Tài chính, chi phí: 8 nội dung có căn cứ bấm được | ĐẠT |  |
| KT81 | Hồ sơ, biểu mẫu: Mẫu 1 có nút tải .docx | ĐẠT |  |
| KT82 | Sơ đồ thác nước: đủ 36 ô bước, 7 đầu việc và Cổng G1 | ĐẠT |  |
| KT83 | Bấm ô trên sơ đồ mở bước; ngăn chi tiết có câu hỏi lãnh đạo | ĐẠT |  |
| KT84 | Cổng G1 Việt hóa: Tiếp tục / Tạm dừng / Dừng, có câu dễ nhớ, không còn GO/HOLD | ĐẠT |  |
| KT85 | Thẻ Câu hỏi lãnh đạo: mọi bước nhỏ đều có câu hỏi | ĐẠT | 82 |
| KT86 | Luật Đo đạc và bản đồ 27/2018 có nguyên văn, tô sáng đúng khoản | ĐẠT |  |
| KT42 | Điện thoại: không tràn ngang, có nút menu và logo | ĐẠT | scrollWidth=390 |
| KT43 | Điện thoại: mở menu, chuyển phân hệ, menu tự đóng | ĐẠT |  |
| KT63 | Điện thoại: sơ đồ pháp lý và cửa sổ nguyên văn không tràn ngang | ĐẠT | 390/390 |
| KT74 | Điện thoại: quy trình chi tiết không tràn ngang | ĐẠT | 390 |
| KT44 | Không lỗi JavaScript trong toàn bộ phiên kiểm thử | ĐẠT |  |

## Giới hạn

- Chưa kiểm thử trên Firefox, Safari và máy tính bảng.
- Mũi tên quan hệ trong Sơ đồ pháp lý ẩn trên màn hình hẹp hơn 900 px; quan hệ vẫn ghi bằng chữ trên từng thẻ văn bản.
- Kho nguyên văn chưa có các luật chuyên ngành ngoài bộ tài liệu (Luật Đầu tư 143/2025, Luật Bảo vệ môi trường, Luật Biển, Bộ luật Hàng hải…); dẫn chiếu tới các văn bản này hiện thông báo CẦN XÁC MINH.
- Phân quyền chỉ kiểm thử ở mức giao diện.
- Phân hệ Quy trình chi tiết hiện mới có Giai đoạn 01; các giai đoạn khác hiển thị “đang xây dựng” trong ô chọn.
- Chạy lại: `python tools/test_app.py` và `node tools/check_refs.js`.
