const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartButton = document.getElementById('restart-btn');

let isJumping = false; 

const jump = () => {
    if(isJumping) return; //impede pulo

    isJumping = true;
    mario.classList.add('jump');

    setTimeout(() =>  {
        mario.classList.remove('jump');
        isJumping = false;
    } , 500 );
}


const loop = setInterval(() =>{

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');

    console.log(marioPosition);  

    if(pipePosition <= 120 && pipePosition > 10 && marioPosition < 80) { //morreu
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none';
        mario.style.bottom =`${marioPosition}px`

        mario.src = 'img/game-over.png';
        mario.style.width = '70px';
        mario.style.marginLeft = '50px'

        clearInterval(loop);

        //mostra botao
        restartButton.classList.remove('hidden');

        restartButton.onclick = () => {
        window.location.reload();
        };
    }
},10)

document.addEventListener('keydown', jump);