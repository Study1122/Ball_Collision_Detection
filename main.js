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

let collider = new Collision();

const circles = [];
const radius = [];
const no_of_ball = 50;
let rad = 15;
const mass = 1;
const damping = .71;
const gravity = new Vector(0, 0);
const gravityScale = .1;

for (let i = 0; i < no_of_ball; i++) {
    //rad = getRandom(5, 30);
    let x = getRandom(rad, innerWidth - rad);
    let y = getRandom(rad, innerHeight - rad);
    
    let newCircle = new Circle(x, y, rad, mass);
    
    // Check overlap with existing circles
    let overlapping = false;
    do {
        overlapping = false;
        for (let j = 0; j < circles.length; j++) {
            if (newCircle.collided(circles[j])) {
                overlapping = true;
                x = getRandom(rad, innerWidth - rad);
                y = getRandom(rad, innerHeight - rad);
                newCircle = new Circle(x, y, rad, mass);
                break;
            }
        }
    } while (overlapping);
    
    radius.push(rad);
    circles.push(newCircle);
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
    for (var i = 0; i < circles.length; i++) {
        circles[i].acc.x = gravity.x;
        circles[i].acc.y = gravity.y;
    }
    //animate function
    requestAnimationFrame(animate);
    c.beginPath();
    //clear the background for each frame
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circles.length; i++) {
        for (var j = 0; j < circles.length; j++) {
            //call collided function to check not to collide
            if (i !== j && circles[i].collided(circles[j])) {
                //if collided then
                collider.resolveCollision(circles[i], circles[j]);
                /**
                // --- POSITION CORRECTION ---
                const dx = circles[j].pos.x - circles[i].pos.x;
                const dy = circles[j].pos.y - circles[i].pos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const overlap = circles[i].radius + circles[j].radius - dist;
                
                if (overlap > 0) {
                    const correction = overlap / 2;
                    const nx = dx / dist;
                    const ny = dy / dist;
                    
                    // Push them apart
                    circles[i].pos.x -= nx * correction;
                    circles[i].pos.y -= ny * correction;
                    circles[j].pos.x += nx * correction;
                    circles[j].pos.y += ny * correction;
                }
                */
                // --- POSITION CORRECTION ---
                const delta = circles[j].pos.sub(circles[i].pos);
                const dist = delta.magnitude();
                const overlap = circles[i].radius + circles[j].radius - dist;
                
                if (overlap > 0 && dist > 0) {
                    const correction = overlap / 2;
                    const unit = delta.unitVector();
                    const correct = unit.mult(correction);
                    // Push them apart
                    
                    circles[i].pos.sub(correct);
                    circles[j].pos.addMutate(correct);
                }
            }
        }
        //for each circles
        circles[i].draw(c); //draw function
        circles[i].update(damping); //update function
    }
}
//call the animate function to perform all
animate();