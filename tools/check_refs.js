// Kiểm tra mọi dẫn chiếu điều khoản trong dữ liệu: điều/khoản/điểm có tồn tại trong kho nguyên văn không.
// Chạy: node tools/check_refs.js [thu_muc_data]
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = process.argv[2] || path.join(__dirname, '..', 'data');
const ctx = { window: {}, document: { addEventListener() {}, querySelectorAll() { return []; } } };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(dir, 'data.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'data', 'dieu_khoan.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'assets', 'legal.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'data', 'so_do_phap_ly.js'), 'utf8'), ctx);
const A = ctx.window.APP_DATA, DK = ctx.window.DIEU_KHOAN, L = ctx.window.LEGAL;
const FIELDS = { thu_tuc: ['can_cu_phap_ly', 'ho_so_du_lieu', 'can_cu_ho_so', 'rui_ro_luu_y'], cong_quyet_dinh: ['can_cu'], rui_ro: ['can_cu_ly_do'], ke_hoach: ['can_cu'], giai_doan: ['luu_y'],
  buoc_chi_tiet: ['cong_viec', 'dau_vao', 'can_cu', 'ho_so', 'dau_ra', 'dieu_kien_chuyen_buoc', 'rui_ro', 're_nhanh'], bieu_mau: ['co_quan', 'can_cu', 'thanh_phan', 'thoi_diem'], tieu_chi_cong: ['cau_hoi', 'can_cu'], can_cu_giai_doan: ['co_quan_ngay', 'dieu_khoan', 'tinh_trang', 'nhan_dinh'] };
let n = 0, bad = 0, nocorpus = 0;
function check(where, text, ctxVb) {
  const html = L.linkify(String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;'), ctxVb);
  const ids = [...html.matchAll(/data-law="(L\d+)"[^>]*>([^<]*)</g)];
  ids.forEach(([, id, label]) => {
    L._reg[id].forEach(t => {
      if (t.trich) { n++; const d = DK.vb[t.vb]; if (!d) { nocorpus++; return; } if (!d.trich || !d.trich[t.trich]) { bad++; console.log('THIẾU TRÍCH ĐOẠN', where, '|', label, '->', t.vb, t.trich); } return; }
      if (!t.dieu) return; n++;
      const d = DK.vb[t.vb];
      if (!d) { nocorpus++; return; }
      const a = d.dieu[t.dieu];
      if (!a) { bad++; console.log('THIẾU ĐIỀU', where, '|', label, '->', t.vb, 'Điều', t.dieu); return; }
      const ks = new Set(a.p.map(p => (p.match(/^(\d{1,2})\.\s/) || [])[1]).filter(Boolean));
      (t.khoan || []).forEach(k => { if (!ks.has(k)) { bad++; console.log('THIẾU KHOẢN', where, '|', label, '->', t.vb, 'Điều', t.dieu, 'khoản', k); } });
      (t.diem || []).forEach(x => {
        const [k, dd] = x.split(':'); let cur = null, ok = false;
        a.p.forEach(p => { const m = p.match(/^(\d{1,2})\.\s/); if (m) cur = m[1]; const md = p.match(/^[“"]?([a-zđ])\)/); if (md && md[1] === dd && (!k || cur === k)) ok = true; });
        if (!ok) { bad++; console.log('THIẾU ĐIỂM', where, '|', label, '->', t.vb, 'Điều', t.dieu, x); }
      });
    });
  });
}
Object.entries(FIELDS).forEach(([t, fs2]) => (A[t] || []).forEach(r => fs2.forEach(f => r[f] && check(`${t}.${r.ma}.${f}`, r[f], t === 'can_cu_giai_doan' ? (r.ma_vb || '').split(';')[0] : ''))));
(A.ma_tran_phap_ly || []).forEach(r => check(`ma_tran.${r.ma}`, r.dieu_khoan, r.ma_vb));
vm.runInContext(fs.readFileSync(path.join(dir, 'quy_trinh_giai_doan.js'), 'utf8'), ctx);
const walk = (o, where) => { if (typeof o === 'string') check(where, o); else if (Array.isArray(o)) o.forEach((x, i) => walk(x, where + '.' + i)); else if (o && typeof o === 'object') Object.entries(o).forEach(([k, v]) => walk(v, where + '.' + k)); };
walk(ctx.window.QT_GIAI_DOAN, 'quy_trinh');
const SD = ctx.window.SO_DO;
SD.chuoi.forEach(c => ['quyet_dinh', 'co_quan', 'can_cu', 'luu_y'].forEach(f => check('so_do.' + c.ma + '.' + f, c[f])));
SD.tham_quyen.forEach(t => t.viec.forEach(v => check('tham_quyen.' + t.co_quan, v[1] + ' ' + v[0])));
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
[...html.matchAll(/<span class="ref">([^<]*)<\/span>/g)].forEach(m => check('index.html', m[1], ''));
console.log(`Đã kiểm tra ${n} đích dẫn chiếu; ${bad} lỗi; ${nocorpus} đích thuộc văn bản chưa có nguyên văn.`);
process.exit(bad ? 1 : 0);
