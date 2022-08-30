"use strict";

export class Particle{
    constructor(x,y,size,color){
        this.position = {x: x, y: y};
        this.color = color;
        this.radius = size;
        this.velocity = {x: 0, y: 0};
        this.endArc = Math.PI*2;
    }
    render(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.position.x, this.position.y, this.radius, 0, this.endArc);
        ctx.fill();
    }
}