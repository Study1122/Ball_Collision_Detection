//
import { Collision } from './collision_resolve.js';
import { Vector } from './mathLib.js';
import { Circle } from './circle.js';

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


//function to pick an random values
function getRandom(lVal, hVal) {
    return Math.floor(Math.random() * (hVal - lVal) + lVal);
}

let collider = new Collision({
    elasticity: 0.65, // slightly soft collisions
    friction: 0.97, // tangential friction
    damping: 0.792 // air resistance
});

const balls = [];
const radius = [];
const no_of_ball = 20;
let rad = 5;
let mass = 1;
const elasticity = 0.75;
const friction = 0.97;
const gravity = new Vector(0, 0);
const gravityScale = .1;

for (let i = 0; i < no_of_ball; i++) {
    rad = getRandom(5, 50);
    mass = 1 + rad * 0.1;
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
    
    radius.push(rad);
    balls.push(newBall);
}


window.addEventListener('deviceorientation', (event) => {
    const beta = event.beta || 0;
    const gamma = event.gamma || 0;
    // scaling gravity for realistic effect 
    gravity.x = (gamma / 90) * gravityScale;
    gravity.y = (beta / 90) * gravityScale;
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
    c.beginPath();
    //clear the background for each frame
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < balls.length; i++) {
        for (var j = 0; j < balls.length; j++) {
            //call collided function to check not to collide
            if (i !== j && balls[i].collided(balls[j])) {
                //if collided then
                collider.resolveCollision(balls[i], balls[j]);
            }
        }
        //for each circles
        
    }
    balls.forEach(ball => {
        collider.applyDamping(ball);
        ball.draw(c); //draw function
        ball.update(elasticity, friction); //update functio
        ball.line(c, ball.vel);
    });
}
//call the animate function to perform all
animate();