const game = {
    // Start initializing objects, preloading assets and display start screen
    init: function() {
        // Get handler for game canvas and context 
        game.canvas = document.getElementById("gamecanvas");
        game.context = game.canvas.getContext("2d");
        
        // Initialize the objects
        levels.init();
        loader.init();
        mouse.init();

        // Hide all game layers and display the start screen
        game.hideScreens();
        game.showScreen("gamestartscreen");
    },
    hideScreens: function() {
        const screens = document.getElementsByClassName("gamelayer");
        // Iterate throught all the game layer and set their display to none
        for (let i = screens.length - 1; i >= 0; i--) {
          let screen = screens[i];
          screen.style.display = "none";
        }
    },
    hideScreen: function(id) {
        const screen = document.getElementById(id);
        screen.style.display = "none";
    },
    showScreen: function(id) {
        const screen = document.getElementById(id);
        screen.style.display = "block"
    },
    showLevelScreen: function() {
        game.hideScreens();
        game.showScreen("levelselectscreen")
    },
    // Store current game state - intro, wait-for-firing, firing, fired, load-next-hero, success, failure
    mode: "intro",
    // X & Y coordinate of the slingshot
    slingshotX: 140,
    slingshotY: 280,
    // X & Y coordinate of point where band is attached to sligshot
    sligshotBandX: 140 + 55,
    sligshotBandY: 280 + 23,
    // Flag to check if the game has ended
    ended: false,
    // The game score
    score: 0,
    // X axis offset for panning the screen from left to right
    offsetLeft: 0,
    start: function() { 
        game.hideScreens();
        // Display the game canvas and score
        game.showScreen("gamecanvas");
        game.showScreen("scorescreen");

        game.mode = "intro";
        game.currentHero = undefined;
        game.offsetLeft = 0;
        game.ended = false;
        game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
    },
    // Maximum panning speed per frame in pixels
    maxSpeed: 3,
    // Pan the screen so it centers at newCenter (or at least as close as possible)
    panTo: function(newCenter) {
      // Minimum and maximum panning offset
      let minOffset = 0;
      maxOffset = game.currentLevel.backgroundImage.width - game.canvas.width;

      // The current center of the screen is half the screen width from the left offset
      let currentCenter = game.offsetLeft + game.canvas.width / 2 ;

      // If the distancce between new center and current center is > 0 and we have not panned to the min and max offset limits, keep panning
      if ( Math.abs(newCenter - currentCenter) > 0 && game.offsetLeft <= maxOffset && game.offsetLeft >= minOffset) {
          // We will travel half the distance from the newCenter to currentCEnter in each tick
          // This will allow easing
          let deltaX = (newCenter - currentCenter) / 2;

          // However if deltaX is really high, the screen will pan too fast, so if it is greater than maxSpeeed
          if (Math.abs(deltaX) > game.maxSpeed) {
              // Limit delta x to game.maxSpeed (and keep the sign of deltaX)
              deltaX = game.maxSpeed * Math.sign(deltaX);
          }

          // And if we have almost reached the goal, just get to the ending in this turn 
          if (Math.abs(deltaX) <= 1) {
            deltaX = (newCenter - currentCenter);
          } 

          // Finally add the adjusted deltaX to offsetX so we move the screen by deltaX 
          game.offsetLeft += deltaX;

          // And make sure we don't cross the minimum or maximum limit
          if (game.offsetLeft <= minOffset) {
            game.offsetLeft = minOffset;

            // Let calling function know that we pannded as close as possible to the newCenter
            return true;
          } else if (game.offsetLeft >= maxOffset) {
             game.offsetLeft = maxOffset;

             // Let calling function know that we have panned as close as posslible to the newCenter
             return true;
          }
      } else {
        //  Let calling function know that we have panned as close as possible to the newCenter
        return true;
      }
    },
    handleGameLogic: function() {
        if (game.mode === "intro") {
            if (game.panTo(700)) {
                game.mode = "load-next-hero";
            }
        }

        if (game.mode === "wait-for-firing") {
            if (mouse.dragging) {
                game.panTo(mouse.x + game.offsetLeft);
            } else {
                game.panTo(game.slingshotX);
            }
        }
        if (game.mode == "load-next-hero") {
            // First count the heros and villains and populate their respective arrays
            // Check if any villains are alive, if not, end the level(success)
            // Check if there are any more heros left to load, if not end the level (failure) 
            // Load the hero and set mode to wait-for-firing
            game.mode = "wait-for-firing";
        }
        if (game.mode === "firing") {
            // If the mouse button is down, allow the hero to be dragged around aimed
            // If not, fire the hero into the air
        }
        if (game.mode === "fired") {
            // Pan to the location of the current hero as he flies
            // Wai till the hero stops moving or is out of bounds
        }
        if (game.mode === "level-success" || game.mode === "level-failure") {
            // First pan all the way back to the left
            // Then show the game as ended and show the ending screen
        }
    },
    animate: function() {
        // Handle panning, game states, and control flow
        game.handleGameLogic();

        // Draw the background with parallax scrolling
        // First draw the background image, offset by a fraction of the offsetLeft distance (1/4)
        // The bigger the fraction , the closer the background appears to be 
        game.context.drawImage(game.currentLevel.backgroundImage, game.offsetLeft / 4, 0, game.canvas.width, game.canvas.height, 0, 0, game.canvas.width, game.canvas.height);
        game.context.drawImage(game.currentLevel.foregroundImage, game.offsetLeft, 0, game.canvas.width, game.canvas.height, 0, 0, game.canvas.width, game.canvas.height);

        // Draw the base of the sligshot, offset by the entire offsetleft distance
        game.context.drawImage(game.slingshotImage, game.slingshotX - game.offsetLeft, game.slingshotY);

        // Draw the front of the slingshot, offset by th entire offset distance
        game.context.drawImage(game.slingshotFrontImage, game.slingshotX - game.offsetLeft, game.slingshotY);
        if (!game.ended) {
            game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
        }
    }
};

// Initialize game once page has fully loaded
window.addEventListener("load", function() {
    game.init();
});
