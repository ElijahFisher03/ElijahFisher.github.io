

class Player {
    constructor(x, y, width, height, color) {
        this.x = x; // X position
        this.y = y; // Y position   
        
        this.width = width; // Width for square player
        this.radius = width / 2; // Radius for circular player
        this.height = height; // Height for square player
        this.color = color; // Color
        this.shape = 'circle'; // Shape (circle or square)
    }   
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const player = new Player(canvas.width / 2, canvas.height / 2, 15, 15, 'blue');
// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player.draw(ctx);


    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();


    