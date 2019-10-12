const levels = {
    // Level data 
    data: [
        {  // First level
            foreground: "desert-foreground",
            background: "clouds-background",
            entities: []
        },
        {   // Second level
            foreground: "desert-foreground",
            background: "clouds-background",
            entities: []
        }
    ],
    // Ninitialize level selection screen
    init: function() {
        const levelSelectScreen = document.getElementById("levelselectscreen");
        
        // An event handler to call
        const buttonClickHandler = function() {
            game.hideScreen("levelselectscreen");

            // Level label values are 1, 2. Level are 0, 1
            levels.load(this.value - 1);
        };

        for (let i = 0; i < levels.data.length; i++) {
            const button = document.createElement("input");
            button.type = "button";
            button.value = (i + 1); // Level labels are 1, 2
            button.addEventListener("click", buttonClickHandler);

            levelSelectScreen.appendChild(button);
        }
    },

    // Load all data and images for a specific level 
    load: function(number) {
       // Declare a new currentLeven object
       game.currentLevel = { number: number};
       game.score = 0;
       document.getElementById("score").innerHTML = `Score: ${game.score}`; 
       const level = levels.data[number];
       // Load the background, foreground, and slingshot images
       game.currentLevel.backgroundImage = loader.loadImage(`images/backgrounds/${level.background}.png`);
       game.currentLevel.foregroundImage = loader.loadImage(`images/backgrounds/${level.foreground}.png`)
       game.slingshotImage = loader.loadImage("images/slingshot.png");
       game.slingshotFrontImage = loader.loadImage("images/slingshot-front.png");

       // Call game.start() once the assets have loaded
       loader.onload = game.start;
    }
};
