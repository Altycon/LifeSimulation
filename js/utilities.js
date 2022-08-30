
export function fixCanvas(canvas,dpi,parent){
    if(!canvas) return;
    if(canvas.nodeName != "CANVAS") throw new Error('1st argument must be a html canvas element.');
    let style_width;
    let style_height;
    if(parent){
        style_width = +getComputedStyle(parent).getPropertyValue('width').slice(0, -2);
        style_height = +getComputedStyle(parent).getPropertyValue('height').slice(0, -2);
    }else{
        style_width = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
        style_height = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
    }
    const new_width = style_width*dpi;
    const new_height = style_height*dpi;
    canvas.setAttribute('width', new_width);
    canvas.setAttribute('height', new_height);
    return [new_width,new_height];
}
export function getCanvasDemensions(canvas,dpi){
    if(!canvas) return;
    if(canvas.nodeName != "CANVAS") throw new Error('1st argument must be a html canvas element.');
    const w = +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
    const h = +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
    return {width: w*dpi, height: h*dpi};
}
export const random = (min,max,bool)=> bool ? Math.floor(Math.random()*(max-min)+min):Math.random()*(max-min)+min;