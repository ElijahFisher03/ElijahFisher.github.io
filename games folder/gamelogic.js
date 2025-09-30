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
        this.jumpPower = -5;
        
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
const rec4 = new Rectangle(600, 200, 150, 50);
rectangles.push(rec4);
rectangles.push(rec3);
rectangles.push(rec2);
rectangles.push(rec1);

// Get the canvas and its 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');



// Create a player instance
const player = new Player(10, 465, 30, 30, 'blue');
let keys = [];

//creating score
let score = 0;
let scoreText = "Score: " + score;

// Game loop
function gameLoop() {
    console.log(score);
    scoreText = "Score: " + score;
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //console.log(player.onplatform);
    ctx.font = "bold 20px Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(scoreText, canvas.width / 2, 10);
    // Draw the player
    rectangles.forEach(rect => {
        rect.draw(ctx);
    });
    player.draw(ctx);
    update();
    if(player.y > canvas.height) {
        player.x = 10;
        player.y = 465;
        score = 0;
        rectangles.forEach(rect => {
            rect.landedOn = false;
        });
    }

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

function update() {
    // assume in air
    player.onplatform = false;

    // gravity
    player.vy += player.gravity;

    // horizontal input
    if (keys.includes("ArrowLeft"))  player.vx -= player.speed;
    if (keys.includes("ArrowRight")) player.vx += player.speed;

    // apply movement
    player.x += player.vx;
    player.y += player.vy;

    // check collisions
    rectangles.forEach(rect => {
        if (player.collision(rect)) {
            if (player.vy >= 0 && player.y + player.height <= rect.y + 10) {
                player.onplatform = true;
                player.vy = 0;
                player.y = rect.y - player.height;
            }
            if (!rect.landedOn) {
                score += 1;
                rect.landedOn = true;
            }
            
        }
    });

    // friction when grounded
    
    player.vx *= 0.8;
    
}






















