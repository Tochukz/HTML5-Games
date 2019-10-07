function getDrawContext() {
    const canvas = document.getElementById('text-canvas');
    const context = canvas.getContext('2d');
    return context;
}

function drawText() {
  const context = getDrawContext();
  // Draw text
  context.fillText("This is some text..." , 330, 40)
  
  //Modify "the text
  context.font = "13pt Arial";
  context.fillText("This is in 13pt Arial...", 330, 60);
  
  // Draw strokes text
  context.font = "18pt Arial";
  context.strokeText("This is stroked in 18pt Arial...", 330, 80);
}

drawText();
/**
 strokeText(text, x, y);
 fillText(text, x, y);
 */