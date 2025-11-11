import { Vector } from './mathLib.js';

//collision resolving
//Utility functions
export class Collision {
    constructor(options = {}) {
        this.elasticity = options.elasticity ?? 0.9; // 1 = perfectly elastic
        this.friction = options.friction ?? 0.98; // tangential velocity damping
        this.damping = options.damping ?? 0.995; // air resistance per frame
    }
    
    // Apply damping (air resistance) per frame
    applyDamping(particle) {
        particle.vx *= this.damping;
        particle.vy *= this.damping;
    }
    
    /**
     * Swaps out two colliding particles' x and y velocities after running through
     * an elastic collision reaction equation
     *
     * @param  {Object | particle} A particle object with x and y coordinates, plus velocity
     * @param  {Object | otherParticle} A particle object with x and y coordinates, plus velocity
     * @return {Null }Does not return a value
     */
    resolveCollision(one, other) {
        
        const velDiff = one.vel.sub(other.vel);
        const distDiff = other.pos.sub(one.pos);
        
        // Prevent accidental overlap of particles
        if (velDiff.dot(distDiff) >= 0) {
            
            const angle = -other.pos.angle(one.pos);
            // Store mass in var for better readability in collision equation
            const m1 = one.mass;
            const m2 = other.mass;
            
            // Velocity before equation
            const u1 = one.vel.rotate(angle);
            const u2 = other.vel.rotate(angle);
            
            // Velocity after 1d collision equation
            
            const v1 = new Vector((u1.x * (m1 - m2)) / (m1 + m2) * this.elasticity +
                (u2.x * (2 * m2)) / (m1 + m2), u1.y * this.friction);
            
            const v2 = new Vector((u2.x * (m1 - m2)) / (m1 + m2) * this.elasticity +
                (u1.x * (2 * m2)) / (m1 + m2),
                u2.y * this.friction);
            
            const vFinal1 = v1.rotate(-angle);
            const vFinal2 = v2.rotate(-angle);
            // Swap particle velocities for realistic bounce effect
            one.vel = vFinal1;
            other.vel = vFinal2;
            
            // --- POSITION CORRECTION ---
            const delta = other.pos.sub(one.pos);
            const dist = delta.magnitude();
            const overlap = one.radius + other.radius - dist;
            
            if (overlap > 0.001 && dist > 0.001) {
                const correct = delta.unitVector().mult(overlap / 2);
                // Push them apart
                one.pos.subMutate(correct);
                other.pos.addMutate(correct);
            }
        }
    };
}