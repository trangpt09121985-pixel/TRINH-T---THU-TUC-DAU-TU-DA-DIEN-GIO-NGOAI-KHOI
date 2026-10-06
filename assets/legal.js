/* PVEP – Bản đồ thủ tục ĐGNK · Mô-đun tra cứu nguyên văn điều khoản (v2.2)
   - linkify(htmlDaEscape, maVbMacDinh): biến "khoản 2 Điều 27 Luật Điện lực" thành nút bấm.
   - Bấm nút: mở cửa sổ hiển thị toàn bộ Điều luật, tô sáng khoản/điểm được dẫn chiếu,
     kèm nội dung sửa đổi (nếu có) và thông tin hiệu lực văn bản.
   - Nguyên văn nằm trong data/dieu_khoan.js, chỉ tải khi người dùng bấm lần đầu. */
(function () {
'use strict';
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/* Bí danh văn bản -> mã văn bản trong bảng van_ban. Thứ tự quan trọng: mẫu dài/đặc thù trước. */
const ALIAS = [
  ['VB07', /Luật Dầu khí (?:số )?12(?:\/2022)?(?:\/QH15)?/],
  ['VB06', /Luật Dầu khí(?: (?:số )?10(?:\/2026)?(?:\/QH16)?)?/],
  ['VB01', /Luật Điện lực(?: (?:số )?61(?:\/2024)?(?:\/QH15)?)?/],
  ['VB09', /Luật (?:số )?90(?:\/2025)?(?:\/QH15)?/],
  ['VB08', /Luật (?:số )?57(?:\/2024)?(?:\/QH15)?/],
  ['VB02', /(?:NĐ|Nghị định)(?: số)? ?58(?:\/2025)?(?:\/NĐ-CP)?/],
  ['VB03', /(?:NĐ|Nghị định)(?: số)? ?243(?:\/2026)?(?:\/NĐ-CP)?/],
  ['VB05', /(?:NĐ|Nghị định)(?: số)? ?272(?:\/2026)?(?:\/NĐ-CP)?/],
  ['VB10', /(?:NĐ|Nghị định)(?: số)? ?274(?:\/2026)?(?:\/NĐ-CP)?/],
  ['VB14', /(?:NĐ|Nghị định)(?: số)? ?57(?:\/2025)?(?:\/NĐ-CP)?/],
  ['VB15', /(?:NĐ|Nghị định)(?: số)? ?56(?:\/2025)?(?:\/NĐ-CP)?/],
  ['VB19', /(?:NĐ|Nghị định)(?: số)? ?11(?:\/2021)?(?:\/NĐ-CP)?/],
  ['VB04', /(?:NQ|Nghị quyết)(?: số)? ?253(?:\/2025)?(?:\/QH15)?/],
  ['VB12', /(?:QĐ|Quyết định)(?: số)? ?138(?:\/QĐ-BNNMT)?/],
  ['VB11', /(?:QĐ|Quyết định)(?: số)? ?768(?:\/QĐ-TTg)?/],
  ['VB13', /(?:Công văn|CV)(?: số)? ?435(?:\/BNNMT-BHĐ)?/],
  ['VB23', /(?:TT|Thông tư)(?: số)? ?79(?:\/2025)?(?:\/TT-BNNMT)?/]
];
const SELF = /(Nghị định này|Luật này|Nghị quyết này|Quyết định này)/;
const NUM = '\\d+[a-z]?';
const LIST = `${NUM}(?:\\s*(?:,|và|–|-)\\s*${NUM})*`;
// [điểm ...] khoản ... [, [điểm ...] khoản ...] Điều ...
const DIEM = `[đĐ]iểm\\s+[a-zđ](?:\\s*(?:,|và)\\s*(?:điểm\\s+)?[a-zđ])*`;
const PRE = `(?:${DIEM}\\s+)?[kK]hoản\\s+${LIST}`;
const REF = new RegExp(`((?:${PRE}\\s*(?:,|và)\\s*)*(?:${PRE}\\s+|${DIEM}\\s+)?Điều\\s+${LIST})`, 'g');
function expand(list) {
  const out = [];
  String(list).split(/\s*(?:,|và)\s*/).forEach(part => {
    const m = part.match(/^(\d+)\s*[–-]\s*(\d+)$/);
    if (m) { for (let i = +m[1]; i <= +m[2] && i - m[1] < 40; i++) out.push(String(i)); }
    else if (part.trim()) out.push(part.trim());
  });
  return out;
}
function parseRef(ref) {
  const di = (ref.match(/Điều\s+(.+)$/) || [])[1];
  const head = ref.replace(/Điều\s+.+$/, '');
  const khoan = [], diem = [];
  const re = /(?:[đĐ]iểm\s+((?:[a-zđ](?:\s*(?:,|và)\s*(?:điểm\s+)?)?)+)\s+)?[kK]hoản\s+(\d+[a-z]?(?:\s*(?:,|và|–|-)\s*\d+[a-z]?)*)/g;
  let m, any = false;
  while ((m = re.exec(head))) {
    any = true;
    const ks = expand(m[2]); ks.forEach(k => khoan.push(k));
    if (m[1]) m[1].replace(/điểm/g, '').split(/\s*(?:,|và)\s*/).filter(Boolean).forEach(d => ks.forEach(k => diem.push(k + ':' + d.trim())));
  }
  if (!any) { const md = head.match(/[đĐ]iểm\s+(.+)$/); if (md) md[1].replace(/điểm/g, '').split(/\s*(?:,|và)\s*/).map(x => x.trim()).filter(Boolean).forEach(d => diem.push(':' + d)); }
  return { diem, khoan, dieu: di ? expand(di.trim()) : [] };
}
function findAliases(seg) {
  const hits = [];
  ALIAS.forEach(([ma, re]) => {
    const g = new RegExp(re.source, 'g'); let m;
    while ((m = g.exec(seg))) {
      if (!hits.some(h => m.index < h.end && m.index + m[0].length > h.start)) hits.push({ ma, start: m.index, end: m.index + m[0].length, text: m[0] });
    }
  });
  return hits.sort((a, b) => a.start - b.start);
}

let UID = 0;
const REG = {};          // id -> danh sách đích
function btn(text, targets, cls) {
  const id = 'L' + (++UID); REG[id] = targets;
  return `<button type="button" class="lawref${cls ? ' ' + cls : ''}" data-law="${id}" title="Bấm để xem nguyên văn điều khoản">${text}</button>`;
}

/* linkify: đầu vào là chuỗi đã escape (có thể chứa thẻ <span class="chip">...); chỉ xử lý phần chữ ngoài thẻ */
function linkify(html, ctxVb, ctxHolder) {
  if (!html) return html;
  const holder = ctxHolder || { vb: ctxVb || '' };
  return String(html).split(/(<[^>]+>)/).map(part => {
    if (part.startsWith('<')) return part;
    const segs = part.split(/(;)/);
    return segs.map((seg, i) => {
      if (seg === ';') return seg;
      // văn bản xuất hiện ở các đoạn sau (vd "Khoản 2 Điều 3; khoản 3 Điều 12 NQ 253/2025")
      holder.ahead = '';
      for (let j = i + 1; j < segs.length && !holder.ahead; j++) { const a = findAliases(segs[j]); if (a.length) holder.ahead = a[0].ma; }
      return linkSeg(seg, holder);
    }).join('');
  }).join('');
}
function linkSeg(seg, holder) {
  const al = findAliases(seg);
  const refs = []; let m; REF.lastIndex = 0;
  while ((m = REF.exec(seg))) refs.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
  if (!al.length && !refs.length) return seg;
  // gán văn bản cho từng dẫn chiếu: bí danh đứng ngay sau (trong vòng 40 ký tự, không có dẫn chiếu khác xen giữa), nếu không thì bí danh đứng trước, nếu không thì ngữ cảnh
  const pieces = [];
  refs.forEach((r, i) => {
    let vb = null;
    const nextAlias = al.find(a => a.start >= r.end);
    const prevAlias = [...al].reverse().find(a => a.end <= r.start);
    if (nextAlias) {
      let between = seg.slice(r.end, nextAlias.start);
      refs.forEach(r2 => { if (r2.start >= r.end && r2.end <= nextAlias.start) between = between.replace(r2.text, ''); });
      if (/^[\s,]*(?:(?:và|của)[\s,]*)*$/.test(between)) vb = nextAlias.ma;
    }
    if (!vb && prevAlias) vb = prevAlias.ma;
    if (!vb && holder.vb) vb = holder.vb;
    if (!vb && nextAlias) vb = nextAlias.ma;
    if (!vb && holder.ahead) vb = holder.ahead;
    if (!vb) return;
    const p = parseRef(r.text);
    pieces.push({ start: r.start, end: r.end, html: btn(r.text, p.dieu.map((d, k) => ({ vb, dieu: d, khoan: k === 0 ? p.khoan : [], diem: k === 0 ? p.diem : [] }))) });
  });
  al.forEach(a => {
    // bí danh đứng một mình (không có Điều đi kèm ngay trước) -> nút mở thông tin văn bản
    const attached = refs.some(r => r.end <= a.start && a.start - r.end < 3);
    pieces.push({ start: a.start, end: a.end, html: attached ? `<span class="lawdoc">${a.text}</span>` : btn(a.text, [{ vb: a.ma }], 'doc') });
  });
  if (al.length) holder.vb = al[al.length - 1].ma;
  pieces.sort((a, b) => a.start - b.start);
  let out = '', pos = 0;
  pieces.forEach(pc => { if (pc.start < pos) return; out += seg.slice(pos, pc.start) + pc.html; pos = pc.end; });
  return out + seg.slice(pos);
}

/* ---------- dữ liệu nguyên văn (tải lười) ---------- */
let loading = null;
function loadData() {
  if (window.DIEU_KHOAN) return Promise.resolve(window.DIEU_KHOAN);
  if (loading) return loading;
  loading = new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = 'data/dieu_khoan.js'; s.onload = () => window.DIEU_KHOAN ? ok(window.DIEU_KHOAN) : fail(new Error('Tệp không có dữ liệu'));
    s.onerror = () => { loading = null; fail(new Error('Không tải được data/dieu_khoan.js')); };
    document.head.appendChild(s);
  });
  return loading;
}
const vbMeta = id => ((window.APP_DATA && window.APP_DATA.van_ban) || []).find(v => v.ma_vb === id) || null;
const fmtD = d => d ? d.split('-').reverse().join('/') : '';
const vbName = id => { const v = vbMeta(id); return v ? `${v.loai || ''} ${v.so_ky_hieu}`.trim() : id; };

/* ---------- cửa sổ hiển thị ---------- */
let stack = [];
function ensureModal() {
  let m = document.getElementById('lawModal');
  if (m) return m;
  m = document.createElement('div');
  m.id = 'lawModal'; m.className = 'lawmodal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-labelledby', 'lawTitle');
  m.innerHTML = `<div class="lawbox"><header><button type="button" class="btn sm" id="lawBack" aria-label="Quay lại">← Quay lại</button><div class="lawhead"><span id="lawSub"></span><h2 id="lawTitle">Nguyên văn điều khoản</h2></div><button type="button" class="x" id="lawClose" aria-label="Đóng">✕</button></header><div class="lawbody" id="lawBody" tabindex="-1"></div></div>`;
  document.body.appendChild(m);
  m.addEventListener('click', e => { if (e.target === m) close(); });
  m.querySelector('#lawClose').onclick = close;
  m.querySelector('#lawBack').onclick = () => { stack.pop(); const t = stack.pop(); if (t) open(t); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && m.classList.contains('on')) { e.stopPropagation(); close(); } }, true);
  return m;
}
function close() { const m = document.getElementById('lawModal'); if (m) m.classList.remove('on'); stack = []; }

function markParas(paras, khoan, diem, vbCtx) {
  let curK = null;
  const hasK = paras.some(p => /^\d{1,2}\.\s/.test(p));
  const kWithD = new Set(diem.map(x => x.split(':')[0]));
  return paras.map(p => {
    const mk = p.match(/^(\d{1,2})\.\s/); if (mk) curK = mk[1];
    const md = p.match(/^[“"]?([a-zđ])\)\s/);
    const inK = khoan.length > 0 && curK && khoan.includes(curK);
    const hitD = md && (diem.includes((curK || '') + ':' + md[1]) || diem.includes(':' + md[1]) && (!hasK || inK || !khoan.length));
    const hit = hitD || (inK && !kWithD.has(curK));
    const cls = (md ? 'pt' : '') + (hit ? ' hl' : (inK ? ' hlk' : ''));
    return `<p class="${cls.trim()}"${hit ? ' data-hit="1"' : ''}>${linkify(esc(p), vbCtx)}</p>`;
  }).join('');
}
function articleHtml(D, t) {
  const doc = D.vb[t.vb], a = doc && doc.dieu[t.dieu];
  const where = [t.diem && t.diem.length ? 'điểm ' + t.diem.map(x => x.split(':')[1] + (x.split(':')[0] ? ' (khoản ' + x.split(':')[0] + ')' : '')).join(', ') : '', t.khoan && t.khoan.length ? 'khoản ' + [...new Set(t.khoan)].join(', ') : ''].filter(Boolean).join('; ');
  if (!a) {
    return `<section class="lawart miss"><h3>Điều ${esc(t.dieu)} – ${esc(vbName(t.vb))}</h3><div class="alert">Chưa có nguyên văn điều khoản này trong bộ tài liệu đã đối chiếu. <span class="chip c-warn">CẦN XÁC MINH</span> Tra cứu tại nguồn chính thức (Công báo, Cơ sở dữ liệu quốc gia về pháp luật) trước khi trích dẫn.</div></section>`;
  }
  const am = (doc.sua_doi || {})[t.dieu] || [];
  const amHtml = am.length ? `<div class="lawamend"><b>Điều này đã được sửa đổi, bổ sung hoặc bãi bỏ một phần</b> bởi ${esc(vbName(am[0].boi))}. Nội dung bên dưới là nguyên văn khi ban hành; áp dụng theo nội dung sửa đổi:
      ${am.map(x => `<div class="amitem"><div class="amhead">${btn('khoản ' + x.k + ' Điều ' + x.dieu_boi + ' ' + esc(vbName(x.boi)), [{ vb: x.boi, dieu: x.dieu_boi, khoan: [x.k], diem: [] }])}: ${esc(x.tom_tat)}</div>${x.noi_dung.map(p => `<p>${linkify(esc(p), t.vb)}</p>`).join('')}</div>`).join('')}</div>` : '';
  const note = where ? `<div class="lawwhere">Phần được dẫn chiếu: <b>${esc(where)}</b> (tô vàng)</div>` : '';
  return `<section class="lawart"><h3>Điều ${esc(t.dieu)}. ${esc(a.t)}</h3>${a.c ? `<div class="lawchap">${esc(a.c)}</div>` : ''}${note}${amHtml}${markParas(a.p, t.khoan || [], t.diem || [], t.vb)}</section>`;
}
function docInfo(D, id) {
  const v = vbMeta(id), d = D && D.vb[id];
  const link = v && v.lien_ket_chinh_thuc ? `<a href="${esc(v.lien_ket_chinh_thuc)}" target="_blank" rel="noopener">Nguồn chính thức</a>` : '<span class="chip c-warn">Chưa có liên kết nguồn chính thức</span>';
  const q = d ? (d.chat_luong === 'ocr_da_soat' ? '<span class="chip c-warn">Nguyên văn từ bản scan (OCR), đã soát với ảnh trang</span>' : '<span class="chip c-ok">Nguyên văn từ văn bản số</span>') : '<span class="chip c-warn">Chưa có nguyên văn trong bộ tài liệu</span>';
  return `<div class="lawdocinfo">${v ? `<div><b>${esc(v.so_ky_hieu)}</b> – ${esc(v.ten_van_ban)}</div><div class="meta">${esc(v.co_quan_ban_hanh)} · Ban hành: ${fmtD(v.ngay_ban_hanh) || 'CẦN XÁC MINH'} · Hiệu lực: ${fmtD(v.ngay_hieu_luc) || 'CẦN XÁC MINH'} · <b>${esc(v.tinh_trang_hieu_luc)}</b></div>` : `<div><b>${esc(id)}</b></div>`}
    <div class="meta">${q} ${d ? 'Nguồn: ' + esc(d.nguon) : ''} · ${link}</div>${d && d.ghi_chu ? `<div class="meta">${esc(d.ghi_chu)}</div>` : ''}</div>`;
}
function open(targets) {
  const m = ensureModal(), body = m.querySelector('#lawBody');
  stack.push(targets);
  m.querySelector('#lawBack').style.visibility = stack.length > 1 ? 'visible' : 'hidden';
  m.classList.add('on');
  body.innerHTML = '<p class="ro">Đang tải nguyên văn điều khoản…</p>';
  const first = targets[0];
  m.querySelector('#lawSub').textContent = vbName(first.vb);
  m.querySelector('#lawTitle').textContent = first.dieu ? targets.map(t => 'Điều ' + t.dieu).join(', ') + ' – ' + vbName(first.vb) : vbName(first.vb);
  loadData().then(D => {
    const groups = {};
    targets.forEach(t => (groups[t.vb] = groups[t.vb] || []).push(t));
    body.innerHTML = Object.keys(groups).map(id => docInfo(D, id) + groups[id].map(t => t.dieu ? articleHtml(D, t) : docArticles(D, id)).join('')).join('');
    const hit = body.querySelector('[data-hit]');
    body.scrollTop = 0;
    if (hit) setTimeout(() => { body.scrollTop = Math.max(0, hit.offsetTop - body.offsetTop - 90); }, 30);
    m.querySelector('#lawClose').focus();
  }).catch(err => {
    body.innerHTML = docInfo(null, first.vb) + `<div class="alert red">${esc(err.message)}. Kiểm tra tệp data/dieu_khoan.js đã được tải lên cùng website.</div>`;
  });
}
function docArticles(D, id) {
  const d = D.vb[id];
  if (!d) return '<div class="alert">Bộ tài liệu chưa có nguyên văn văn bản này. <span class="chip c-warn">CẦN XÁC MINH</span></div>';
  return `<h4 style="margin-top:14px">Danh mục điều có nguyên văn (${d.thu_tu.length})</h4><ul class="lawlist">${d.thu_tu.map(n => `<li>${btn('Điều ' + esc(n) + '. ' + esc(d.dieu[n].t), [{ vb: id, dieu: n, khoan: [], diem: [] }], 'row')}${(d.sua_doi || {})[n] ? ' <span class="chip c-warn">đã sửa đổi</span>' : ''}</li>`).join('')}</ul>`;
}

/* bắt sự kiện ở pha capture để không mở nhầm khung chi tiết của dòng chứa nút */
document.addEventListener('click', e => {
  const d = e.target.closest('[data-lawdoc]');
  if (d) { e.preventDefault(); e.stopPropagation(); stack = []; open([{ vb: d.dataset.lawdoc }]); return; }
  const b = e.target.closest('[data-law]'); if (!b) return;
  e.preventDefault(); e.stopPropagation();
  const t = REG[b.dataset.law]; if (t && t.length) open(t);
}, true);
document.addEventListener('keydown', e => {
  const b = e.target.closest && e.target.closest('[data-law],[data-lawdoc]');
  if (b && (e.key === 'Enter' || e.key === ' ')) e.stopPropagation();
}, true);

/* xử lý các nhãn .ref tĩnh trong index.html: ngữ cảnh văn bản lấy từ nhãn trước trong cùng đoạn */
function linkStatic(root) {
  const seen = new Map();
  (root || document).querySelectorAll('.ref').forEach(el => {
    if (el.dataset.linked) return;
    const par = el.closest('p,td,li,article,div') || document.body;
    if (!seen.has(par)) seen.set(par, { vb: '' });
    el.innerHTML = linkify(el.innerHTML, '', seen.get(par));
    el.dataset.linked = '1';
  });
}

window.LEGAL = { linkify, open, linkStatic, parseRef, loadData, _reg: REG };
})();
