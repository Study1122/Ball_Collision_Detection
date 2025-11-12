import { Vector } from './mathLib.js';

export class Circle {
  constructor(x, y, r, m = 1) {
    //write code here...
    if (typeof x !== 'number'|| typeof y !== 'number'|| typeof r !== 'number'|| (m !== undefined && typeof m !==
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

  draw(c) {
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.fill; // Set fill color (add 'fill' property to your object)
    c.fill(); // Fill the circle
    c.lineWidth = 1;
    c.strokeStyle = this.stroke;
    c.stroke();
    
  }
  
  arrow(c, v) {
    //type here...
    
    let dir = v.clone().setMag(v.magnitude()*(1+this.radius*.3));
    c.beginPath();
    c.moveTo(this.pos.x, this.pos.y);
    c.lineTo(this.pos.x + dir.x, this.pos.y + dir.y);
    c.lineWidth = .51; // Thickness of the line
    c.strokeStyle = 'blue'; // Color of the line
    c.stroke();
  }
  
  update(e, f) {
    let elasticity = e;
    let friction = f;
    //added force on the balls
    this.vel.addMutate(this.acc);
    
    if (this.pos.x + this.radius > innerWidth) {
      this.pos.x = innerWidth - this.radius;
      this.vel.x *= -friction;
      this.vel.y *= elasticity;
    }
    if (this.pos.x < this.radius) {
      this.pos.x = this.radius;
      this.vel.x *= -friction;
      this.vel.y *= elasticity;
    }
    if (this.pos.y + this.radius > innerHeight) {
      this.pos.y = innerHeight - this.radius;
      this.vel.y *= -elasticity;
      this.vel.x *= friction;
    }
    if (this.pos.y < this.radius) {
      this.pos.y = this.radius;
      this.vel.y *= -elasticity;
      this.vel.x *= friction;
    }
    this.pos.addMutate(this.vel);
  };
}