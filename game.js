const gameContainer = document.querySelector('.game-container');
const bucket = document.querySelector('.bucket');
const score = document.querySelector('.score');
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');

let dropletInterval;
let gameScore = 0;
let gameStarted = false;

function startGame() {
  gameStarted = true;
  startBtn.disabled = true;
  dropletInterval = setInterval(() => {
    const newDroplet = document.createElement('div');
    newDroplet.classList.add('droplet');
    newDroplet.style.left = `${Math.floor(Math.random() * (gameContainer.offsetWidth - 20))}px`;
    gameContainer.appendChild(newDroplet);
    animateDroplet(newDroplet);
  }, 2000);
}

function stopGame() {
  gameStarted = false;
  startBtn.disabled = false;
  clearInterval(dropletInterval);
  const droplets = document.querySelectorAll('.droplet');
  droplets.forEach(droplet => droplet.remove());
  gameScore = 0;
  score.textContent = gameScore;
}

function animateDroplet(droplet) {
  const animationDuration = Math.floor(Math.random() * 3000) + 1000;
  const dropletInterval = setInterval(() => {
    if (droplet.offsetTop >= gameContainer.offsetHeight - 50) {
      if (droplet.offsetLeft >= bucket.offsetLeft && droplet.offsetLeft <= bucket.offsetLeft + bucket.offsetWidth) {
        gameScore++;
        score.textContent = gameScore;
      }
      droplet.remove();
      clearInterval(dropletInterval);
    } else {
      droplet.style.top = `${droplet.offsetTop + 1}px`;
    }
  }, 25);
}

document.addEventListener('keydown', (e) => {
  if (gameStarted) {
    if (e.key === 'ArrowLeft') {
      if (bucket.offsetLeft > 0) {
        bucket.style.left = `${bucket.offsetLeft - 10}px`;
      }
    } else if (e.key === 'ArrowRight') {
      if (bucket.offsetLeft < gameContainer.offsetWidth - bucket.offsetWidth) {
        bucket.style.left = `${bucket.offsetLeft + 10}px`;
      }
    }
  }
});

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
