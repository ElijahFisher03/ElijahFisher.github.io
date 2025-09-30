// game.js

class Player {
    
    
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.onplatform = false;
        this.vx = 0;
        this.vy = 0;
        this.gravity = 0.1;
        this.speed = 0.5;
        this.jumpPower = -10;
        
    }
    

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // You can add methods for movement, collision detection, etc. here
    collision(rect) {
        return (
            this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y
        );
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
        this.landedOn = false;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

const rectangles = [];
const rec1 = new Rectangle(10, 500, 300, 50);
const rec2 = new Rectangle(400, 400, 200, 50);
const rec3 = new Rectangle(400, 300, 150, 50);
rectangles.push(rec3);
rectangles.push(rec2);
rectangles.push(rec1);

// Get the canvas and its 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');



// Create a player instance
const player = new Player(50, 50, 30, 30, 'blue');
let keys = [];
// Game loop
function gameLoop() {
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player
    rectangles.forEach(rect => {
        rect.draw(ctx);
    });
    player.draw(ctx);
    update();
    

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();



addEventListener('keydown', (event) => {

    if (event.key === 'ArrowLeft') {
        if (keys.includes('ArrowLeft')) return;
        if(keys.includes('ArrowRight')){
            keys.pop('ArrowRight');
            player.vx += player.speed;
        }
        keys.push('ArrowLeft');
        player.vx -= player.speed;
    } 
    if (event.key === 'ArrowRight') {
        if (keys.includes('ArrowRight')) return;
        if(keys.includes('ArrowLeft')){
            keys.pop('ArrowLeft');
            player.vx -= player.speed;
        }
        keys.push('ArrowRight');
        player.vx += player.speed;
    } 
    if (event.key === ' ') { // Spacebar for jump
        // Only allow jump if on ground
        if (player.onplatform) {
            player.vy = player.jumpPower;
            player.onplatform = false; // Player is now in the air
        }
    }
});
addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        keys.pop('ArrowLeft');
    }
    if (event.key === 'ArrowRight') {
        keys.pop('ArrowRight');
    }
});

function update(){
    if(player.x > rec1.x + rec1.width || player.x + player.width < rec1.x){
            player.onplatform = false;
        }
    
    //check for collision
    rectangles.forEach(rect => {
        if (player.collision(rect)) {
            player.onplatform = true;
            player.y = rect.y - player.height; // Adjust player position to be on top of the platform
        } else if (!player.y > rect.y - player.height) {
            player.onplatform = false;
        }
    });

    // Gravity
    if (!player.onplatform) {
        player.vy += player.gravity;       
    } else {   
        player.vy = 0;
    }
    if(keys.includes('ArrowLeft')){
        player.vx -= player.speed;
    }
    if(keys.includes('ArrowRight')){
        player.vx += player.speed;
    }
    player.x += player.vx;
    player.y += player.vy;
    
    player.vx *= 0.9; // Friction

}





















