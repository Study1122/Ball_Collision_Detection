import { Vector } from './mathLib.js';

export class Circle {
  constructor(x, y, r, m = 1) {
    //write code here...
    if (typeof x !== 'number', typeof x !== 'number', typeof x !== 'number', (m !== undefined && typeof m !==
        'number')) {
      throw new TypeError("agrs val must be numbers");
    }
    this.x = x;
    this.y = y;
    this.radius = r;
    this.mass = m;
    this.stroke = "black";
    this.fill = "cyan";
    this.v = Math.random() - .5;
    this.pos = new Vector(this.x, this.y);
    this.vel = new Vector(this.v, this.v);
    this.acc = new Vector(0, 0);
    
    //collision detection
    
  };
  
  collided(other) {
    var dx = other.pos.x - this.pos.x;
    var dy = other.pos.y - this.pos.y;
    const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (dist < this.radius + other.radius) {
      return true;
    } else {
      return false;
    }
  }
  
  getRandom(lVal, hVal) {
    let data = Math.floor(Math.random() * (hVal - lVal) + lVal);
    return data;
  }
  
  distance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
  
  draw(c) {
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.fill; // Set fill color (add 'fill' property to your object)
    c.fill(); // Fill the circle
    c.strokeStyle = this.stroke;
    c.stroke();
  }
  update(damp) {
    const damping = damp;
    //added force on the balls
    this.vel.addMutate(this.acc);
    
    if (this.pos.x + this.radius > innerWidth) {
      this.pos.x = innerWidth - this.radius;
      this.vel.x *= -damping;
    }
    if (this.pos.x < this.radius) {
      this.pos.x = this.radius;
      this.vel.x *= -damping;
    }
    if (this.pos.y + this.radius > innerHeight) {
      this.pos.y = innerHeight - this.radius;
      this.vel.y *= -damping;
    }
    if (this.pos.y < this.radius) {
      this.pos.y = this.radius;
      this.vel.y *= -damping;
    }
    this.pos.addMutate(this.vel);
  };
}