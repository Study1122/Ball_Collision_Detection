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
  }
  
  clone() {
    return new Vector(this.x, this.y, this.z);
  }
  
  // ────────────────────────────────
  // 🧭 2D Vector Helper Functions
  // ────────────────────────────────
  
  /** 
   * Get the angle (in radians) of this vector relative to the x-axis. 
   * @returns {number}
   */
  heading() {
    return Math.atan2(this.y, this.x);
  }
  
  /** 
   * Rotate this vector by a given angle (radians) — returns new vector. 
   * @param {number} angle 
   * @returns {Vector}
   */
  rotate(angle) {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const x = this.x * cosA - this.y * sinA;
    const y = this.x * sinA + this.y * cosA;
    return new Vector(x, y, this.z);
  }
  
  /**
   * Compute angle (in radians) between this vector and another 
   * without sign(direction) ⬇️✖️⬇️only magnitude 
   * @param {Vector} other 
   * @returns {number}
   */
  angleBetween(other) {
    const dotVal = this.dot(other);
    const mags = this.magnitude() * other.magnitude();
    if (mags === 0) return 0;
    return Math.acos(Math.min(Math.max(dotVal / mags, -1), 1)); // clamp for precision
  }
  
  /**
   * Compute angle (in radians) between this vector and another 
   * with sign 
   * @param {Vector} other 
   * @returns {number} with sign(direction) ⬇️ ⬆️ and magnitude 
   */
  angle(other) {
    return Math.atan2(other.y - this.y, other.x - this.x);
  }
  /**
   * avoid overlapping ,creating function to check whether one ball touch another
   * @param {numbers} take the cordinate of balls
   * @return {boolean} if condition fulfill return true else false
   */
  distanceCheck(one, other) {
    var dx = other.x - one.x;
    var dy = other.y - one.y;
    var dist = Math.sqrt(dx ** 2 + dy ** 2);
    if (dist < one.radius + other.radius) {
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
    return new Vector(this.x - ox, this.y - oy, this.z - oz);
  }
  
  /**
   * Mutates this vector by substracting from another (in-place).
   * @param {Vector|Object} other - Vector or {x,y,z} to add.
   * @returns {this} For chaining.
   */
  
  subMutate(other) {
    const ox = other.x ?? other.x_axis ?? 0;
    const oy = other.y ?? other.y_axis ?? 0;
    const oz = other.z ?? other.z_axis ?? 0;
    this.x -= ox;
    this.y -= oy;
    this.z -= oz;
    return this;
  }
  
  /**
   * Get a unit vector (normalized, length 1) of this vector.
   * @returns {Vector} New unit vector (returns zero vector if mag=0).
   */
  unitVector() {
    const mag = this.magnitude();
    if (mag == 0) {
      return new Vector(0, 0, 0);
    }
    return new Vector(this.x / mag, this.y / mag, this.z / mag);
  }
  
  
  /**
   * Get the magnitude (length) of this vector.
   * @returns {number} The magnitude.
   */
  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }
  
  /**
   * Limit the magnitude of this vector (returns new vector).
   * @param {number} max 
   * @returns {Vector}
   */
  limitMag(max) {
    const mag = this.magnitude();
    if (mag > max) {
      return this.unitVector().mult(max);
    }
    return this.clone();
  }
  
  /**
   * Set vector to a specific magnitude (returns new vector).
   * @param {number} newMag 
   * @returns {Vector}
   */
  setMag(newMag) {
    return this.unitVector().mult(newMag);
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