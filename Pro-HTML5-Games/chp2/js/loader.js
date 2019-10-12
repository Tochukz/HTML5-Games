/* Image and Sound Asset Loader*/
const loader = {
    loaded: true,
    loadedCount: 0, // Assets that have been loaded so far
    totalCount: 0, // Total number of assets that need loading
    init: function() {
        // Check for sound support
        let mp3Support, oogSupport;
        const audio = document.createElement("audio");
        
        if (audio.canPlayType) {
            // Currently canPlayType() returns: "", "maybe" or "probably"
            mp3Support = "" !== audio.canPlayType("audio/mpeg");
            oogSupport = "" !== audio.canPlayType("audio/ogg; codecs=\"vorbis\"");
        } else {
            // The audio tag is not supported
            mp3Support = false;
            oogSupport - false;
        }
        //Initialize soundFileExtn to undefined and set it to ".oog" or ".mp3" if supported.
        loader.soundFileExtn = undefined;
        if (oogSupport) {
            loader.soundFileExtn = ".ogg";
        } else if (mp3Support) {
            loader.soundFileExtn = ".mp3";
        }
    },
    loadImage: function(url) {
        this.loaded = false;
        this.totalCount++;
        game.showScreen("loadingscreen");
        
        const image = new Image();
        image.addEventListener("load", loader.itemLoaded, false);
        image.src = url;

        return image;
    },
    soundFileExtn: ".ogg",
    loadSound: function(url) {
        this.loaded = false;
        this.totalCount++;
        game.showScreen("loadingscreen");
        const audio = new Audio();
        audio.addEventListener("canplaythrough", loader.itemLoaded, false);
        audio.src = url + loader.soundFileExtn;
        return audio;
    },
    itemLoaded: function(ev) {
        // Stop Listening for event type ( load or canplaythrough) for this item now that it has been loaded
        ev.target.removeEventListener(ev.type, loader.itemLoaded, true);
        loader.loadedCount++; 
        document.getElementById("loadingmessage").innerHTML = `Loaded ${loader.loadedCount} of ${loader.totalCount}`; 
        if (loader.loadedCount === loader.totalCount) {
            // Loader has loaded completely... 
            // Reset and clear the loader
            loader.loaded = true;
            loaderCount = 0;
            loader.totalCount = 0;

            // Hide the loading screen
            game.hideScreen("loadingscreen");

            // and call the loader.onload method if it exists
            if (loader.onload) { 
                loader.onload();
                loader.onload = undefined;
            } 
        }
    }

};
