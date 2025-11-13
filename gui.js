export class GUI {
  constructor(physicsParams ={}, option = {}) {
    this.physicsParams = physicsParams;
    this.elasticity = options.elasticity ?? this.physicsParams; // 1 = perfectly elastic
    this.friction = options.friction ?? this.physicsParams; // tangential velocity damping
    this.damping = options.damping ?? this.physicsParams; // air resistance per frame
    this.gravity = options.gravity ?? this.physicsParams; // gravity per frame
  };
  
  
}