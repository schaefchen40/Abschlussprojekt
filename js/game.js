var sound;
var fft;
var osci;
var visual = document.querySelector('input[name="visuType"]:checked').value;
var playing = false;
var selection;
var hit = false;

var keyOffsetX = 200;
var keyWidth = 45;
var keyWidth2 = 35;
var keyHeight = 200;
var keyHeight2 = 90;
var keySpace = 2;
var note = [62, 64, 65, 67, 69, 71, 74, 76, 77, 79, 81, 83, 86, 88, 89, 91, 93];

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);
    fft = new p5.FFT();
    osci = new p5.Oscillator();
    selection = document.getElementById("selectedVisual").innerText;
    if(selection == "Oscillator"){
        if(visual == 1){
            osci.setType("sine");
        }else if(visual == 2){
            osci.setType("sawtooth");
        }else if(visual == 3){
            osci.setType("square");
        }
        osci.amp(3);
        if(playing == false){
            osci.start();
            playing = true;
        }
    }
    else if(selection == "Piano"){
        osci.setType("triangle",0);
        document.getElementById("ctrlRadio").style.display = "none";
    }
    else if(selection == "nothing"){
        osci.setType("sine",0);
        document.getElementById("ctrlRadio").style.display = "none";
    }

}
function draw(){
    background(0);
    if(selection == "Oscillator"){
        visual = document.querySelector('input[name="visuType"]:checked').value;
        if(visual == 1){
            osci.setType("sine");
        }else if(visual == 2){
            osci.setType("sawtooth");
        }else if(visual == 3){
            osci.setType("square");
        }

        //translate(width/2,height/2);
        var c = color(255, 204, 0);  // Define color 'c'
        fill(c);
        ellipse(mouseX, mouseY, 15, 15);
        
        var waveform = fft.waveform();
        noFill();
        beginShape();
        stroke(182,182,182); // waveform is red
        strokeWeight(1);
        for(var i = 0; i < waveform.length; i++){
            var x = map(i, 0, waveform.length, 0, width);
            var y = map(waveform[i], -1, 1, 0, height);
            vertex(x,y);
        }
        endShape();

        var freqRange = map(mouseX, 0, width, 0, 2000);
        var amplRange = map(mouseY, 0, height, 0, 1);
        osci.freq(freqRange);
        osci.amp(amplRange);
    }
    if(selection == "Piano"){
        noStroke();
        fill(255,255,255);
        rect(keyOffsetX                                ,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace +      keyWidth     ,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 2 +  keyWidth * 2 ,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 3 +  keyWidth * 3 ,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 4 +  keyWidth * 4 ,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 5 +  keyWidth * 5 ,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 6 +  keyWidth * 6 ,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 7 +  keyWidth * 7 ,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 8 +  keyWidth * 8 ,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 9 +  keyWidth * 9 ,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 10 + keyWidth * 10,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 11 + keyWidth * 11,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 12 + keyWidth * 12,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 13 + keyWidth * 13,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 14 + keyWidth * 14,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 15 + keyWidth * 15,height/2,keyWidth,keyHeight);
        rect(keyOffsetX + keySpace * 16 + keyWidth * 16,height/2,keyWidth,keyHeight);

        fill(0,0,0);
        stroke(255, 255, 255);
        rect(keyOffsetX + (keyWidth * 2 + keySpace * 2) / 2 - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);
        rect(keyOffsetX + ((keyWidth * 2 + keySpace * 3) / 2 - keyWidth2 / 2) * 4,height/2,keyWidth2,keyHeight2);
        rect(keyOffsetX + ((keyWidth * 2 + keySpace * 4) / 2 - keyWidth2 / 2) * 5.4,height/2,keyWidth2,keyHeight2);
        rect(keyOffsetX + ((keyWidth * 2 + keySpace * 5) / 2 - keyWidth2 / 2) * 6.7,height/2,keyWidth2,keyHeight2);

        hit = false;
    }
}
function mousePressed() {  

    if(mouseX < keyOffsetX + keyWidth && mouseX > keyOffsetX && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[0]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 2 + keyWidth * 2 && mouseX > keyOffsetX + keySpace + keyWidth && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[1]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 3 + keyWidth * 3 && mouseX > keyOffsetX + keySpace * 2 + keyWidth * 2 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[2]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 4 + keyWidth * 4 && mouseX > keyOffsetX + keySpace * 3 + keyWidth * 3 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[3]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 5 + keyWidth * 5 && mouseX > keyOffsetX + keySpace * 4 + keyWidth * 4 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[4]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 6 + keyWidth * 6 && mouseX > keyOffsetX + keySpace * 5 + keyWidth * 5 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[5]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 7 + keyWidth * 7 && mouseX > keyOffsetX + keySpace * 6 + keyWidth * 6 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[6]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 8 + keyWidth * 8 && mouseX > keyOffsetX + keySpace * 7 + keyWidth * 7 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[7]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 9 + keyWidth * 9 && mouseX > keyOffsetX + keySpace * 8 + keyWidth * 8 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[8]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 10 + keyWidth * 10 && mouseX > keyOffsetX + keySpace * 9 + keyWidth * 9 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[9]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 11 + keyWidth * 11 && mouseX > keyOffsetX + keySpace * 10 + keyWidth * 10 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[10]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 12 + keyWidth * 12 && mouseX > keyOffsetX + keySpace * 11 + keyWidth * 11 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[11]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 13 + keyWidth * 13 && mouseX > keyOffsetX + keySpace * 12 + keyWidth * 12 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[12]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 14 + keyWidth * 14 && mouseX > keyOffsetX + keySpace * 13 + keyWidth * 13 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[13]));
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 15 + keyWidth * 15 && mouseX > keyOffsetX + keySpace * 14 + keyWidth * 14 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[14]));
        console.log(note[14]);
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 16 + keyWidth * 16 && mouseX > keyOffsetX + keySpace * 15 + keyWidth * 15 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[15]));
        console.log(note[15]);
        hit = true;
    }else if (mouseX < keyOffsetX + keySpace * 17 + keyWidth * 17 && mouseX > keyOffsetX + keySpace * 16 + keyWidth * 16 && mouseY < height/2 + keyHeight && mouseY > height/2){
        osci.freq(midiToFreq(note[16]));
        console.log(note[16]);
        hit = true;
    }

    osci.fade(0.5,0.2);
    osci.amp(3);
    if(playing == false && hit == true){
        osci.start();
        playing = true;
        console.log(hit);
    }
}
function mouseReleased() {
    hit = false;
    osci.fade(0,0.5);  
}


function play(){
    if(playing == true){
        osci.stop();
        icon = "&#xE039";
        document.getElementById("playIcon").innerHTML = icon;  
        document.getElementById("playIcon").title="Play"; 
        playing = false;
    }else{
        osci.start();
        icon = "&#xE036";
        document.getElementById("playIcon").innerHTML = icon; 
        document.getElementById("playIcon").title="Pause"; 
        playing = true;
    }

}
