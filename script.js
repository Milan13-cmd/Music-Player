let arr =[
    {songName:"Arjan Vailly Ne",url:"songs/Arjan Vailly Ne.mp3",img:"/Images/Animal.jpg"},
    {songName:"Sirfula Siraima",url:"/songs/Nepathya - Sirfula Siraima (शिरफूल शिरैमा).mp3",img:"./Images/Sirfula.jpg"},
    {songName:"Kalo Seto",url:"/songs/Purna Rai - Kalo-Seto.ogg",img:"./Images/Kalo_Seto.jpg"},
    {songName:"Siran Ma Photo",url:"songs/Siran Ma Photo Chha.ogg",img:"./Images/Siran_Ma.jpg"},
    {songName:"Hidda Hiddai", url:"/songs/1974AD - Hidda Hiddai .mp3", img:"./Images/hidda.jpg"},
    {songName:"Sapana Ko Mayalu", url:"./songs/Sapana Ko Mayalu.mp3", img:"./Images/Sapana.jpg"}
]

let allSongs = document.querySelector("#all-songs");
let poster = document.querySelector("#img");
let play = document.querySelector("#play");
let backward = document.querySelector("#backward");
let forward = document.querySelector("#forward");
let curtime = document.querySelector(".current-time");
let durtime = document.querySelector(".duration-time");
let volumeControl = document.querySelector("#volumeControl")
let audio = new Audio();

let selectedSong = 0;


function allThing(){
    let clutter = "";

    arr.forEach(function(elem,idx){
       clutter += ` <div class="song-card" data-index="${idx}">
       <div class="part1">
       <img src=${elem.img} alt="">
       <h2>${elem.songName}</h2>
       </div>
    </div>`
    });
    allSongs.innerHTML = clutter;    
    audio.src = arr[selectedSong].url;
    poster.style.backgroundImage = `url(${arr[selectedSong].img})`;
}
allThing();

// allSongs.addEventListener("click", function(dets){
//  selectedSong = dets.target.dataset.index;
//  allThing();
//  play.innerHTML=`<i class="ri-pause-line"></i>`
//  flag = 1;
//  audio.play();
// })

var flag = 0;


play.addEventListener("click", function(){
    if(flag == 0){
        play.innerHTML=`<i class="ri-pause-line"></i>`
        allThing();
        audio.play()
        flag = 1;
    }
    else{
        play.innerHTML=`<i class="ri-play-fill"></i>`;
        allThing();
        audio.pause();
        flag = 0;
    }
   
})

forward.addEventListener("click",function(){
    if(selectedSong < arr.length-1){
        selectedSong++;
        allThing();
        audio.play();
        backward.style.opacity = 1;
    }else{
        forward.style.opacity = 0.4;
       
    }
})
backward.addEventListener("click",function(){
    if(selectedSong > 0){
        selectedSong--;
        allThing();
        audio.play();
        forward.style.opacity=1;
    }else{
        backward.style.opacity = 0.4;
    }
})
// Event listener to play the next song when the current song ends
audio.addEventListener("ended", function() {
    selectedSong++;
    
    // Check if there are more songs in the array
    if (selectedSong < arr.length) {
        // Play the next song
        allThing()
        audio.src = arr[selectedSong].url;
        poster.style.backgroundImage = `url(${arr[selectedSong].img})`;
        audio.play();
    } else {
        // If there are no more songs, loop back to the first song
        selectedSong = 0;
        allThing();
        audio.src = arr[selectedSong].url;
        poster.style.backgroundImage = `url(${arr[selectedSong].img})`;
        audio.play();
    }
});

// Function to update the song progress and timer
function updateProgress() {
    
    let currentTime = Math.floor(audio.currentTime);
    
    let duration = isNaN(audio.duration) ? 0 : Math.floor(audio.duration);
    
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = currentTime - currentMinutes * 60;
    

    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = duration - durationMinutes * 60;
    
    // Add leading zero if seconds are less than 10
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    
    // Add leading zero if seconds are less than 10
    if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }
    
    // Update the current time and duration time elements
    curtime.textContent = `${currentMinutes}:${currentSeconds}`;
    durtime.textContent = `${durationMinutes}:${durationSeconds}`;
    
    // Update the duration slider value
    let progress = (audio.currentTime / audio.duration) * 100;
    document.querySelector(".duration-slider").value = isNaN(progress) ? 0 : progress;
}

audio.addEventListener("timeupdate", updateProgress);



// Function to handle seeking in the song
function seekSong() {
    // Calculate the seek time based on the value of the range input
    let seekTime = (audio.duration * (document.querySelector(".duration-slider").value / 100));
    
    // Set the current time of the audio to the seek time
    audio.currentTime = seekTime;
}

// Event listener for seeking in the song
document.querySelector(".duration-slider").addEventListener("input", seekSong);

// Voulme control
volumeControl.addEventListener('input', function() {
    // Convert the volume range from 0-100 to 0-1
    audio.volume = this.value / 100;
});
