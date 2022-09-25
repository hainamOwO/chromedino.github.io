const dino = document.getElementById("dino");
const sky = document.getElementById("sky");
const ground = document.getElementById("ground");
const gameDis = document.getElementById("gameContainer");
const scoreText = document.getElementById("score");
const gravity = 5;

const jumSound = new Audio();
jumSound.src = "soundeffect/jump.wav";
const pointSound = new Audio();
pointSound.src="soundeffect/point.wav";
const dieSound = new Audio();
dieSound.src="soundeffect/die.wav";
let score = 0;
let speed = 5;
let running = false;

let dinoBottom = 16;


startGame();
generateObs();
window.requestAnimationFrame(physics);
let timeIncrease = setInterval(()=>{
    score+=1;
    scoreText.textContent = score;
  },100);

if (running){
  window.addEventListener("keydown",()=>{
    if ((event.key === "ArrowUp" || event.key === " ") && dinoBottom === 16){
      window.requestAnimationFrame(jump);
      jumSound.play();
    }
  });
}

function physics(){
  if (running){
    if(dinoBottom > 20){
      dinoBottom -= gravity;
      dino.style.bottom = dinoBottom + 'px';
    }
    requestAnimationFrame(physics);
  }
}

function jump(){
  if (running){
  dinoBottom += 10;
  dino.style.bottom = dinoBottom + 'px';
  if (dinoBottom < 100){
    requestAnimationFrame(jump);
  }
  }
}

function startGame(){
  running = true;
}

function generateObs(){
  const obs = document.createElement('div');
  let obsRight = 0;
  let obsBottom = 16;
  if (running){
    obs.classList.add('obs');
  }
  gameDis.appendChild(obs);
  obs.style.right = obsRight + 'px';
  obs.style.bottom = obsBottom + 'px';
  //moving obs

  function moveObs(){
    if (running){
      obsRight += speed;
      obs.style.right = obsRight + 'px';

      if (obsRight > 600){
        clearInterval(timeId);
        gameDis.removeChild(obs);
      }
    }
    speedUp();
    //gameover
    if ((obsRight >= 510 && obsRight<=559) && dinoBottom<19 ){
      gameOver();
    }
  }
  
  let timeId = setInterval(moveObs,20);
  if (running) setTimeout(generateObs, 1500);
}

function speedUp(){
  if (score % 100==0 && score!=0){
    speed += 0.25;
    pointSound.play();
  }
}

function gameOver(){
  running = false;
  clearInterval(timeIncrease);
  document.getElementById('dieAnnounce').style.display = "block";
  
}

function restart(){
  location.reload();
}