
//Canvas
const LIFE_CANVAS_PARENT = document.querySelector('.life-canvas_container');
const LIFE_CANVAS = document.getElementById('LifeCanvas');
//const [width, height] = fixCanvas(LIFE_CANVAS,DPI);
const LC_CTX = LIFE_CANVAS.getContext('2d'); 



const draw = (x,y,c,s)=>{
    //LC_CTX.beginPath();
    LC_CTX.fillStyle = c;
    LC_CTX.fillRect(x,y,s,s);
    // LC_CTX.arc(x,y,s,0,Math.PI*2);
    // LC_CTX.fill();
}

const particles=[];
const particle = (x,y,c)=>{
    return {"x":x, "y":y, "vx":0, "vy":0, "color":c};
}

const random = ()=>{
    return Math.random()*400+50;
}
const create = (number,color)=>{
    const group = [];
    for(let i = 0; i < number; i++){
        group.push(particle(random(), random(), color));
        particles.push(group[i])
    }
    return group;
}
const rule = (particles1, particles2, g)=>{
    for(let i = 0; i < particles1.length; i++){

        let fx = 0;
        let fy = 0;

        for(let j = 0; j < particles2.length; j++){
            let a = particles1[i];
            let b = particles2[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d = Math.sqrt( dx*dx + dy*dy);

            if(d > 0 && d < 80){
                const F = g * 1/d;
                fx += (F * dx);
                fy += (F * dy);
            }
            a.vx = (a.vx + fx) * 0.05;
            a.vy = (a.vy + fy) * 0.05;
            a.x += a.vx;
            a.y += a.vy;
            if(a.x <0 || a.x > width){ a.vx *= -1};
            if(a.y < 0 || a.y > height){ a.vy *= -1};
        }
    }
}
const total_particles = 500;
const yellow = create(total_particles,"yellow");
const red = create(total_particles,"red");
const green = create(total_particles, "green");

const update = ()=> {
    rule(green, green, 0.037);
    rule(green, red, -0.017);
    rule(green, yellow, 0.01);
    rule(red,red, -0.010);
    rule(red,green, -0.034);
    rule(yellow, yellow, 0.01);
    rule(yellow, green, -0.020);

    LC_CTX.clearRect(0,0,width,height);
    draw(0,0,"black", width*2);
    for(let i = 0; i < particles.length; i++){
        draw(particles[i].x, particles[i].y, particles[i].color, 2);
    }
    requestAnimationFrame(update);
}
update();