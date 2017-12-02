var sound;
var file;
var canvas;
function preload(){
    file = "media/PeerGynt_SuiteNo1.mp3"; 
    sound = loadSound(file); 
}

function setup() {
    if(sound.isLoaded()){
        sound.setVolume(1);       
        sound.play();
    }
}

