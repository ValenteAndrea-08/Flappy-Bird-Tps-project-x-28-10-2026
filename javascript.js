//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;
 
//bird
let birdWidth = 38;
let birdHeight = 30;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;
 
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}
 
 
//pipes 
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let topPipeImg;
let bottomPipeImg;


//physics
let velocityX = -2; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;
 
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //usato per disegnare sulla board
   
    //caricamento immagini
    birdImg = new Image();
    birdImg.src = "./img/Marx.png";

    topPipeImg = new Image();
    topPipeImg.src = "./img/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./img/bottompipe.png";
 
    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    document.addEventListener("keydown", moveBird);
 
    
}
 
 

function update(){
    requestAnimationFrame(update);

    if (gameOver) {
        // Oscura lo schermo
        context.fillStyle = "rgba(13, 14, 14, 0.02)";
        context.fillRect(0, 0, board.width, board.height);

        // Scritta GAME OVER
        context.fillStyle = "red";
        context.font = "bold 36px sans-serif";
        context.textAlign = "center";
        context.fillText("GAME OVER", board.width / 2, board.height / 2);

        // Messaggio per ricominciare
        context.font = "18px sans-serif";
        context.fillText("Premi SPAZIO per riprovare",board.width / 2, board.height / 2 + 40);

        return;

    }
    
    context.clearRect(0, 0, board.width, board.height);
   
    //bird
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0); //applica la gravità a bird.y 
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
 
    if (bird.y > board.height) {
         gameOver = true;      
    }
   
    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe  = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }
       
        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }
 
   
 
    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift(); //removes first element frome the array
    }
   
    //punteggio
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.textAlign ="left";
    context.fillText(score, 10, 45);
}
 
 
function placePipes(){
    if (gameOver) {
        return;
    }
   
    //(0-1) * pipeHeight/2.
    // 0 -> -128 (pipeHeight/4)
    // 1 -> 129 -256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4
 
   
    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
   
    pipeArray.push(topPipe);
 
    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}
 
function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        if (gameOver) {
            bird.y = birdY;
            velocityY = 0;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }

        velocityY = -6;
    }
}
 
 
 
function detectCollision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
 
