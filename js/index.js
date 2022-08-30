/**
 *      ARTIFICIAL LIFE SIMULATION
 *  source author: Brainxyz
 *  source: https://www.youtube.com/watch?v=0Kx4Y9TVMGg&t=704s
 * 
 *  code author: Clayton McDaniel
 *  
 */

import { LifeSimulation } from "./life-simulation.js";
import { fixCanvas, random } from "./utilities.js";

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
const [width, height] = fixCanvas(LIFE_CANVAS,DPI);
const LC_CTX = LIFE_CANVAS.getContext('2d'); 
LC_CTX.translate(width*0.5, height*0.5);

let parameters;
let simulation;
let lifeInterval;
let animating = false;



function connectInputAndOutputDisplays(){
    const GROUP_ELEMENTS = [...document.querySelectorAll('.group')];
    const RULE_FORCE_ELEMENTS = [...document.querySelectorAll('.js-rule-force-input_container')];
    

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

    for(let j = 0; j < RULE_FORCE_ELEMENTS.length; j++){
        const force_input_container = RULE_FORCE_ELEMENTS[j];
        const force_input = force_input_container.querySelector('.js-rule-force_input');
        const force_output = force_input_container.querySelector('.js-rule-force_output');
        force_input.addEventListener('input', (ev)=>{
            force_output.innerText = ev.currentTarget.value;
        })
        force_output.innerText = force_input.value;
    }
}


function getParameters(){
    const groups = [];
    const rules = [];
    
    const GROUP_ELEMENTS = [...document.querySelectorAll('.group')];
    const RULE_ELEMENTS = [...document.querySelectorAll('.rule')];

    for(let i = 0; i < GROUP_ELEMENTS.length; i++){
        const group = GROUP_ELEMENTS[i];
        const color_value = group.querySelector('.js-group-color_select').value;
        const count_value = group.querySelector('.js-group-count_input').value;
        const size_value = group.querySelector('.js-group-size_input').value;

        groups.push({
            id: `Group${i+1}`,
            color: color_value,
            count: count_value,
            size: size_value
        })
       
    }

    for(let j = 0; j < RULE_ELEMENTS.length; j++){
        const rule = RULE_ELEMENTS[j];
        const group1_value = rule.querySelector('.js-rule-group1_select').value;
        const type_value = rule.querySelector('.js-rule-type_select').value;
        const group2_value = rule.querySelector('.js-rule-group2_select').value;
        const force_value = rule.querySelector('.js-rule-force_input').value;

        rules.push({
            id: `Rule${j+1}`,
            group1: group1_value,
            group2: group2_value,
            type: type_value,
            force: force_value
        })
        
    }
    return {groups,rules}
    
}




function animateLife(){
    function animate(){
        simulation.Start();
        lifeInterval = requestAnimationFrame(animate);
    }
    animate();
}

function resetAnimation(ev){
    ev.preventDefault();
    cancelAnimationFrame(lifeInterval);
    lifeInterval = null;
    animating = false;
    parameters = getParameters();
    simulation = new LifeSimulation(LC_CTX, width,height,parameters);
    LC_CTX.clearRect(-width*0.5, -height*0.5, width, height);
}
function stopAnimation(ev){
    if(!animating) return;
    ev.preventDefault();
    cancelAnimationFrame(lifeInterval);
    animating = false;
}
function startAnimation(ev){
    if(animating) return;
    ev.preventDefault();
    //parameters = getParameters();
    //simulation = new LifeSimulation(LC_CTX, width,height,parameters);
    animateLife();

    STOP_ANIMATION_BUTTON.addEventListener('click', stopAnimation);
    animating = true;
}



const loadUp = ()=>{
    connectInputAndOutputDisplays();
    parameters = getParameters();
    
    simulation = new LifeSimulation(LC_CTX,width,height,parameters);
    START_ANIMATION_BUTTON.addEventListener('click', startAnimation);
    RESET_ANIMATION_BUTTON.addEventListener('click', resetAnimation)
}
const init = ()=>{
    
}

document.addEventListener('DOMContentLoaded', loadUp);
window.addEventListener('load', init);