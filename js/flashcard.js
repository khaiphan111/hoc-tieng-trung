// ===== FLASHCARD SRS (lặp lại ngắt quãng, kiểu SM-2 đơn giản) =====
const FC = {
  queue:[], idx:0, flipped:false,
  get(id){ return store.vocab[id] || {interval:0, ease:2.5, due:0, seen:0}; },
  render(){
    const el = document.getElementById('sec-vocab');
    const now = Date.now();
    const due = VOCAB.filter(w=>{const c=this.get(w.h); return c.seen>0 && c.due<=now;});
    const fresh = VOCAB.filter(w=>this.get(w.h).seen===0);
    el.innerHTML = `<h2 class="sec">🃏 Từ vựng — flashcard nhắc ôn thông minh</h2>
    <div class="card"><p>Hệ thống tự chọn từ <b>đến hạn ôn</b> + từ mới. Lật thẻ rồi tự chấm: <b>Quên</b> (ôn lại ngay), <b>Còn khó</b> (ôn sớm), <b>Dễ</b> (lâu mới ôn lại).</p>
    <div class="stat" style="margin-top:8px"><div><b>${due.length}</b><span>cần ôn</span></div><div><b>${fresh.length}</b><span>từ mới</span></div><div><b>${VOCAB.length}</b><span>tổng từ</span></div></div>
    <div style="text-align:center;margin-top:10px"><button class="btn big" onclick="FC.start()">▶️ Bắt đầu ôn (${Math.min(20, due.length+Math.min(10,fresh.length))} thẻ)</button></div></div>
    <div class="card"><h3>📖 Tra từ nhanh</h3>
    <input id="vsearch" placeholder="Gõ chữ Hán hoặc nghĩa..." oninput="FC.search(this.value)" style="width:100%;padding:10px;border:1.5px solid var(--line);border-radius:10px;font-size:1rem">
    <div id="vlist" style="margin-top:10px"></div></div>
    <div class="card">${doneBtn('vocab','Từ vựng')}</div>`;
    this.search('');
  },
  search(q){
    q = q.trim().toLowerCase();
    const list = VOCAB.filter(w=>!q || w.h.includes(q) || w.vi.toLowerCase().includes(q) || w.p.includes(q)).slice(0,30);
    document.getElementById('vlist').innerHTML = list.map(w=>`
      <div style="border-bottom:1px solid var(--line);padding:8px 0">
        <span class="hanzi" style="font-size:1.5rem">${w.h}</span>${spk(w.h)}
        <span class="pinyin">${w.p}</span> — ${w.vi}<br>
        <small class="mean">${w.ex} (${w.exP}) — ${w.exVi}</small>
      </div>`).join('') || '<p class="mean">Không tìm thấy.</p>';
  },
  start(){
    const now = Date.now();
    const due = VOCAB.filter(w=>{const c=this.get(w.h); return c.seen>0 && c.due<=now;});
    const fresh = VOCAB.filter(w=>this.get(w.h).seen===0).slice(0,10);
    this.queue = [...due, ...fresh].slice(0,20);
    if(!this.queue.length){ alert('🎉 Không còn thẻ nào cần ôn!'); return; }
    this.idx = 0; this.showCard();
  },
  showCard(){
    const el = document.getElementById('sec-vocab');
    const w = this.queue[this.idx];
    const left = this.queue.length - this.idx;
    el.innerHTML = `<h2 class="sec">🃏 Ôn từ (${this.idx+1}/${this.queue.length})</h2>
    <div id="flash"><div class="inner" onclick="FC.flipIt()">
      <div class="face"><div class="f-hanzi">${w.h}</div><p class="mean">Bấm để lật thẻ</p><div style="margin-top:8px">${spk(w.h)}</div></div>
      <div class="face back"><div class="f-pinyin">${w.p}</div><div class="f-vi"><b>${w.vi}</b></div>
      <div class="f-ex">${w.ex}<br><span class="pinyin" style="font-size:.9rem">${w.exP}</span><br>${w.exVi}</div></div>
    </div></div>
    <div id="fgrades" style="display:none" class="grades">
      <button class="g0" onclick="FC.grade(0)">😵 Quên</button>
      <button class="g3" onclick="FC.grade(3)">🤔 Còn khó</button>
      <button class="g5" onclick="FC.grade(5)">😎 Dễ</button>
    </div>
    <div style="text-align:center;margin-top:10px"><button class="btn ghost" onclick="FC.render()">Dừng</button></div>`;
    this.flipped = false;
  },
  flipIt(){
    document.getElementById('flash').classList.add('flip');
    document.getElementById('fgrades').style.display='flex';
    this.flipped = true;
    const w = this.queue[this.idx]; speak(w.h);
  },
  grade(q){
    const w = this.queue[this.idx];
    let c = this.get(w.h);
    c.seen++;
    if(q===0){ c.interval=0; c.ease=Math.max(1.3,c.ease-0.2); c.due=Date.now(); }
    else{
      if(q===3) c.ease=Math.max(1.3,c.ease-0.15);
      c.interval = c.interval===0 ? 1 : Math.round(c.interval*c.ease);
      c.due = Date.now()+c.interval*864e5;
    }
    store.vocab[w.h]=c; touchStreak(); save();
    this.idx++;
    if(this.idx>=this.queue.length){
      document.getElementById('sec-vocab').innerHTML = `<h2 class="sec">🎉 Xong phiên ôn!</h2>
      <div class="card" style="text-align:center"><p style="font-size:1.2rem">Đã ôn <b>${this.queue.length}</b> thẻ. Giỏi lắm!</p>
      <button class="btn" onclick="FC.render()">Về từ vựng</button>
      <button class="btn ghost" onclick="show('home')">Về lộ trình</button></div>`;
    } else this.showCard();
  }
};
