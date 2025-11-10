/**         */
//collision resolving
//Utility functions
export class Collision {
    constructor() {
        /**
         * Rotates coordinate system for velocities
         * Takes velocities and alters them as if the coordinate system they're on was rotated
         * @param  {Object|velocity} Velocity of an individual particle
         * @param  {Float} angle    The angle of collision between two objects in radians
         * @return {Object} altered x and y velocities after the coordinate system has been rotated
         */
        
        this.rotateAng = (velocity, angle) => {
            const rotatedVelocities = {
                x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
                y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
            };
            return rotatedVelocities;
        }
        
    };
    /**
     * Swaps out two colliding particles' x and y velocities after running through
     * an elastic collision reaction equation
     *
     * @param  {Object | particle} A particle object with x and y coordinates, plus velocity
     * @param  {Object | otherParticle} A particle object with x and y coordinates, plus velocity
     * @return {Null }Does not return a value
     */
    resolveCollision(one, other) {
        
        //const velDiff = this.vel.sub(other.vel);
        const xVelocityDiff = one.vel.x - other.vel.x;
        const yVelocityDiff = one.vel.y - other.vel.y;
        
        //const distDiff = this.pos.sub(other.pos);
        const xDist = other.pos.x - one.pos.x;
        const yDist = other.pos.y - one.pos.y;
        
        // Prevent accidental overlap of particles
        //if (velDiff.x * distDiff.x + velDiff.y * distDiff.y>=0){
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
            
            // Grab angle between the two colliding particles
            const angle = -Math.atan2(other.pos.y - one.pos.y, other.pos.x - one.pos.x);
            
            // Store mass in var for better readability in collision equation
            const m1 = one.mass;
            const m2 = other.mass;
            
            // Velocity before equation
            const u1 = this.rotateAng(one.vel, angle);
            const u2 = this.rotateAng(other.vel, angle);
            
            // Velocity after 1d collision equation
            const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
            const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };
            
            // Final velocity after rotating axis back to original location
            const vFinal1 = this.rotateAng(v1, -angle);
            const vFinal2 = this.rotateAng(v2, -angle);
            
            // Swap particle velocities for realistic bounce effect
            one.vel.x = vFinal1.x;
            one.vel.y = vFinal1.y;
            
            other.vel.x = vFinal2.x;
            other.vel.y = vFinal2.y;
        }
    };
}