function makeSound() {
    // Create a new Audio object
    const sound = new Audio();

    // Select the source of the sound
    sound.src = "bensound-happyrock.mp3";
    // This will only work on browsers that support mp3  

    // Play the sound after x milliseconds
    const x = 2000
    setTimeout(() => {
        sound.play();
    }, x)
}

function playSupporteAudio() {
    const audio = document.createElement("audio");
    let mp3Support, oggSupport;
    if (audio.canPlayType) {
        // CUrrently canPlayType() return: "", "maybe" or "probably"
        mp3Support = "" !== audio.canPlayType("audio/mpeg");
        oggSupport = "" !== audio.canPlayType("audo/ogg; codecs=\"vorbis\"");
    } else {
        // The audio tag is not supported
        mp3Support = false;
        oggSupport = false;
    }

    // Chekc for oog then mp3, and finally set sound fileExtn to undefined
    let soundFileExtn = undefined;
    if (oggSupport) {
        soundFileExtn = ".oog";
    } else if (mp3Support) {
        soundFileExtn = ".mp3";
    }

    if (soundFileExtn) {
        const sound = new Audio();
        // Load sound file with the detected extension
        sound.src = "bensound-acousticbreeze" + soundFileExtn;
        
        //sound.play();
        // We can use the canplaythrough event to check if the browser can play the entire audio file without needing to pause and buffer the file
        sound.addEventListener("canplaythrough", function() {
          sound.play();
        });

        // oTher usable events includes loadedmetadata, canplay, 
    }
}

//makeSound();
playSupporteAudio();