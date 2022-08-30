"use strict";
import { random } from "./utilities.js";
import { Particle } from "./particle.js";

export class LifeSimulation{
    constructor(context,width,height,parameters){
        this.name = "Simulation of Artificail Life with mathematics";
        this.context = context;
        this.width = width;
        this.height = height;
        this.parameters = parameters;
        this.particles = [];

        this.groups = []
        for(let i = 0; i < this.parameters.groups.length; i++){
            const g = this.parameters.groups[i];
            const count = +g.count;
            const size = +g.size;
            const group = this.createGroup(count, g.color, size);
            this.groups.push(group);
        }
        
        this.rules = this.parameters.rules;
        this.started = true;
        this.totalParticles = 500;
        // this.white = this.createGroup(this.totalParticles, "white", 2);
        // this.yellow = this.createGroup(this.totalParticles, "yellow", 3);
        // this.red = this.createGroup(this.totalParticles, "red", 2);
        // this.green = this.createGroup(this.totalParticles/2, "limegreen", 3);
        // this.blue = this.createGroup(this.totalParticles, "blue", 1);
        this.counter = 0;
    }
    print(){
        console.log(this.constructor.name, this);
    }
    createGroup(number,color,size){
        const group = []
        for(let i = 0; i < number; i++){
            group.push(new Particle(
                random(-this.width*0.5, this.width*0.5), 
                random(-this.height*0.5, this.height*0.5), 
                size,
                color));
            this.particles.push(group[i])
        }
        return group;
    }
    rule(particles1, particles2, g){
        for(let i = 0; i < particles1.length; i++){
            let fx = 0;
            let fy = 0;
            for(let j = 0; j < particles2.length; j++){
                const a = particles1[i];
                const b = particles2[j];

                // find distance between each particle
                const dx = a.position.x - b.position.x;
                const dy = a.position.y - b.position.y;
                const d = Math.sqrt(dx*dx + dy*dy);

                if(d > 0 && d < 80){
                    const Force = g * 1/d;
                    fx += (Force * dx);
                    fy += (Force * dy);
                }
                a.velocity.x = (a.velocity.x + fx) * 0.4;
                a.velocity.y = (a.velocity.y + fy) * 0.4;
                
                // add velocity to position
                a.position.x += a.velocity.x;
                a.position.y += a.velocity.y;

                // check boundary
                if(a.position.x <= -this.width*0.5 || a.position.x >= this.width*0.5){
                    a.velocity.x *= -1;
                }
                if(a.position.y <= -this.height*0.5 || a.position.y >= this.height*0.5){
                    a.velocity.y *= 1;
                }
            }
        }
    }
    renderParticles(ctx){
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].render(this.context);
        }
    }
    Start(){
        if(!this.started) return;
        
        for(let i = 0; i < this.rules.length; i++){
            const rule = this.rules[i];
            const group1 = +rule.group1;
            const group2 = +rule.group2;
            const type = +rule.type;
            const force = +rule.force;
            
            this.rule(
                this.groups[group1], 
                this.groups[group2],
                force*type
                )
        }

        // this.rule(this.white, this.green, -.01);
        // this.rule(this.white, this.white, 0.004);
        // this.rule(this.white, this.red, 0.05);
        // this.rule(this.yellow, this.yellow, 0.001);
        // this.rule(this.yellow, this.red, -0.01);
        // this.rule(this.red, this.red, 0.002);
        // this.rule(this.red, this.green, -0.0056);
        // this.rule(this.green, this.green, -0.003);
        // this.rule(this.red, this.blue, -0.053);
        // this.rule(this.blue, this.blue, -0.006);
        
        // render
        this.context.clearRect(-this.width*0.5, -this.height*0.5, this.width,this.height);
        this.renderParticles();
    }
}

