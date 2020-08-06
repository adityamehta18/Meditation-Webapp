 const app = () => {

    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector('.vid-container video');

    const sounds = document.querySelectorAll(".sound-picker button");
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
    const outlineLength = outline.getTotalLength();

    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
          song.src =  this.getAttribute('data-sound');
          video.src =  this.getAttribute('data-video');
          checkplaying(song);
        })
    })

    
   play.addEventListener("click", () => {
    checkplaying(song);

   } );

    timeSelect.forEach(option => {
        option.addEventListener("click", function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        })
    })
   

   const checkplaying = song =>{
    if(song.paused){
        song.play();
        video.play();
        play.src = "image/pause.png";

    }
    else{
        song.pause();
        video.pause();
        play.src = "image/play.png"
    }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elaped = fakeDuration - currentTime;
        let  seconds = Math.floor(elaped % 60);
        let minutes = Math.floor(elaped / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = "image/play.png";

        }

    }

   };

 app();