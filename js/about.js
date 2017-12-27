var sound;
var file;
var canvas;

/* Announced in June 2017 Apple prevents the autp-play function for video
and audio file depending on the users settings - giving the control 
of when and what is played to the user. For this small web project this
would counteract the intention to show the possibilities of playing with
sound. Therefore this workaround was built in.*/
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

