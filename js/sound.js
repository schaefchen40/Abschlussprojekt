var sound, file;
var canvas;
var frameCtx;
var fft;
var ampli;
var w;
var spectMax;
var visual;
var rateSlider, volumeSlider;
var time;

//set predefined songs. they will be chosen randomly
var array = ["./media/wolke.mp3","./media/503.mp3","./media/ziemlichbestefreunde.mp3","./media/goldenyears.mp3"];
var textCount;

function preload(){                                                             //use preload to make sure file is ready on start
    var name = "filename=";
    var decodedCookie = decodeURIComponent(document.cookie);                    //get the cookie
    var ca = decodedCookie.split(";");
    var cookieValue;
    for(var i = 0; i <ca.length; i++) {                                         //for each segment (split at ;) get the substring
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            cookieValue = c.substring(name.length, c.length);                   //start at the end of "filename=" until the end of the current substring == filename stored in the cookie
        }
    }
    file = "./uploads/" + cookieValue;                                          //get the uploaded (with php) file
    
    if (cookieValue !== undefined){
        console.log("CookieFile: " + file);
    }else{
        file = array[Math.floor(Math.random() * array.length)]; 
        console.log("File: " + file);
    }
    sound = loadSound(file); 
}

function setup() {
    sound.stop();
    textCount = 20;
    createCanvas(window.innerWidth,window.innerHeight);
    volumeSlider = createSlider(0,3,1,0.2);                                     //create the slider to manipulate playback volume, min 0, max 3, set to 1, steps 0.2
    rateSlider = createSlider(0,2,1,0.1);                                       //create the slider to manipulate playback speed, min 0, max 2, set to 1, steps 0.1
    volumeSlider.parent("sliderVolumeCtrl");                                    //create slider in the predifined dom parent element
    rateSlider.parent("sliderRateCtrl");
    document.getElementById("sliderValueVolume").innerText=rateSlider.value(); 
    document.getElementById("sliderValueRate").innerText=rateSlider.value(); 
    spectMax = 512;
    //spectMax = 256;
    
    visual=1;
    if(window.innerWidth < 1024 && visual == 1){  
        spectMax = 512;         
    }else if(window.innerWidth < 1024 && visual == 2){                          //simplify the spectrum if window size is small
        spectMax = 128;
    }
    fft = new p5.FFT(0.,spectMax);                                              //set fast fourier tranformation
    w = (width)/(spectMax);
    amp = new p5.Amplitude();
    //colorMode(HSL);
    if(sound.isLoaded()){
        sound.setVolume(1);
        time = milliToMini(sound.duration());                                   //call function  to convert miliseconds to minutes, seconds and miliseconds
        document.getElementById("soundValueDuration").innerText=time;      
        sound.play();
    }
}

function play(){
    var icon;
    if(sound.isPlaying()){
        sound.pause();
        icon = "&#xE039";
        console.log(document.getElementById("playIcon").innerText);
        document.getElementById("playIcon").innerHTML = icon;
        //document.getElementById("playIcon").title="Play"; 
        // document.getElementById("playButton").innerText="Play";         
    }else if(sound.isPlaying() == false){
        sound.play();
        icon = "&#xE036";
        document.getElementById("playIcon").innerHTML = icon; 
        //document.getElementById("playIcon").title="Pause";    
    }
}

function forward(){
    if(sound.isPlaying()){
        var jumpSize = sound.duration()/10;
        var currTime = sound.currentTime();
        if(currTime < currTime + jumpSize){
            sound.jump(currTime + jumpSize);
        }    
    }
}
function backward(){
    if(sound.isPlaying()){
        var jumpSize = sound.duration()/10;
        var currTime = sound.currentTime();
        if(currTime > currTime - jumpSize){
            sound.jump(currTime - jumpSize);
        }  
    }
}
function milliToMini(milli){                                        //convert miliseconds to minutes, seconds and miliseconds using moment.js
    minutes = Math.floor(milli / 60);
    seconds= milli - minutes * 60;     
    return minutes + ":" + seconds.toFixed(4);
}

function draw() {
    visual = document.querySelector('input[name="visuType"]:checked').value;
    background(0);
    sound.setVolume(volumeSlider.value());
    sound.rate(rateSlider.value());
    
    document.getElementById("sliderValueVolume").innerText=volumeSlider.value(); 
    document.getElementById("sliderValueRate").innerText=rateSlider.value(); 
    //document.getElementById("sliderValueEnergy").innerText=energySlider.value()+ " Hz"; 
    soundValueEnergy
    time = milliToMini(sound.currentTime());
    document.getElementById("soundValueCurrentTime").innerText=time; 
    var frames = sound.frames();
    document.getElementById("soundValueFrames").innerText=frames; 
    if(sound.channels() == 1){
        document.getElementById("soundValueChannel").innerText="Mono";
    }else if(sound.channels() == 2){
        document.getElementById("soundValueChannel").innerText="Stereo";
    }
    
   // amp.toggleNormalize(true);
   var spectrum = fft.analyze();  
   var spectralCentroid = fft.getCentroid();   
   var nyquist = sound.sampleRate() / 2;
    if(visual == 1){          
        var mean_freq_index = spectralCentroid/(nyquist/spectrum.length);      
       // var freqPos = (width / spectMax) * mouseX;
        var freqPos = map(mouseX, 0, width, 0, 20000);
        
        document.getElementById("soundValueFrequency").innerText= round(freqPos) +" Hz"; 
        
        if(textCount == 20){
            document.getElementById("soundValueEnergy").innerText=fft.getEnergy(round(freqPos)); 
            document.getElementById("soundValueCentroid").innerText=round(spectralCentroid)+" Hz";
            document.getElementById("soundValueSampleRate").innerText=round(sound.sampleRate())+" Hz"; 
            textCount = 0;
            centroidplot = map(log(mean_freq_index), 0, log(spectrum.length), 0, width);
        } 

        stroke(0,0,0);
        fill(255,255,255);   
        rect(centroidplot, 35, width / spectrum.length*0.5, height)

        var cnt = 255;
        var cnt2 = 0;
        var cnt3 = 0;
        var temp = 255;      
        for(var i = 0; i < spectrum.length; i++){
            var ampli = spectrum[i];
            var y = map(ampli, 0, 256, height,0);
   
            if(i <= temp){
                cnt2 = i;
            } 
            else if(i > temp && i <= 2 * temp){
                cnt = 255 - i;
                cnt2 = 255;
            }
            else if(i > 2 * temp && i <= 3 * temp){
                cnt = 0;
                cnt2 = 255;
                cnt3++;
            }
            else if(i > 3 * temp && i <= 4 * temp){
                cnt = 0;
                cnt2 = 255 - i;
                cnt3 = 255;
            }
            else if(i > 4 * temp && i <= 5 * temp){
                cnt = i;
                cnt2 = 0;
                cnt3 = 255;
            }
            

            fill(cnt,cnt2,cnt3); 
            rect(i * w,y,w,height-y)
        }
        if(mouseY > 90){
            stroke(132,132,132);
            line(mouseX, 35, mouseX, height);
        }
        textCount = textCount + 1;
    }else if(visual == 2){
        //var spectrum = fft.analyze();
        if(textCount == 20){
            document.getElementById("soundValueCentroid").innerText=round(spectralCentroid)+" Hz";
            document.getElementById("soundValueSampleRate").innerText=round(sound.sampleRate())+" Hz"; 
            textCount = 0;
        }        
        // document.getElementById("soundValueCentroid").innerText=round(spectralCentroid)+" Hz";
        // document.getElementById("soundValueSampleRate").innerText=round(sound.sampleRate())+" Hz";  
        
        translate(width/2,height/2);
        for(var i = 0; i < spectrum.length; i++){
            var ampli = spectrum[i];
            
            var angle = map(i, 0, spectrum.length, 0, 2*Math.PI);
            //console.log("Angle: " +angle*180/Math.PI);
            //console.log("ampli: " +ampli);
            var rad = map(ampli,0,256,0,600);
            var color = map(i, 0, spectrum.length, 0,256);
            var x_dot = rad * cos(angle);
            var y_dot = rad * sin(angle);
            stroke(255-color,255-(color/3),color);
            line(0,0,x_dot,y_dot);
        
        }
        textCount = textCount + 1;
    }else if(visual == 3){
        var waveform = fft.waveform();
        if(textCount == 20){
            document.getElementById("soundValueCentroid").innerText=round(spectralCentroid)+" Hz";
            document.getElementById("soundValueSampleRate").innerText=round(sound.sampleRate())+" Hz";   
            textCount = 0;
        }   
        noFill();
        beginShape();
        stroke(184, 184, 184);
        strokeWeight(1);
        for(var i = 0; i < waveform.length; i++){
            var x = map(i, 0, waveform.length, 0, width);
            var y = map(waveform[i], -1, 1, 0, height);
            vertex(x,y);
        }
        endShape();
        textCount = textCount + 1;
    }
}





