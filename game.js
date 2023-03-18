// Get game elements
const gameContainer = document.querySelector('.game-container');
const bucket = document.querySelector('.bucket');
const score = document.querySelector('.score');
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');

// Initialize game variables
let dropletInterval;
let gameScore = 0;
let gameStarted = false;

// Start game
function startGame() {
  // Set gameStarted flag
  gameStarted = true;
  // Disable start button
  startBtn.disabled = true;
  // Set droplet interval
  dropletInterval = setInterval(() => {
    // Create new droplet
    const newDroplet = document.createElement('div');
    newDroplet.classList.add('droplet');
    newDroplet.style.left = `${Math.floor(Math.random() * (gameContainer.offsetWidth - 20))}px`;
    gameContainer.appendChild(newDroplet);
    // Animate droplet
    animateDroplet(newDroplet);
  }, 1500);
}

// Stop game
function stopGame() {
  // Set gameStarted flag
  gameStarted = false;
  // Enable start button
  startBtn.disabled = false;
  // Clear droplet interval
  clearInterval(dropletInterval);
  // Remove all droplets
  const droplets = document.querySelectorAll('.droplet');
  droplets.forEach(droplet => droplet.remove());
  // Reset score
  gameScore = 0;
  score.textContent = gameScore;
}

// Animate droplet
function animateDroplet(droplet) {
  const animationDuration = Math.floor(Math.random() * 3000) + 1000;
  const dropletInterval = setInterval(() => {
    if (droplet.offsetTop >= gameContainer.offsetHeight - 50) {
      // Check if droplet caught by bucket
      if (droplet.offsetLeft >= bucket.offsetLeft && droplet.offsetLeft <= bucket.offsetLeft + bucket.offsetWidth) {
        gameScore++;
        score.textContent = gameScore;
      }
      droplet.remove();
      clearInterval(dropletInterval);
    } else {
      droplet.style.top = `${droplet.offsetTop + 1}px`;
    }
  }, 10);
}

// Move bucket
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

// Add event listeners to buttons
startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
