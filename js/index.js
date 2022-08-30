/**
 *      ARTIFICIAL LIFE SIMULATION
 *  source author: Brainxyz
 *  source: https://www.youtube.com/watch?v=0Kx4Y9TVMGg&t=704s
 * 
 *  code author: Clayton McDaniel
 *  
 */

import { LifeSimulation } from "./life-simulation.js";
import { Particle } from "./particle.js";
import { fixCanvas, getCanvasDemensions,random} from "./utilities.js";

console.log("Connected ...with random generated number", random(23423,543625436))

// DEFINING GLOBAL VARIABLES
const TWO_PI = Math.PI*2;
const DPI = devicePixelRatio;

// Buttons
const START_ANIMATION_BUTTON = document.querySelector('.js-start-animation_button'),
STOP_ANIMATION_BUTTON = document.querySelector('.js-stop-animation_button'),
RESET_ANIMATION_BUTTON = document.querySelector('.js-reset-animation_button');


//Canvas
const LIFE_CANVAS_PARENT = document.querySelector('.life-canvas_container');
const LIFE_CANVAS = document.getElementById('LifeCanvas');
const [width, height] = fixCanvas(LIFE_CANVAS,DPI, LIFE_CANVAS_PARENT);
const LC_CTX = LIFE_CANVAS.getContext('2d'); 
LC_CTX.translate(width*0.5, height*0.5);

let simulation;
let lifeInterval;
let parameters;



function connectInputAndOutputDisplays(){
    const GROUP_ELEMENTS = [...document.querySelectorAll('.group')];
    for(let i = 0; i < GROUP_ELEMENTS.length; i++){
        const group = GROUP_ELEMENTS[i];
        const count_input = group.querySelector('.js-group-count_input');
        const count_output = group.querySelector('.js-group-count_output');
        const size_input = group.querySelector('.js-group-size_input');
        const size_output = group.querySelector('.js-group-size_output');
        count_input.addEventListener('input', (ev)=>{
            count_output.innerText = ev.currentTarget.value;
        })
        size_input.addEventListener('input', (ev)=>{
            size_output.innerText = ev.currentTarget.value;
        })
        count_output.innerText = count_input.value;
        size_output.innerText = size_input.value;
    }
}
function animateLife(){
    function animate(){
        simulation.Start();
        lifeInterval = requestAnimationFrame(animate);
    }
    animate();
}
function stopAnimation(ev){
    ev.preventDefault();
    cancelAnimationFrame(lifeInterval)
}
function startAnimation(ev){
    ev.preventDefault();

    //simulation = new LifeSimulation(LC_CTX, width,height);
    animateLife();

    STOP_ANIMATION_BUTTON.addEventListener('click', stopAnimation);
}



const loadUp = ()=>{
    simulation = new LifeSimulation(LC_CTX,width,height);
    connectInputAndOutputDisplays();
    START_ANIMATION_BUTTON.addEventListener('click', startAnimation);
}

document.addEventListener('DOMContentLoaded', loadUp);