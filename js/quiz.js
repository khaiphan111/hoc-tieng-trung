// ===== QUIZ TỔNG HỢP =====
const QZ = {
  qs:[], idx:0, score:0,
  render(){
    const el = document.getElementById('sec-quiz');
    el.innerHTML = `<h2 class="sec">📝 Kiểm tra tổng hợp</h2>
    <div class="card"><p>10 câu hỏi ngẫu nhiên: chọn nghĩa, chọn pinyin, nghe chọn chữ.</p>
    <p>Điểm cao nhất: <b>${store.quizBest}/10</b></p>
    <div style="text-align:center;margin-top:10px"><button class="btn big" onclick="QZ.start()">▶️ Làm bài</button></div></div>
    <div class="card">${doneBtn('quiz','Kiểm tra')}</div>`;
  },
  pick(arr,n){ const a=[...arr]; const r=[]; while(r.length<n&&a.length) r.push(a.splice(Math.floor(Math.random()*a.length),1)[0]); return r; },
  start(){
    const words = this.pick(VOCAB, 10);
    this.qs = words.map((w,i)=>{
      const type = i%3;
      if(type===0){ // hanzi -> nghĩa
        const opts = this.pick(VOCAB.filter(x=>x.h!==w.h),3).map(x=>x.vi); opts.push(w.vi);
        return {q:`"${w.h}" nghĩa là gì?`, opts:this.pick(opts,4), ans:w.vi, audio:null};
      } else if(type===1){ // pinyin -> hanzi
        const opts = this.pick(VOCAB.filter(x=>x.h!==w.h),3).map(x=>x.h); opts.push(w.h);
        return {q:`Pinyin "${w.p}" là chữ nào?`, opts:this.pick(opts,4), ans:w.h, audio:null};
      } else { // nghe -> hanzi
        const opts = this.pick(VOCAB.filter(x=>x.h!==w.h),3).map(x=>x.h); opts.push(w.h);
        return {q:`Nghe và chọn chữ đúng:`, opts:this.pick(opts,4), ans:w.h, audio:w.h};
      }
    });
    this.idx=0; this.score=0; this.showQ();
  },
  showQ(){
    const el = document.getElementById('sec-quiz');
    const q = this.qs[this.idx];
    el.innerHTML = `<h2 class="sec">📝 Câu ${this.idx+1}/10</h2>
    <div class="card"><p style="font-size:1.15rem"><b>${q.q}</b></p>
    ${q.audio?`<div style="margin:10px 0"><button class="btn big" onclick="speak('${q.audio}')">🔊 Nghe</button></div>`:''}
    <div id="qopts">${q.opts.map(o=>`<button class="quiz-opt" onclick="QZ.pickOpt(this,'${o.replace(/'/g,"\\'")}')">${o}</button>`).join('')}</div>
    <p id="qmsg" style="font-weight:700;margin-top:8px"></p></div>`;
    if(q.audio) setTimeout(()=>speak(q.audio), 500);
  },
  pickOpt(btn, val){
    const q = this.qs[this.idx];
    const btns = document.querySelectorAll('#qopts .quiz-opt');
    btns.forEach(b=>{ b.disabled=true; if(b.textContent===q.ans) b.classList.add('right'); });
    const msg = document.getElementById('qmsg');
    if(val===q.ans){ this.score++; msg.innerHTML='✅ Đúng!'; msg.style.color='#27ae60'; }
    else { btn.classList.add('wrong'); msg.innerHTML='❌ Sai. Đáp án: '+q.ans; msg.style.color='#e74c3c'; }
    this.idx++;
    setTimeout(()=>{
      if(this.idx>=this.qs.length) this.finish();
      else this.showQ();
    }, 1500);
  },
  finish(){
    const el = document.getElementById('sec-quiz');
    store.quizDone = true;
    if(this.score>store.quizBest) store.quizBest = this.score;
    touchStreak(); save();
    const msg = this.score>=8?'🏆 Xuất sắc!':this.score>=5?'👍 Khá tốt, ôn thêm nhé!':'💪 Cố gắng thêm, ôn lại từ vựng nhé!';
    el.innerHTML = `<h2 class="sec">📝 Kết quả</h2>
    <div class="card" style="text-align:center"><p style="font-size:2rem">${this.score}/10</p><p>${msg}</p>
    <p class="mean">Điểm cao nhất: ${store.quizBest}/10</p>
    <button class="btn" onclick="QZ.start()">Làm lại</button>
    <button class="btn ghost" onclick="show('home')">Về lộ trình</button></div>`;
  }
};
