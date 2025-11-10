export class Vector {
  /**
   * create a constructor
   * @param {number} x - X component 
   * @param {number} y - Y component 
   * @param {number} z - Z component {default is 0}
   */
  constructor(x, y, z = 0) {
    if (typeof x !== 'number' || typeof y !== 'number' || (z !== undefined && typeof z !== 'number')) {
      throw new TypeError('Vector component must be numbers');
    }
    this.x = x;
    this.y = y;
    this.z = z;
    
    
  };
  /**
   * avoid overlapping ,creating function to check weather one ball touch another
   * @param {numbers} take the cordinate of balls
   * @return {boolean} if condition fulfill return true else false
   */
  distanceCheck(one, other){
    var dx = other.x - one.x;
    var dy = other.y - one.y;
    var dist = Math.sqrt(dx ** 2 + dy ** 2);
    if (dist < other.radius + other.radius) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Add vector with another
   * @param {Vector|Object} other - Vector or {x,y,z} to add.
   * @returns {Vector} New vector with summed components.
   */
  add(other) {
    const ox = other.x ?? other.x_axis ?? 0;
    const oy = other.y ?? other.y_axis ?? 0;
    const oz = other.z ?? other.z_axis ?? 0;
    return new Vector(this.x + ox, this.y + oy, this.z + oz);
  }
  
  /**
   * Mutates this vector by adding another (in-place).
   * @param {Vector|Object} other - Vector or {x,y,z} to add.
   * @returns {this} For chaining.
   */
  
  addMutate(other) {
    const ox = other.x ?? other.x_axis ?? 0;
    const oy = other.y ?? other.y_axis ?? 0;
    const oz = other.z ?? other.z_axis ?? 0;
    this.x += ox;
    this.y += oy;
    this.z += oz;
    return this;
  }
  
  /**
   * Subtract vector with another
   * @param {Vector|Object} other - Vector or {x,y,z} to sub.
   * @returns {Vector} New vector after subtracting components.
   */
  sub(other) {
    const ox = other.x ?? other.x_axis ?? 0;
    const oy = other.y ?? other.y_axis ?? 0;
    const oz = other.z ?? other.z_axis ?? 0;
    return new Vector(ox - this.x, oy - this.y, oz - this.z);
  }
  
  /**
   * Create a magnitude of a vector 
   * @param {Null } null 
   * @return {number} returning a number with some magnitude 
   * 
   */
  magVec() {
    return Math.sqrt(this ** 2 + this.y ** 2 + this.z ** 2);
  }
  
  toObject() {
    return { x: this.x, y: this.y, z: this.z };
  }
}