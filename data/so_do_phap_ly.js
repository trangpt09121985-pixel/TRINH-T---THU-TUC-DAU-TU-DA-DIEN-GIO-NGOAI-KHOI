/* Nội dung "Sơ đồ pháp lý" – chuỗi xác lập quyền và thẩm quyền cơ quan.
   Mọi dẫn chiếu được kiểm tra tự động bằng tools/check_refs.js. Cập nhật khi có văn bản mới. */
window.SO_DO = {
  ngay_cap_nhat: '2026-10-06',
  chuoi: [
    { ma: 'Q1', ten: 'Có trong quy hoạch', quyen: 'Chưa phát sinh quyền khảo sát hay quyền đầu tư',
      quyet_dinh: 'Quy hoạch phát triển điện lực, kế hoạch thực hiện; điều chỉnh cập nhật quy hoạch',
      co_quan: 'Thủ tướng Chính phủ (phê duyệt quy hoạch); Bộ trưởng Bộ Công Thương (điều chỉnh cập nhật)',
      can_cu: 'QĐ 768/QĐ-TTg (CẦN XÁC MINH bản đối chiếu); khoản 3, điểm a khoản 4 Điều 4 NQ 253/2025',
      luu_y: 'Dự án phải có tên, quy mô và giai đoạn vận hành trong quy hoạch để áp dụng Điều 11 hoặc Điều 12 NQ 253/2025' },
    { ma: 'Q2', ten: 'Quyền khảo sát', quyen: 'Quyền sử dụng khu vực biển để khảo sát, có thời hạn',
      quyet_dinh: 'Quyết định giao khu vực biển để khảo sát',
      co_quan: 'Bộ Nông nghiệp và Môi trường',
      can_cu: 'khoản 2 Điều 27 Luật Điện lực; khoản 1, 2 Điều 26 NĐ 58/2025; Điều 5 NĐ 272/2026; khoản 2 Điều 9, khoản 1 Điều 10, khoản 2 Điều 13 NĐ 272/2026',
      luu_y: 'Dự án vận hành 2025–2030: Bộ NN&MT chỉ nhận hồ sơ giao biển sau khi có chấp thuận chủ trương (khoản 2 Điều 9 NĐ 272/2026). Quyền sử dụng khu vực biển không được chuyển nhượng, góp vốn (tiền lệ khoản 3 Điều 2 QĐ 138/QĐ-BNNMT)' },
    { ma: 'Q3', ten: 'Quyền đầu tư', quyen: 'Tư cách nhà đầu tư thực hiện dự án',
      quyet_dinh: 'Luồng A: chấp thuận chủ trương đồng thời chấp thuận nhà đầu tư. Luồng B: chấp thuận chủ trương, sau đó lựa chọn nhà đầu tư',
      co_quan: 'Luồng A: Thủ tướng Chính phủ (Bộ Tài chính tiếp nhận hồ sơ). Luồng B: Chủ tịch UBND tỉnh nơi có điểm gom công suất',
      can_cu: 'khoản 2, 3 Điều 11 NQ 253/2025; khoản 2 Điều 12 NQ 253/2025; Điều 7, 8, 9, 10 NĐ 272/2026; Điều 28 Luật Điện lực; Điều 28, 29, 30 NĐ 58/2025',
      luu_y: 'Đơn vị được giao khảo sát không đương nhiên là nhà đầu tư; phải đáp ứng điều kiện tại khoản 1 Điều 8 NĐ 272/2026' },
    { ma: 'Q4', ten: 'Quyền sử dụng biển thực hiện dự án', quyen: 'Quyền sử dụng khu vực biển để xây dựng, vận hành',
      quyet_dinh: 'Quyết định giao khu vực biển để thực hiện dự án',
      co_quan: 'Cơ quan có thẩm quyền giao khu vực biển theo pháp luật về biển (CẦN XÁC MINH)',
      can_cu: 'điểm a, b khoản 2 Điều 28 Luật Điện lực; khoản 2 Điều 7 NĐ 272/2026; khoản 7 Điều 3 NĐ 243/2026',
      luu_y: 'Vị trí, tọa độ, diện tích trong hồ sơ chủ trương là cơ sở xác định khu vực biển trong báo cáo khả thi' },
    { ma: 'Q5', ten: 'Đủ điều kiện xây dựng', quyen: 'Được triển khai xây dựng sau khi hoàn tất các phê duyệt chuyên ngành',
      quyet_dinh: 'Phê duyệt báo cáo khả thi; thủ tục môi trường; thỏa thuận đấu nối; hợp đồng mua bán điện; quyết định đầu tư nội bộ',
      co_quan: 'Chủ đầu tư; cơ quan chuyên ngành về xây dựng, môi trường, hệ thống điện (CẦN XÁC MINH); bên mua điện',
      can_cu: 'điểm a, b khoản 2 Điều 29 NĐ 58/2025; khoản 4 Điều 11 NQ 253/2025; quy chế phân cấp đầu tư Petrovietnam/PVEP (CẦN XÁC MINH)',
      luu_y: 'Trường hợp đấu thầu: phê duyệt báo cáo khả thi trong 24 tháng, quyết định giá hợp đồng mua bán điện trong 30 tháng kể từ ngày ký hợp đồng dự án' },
    { ma: 'Q6', ten: 'Quyền phát điện, bán điện', quyen: 'Được hoạt động phát điện sau khi được cấp giấy phép',
      quyet_dinh: 'Giấy phép hoạt động điện lực lĩnh vực phát điện',
      co_quan: 'Bộ Công Thương (hoặc UBND cấp tỉnh theo phân cấp của Chính phủ)',
      can_cu: 'khoản 3, 5 Điều 30 Luật Điện lực; khoản 2 Điều 31 Luật Điện lực; khoản 5 Điều 32 Luật Điện lực; khoản 1, 2 Điều 37 Luật Điện lực',
      luu_y: 'Không cấp giấy phép hoạt động điện lực cho giai đoạn đầu tư (khoản 3 Điều 30 Luật Điện lực)' },
    { ma: 'Q7', ten: 'Chuyển nhượng, tháo dỡ', quyen: 'Chuyển nhượng có điều kiện; nghĩa vụ tháo dỡ khi chấm dứt hoạt động',
      quyet_dinh: 'Ý kiến thống nhất của các bộ (khi có yếu tố nước ngoài); hoàn thành tháo dỡ trong thời hạn',
      co_quan: 'Bộ Quốc phòng, Bộ Công an, Bộ Ngoại giao, Bộ Công Thương; cơ quan đăng ký đầu tư',
      can_cu: 'khoản 8 Điều 26 Luật Điện lực; Điều 32 NĐ 58/2025; Điều 25 Luật Điện lực; khoản 2 Điều 8 NĐ 58/2025',
      luu_y: 'Doanh nghiệp 100% vốn nhà nước và đơn vị thành viên có quyền ưu tiên mua trước (điểm c khoản 3 Điều 32 NĐ 58/2025)' }
  ],
  tham_quyen: [
    { co_quan: 'Thủ tướng Chính phủ', viec: [
      ['Chấp thuận chủ trương đồng thời chấp thuận nhà đầu tư – dự án vận hành 2025–2030', 'khoản 3 Điều 11 NQ 253/2025'],
      ['Chấp thuận chủ trương đồng thời chấp thuận nhà đầu tư khi doanh nghiệp 100% vốn nhà nước đề xuất', 'khoản 1 Điều 30 NĐ 58/2025']] },
    { co_quan: 'Bộ Tài chính', viec: [
      ['Tiếp nhận, giải quyết hồ sơ đề nghị chấp thuận chủ trương – dự án vận hành 2025–2030', 'khoản 1, 3, 5 Điều 9 NĐ 272/2026']] },
    { co_quan: 'Chủ tịch UBND cấp tỉnh nơi có điểm gom công suất', viec: [
      ['Chấp thuận chủ trương đầu tư – dự án vận hành 2031–2035', 'khoản 2 Điều 12 NQ 253/2025'],
      ['Chỉ tiếp nhận hồ sơ khi đã có kết quả khảo sát hiện trường', 'khoản 2 Điều 10 NĐ 272/2026']] },
    { co_quan: 'Bộ Nông nghiệp và Môi trường', viec: [
      ['Lựa chọn đơn vị khảo sát, giao khu vực biển để khảo sát', 'khoản 2 Điều 26 NĐ 58/2025'],
      ['Tiếp nhận, thẩm định hồ sơ giao khu vực biển để khảo sát – dự án 2031–2035', 'khoản 1 Điều 10 NĐ 272/2026'],
      ['Nhận báo cáo kết quả khảo sát (cùng Bộ Công Thương)', 'điểm a khoản 3 Điều 27 NĐ 58/2025'],
      ['Quản lý bảo vệ môi trường, tài nguyên biển của dự án', 'điểm c khoản 2 Điều 31 NĐ 58/2025']] },
    { co_quan: 'Bộ Công Thương', viec: [
      ['Phê duyệt điều chỉnh cập nhật quy hoạch phát triển điện lực', 'điểm a khoản 4 Điều 4 NQ 253/2025'],
      ['Thống nhất điểm gom công suất khi quy hoạch chưa xác định', 'điểm b khoản 3 Điều 12 NQ 253/2025'],
      ['Quản lý tiến độ đầu tư, vận hành an toàn hệ thống điện', 'điểm a khoản 2 Điều 31 NĐ 58/2025'],
      ['Cấp giấy phép hoạt động điện lực lĩnh vực phát điện', 'khoản 1 Điều 37 Luật Điện lực'],
      ['Cơ quan quyết định tổ chức đấu thầu lựa chọn nhà đầu tư: quy định tại khoản 6 Điều 29 NĐ 58/2025 đã bị bãi bỏ – CẦN XÁC MINH cơ quan hiện hành', 'khoản 29 Điều 2 NĐ 243/2026']] },
    { co_quan: 'Bộ Quốc phòng, Bộ Công an, Bộ Ngoại giao', viec: [
      ['Ý kiến thống nhất khi lựa chọn đơn vị khảo sát', 'điểm đ khoản 1 Điều 26 NĐ 58/2025'],
      ['Ý kiến thống nhất đối với nhà đầu tư nước ngoài', 'điểm d khoản 1 Điều 28 NĐ 58/2025'],
      ['Ý kiến thống nhất khi chấp thuận chủ trương dự án 2031–2035 (cùng các bộ khác)', 'khoản 2 Điều 12 NQ 253/2025'],
      ['Quản lý hoạt động liên quan quốc phòng, an ninh, chủ quyền', 'điểm b khoản 2 Điều 31 NĐ 58/2025']] },
    { co_quan: 'Bộ Xây dựng', viec: [
      ['Quản lý hoạt động hàng hải liên quan dự án', 'điểm d khoản 2 Điều 31 NĐ 58/2025']] },
    { co_quan: 'Petrovietnam, PVEP (nội bộ)', viec: [
      ['Phân công, ủy quyền thực hiện khảo sát; chủ trương tham gia, góp vốn, quyết định đầu tư', 'Quy chế phân cấp đầu tư Petrovietnam/PVEP (CẦN XÁC MINH)'],
      ['Mô hình 1 (gắn hoạt động dầu khí): phê duyệt sử dụng vốn trong hoạt động dầu khí', 'Điều 59 Luật Dầu khí 10/2026']] }
  ]
};
