// game.js

class Player {
    
    
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.onplatform = false;
        
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // You can add methods for movement, collision detection, etc. here
    collision(rect) {
        return (this.x < rect.x + rect.width &&
                this.x + this.width > rect.x &&
                this.y < rect.y + rect.height &&
                this.y + this.height > rect.y);
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    gravity() {
        if (!this.onplatform) {
            this.y += 0.9; // Gravity effect
        }
    }
    
    
}

class Rectangle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.color = 'white';
        this.width = width;
        this.height = height;
        this.borderColor = 'black';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}


const rec1 = new Rectangle(10, 500, 300, 50);

// Get the canvas and its 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Create a player instance
const player = new Player(50, 50, 30, 30, 'blue');

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player
    player.draw(ctx);
    rec1.draw(ctx);
    player.gravity();
    
    
    if (player.collision(rec1)) {
        player.onplatform = true;
    } else {
        player.onplatform = false;
    }

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Example of player movement (e.g., with keyboard input)
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'ArrowRight') {
        player.move(5, 0);
    } else if (key === 'ArrowLeft') {
        player.move(-5, 0);
    } else if (key === 'ArrowUp' && player.onplatform) {
        player.move(0, -15);
    }
});