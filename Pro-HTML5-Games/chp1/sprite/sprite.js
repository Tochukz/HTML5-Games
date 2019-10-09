function get2DContext() {
    const canvas = document.getElementById('man-canvas');
    const context = canvas.getContext('2d');
    return context; 
}

function drawWalkingMan(x, y) {
  const manWidth = 103;
  const manHeight = 217;
  const context = get2DContext();
  const image = new Image();
  image.src = 'man-walking.png';
  context.clearRect(0, 0, 2048, 512);
  context.drawImage(image, x, y, manWidth, manHeight, x, y, manWidth, manHeight)
}


let i = 0;
function loopSprite() {
    let x = 103;
    let y = 0;
    let loop = setTimeout(() => { 
        if (i <=16 ) {
            drawWalkingMan(x*i, y);            
            console.log(x*i, y)
            i++;
        } 
        clearTimeout(loop);      
        loopSprite();
    }, 500)
    
}
loopSprite();

//requestAnimationFrame(loopSprite)

// let j =0;
// function useAnimationFrame() {
//     requestAnimationFrame()
//     for(let j =0; j<16; j++) {
//         requestAnimationFrame(drawWalkingMan)
//     }
// }