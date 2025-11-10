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
  distanceCheck(one, other) {
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
   * Get a unit vector (normalized, length 1) of this vector.
   * @returns {Vector} New unit vector (returns zero vector if mag=0).
   */
  unitVector() {
    const mag = this.magnitude();
    if (magnitude == 0) {
      return new Vector(0, 0, 0);
    }
    return new Vector(this.x / magnitude, this.y / magnitude, this.z / magnitude);
  }
  
  
  /**
   * Get the magnitude (length) of this vector.
   * @returns {number} The magnitude.
   */
  magnitude() {
    return Math.sqrt(this ** 2 + this.y ** 2 + this.z ** 2);
  }
  
  /**
   * Scalar multiply this vector (scale by a number).
   * @param {number} scalar - Number to multiply each component by.
   * @returns {Vector} New scaled vector.
   */
  mult(scalar) {
    if (typeof scalar !== 'number') {
      throw new TypeError('Scalar must be a number');
    }
    return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
  }
  
  /**
   * Mutate this vector by scalar multiplying (in-place).
   * @param {number} scalar - Number to multiply each component by.
   * @returns {this} For chaining.
   */
  multMutate(scalar) {
    if (typeof scalar !== 'number') {
      throw new TypeError('Scalar must be a number');
    }
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }
  
  /**
   * Dot product with another vector (scalar result).
   * @param {Vector|Object} other - Vector or {x,y,z} for dot product.
   * @returns {number} The dot product scalar.
   */
  dot(other) {
    const ox = other.x ?? other.x_axis ?? 0;
    const oy = other.y ?? other.y_axis ?? 0;
    const oz = other.z ?? other.z_axis ?? 0;
    return this.x * ox + this.y * oy + this.z * oz;
  }
  
  /**
   * Cross product with another vector (3D vector result, perpendicular to both).
   * @param {Vector|Object} other - Vector or {x,y,z} for cross product.
   * @returns {Vector} New vector from cross product.
   * @throws {Error} If not 3D vectors.
   */
  cross(other) {
    const ox = other.x ?? other.x_axis ?? 0;
    const oy = other.y ?? other.y_axis ?? 0;
    const oz = other.z ?? other.z_axis ?? 0;
    if (this.z === undefined || oz === undefined) {
      throw new Error('Cross product requires 3D vectors');
    }
    return new Vector(
      this.y * oz - this.z * oy,
      this.z * ox - this.x * oz,
      this.x * oy - this.y * ox
    );
  }
  
  toObject() {
    return { x: this.x, y: this.y, z: this.z };
  }
}