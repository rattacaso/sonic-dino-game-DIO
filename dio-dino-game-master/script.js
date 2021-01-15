const sonic = document.querySelector('.sonic');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          sonic.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      sonic.style.bottom = position + 'px';
    }
  }, 20);
}

function createBug() {
  const bug = document.createElement('div');
  let bugPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  bug.classList.add('bug');
  background.appendChild(bug);
  bug.style.left = bugPosition + 'px';

  let leftTimer = setInterval(() => {
    if (bugPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(bug);
    } else if (bugPosition > 0 && bugPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = "<img src='Game_Over.png' width=100% height=auto>";
      
    } else {
      bugPosition -= 10;
      bug.style.left = bugPosition + 'px';
    }
  }, 20);

  setTimeout(createBug, randomTime);
}

createBug();
document.addEventListener('keyup', handleKeyUp);
