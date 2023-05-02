let myAudio = document.getElementById("myAudio");

    function playMusic() {
      myAudio.play();
    }

    function pauseMusic() {
      myAudio.pause();
    }

    var musicStarted = false;
    var canvas1 = true;
    var mode1 = true;

    // Create a button to start the audio
    var startButton = document.createElement('button');
    var musicButton = document.createElement('button');
    
    startButton.textContent = 'Start';
    musicButton.textContent = 'Start music';

      // Add a click event listener to the startButton
    musicButton.addEventListener('click', function () {
      if (musicStarted) {
        pauseMusic();
        musicButton.textContent = 'Start music';
        musicStarted = false;
      
      } else {
        playMusic();
        musicButton.textContent = 'Pause music';
        musicStarted = true;
      }
    });

    // Add a click event listener to the Buttons
    startButton.addEventListener('click', function () {
      start();
      document.body.removeChild(startButton);
      document.body.appendChild(musicButton);
    });

    document.body.appendChild(startButton);