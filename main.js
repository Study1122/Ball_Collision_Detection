//
import { Collision } from './collision_resolve.js';
import { Vector } from './mathLib.js';
import { Circle } from './circle.js';

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
var c = canvas.getContext('2d');
//function to pick an random values
function getRandom(lVal, hVal) {
    return Math.floor(Math.random() * (hVal - lVal) + lVal);
}

let collider = new Collision({
    elasticity: 0.65, // slightly soft collisions
    friction: 0.97, // tangential friction
    damping: 0.992 // air resistance
});

const physicsParams = {
    gravityScale: 0.9,
    elasticity: 0.75,
    friction: 0.97,
    damping: 0.99
};

document.getElementById("gravity").addEventListener("input", e => {
    physicsParams.gravityScale = parseFloat(e.target.value);
    document.getElementById("gravityValue").textContent = e.target.value;
});

document.getElementById("elasticity").addEventListener("input", e => {
    physicsParams.elasticity = parseFloat(e.target.value);
    document.getElementById("elasticityValue").textContent = e.target.value;
});

document.getElementById("friction").addEventListener("input", e => {
    physicsParams.friction = parseFloat(e.target.value);
    document.getElementById("frictionValue").textContent = e.target.value;
});

// Button actions
document.getElementById("addBall").onclick = () => addBall();
document.getElementById("removeBall").onclick = () => { if (balls.length > 0) balls.pop(); };
document.getElementById("clearBalls").onclick = () => { balls.length = 0; };


const balls = [];
const radius = [];
const BALL_COUNT = 50;
let rad = 5;
let mass = 1;
const gravityScale = .1;
const damping = .97;
const elasticity = .89;
const friction = .98;
const gravity = new Vector(0, 0);

function addBall() {
    
    const rad = getRandom(5, 30);
    const mass = 1 + rad * 0.3;
    let x, y, newBall;
    let overlapping;
    
    // Try placing without overlap (limit retries)
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
        x = getRandom(rad, innerWidth - rad);
        y = getRandom(rad, innerHeight - rad);
        newBall = new Circle(x, y, rad, mass);
        
        overlapping = balls.some(ball => newBall.collided(ball));
        attempts++;
    } while (overlapping && attempts < maxAttempts);
    
    if (!overlapping) balls.push(newBall);
    else console.warn("Skipped adding a ball — space too crowded!");
}

for (let i = 0; i < BALL_COUNT; i++) {
    rad = getRandom(5, 30);
    mass = 1 + rad * .3;
    let x = getRandom(rad, innerWidth - rad);
    let y = getRandom(rad, innerHeight - rad);
    
    let newBall = new Circle(x, y, rad, mass);
    
    // Check overlap with existing circles
    let overlapping = false;
    do {
        overlapping = false;
        for (let j = 0; j < balls.length; j++) {
            if (newBall.collided(balls[j])) {
                overlapping = true;
                x = getRandom(rad, innerWidth - rad);
                y = getRandom(rad, innerHeight - rad);
                newBall = new Circle(x, y, rad, mass);
                break;
            }
        }
    }
    while (overlapping);
    balls.push(newBall);
}

window.addEventListener('deviceorientation', (event) => {
    const beta = event.beta || 0;
    const gamma = event.gamma || 0;
    // scaling gravity for realistic effect 
    gravity.x = ((gamma / 90) * physicsParams.gravityScale) * .1;
    gravity.y = ((beta / 90) * physicsParams.gravityScale) * .1;
});


//create an animate function
function animate() {
    //apply gravity first
    
    for (var i = 0; i < balls.length; i++) {
        balls[i].acc.x = gravity.x;
        balls[i].acc.y = gravity.y;
    }
    //animate function
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {
            //call collided function to check not to collide
            if (balls[i].collided(balls[j])) {
                //if collided then
                collider.resolveCollision(balls[i], balls[j]);
            }
        }
    }
    // inside animate loop
    balls.forEach(ball => {
        //collider.applyDamping(ball, damping);
        ball.update(physicsParams.elasticity, physicsParams.friction);
        ball.draw(c);
        ball.arrow(c, ball.vel);
    });
}
//call the animate function to perform all
animate();
