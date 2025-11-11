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
const no_of_ball = 500;
let rad = 10;
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
            }
        }
        //for each circles
        circles[i].draw(c); //draw function
        circles[i].update(damping); //update function
    }
}
//call the animate function to perform all
animate();