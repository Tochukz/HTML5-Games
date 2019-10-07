function make2DContext() {
    const canvas = document.getElementById('style-canvas');
    const context = canvas.getContext('2d');
    return context;
}

function drawRedFillRect() {
    const context = make2DContext();
    // Set fill color to red
    context.fillStyle = "red";
    // Draw a red filled rectangle
    context.fillRect(310, 160, 100, 50);
}

function drawGreenStrokeAndFillYellow() {
  const context = make2DContext();
  // Set stroke color
  context.strokeStyle = "green";
  // Draw a green stroked rectangle
  context.strokeRect(310, 240, 100, 50);
  // Set fill color to yellow using rgb 
  context.fillStyle = "rgb(255, 255, 0)";
  // Draw a yellow filled rectangle
  context.fillRect(420, 160, 100, 50);
  //  Set fill color to green with an alpha of 0.6
  context.fillStyle = "rgb(0, 0, 0 , 0.6)";
  // Draw a semi-transparent black filled rectangle
  context.fillRect(450, 180, 100, 50);
}

function drawTexture() {
    const context = make2DContext();
    // Get a handle to the Image object
    const fireImage = document.getElementById("fire");
    const pattern = context.createPattern(fireImage, "repeat");
    // Set fill style to newly created pattern 
    context.fillStyle = pattern;
    // Draw a pattern filled rectangle 
    context.fillRect(120, 240, 130, 50);
}

drawRedFillRect();
drawGreenStrokeAndFillYellow();
drawTexture();