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

//avoid overlapping 
//creating function to check weather one ball touch another
function distanceCheck(x1, y1, x2, y2, r1, r2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (dist < r1 + r1) {
        return true;
    } else {
        return false;
    }
}

//const ball = new Circle();
let coll = new Collision();
const circle = []; //create a ball array
const radius = [];
var no_Of_Ball = 10;
var rad = 10;
let x;
let y;
const gravity = 0.0; // gravity 
let mass = 1; // mass



for (var i = 0; i < no_Of_Ball; i++) {
    //rad = getRandom(5,60);
    x = getRandom(rad, innerWidth - rad);
    y = getRandom(rad, innerHeight - rad);
    if (i !== 0) {
        for (var j = 0; j < circle.length; j++) {
            //check the touch between ball so that they don't overlap on eachother
            if (distanceCheck(x, y, circle[j].pos.x, circle[j].pos.y, rad, radius[j])) {
                rad = getRandom(5, 56);
                //rad = rad;
                x = getRandom(rad, innerWidth - rad);
                y = getRandom(rad, innerHeight - rad);
                j = -1; //call same loop till the new ball got no overlap
            }
        }
    }
    radius.push(rad);
    //store each ball object into this ball array
    //mass = rad * 0.01;
    circle.push(new Circle(x, y, radius[i], mass));
}
//create an animate function
function animate() {
    //animate function
    requestAnimationFrame(animate);
    c.beginPath();
    //clear the background for each frame
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circle.length; i++) {
        for (var j = 0; j < circle.length; j++) {
            //call collided function to check not to collide
            if (i !== j && circle[i].collided(circle[j])) {
                //if collided then
                coll.resolveCollision(circle[i], circle[j]);
            } else {
                circle[i].acc.y = gravity;
                circle[j].acc.y = gravity;
            }
        }
        //for each circles
        circle[i].draw(c); //draw function
        circle[i].update(); //update function
    }
}
//call the animate function to perform all
animate();