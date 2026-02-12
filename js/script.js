// Scroll to section
function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

// Reveal on scroll
function initReveal(){
  const reveals=document.querySelectorAll(".reveal");
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("active");
      }
    });
  },{threshold:0.2});
  reveals.forEach(r=>observer.observe(r));
}
window.addEventListener('load', initReveal);

// Gallery Modal
let modal = new bootstrap.Modal(document.getElementById('galleryModal'));
function openModal(images){
  const carouselInner = document.getElementById('carouselInner');
  carouselInner.innerHTML = '';
  images.forEach((src,index)=>{
    let div = document.createElement('div');
    div.className = 'carousel-item' + (index===0?' active':'');
    div.innerHTML = `<img src="${src}" class="d-block w-100">`;
    carouselInner.appendChild(div);
  });
  modal.show();
}

// Floating Particles
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');
let w=canvas.width=window.innerWidth;
let h=canvas.height=window.innerHeight;

window.addEventListener('resize',()=>{w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;});

let particles=[];
for(let i=0;i<100;i++){
  particles.push({
    x:Math.random()*w,
    y:Math.random()*h,
    r:Math.random()*2+1,
    dx:(Math.random()-0.5)*0.5,
    dy:(Math.random()-0.5)*0.5
  });
}

function animateParticles(){
  ctx.clearRect(0,0,w,h);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(255,182,193,0.7)';
    ctx.fill();
    p.x+=p.dx;
    p.y+=p.dy;
    if(p.x<0||p.x>w)p.dx*=-1;
    if(p.y<0||p.y>h)p.dy*=-1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Floating Hearts
const heartsCanvas=document.getElementById('hearts');
const hCtx=heartsCanvas.getContext('2d');
heartsCanvas.width=w;
heartsCanvas.height=h;

let hearts=[];
function createHearts(){ for(let i=0;i<50;i++){ hearts.push({x:Math.random()*w, y:Math.random()*h, r:Math.random()*5+3, dy:Math.random()*1+0.2}); } }
createHearts();

function animateHearts(){
  hCtx.clearRect(0,0,w,h);
  hearts.forEach(h=>{
    hCtx.beginPath();
    hCtx.fillStyle='rgba(255,105,180,0.8)';
    hCtx.moveTo(h.x,h.y);
    hCtx.arc(h.x,h.y,h.r,0,Math.PI*2);
    hCtx.fill();
    h.y-=h.dy;
    if(h.y<0) h.y=hCtx.canvas.height;
  });
  requestAnimationFrame(animateHearts);
}
animateHearts();

// Question & Proposal - centered
const questions = [
  { text: "When did you realize we were special?", options: ["That random night talk","Our first trip","I always knew"] },
  { text: "What's your favorite memory together?", options: ["Laughing on our trip","Late-night talks","Surprise gifts"] },
  { text: "Which word describes our relationship best?", options: ["Magical","Unstoppable","Romantic"] }
];

let currentQuestion=0;
function showQuestion(){
  const container=document.getElementById('questionContainer');
  container.innerHTML="";
  if(currentQuestion<questions.length){
    const q=questions[currentQuestion];
    const qElem=document.createElement('p');
    qElem.textContent=q.text;
    container.appendChild(qElem);
    q.options.forEach(opt=>{
      const btn=document.createElement('button');
      btn.className="btn btn-outline-light m-2";
      btn.textContent=opt;
      btn.onclick=()=>{
        currentQuestion++;
        showQuestion();
        container.scrollIntoView({behavior:'smooth'});
        if(currentQuestion>=questions.length){
          document.getElementById('proposalSection').classList.remove('hidden-section');
          document.getElementById('proposalSection').scrollIntoView({behavior:'smooth'});
        }
      };
      container.appendChild(btn);
    });
  }
}
showQuestion();

function moveNo(btn){
  btn.style.transform=`translate(${Math.random()*200-100}px,${Math.random()*100-50}px)`;
}

function sayYes(){
  document.body.innerHTML=`
  <div style="height:100vh;display:flex;justify-content:center;align-items:center;
  flex-direction:column;background:#0d0d14;color:white;text-align:center;">
  <h1 style="font-size:3rem;color:hotpink;text-shadow:0 0 20px pink;">Forever Starts Now 💍</h1>
  <p style="margin-top:20px;font-size:1.2rem;">Domi, I choose you. Every single day.</p>
  </div>`;
}
