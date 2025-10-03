

class Player {
    constructor(x, y, width, height, color) {
        this.x = x; // X position
        this.y = y; // Y position   
        
        this.width = width; // Width for square player
        this.radius = width / 2; // Radius for circular player
        this.height = height; // Height for square player
        this.color = color; // Color
        this.shape = 'circle'; // Shape (circle or square)
        this.inGame = true; // Is the player in the game
    }   
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}

let gameState = 'playing'; // Possible states: 'playing', 'paused', 'gameover'

// Initialize canvas and player
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const player = new Player(canvas.width / 2, canvas.height / 2, 15, 15, 'blue');
// Game loop
function gameLoop() {
    if(player.inGame === false) {
        outOfGame();
    } else {
        inGame();
    }
    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}
function inGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
}

function outOfGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 60, canvas.height / 2);
}

// Start the game loop
gameLoop();


    