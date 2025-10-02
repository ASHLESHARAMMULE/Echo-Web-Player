let cards = document.querySelectorAll(".card");
let currentAudio = null;
for (let card of cards) {
    card.addEventListener("click", () => {
        //Audio
        if (currentAudio && currentAudio !== card.querySelector("audio")) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        let audio = card.querySelector("audio");
        currentAudio = audio;
        currentAudio.play();

        change(card);
    });
}


function change(card){
        //Image,name,singer add at the footer
        //Image
        let cardImg = card.querySelector("img");
        let audioImgSrc = cardImg.src;
        let img = document.querySelector(".songImg img");
        img.src = audioImgSrc;

        //Name
        let songName = card.querySelector("p.card-title");
        let song = document.querySelector(".song");
        song.innerText = songName.innerText;

        //Singer
        let cardSinger = card.querySelector("p.card-singer");
        let singer = document.querySelector(".singer");
        singer.innerText = cardSinger.innerText;

        //Duration
        if (!isNaN(currentAudio.duration) && currentAudio.duration > 0) {
            document.querySelector(".total-time").innerText = formatTime(currentAudio.duration);
        } else {
            currentAudio.addEventListener("loadedmetadata", () => {
                document.querySelector(".total-time").innerText = formatTime(currentAudio.duration);
            }, { once: true });
        }

        // Update bar while audio plays
        let progressBar = document.querySelector(".progress-bar");
        currentAudio.ontimeupdate = () => {
            document.querySelector(".curr-time").innerText = formatTime(currentAudio.currentTime);
            // Progress bar (optional)
            progressBar.value = (currentAudio.currentTime / currentAudio.duration) * 100;

        };

        // Seek when user drags/scrolls the progress bar
        progressBar.addEventListener("input", () => {
            let seekTime = (progressBar.value / 100) * currentAudio.duration;
            currentAudio.currentTime = seekTime;

        });

}

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = "0" + sec; // pad seconds
    return (`${min}:${sec}`);
}

//stop and play song
let stopBtn = document.querySelector(".player-controls .stop");
stopBtn.addEventListener("click", () => {
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
        } else {
            currentAudio.pause();
        }
    }
});

//next song
let nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", () => {
    let currAudioClass = currentAudio.classList[0];
    let no = parseInt(currAudioClass.replace("audio", ""), 10) + 1;//10-decimal 2-binary
    let totalSongs = document.querySelectorAll(".card").length;
    if(no>totalSongs-1){
        no=1;
    }
    let nextSong = document.querySelector(".audio" + no);

    // stop current
    currentAudio.pause();
    currentAudio.currentTime = 0;
  
    // play next
        currentAudio = nextSong;
        currentAudio.play();
        change(nextSong.parentElement);
    
});

//prev song
let prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", () => {
    let currAudioClass = currentAudio.classList[0];
    let no = parseInt(currAudioClass.replace("audio", ""), 10) - 1;//10-decimal 2-binary
    let totalSongs = document.querySelectorAll(".card").length;
    if(no<1){
        no=totalSongs-1;
    }
    let prevSong = document.querySelector(".audio"+no);

    // stop current
    currentAudio.pause();
    currentAudio.currentTime = 0;

    // play prev
        currentAudio = prevSong;
        currentAudio.play();
        change(prevSong.parentElement);
   
});

//random song
let randomBtn=document.querySelector(".random");
randomBtn.addEventListener("click",()=>{
    let totalSongs = document.querySelectorAll(".card").length-1;
    let no=Math.floor(Math.random()*8)+1;
    let prevSong=document.querySelector(".audio"+no);
    // stop current
    currentAudio.pause();
    currentAudio.currentTime = 0;

    // play prev
    currentAudio = prevSong;
    currentAudio.play();
    change(prevSong.parentElement);

});




