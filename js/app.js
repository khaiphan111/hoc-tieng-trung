// ===== APP: điều hướng, tiến độ, phát âm =====
const store = load() || {visited:{}, done:{}, streak:{last:'', count:0}, vocab:{}, quizBest:0, quizDone:false};
function load(){ try{return JSON.parse(localStorage.getItem('zh0'))}catch(e){return null} }
function save(){ localStorage.setItem('zh0', JSON.stringify(store)) }

function speak(text){
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN'; u.rate = 0.8;
    speechSynthesis.speak(u);
  }catch(e){}
}
function spk(t){ return `<button class="speak" onclick="event.stopPropagation();speak('${t}')" title="Nghe phát âm">🔊</button>`; }

function touchStreak(){
  const today = new Date().toISOString().slice(0,10);
  if(store.streak.last === today) return;
  const y = new Date(Date.now()-864e5).toISOString().slice(0,10);
  store.streak.count = (store.streak.last === y) ? store.streak.count+1 : 1;
  store.streak.last = today; save();
}

const NAV = [
  {id:'home', ic:'🏠', t:'Lộ trình'},
  {id:'pinyin', ic:'🔤', t:'Pinyin'},
  {id:'tones', ic:'🎵', t:'Thanh điệu'},
  {id:'strokes', ic:'✍️', t:'Nét chữ'},
  {id:'characters', ic:'🈁', t:'Chữ đầu'},
  {id:'vocab', ic:'🃏', t:'Từ vựng'},
  {id:'sentences', ic:'💬', t:'Mẫu câu'},
  {id:'quiz', ic:'📝', t:'Quiz'},
  {id:'progress', ic:'📊', t:'Tiến độ'},
];

function show(id){
  document.querySelectorAll('main section').forEach(s=>s.classList.remove('on'));
  document.getElementById('sec-'+id).classList.add('on');
  document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on', b.dataset.id===id));
  if(id!=='home' && id!=='progress'){ store.visited[id]=true; touchStreak(); save(); }
  window.scrollTo(0,0);
  if(id==='home') renderHome();
  if(id==='progress') renderProgress();
  if(id==='vocab') FC.render();
  if(id==='quiz') QZ.render();
}

function markDone(id, name){
  store.done[id]=true; touchStreak(); save();
  alert('🎉 Xong chặng "'+name+'"! Về Lộ trình xem tiến độ nhé.');
  show('home');
}
function doneBtn(id, name){
  return store.done[id]
    ? `<p class="done-tag">✅ Đã hoàn thành chặng này</p>`
    : `<button class="btn gold" onclick="markDone('${id}','${name}')">✅ Tôi đã học xong chặng này</button>`;
}

// ---- Render các section tĩnh ----
function renderPinyin(){
  const el = document.getElementById('sec-pinyin');
  el.innerHTML = `<h2 class="sec">🔤 Pinyin — chìa khóa đọc tiếng Trung</h2>
  <div class="card"><p><b>Pinyin</b> là cách viết âm tiếng Trung bằng chữ Latin. Mỗi âm tiết gồm <b>thanh mẫu</b> (phụ âm đầu) + <b>vận mẫu</b> (vần) + <b>thanh điệu</b>. Học thuộc bảng này là đọc được mọi chữ có pinyin.</p>
  <div class="tip">Bấm 🔊 để nghe từng âm, đọc theo nhiều lần cho quen miệng.</div></div>
  <div class="card"><h3>Thanh mẫu (phụ âm đầu) — ${INITIALS.length} âm</h3>
  <table class="grid"><tr><th>Âm</th><th>Cách đọc</th><th>Ví dụ</th><th></th></tr>
  ${INITIALS.map(i=>`<tr><td><b>${i.p}</b></td><td>${i.vi}</td><td>${i.ex} <span class="pinyin">${i.exP}</span> (${i.exVi})</td><td>${spk(i.ex)}</td></tr>`).join('')}
  </table></div>
  <div class="card"><h3>Vận mẫu (vần) — ${FINALS.length} vần phổ biến</h3>
  <table class="grid"><tr><th>Vần</th><th>Cách đọc</th><th>Ví dụ</th><th></th></tr>
  ${FINALS.map(i=>`<tr><td><b>${i.p}</b></td><td>${i.vi}</td><td>${i.ex} <span class="pinyin">${i.exP}</span> (${i.exVi})</td><td>${spk(i.ex)}</td></tr>`).join('')}
  </table></div>
  <div class="card"><h3>📌 Quy tắc viết tắt cần nhớ</h3>
  ${PINYIN_RULES.map(r=>`<div class="tip">${r}</div>`).join('')}
  ${doneBtn('pinyin','Pinyin')}</div>`;
}

function renderTones(){
  const el = document.getElementById('sec-tones');
  el.innerHTML = `<h2 class="sec">🎵 Thanh điệu — linh hồn của tiếng Trung</h2>
  <div class="card"><p>Tiếng Trung có <b>4 thanh + 1 thanh nhẹ</b>. Cùng một âm "ma" nhưng khác thanh là khác nghĩa hoàn toàn — đọc sai thanh là người ta không hiểu.</p></div>
  <div class="card"><h3>5 thanh điệu với chữ "ma"</h3>
  <table class="grid"><tr><th>Thanh</th><th>Ký hiệu</th><th>Ví dụ</th><th>Nghĩa</th><th></th></tr>
  ${TONES.map(t=>`<tr><td>${t.name}</td><td style="font-size:1.4rem"><b>${t.mark}</b></td><td><span class="hanzi" style="font-size:1.6rem">${t.hanzi}</span> <span class="pinyin">${t.ex}</span></td><td>${t.vi}<br><small class="mean">${t.desc}</small></td><td>${spk(t.hanzi)}</td></tr>`).join('')}
  </table></div>
  <div class="card"><h3>🎮 Game luyện nghe thanh điệu</h3>
  <p>Bấm "Phát âm", nghe kỹ rồi chọn đúng thanh. Làm 5 câu liên tiếp nhé.</p>
  <div id="toneGame"></div></div>
  <div class="card"><h3>📌 Quy tắc biến điệu</h3>
  ${TONE_CHANGE_RULES.map(r=>`<div class="tip"><b>${r.t}</b><br>${r.d}</div>`).join('')}
  ${doneBtn('tones','Thanh điệu')}</div>`;
  TG.start();
}

// Game luyện thanh điệu
const TG = {
  score:0, round:0, cur:null,
  start(){ this.score=0; this.round=0; this.next(); },
  next(){
    const box = document.getElementById('toneGame');
    if(this.round>=5){
      box.innerHTML = `<p style="font-size:1.2rem">🏁 Xong! Đúng <b>${this.score}/5</b> câu.</p>
      <button class="btn" onclick="TG.start()">Chơi lại</button>`;
      return;
    }
    this.cur = TONES[Math.floor(Math.random()*5)];
    box.innerHTML = `<p>Câu ${this.round+1}/5:</p>
      <button class="btn big" onclick="speak('${this.cur.hanzi}')">🔊 Phát âm</button>
      <div style="margin-top:10px">${TONES.map(t=>`<button class="btn ghost" onclick="TG.pick(${t.n})">${t.name}</button>`).join('')}</div>
      <p id="tgMsg" style="margin-top:8px;font-weight:700"></p>`;
    setTimeout(()=>speak(this.cur.hanzi), 400);
  },
  pick(n){
    const msg = document.getElementById('tgMsg');
    this.round++;
    if(n===this.cur.n){ this.score++; msg.innerHTML='✅ Đúng! Là '+this.cur.name; msg.style.color='#27ae60'; }
    else { msg.innerHTML='❌ Sai rồi. Đáp án: '+this.cur.name+' ('+this.cur.ex+' - '+this.cur.vi+')'; msg.style.color='#e74c3c'; }
    setTimeout(()=>this.next(), 1600);
  }
};

function renderStrokes(){
  const el = document.getElementById('sec-strokes');
  el.innerHTML = `<h2 class="sec">✍️ Nét chữ — 8 nét tạo nên mọi chữ Hán</h2>
  <div class="card"><p>Mọi chữ Hán phức tạp đều ghép từ 8 nét cơ bản. Nắm được nét + thứ tự viết là viết được chữ đẹp, nhớ lâu.</p></div>
  <div class="card"><h3>8 nét cơ bản</h3>
  <div class="char-grid">${STROKES.map(s=>`
    <div class="char-box">
      <svg class="stroke-svg" viewBox="0 0 100 100">${s.svg}</svg>
      <div class="py">${s.p}</div><div class="hz" style="font-size:1.4rem">${s.h}</div>
      <div class="vn">${s.vi}</div><small class="mean">${s.desc}</small>
    </div>`).join('')}</div></div>
  <div class="card"><h3>📌 7 quy tắc thứ tự nét</h3>
  ${STROKE_ORDER_RULES.map((r,i)=>`<div class="tip"><b>${i+1}. ${r.t}</b><br>${r.ex}</div>`).join('')}
  ${doneBtn('strokes','Nét chữ')}</div>`;
}

function renderChars(){
  const el = document.getElementById('sec-characters');
  const box = c => `<div class="char-box"><div class="hz">${c.h}</div><div class="py">${c.p}</div><div class="vn">${c.vi}</div><small class="mean">${c.nets} nét</small><br>${spk(c.h)}</div>`;
  el.innerHTML = `<h2 class="sec">🈁 Chữ Hán đầu tiên</h2>
  <div class="card"><h3>Số đếm 1–10 (học thuộc lòng nhé)</h3>
  <div class="char-grid">${NUMBERS.map(box).join('')}</div>
  <div class="tip">Mẹo nhớ: 一 là 1 gạch, 二 là 2 gạch, 三 là 3 gạch. Từ 四 trở đi phải học thuộc.</div></div>
  <div class="card"><h3>8 chữ tượng hình (nhìn hình đoán nghĩa)</h3>
  <div class="char-grid">${PICTOGRAPHS.map(c=>`<div class="char-box"><div class="hz">${c.h}</div><div class="py">${c.p}</div><div class="vn">${c.vi}</div><small class="mean">${c.nets} nét · ${c.note}</small><br>${spk(c.h)}</div>`).join('')}</div></div>
  <div class="card">${doneBtn('characters','Chữ đầu tiên')}</div>`;
}

function renderSentences(){
  const el = document.getElementById('sec-sentences');
  el.innerHTML = `<h2 class="sec">💬 10 mẫu câu giao tiếp cơ bản</h2>
  <div class="card"><p>Học thuộc 10 câu này là chào hỏi, giới thiệu bản thân được rồi. Bấm 🔊 nghe rồi đọc theo.</p></div>
  ${SENTENCES.map((s,i)=>`<div class="card"><b>${i+1}.</b> <span class="hanzi" style="font-size:1.8rem">${s.h}</span>${spk(s.h)}<br><span class="pinyin">${s.p}</span><br><span class="mean">${s.vi}</span></div>`).join('')}
  <div class="card">${doneBtn('sentences','Mẫu câu')}</div>`;
}

function renderHome(){
  const el = document.getElementById('sec-home');
  const pct = id => store.done[id] ? 100 : (store.visited[id] ? 40 : 0);
  const total = STAGES.filter(s=>store.done[s.id]).length;
  const first = STAGES.find(s=>!store.done[s.id]);
  el.innerHTML = `<h2 class="sec">🗺️ Lộ trình học từ số 0</h2>
  <div class="card"><p>Học theo thứ tự từ trên xuống. Mỗi chặng xong bấm <b>"Tôi đã học xong"</b> để ghi nhận.</p>
  <div class="stat" style="margin-top:10px"><div><b>${total}/7</b><span>chặng xong</span></div><div><b>${store.streak.count}🔥</b><span>ngày liên tiếp</span></div><div><b>${Object.keys(store.vocab).length}</b><span>từ đã gặp</span></div></div>
  ${first?`<div style="text-align:center;margin-top:12px"><button class="btn big" onclick="show('${first.id}')">▶️ Học tiếp: ${first.icon} ${first.name}</button></div>`:''}</div>
  ${STAGES.map(s=>`<div class="card stage" onclick="show('${s.id}')" style="cursor:pointer">
    <div class="num">${store.done[s.id]?'✓':s.n}</div>
    <div style="flex:1"><b>${s.icon} ${s.name}</b><br><small class="mean">${s.desc}</small>
    <div class="bar"><i style="width:${pct(s.id)}%"></i></div></div>
  </div>`).join('')}`;
}

function renderProgress(){
  const el = document.getElementById('sec-progress');
  const learned = Object.entries(store.vocab).filter(([k,v])=>v.seen>0 && v.interval>0).length;
  const due = Object.entries(store.vocab).filter(([k,v])=>v.due<=Date.now()).length;
  el.innerHTML = `<h2 class="sec">📊 Tiến độ của bạn</h2>
  <div class="card"><div class="stat">
    <div><b>${store.streak.count}🔥</b><span>ngày liên tiếp</span></div>
    <div><b>${Object.keys(store.vocab).length}</b><span>từ đã gặp</span></div>
    <div><b>${learned}</b><span>từ đã thuộc</span></div>
    <div><b>${due}</b><span>từ cần ôn</span></div>
  </div></div>
  <div class="card"><h3>7 chặng</h3>
  ${STAGES.map(s=>`<p>${store.done[s.id]?'✅':'⬜'} ${s.icon} ${s.name}</p>`).join('')}
  <p style="margin-top:8px">📝 Quiz: ${store.quizDone?('điểm cao nhất <b>'+store.quizBest+'/10</b>'):'chưa làm'}</p></div>
  <div class="card"><h3>⚠️ Xóa dữ liệu</h3><p class="mean">Xóa toàn bộ tiến trình học trên máy này.</p>
  <button class="btn ghost" onclick="if(confirm('Chắc chắn xóa hết?')){localStorage.removeItem('zh0');location.reload()}">Xóa tiến trình</button></div>`;
}

// ---- Khởi động ----
document.addEventListener('DOMContentLoaded', ()=>{
  const nav = document.getElementById('mainnav');
  nav.innerHTML = NAV.map(n=>`<button data-id="${n.id}" onclick="show('${n.id}')"><span class="ic">${n.ic}</span>${n.t}</button>`).join('');
  renderPinyin(); renderStrokes(); renderChars(); renderSentences();
  show('home');
});
