//
import { Collision } from './collision_resolve.js';
import { Vector } from './mathLib.js';
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


//function to pick an random values
function getRandom(lVal, hVal) {
    return Math.floor(Math.random() * (hVal - lVal) + lVal);
}

function Circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.mass = 1;
    this.v = Math.random() - .5;
    this.pos = new Vector(this.x, this.y);
    this.vel = new Vector(this.v, this.v);
    this.acc = new Vector(0, 0);
    
    this.coll = new Collision();
    
    function getRandom(lVal, hVal) {
        let data = Math.floor(Math.random() * (hVal - lVal) + lVal);
        return data;
    }
    
    function distance(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }
    //function to draw a sketch
    this.draw = function() {
        c.beginPath();
        c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        c.strokeStyle = (100, 100);
        c.stroke();
    };
    //this function is used for rendering the object in frame
    this.update = function() {
        //acceleration
        //this.draw();
        this.vel.addMutate(this.acc); //added force on the balls
        if (this.pos.x + this.radius > innerWidth) {
            this.pos.x = innerWidth - this.radius;
            this.vel.x *= -1;
        }
        if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.vel.x *= -1;
        }
        if (this.pos.y + this.radius > innerHeight) {
            this.pos.y = innerHeight - this.radius;
            this.vel.y *= -.51;
        }
        if (this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.vel.y *= -1;
        }
        if (this.acc < .1) {
            this.vel = 0;
        }
        this.pos.addMutate(this.vel);
    };
    
    //collision detection
    this.collided = function(other) {
        if (distance(this.pos.x, this.pos.y, other.pos.x, other.pos.y) < this.radius + other.radius) {
            return true;
        } else {
            return false;
        }
    };
}

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

const circle = []; //create a ball array
const radius = [];
var no_Of_Ball = 10;
var rad = 10;
let x;
let y;
const gravity = 0.01;

for (var i = 0; i < no_Of_Ball; i++) {
    //rad = getRandom(5,60);
    x = getRandom(rad, innerWidth - rad);
    y = getRandom(rad, innerHeight - rad);
    if (i !== 0) {
        for (var j = 0; j < circle.length; j++) {
            //check the touch between ball so that they don't overlap on eachother
            if (distanceCheck(x, y, circle[j].pos.x, circle[j].pos.y, rad, radius[j])) {
                //rad = getRandom(5,56);
                rad = rad;
                x = getRandom(rad, innerWidth - rad);
                y = getRandom(rad, innerHeight - rad);
                j = -1; //call same loop till the new ball got no overlap
            }
        }
    }
    radius.push(rad);
    //store each ball abject into this ball array
    circle.push(new Circle(x, y, radius[i]));
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
                circle[i].coll.resolveCollision(circle[i], circle[j]);
            } else {
                circle[i].acc.y = gravity;
                circle[j].acc.y = gravity;
            }
        }
        //for each circles
        circle[i].draw(); //draw function
        circle[i].update(); //update function
    }
}
//call the animate function to perform all
animate();