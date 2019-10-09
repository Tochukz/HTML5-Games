function makeContext(id = 'images-canvas') {
    const canvas = document.getElementById(id);
    const context = canvas.getContext('2d');
    return context;
}

function drawImage() {
    const context = makeContext();
    // Get a handle to the Image object
    const image = document.getElementById('space-ship');

    //Draw the image at 0, 50
    context.drawImage(image, 0, 50);
    
    // Scale the image to half the original size 
    context.drawImage(image, 300, 100, 56, 25);

    // Draw part of the image 
    context.drawImage(image, 0, 0, 60, 50, 320, 420, 60, 50)
}

drawImage();

/**
 drawImage(image, x, y) // Draws the image on the canvas at (x, y)
 drawImage(image, x, y, width, height) // Scales the image to the specified width and height and then draws it at (x, y)
 drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height) 
 // Clips a rectangle from the image at (sourceX, sourceY) with dimensions (sourceWidth, sourceHeight), scales it to the specified width and height, and draws it on the canvas at (x, y) 
 drawImage(image, clipX, clipY, clipDymX, clipDymY, canvasX, canvaY, scaleX, scaleY)
 */

 /* Tranforming and Rotating */
function trans() {
    const image = document.getElementById('space-ship');
    const context = makeContext('trans-canvas');
    // Translate origin to location of object
    context.translate(250, 370);
    // Rotate about the new origin by 60 degrees
    context.rotate(Math.PI / 3);
    context.drawImage(image, 0, 0, 200, 113, -30, -25, 60, 50);
    // Restore to original state by rotating and translating back 
    context.rotate(-Math.PI / 3);
    context.translate(-250, -370);
    // Translate origin to location of object
    context.translate(300, 370);
    // Rotate about the new origin 
    context.rotate(-Math.PI /3);
    context.drawImage(image, 0, 0, 200, 113, -30, -25, 60, 50);
    // Resotre to original state by rotating and translating back
    context.rotate(-3 * Math.PI / 4); 
    context.translate(-300, -370);
}

trans();

/* Dynamically loading an image */
function dynamicLoadImage() {
    const image = new Image();
    image.src= "space-ship.min.png";
    const context = makeContext('dynamic-image-canvas');
    context.drawImage(image, 100, 100);
}
dynamicLoadImage();

/* Simple Inage loader */
const imageLoader = {
    loaded: true,
    loadedImages: 0,
    totalImages: 0,
    load: function(url) {
        this.totalImages++; 
        this.loaded = false;
        const image = new Image();
        image.src = url; 
        image.onload = function() {
            imageLoader.loadedImages++;
            if (imageLoader.loadedImages === imageLoader.totalImages) {
                imageLoader.loaded = true;
            }
            image.onload = undefined;
        }
        return image;
    }
}
