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

// UI configuration object
const physicsParams = {
    gravityScale: 0.9,
    elasticity: 0.75,
    friction: 0.97,
    damping: 0.99,
    addBall: () => addBall(),
    removeBall: () => { if (balls.length() > 0) balls.pop(); },
    clearBalls: () => { balls.length = 0; }
};

// Initialize dat.GUI
const gui = new dat.GUI({ width: 300, margin: 0 });
gui.add(physicsParams, 'gravityScale', 0, 1).step(0.01).name('Gravity');
gui.add(physicsParams, 'elasticity', 0, 1).step(0.01).name('Elasticity');
gui.add(physicsParams, 'friction', 0, 1).step(0.01).name('Friction');
gui.add(physicsParams, 'damping', 0, 1).step(0.01).name('Air Damping');
gui.add(physicsParams, 'addBall').name('Add Random Ball');
gui.add(physicsParams, 'removeBall').name('Remove one ball at a time');
gui.add(physicsParams, 'clearBalls').name('Clear All');

const balls = [];
const radius = [];
const BALL_COUNT = 50;
let rad = 5;
let mass = 1;
const gravity = new Vector(0, 0);

function addBall() {
    let rad = getRandom(5, 30);
    let mass = 1 + rad * 0.1;
    let x = getRandom(rad, innerWidth - rad);
    let y = getRandom(rad, innerHeight - rad);
    let newBall = new Circle(x, y, rad, mass);
    balls.push(newBall);
}

for (let i = 0; i < BALL_COUNT; i++) {
    rad = getRandom(5, 30);
    mass = 1 + rad * .3;
    let x = getRandom(rad, innerWidth- rad);
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
    const beta = event.beta ?? 0;
    const gamma = event.gamma ?? 0;
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
        collider.applyDamping(ball, physicsParams.damping);
        ball.update(physicsParams.elasticity, physicsParams.friction);
        ball.draw(c);
        ball.arrow(c, ball.vel);
    });
}
//call the animate function to perform all
animate();