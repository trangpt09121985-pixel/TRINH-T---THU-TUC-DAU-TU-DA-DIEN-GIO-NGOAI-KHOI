# Hướng dẫn quản trị dữ liệu và cập nhật căn cứ pháp lý

Áp dụng cho trang “Bản đồ trình tự và thủ tục pháp lý đầu tư dự án điện gió ngoài khơi” của PVEP. Dữ liệu tách khỏi giao diện: giao diện chỉ đọc tệp `data/data.js`, tệp này được sinh từ 07 bảng CSV hoặc từ tệp Excel mẫu.

## 1. Cấu trúc dữ liệu

| Bảng (tệp CSV / trang tính Excel) | Nội dung | Khóa |
| --- | --- | --- |
| `thu_tuc` | Danh mục thủ tục/đầu việc, căn cứ, cơ quan, đầu mối PVEP, trạng thái, luồng, phạm vi, điều kiện tiên quyết, làm song song | `ma` (TT-x.y) |
| `cong_quyet_dinh` | 06 cổng quyết định cuối mỗi nhánh | `ma` (G1–G6) |
| `van_ban` | Danh mục văn bản: số, cơ quan, ngày ban hành, hiệu lực, liên kết, xác minh | `ma_vb` (VBxx) |
| `ma_tran_phap_ly` | Điều khoản, nội dung, tác động, hành động, loại “Quy định đã rõ/Khoảng trống” | `ma` (MTxx) |
| `rui_ro` | Sổ rủi ro, khoảng trống pháp lý, cấp xin ý kiến | `ma` (RRxx) |
| `ke_hoach` | Lộ trình hành động Quý IV/2026 và năm 2027 | `ma` (KHxx) |
| `giai_doan` | 10 giai đoạn phát triển dự án (tên, mô tả, đầu ra, biểu tượng, cổng quyết định) dùng cho trang “Hành trình 10 giai đoạn” | `ma` (1–10) |

Quy tắc liên kết: cột `ma_van_ban` của `thu_tuc` và cột `ma_vb` của `ma_tran_phap_ly` phải trỏ tới mã có trong `van_ban`. Các mã TT-x.y, RRxx, KHxx, “Cổng Gx” ghi trong cột `buoc_ke_tiep`, `lien_quan` tự động thành liên kết trên giao diện.

### Giá trị được phép (công cụ sẽ từ chối giá trị khác)

| Cột | Giá trị |
| --- | --- |
| `thu_tuc.nhan_xac_minh` | ĐÃ XÁC MINH · CẦN XÁC MINH · CHƯA CÓ HƯỚNG DẪN CHI TIẾT · CẦN Ý KIẾN CƠ QUAN CÓ THẨM QUYỀN · NGHIỆP VỤ NỘI BỘ |
| `van_ban.trang_thai_xac_minh` | 4 nhãn chuẩn · THAM KHẢO KỸ THUẬT |
| `ma_tran_phap_ly.trang_thai_xac_minh` | 4 nhãn chuẩn |
| `thu_tuc.luong` | A (vận hành 2025–2030) · B (2031–2035) · Chung – chỉ dùng cho Nhánh 3 |
| `thu_tuc.pham_vi` | Ngoài khơi · Trên bờ · Chung – chỉ dùng cho Nhánh 4 |
| `thu_tuc.dieu_kien_tien_quyet`, `song_song_voi` | Mã TT-x.y cách nhau bằng dấu chấm phẩy; công cụ báo lỗi nếu mã không tồn tại |
| `thu_tuc.muc_rui_ro`, `uu_tien` | Cao · Trung bình · Thấp |
| `thu_tuc.thoi_diem` | Hiện tại · Chưa đến thời điểm |
| `thu_tuc.trang_thai_thuc_hien`, `ke_hoach.tinh_trang` | Chưa bắt đầu · Đang thực hiện · Hoàn thành · Tạm dừng |
| `thu_tuc.can_xin_y_kien` | Có · Không |
| `ma_tran_phap_ly.loai` | Quy định đã rõ · Khoảng trống |

### Quy tắc tô màu trên sơ đồ cây

1. Xám: `thoi_diem` = “Chưa đến thời điểm” (trừ khi đang thực hiện).
2. Đỏ: `muc_rui_ro` = “Cao”.
3. Xanh đậm: `nhan_xac_minh` = “ĐÃ XÁC MINH” hoặc “NGHIỆP VỤ NỘI BỘ”.
4. Vàng: các trường hợp còn lại (CẦN XÁC MINH, CHƯA CÓ HƯỚNG DẪN CHI TIẾT, CẦN Ý KIẾN CƠ QUAN CÓ THẨM QUYỀN).

Cột `thu_tuc.giai_doan_10` gán mỗi đầu việc vào một trong 10 giai đoạn; công cụ báo lỗi nếu mã giai đoạn không có trong bảng `giai_doan`. Cách chia 10 giai đoạn theo thông lệ quốc tế, độc lập với 6 nhánh pháp lý (cột `nhanh`).

Nhánh 3 được vẽ rẽ theo cột `luong`; Nhánh 4 được nhóm theo cột `pham_vi`. Quan hệ trình tự (`dieu_kien_tien_quyet`, `song_song_voi`) là đề xuất nghiệp vụ của Ban, không phải quy định pháp luật; cập nhật khi Ban thống nhất.

### Hai bộ dữ liệu

| Bộ | Vị trí | Đưa lên GitHub công khai |
| --- | --- | --- |
| Công khai | `data/` trong bộ mã; nhãn xanh “Bộ dữ liệu công khai” | Có |
| Nội bộ | Gói `PVEP_DGNK_du_lieu_noi_bo` lưu trên SharePoint của Ban; nhãn đỏ “Bộ dữ liệu NỘI BỘ” | **Không** |

Cách xem bộ nội bộ trên máy: chép bộ mã về máy, thay thư mục `data/` bằng thư mục `data/` của gói nội bộ, mở `index.html`. Hoặc giữ nguyên bộ mã, đăng nhập vai trò Quản trị viên và dùng chức năng “Nhập vào trình duyệt” cho từng bảng CSV nội bộ.

Sinh lại dữ liệu nội bộ: `python tools/build_data.py --data <thư mục data nội bộ> --bo noi_bo` (thêm `--from-xlsx <tệp>` khi cập nhật từ Excel).

## 2. Quy trình cập nhật

1. Tải tệp `data/PVEP_DGNK_du_lieu_mau.xlsx` (hoặc các tệp CSV). Trang `Huong_dan` mô tả quy tắc nhập.
2. Sửa hoặc thêm dòng. Không đổi tên trang tính, tên cột. Ngày ghi dạng YYYY-MM-DD.
3. Chạy lệnh tại thư mục gốc (cần Python 3 và `openpyxl`):

   ```
   python tools/build_data.py --from-xlsx data/PVEP_DGNK_du_lieu_mau.xlsx
   ```

   Công cụ kiểm tra thêm: mã điều kiện tiên quyết/làm song song tồn tại, mã đầu vào của cổng quyết định tồn tại, nhãn xác minh đúng chuẩn.

   Nếu cập nhật trực tiếp CSV: `python tools/build_data.py`. Công cụ kiểm tra mã trùng, mã văn bản không tồn tại, giá trị ngoài danh sách; có lỗi thì không ghi tệp và liệt kê dòng lỗi.
4. Mở `index.html`, kiểm tra phân hệ liên quan, chạy `python tools/test_app.py` (cần Playwright) để kiểm thử lại.
5. Lưu phiên bản (Git commit hoặc lưu trữ SharePoint) kèm mô tả thay đổi.

### Cập nhật nhanh trên trình duyệt

- Người cập nhật sửa trạng thái thực hiện, tình trạng căn cứ, ghi chú (khung chi tiết thủ tục), tình trạng rủi ro, tình trạng công việc (Kanban/bảng tiến độ). Mỗi thay đổi ghi vào nhật ký: người sửa, thời gian, bảng, mã, trường, giá trị cũ, giá trị mới.
- Quản trị viên nhập tệp CSV thay một bảng, xuất bảng hiện hành, xuất nhật ký, xóa thay đổi cục bộ.
- Thay đổi trên trình duyệt chỉ lưu trên máy đang dùng. Định kỳ, Quản trị viên xuất bảng hiện hành và nhật ký, cập nhật vào tệp gốc theo mục 2.

## 3. Cập nhật căn cứ pháp lý định kỳ

| Tần suất | Việc cần làm | Người thực hiện |
| --- | --- | --- |
| Hằng tháng | Rà soát văn bản mới về điện lực, đầu tư, đấu thầu, biển, môi trường trên Công báo và Cơ sở dữ liệu quốc gia về pháp luật | Ban Pháp chế, Ban PT&KD SPM |
| Khi có văn bản mới/sửa đổi | Thêm dòng `van_ban`; ghi `sua_doi_thay_the` cho văn bản cũ; cập nhật `ma_tran_phap_ly` và cột căn cứ của `thu_tuc` | Ban Pháp chế |
| Hằng quý | Kiểm chứng lại toàn bộ văn bản, cập nhật `ngay_kiem_chung`; trang Ma trận cảnh báo văn bản quá 90 ngày chưa kiểm chứng | Ban Pháp chế |
| Trước mỗi kỳ báo cáo Lãnh đạo | Xuất “Nội dung cần xin ý kiến”, rà soát rủi ro, cập nhật kế hoạch | Ban PT&KD SPM |

Quy tắc nội dung pháp lý:

- Chỉ ghi “ĐÃ XÁC MINH” khi đã đối chiếu nguyên văn văn bản gốc và ghi đủ điều, khoản, điểm.
- Ghi ngày đối chiếu nguồn vào `ngay_doi_chieu_nguon` khi điền hoặc kiểm tra liên kết.
- Cột `lien_ket_chinh_thuc` chỉ điền đường dẫn từ nguồn chính thức (Cơ sở dữ liệu quốc gia về pháp luật, Công báo, Cổng TTĐT Chính phủ, website cơ quan ban hành). Chưa có liên kết thì để trống: giao diện hiển thị “Chưa có liên kết – cần bổ sung”.
- Không điền thời hạn giải quyết, thẩm quyền, biểu mẫu khi chưa có văn bản; ghi “CẦN XÁC MINH”.
- Tiêu chuẩn quốc tế chỉ ghi loại “Tài liệu tham khảo kỹ thuật”.
- Đánh giá tác động/khả năng của rủi ro và hạn trong kế hoạch là đề xuất; cập nhật khi Lãnh đạo phê duyệt.

## 4. Tình trạng dữ liệu tại 05/10/2026

- Đã bổ sung liên kết chính thức cho 3/26 văn bản: Luật Điện lực 61/2024/QH15 (vietlaw.quochoi.vn), NĐ 243/2026/NĐ-CP (moit.gov.vn), NQ 253/2025/QH15 (vbpl.vn). 23 văn bản còn lại chưa tìm được trang chính thức đúng văn bản.
- Đã bổ sung ngày hiệu lực Luật 57/2024/QH15 (15/01/2025) và Luật 90/2025/QH15 (01/07/2025) từ bản gốc trong bộ tài liệu.
- Phát hiện mới: Luật Điện lực đã được sửa đổi bởi Luật 94/2025/QH15, 116/2025/QH15 và Luật Xây dựng 135/2025/QH15 (theo văn bản hợp nhất 07/VBHN-VPQH, nguồn thứ cấp). Cần kiểm tra các điều được dẫn chiếu có bị sửa đổi không.
- Văn bản trích từ bản scan cần đối chiếu Công báo: NĐ 272/2026/NĐ-CP, Luật Dầu khí 10/2026/QH16.
- Danh sách đầy đủ: `docs/DANH_SACH_CAN_XAC_MINH.md` hoặc nút “Xuất danh sách CẦN XÁC MINH” trên website.
- Bộ công khai: trạng thái thực hiện đều “Chưa bắt đầu”, rủi ro và lộ trình ở dạng tổng quát, không có thời hạn nội bộ.

## 5. Triển khai và phân quyền

Trang là ứng dụng tĩnh (HTML, CSS, JavaScript), chạy được khi mở trực tiếp `index.html` hoặc đặt trên máy chủ web nội bộ.

Chế độ “Người xem/Người cập nhật/Quản trị viên” trên trang chỉ giới hạn thao tác giao diện, không ngăn được người có quyền truy cập tệp. Để đáp ứng yêu cầu phân quyền và không công bố dữ liệu ra ngoài:

1. Đặt trên máy chủ nội bộ hoặc SharePoint/Teams của PVEP, yêu cầu đăng nhập tài khoản công ty; phân quyền đọc/ghi tệp `data/` theo nhóm người dùng.
2. Khi đăng GitHub Pages công khai (xem `docs/HUONG_DAN_GITHUB.md`), chỉ dùng bộ dữ liệu công khai. Trang Pages của kho riêng tư cũng hiển thị công khai, trừ khi tổ chức dùng GitHub Enterprise Cloud có kiểm soát truy cập.
3. Nếu cần nhiều người cập nhật đồng thời và nhật ký tập trung, bước tiếp theo là chuyển dữ liệu sang SharePoint List hoặc cơ sở dữ liệu nội bộ, giữ nguyên cấu trúc 06 bảng; giao diện chỉ cần thay hàm đọc `data/data.js` bằng hàm gọi API.
4. Thẻ `noindex, nofollow` đã được đặt để công cụ tìm kiếm không lập chỉ mục, nhưng không thay thế kiểm soát truy cập.
