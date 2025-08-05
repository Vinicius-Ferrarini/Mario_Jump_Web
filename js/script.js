const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.clouds');
const score = document.querySelector('.score');
const record = document.querySelector('.record');
const restartButton = document.getElementById('restart-btn');

let isJumping = false; 
let gameLoop;

let scoreValue = 0;
let scoreInterval;
// Incrementa a pontuação a cada segundo

const COLLISION_THRESHOLD = 80;
const PIPE_LEFT_LIMIT = 120;
const PIPE_RIGHT_LIMIT = 10;


function endGame(pipePosition, marioPosition , cloudPosition) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = 'img/game-over.png';
    mario.style.width = '70px';
    mario.style.marginLeft = '50px';

    cloud.style.animation = 'none';
    cloud.style.left = `${cloudPosition}px`;

    clearInterval(gameLoop);
    stopScore();
    restartButton.classList.remove('hidden');
}

function startLoop() {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudPosition = cloud.offsetLeft;

        if (pipePosition <= PIPE_LEFT_LIMIT && pipePosition > PIPE_RIGHT_LIMIT && marioPosition < COLLISION_THRESHOLD) {
            endGame(pipePosition, marioPosition , cloudPosition);
        }
    }, 10);
}

function resetGame() {
    // Reset estilos
    pipe.style.animation = '';
    pipe.style.left = '';

    mario.src = 'img/mario.gif';
    mario.style.animation = '';
    mario.style.bottom = '0px';
    mario.style.width = '';
    mario.style.marginLeft = '';

    cloud.style.animation = '';
    cloud.style.left = '';

    restartButton.classList.add('hidden');
    isJumping = false;

    startLoop();
    startScore();
    scoreValue = 0;
}

function startScore() {
    scoreValue = 0;
    score.innerText = `Score: ${scoreValue}`;
    scoreInterval = setInterval(() => {
        scoreValue++;
        score.innerText = `Score: ${scoreValue}`;
        record.innerText = `Record: ${Math.max(scoreValue, parseInt(record.innerText.replace('Record: ', '')) || 0)}`;
    }, 1500); // aumenta a cada segundo
}

function stopScore() {
    clearInterval(scoreInterval);
}

const jump = () => {
    if(isJumping) return; //impede pulo

    isJumping = true;
    mario.classList.add('jump');

    setTimeout(() =>  {
        mario.classList.remove('jump');
        isJumping = false;
    } , 500 );
}

document.addEventListener('keydown', jump);
restartButton.addEventListener('click', resetGame);

// Inicia o loop do jogo
startLoop();
startScore();
