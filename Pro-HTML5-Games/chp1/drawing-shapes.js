/* Create canvas context  */
function get2DContext() {
    const canvas = document.getElementById('shape-canvas');
    const context = canvas.getContext('2d');
    return context; 
}

/* Drawing Rectangles */
function drawFillRects() {
    const context = get2DContext();
    context.fillRect(200, 10, 100, 100);
    context.fillRect(50, 70, 90, 30);
}

function drawStrokeRect() {
    const context = get2DContext();
    context.strokeRect(110, 10, 50, 50);
    context.strokeRect(30, 10, 50, 50);
}

function clearReact() {
    const context = get2DContext();
    setTimeout(()=> {
        context.clearRect(210, 20, 30, 20);
    }, 1000);
    setTimeout(() => {
        context.clearRect(260, 20, 30, 20);
    }, 2000)
}

drawFillRects();
drawStrokeRect();

/* Drawing complex shapes */
function drawFillTriangle() {
    const context = get2DContext();
    context.beginPath();
    context.moveTo(10, 120); //Start drawing at 10, 120
    context.lineTo(10, 180);
    context.lineTo(110, 150);
    context.fill(); //Close the shape and fill it out
}

function drawStrokeTriangle() {
    const context = get2DContext();
    context.beginPath();
    context.moveTo(140, 160); // Start drawing at 140, 160
    context.lineTo(140, 220);
    context.lineTo(40, 190);
    context.closePath();
    context.stroke();
}

function drawComplexLines() {
    const context = get2DContext(); 
    context.beginPath();
    context.moveTo(160, 160); // Start drawing at 160, 160
    context.lineTo(170, 220);
    context.lineTo(240, 210)
    context.lineTo(260, 170)
    context.lineTo(190, 140);
    context.closePath();
    context.stroke();
}

function drawSemiCircle() {
    const context = get2DContext();
    context.beginPath();
    // Draw an arc at (400, 50) with radius 40 from 0 to 180 degrees, anticlockwise
    // PI radians = 180 degrees
    context.arc(100, 300, 40, 0, Math.PI, true);
    context.stroke();
}

function drawFullCircle() {
    const context = get2DContext();
    context.beginPath();
    // Draw an arc 1t 500, 50 with radius 30 from 0, 360, anticlockwise  
    // 2*PI radians - 360 degrees
    context.arc(100, 300, 30, 0, 2*Math.PI, true);
    context.fill();
}

function drawThreeQuarterArc() {
    const context = get2DContext();
    // Draw an arc at (400, 100) with radius 25 from 0 to 270 degrees, clockwise 
    // (3/2*PI radians = 270 degrees)
    context.beginPath();
    context.arc(200, 300, 25, 0, 3/2 * Math.PI, false);
    context.stroke();
}

drawFillTriangle();
drawStrokeTriangle();
drawComplexLines();
drawSemiCircle();
drawFullCircle();
drawThreeQuarterArc();


/*
fillRect(x, y, width, height)
strokeRect(x, y, width, height) 
clearRect(x, y, width, height)
arc(x, y, radius, startAngle, endAngle, anticlockwise)
arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean)
*/