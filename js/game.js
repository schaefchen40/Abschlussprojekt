var sound;
var fft;
var osci;
var visual = document.querySelector('input[name="visuType"]:checked').value;
var playing = false;
var selection;
var hit = false;

var attackLevel = 1.5;          //ampl. level after attackTime is finished
var releaseLevel = 0;           //ampl. level after releaseTime is finished
var attackTime = 0.001;         //fade in time
var decayTime = 0.2;            //fade out time
var susPercent = 0.2;           //rate of fade in and fade out
var releaseTime = 0.005;
var env;

var keyOffsetX = 150;           //start position of the keyboard
var keyWidth = 45;
var keyWidth2 = 35;
var keyHeight = 200;
var keyHeight2 = 95;
var keySpace = 2;
//midi numbers for later translation into oscilator frequency
var diaton =    [[60,"C3"] , [62, "D"] , [64, "E"] , [65, "F"] , [67, "G"] , [69, "A"] , [71, "B"] , [72, "C4"], [74, "D"] , [76, "E"] , [77, "F"] , [79, "G"] , [81, "A"] , [83, "B"] , [84, "C5"], [86, "D"], [88, "E"], [89, "F"], [91, "G"], [93, "A"]];
var pentaton =  [[61,"Db"] , [63, "Eb"], [66, "Gb"], [68, "Ab"], [70, "Bb"], [73, "Db"], [75, "Eb"], [78, "Gb"], [80, "Ab"], [82, "Bb"], [85, "Db"], [87, "Eb"], [90, "Gb"], [92, "Ab"], [94, "Bb"]];
//for playing the piono on the computer keyboard
var diatonKey = [[65,"a"] , [83,"s"] , [68,"d"] , [70,"f"] , [71,"g"] , [72,"h"] , [74,"j"] , [75,"k"] , [76,"l"] , [186,"ö"] , [222,"ä"] , [220,"#"]];
var pentatonKey = [[87,"w"] , [69,"e"] , [84,"t"] , [90,"z"] , [85,"u"] , [79,"o"] , [80,"p"] , [187,"+"]];

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
        
        env = new p5.Env();
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.setRange(attackLevel, releaseLevel);
        playing = true;

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

        var c = color(184, 184, 184);  // Define color 'c'
        fill(c);
        ellipse(mouseX, mouseY, 10, 10);
        
        var waveform = fft.waveform();
        noFill();
        beginShape();
        stroke(182,182,182);           
        strokeWeight(1);
        for(var i = 0; i < waveform.length; i++){
            var x = map(i, 0, waveform.length, 0, width);
            var y = map(waveform[i], -1, 1, 0, height);
            vertex(x,y);
        }
        endShape();

        var freqRange = map(mouseX, 0, width, 0, 3000);
        var amplRange = map(mouseY, 0, height, 0, 1);

        document.getElementById("soundValueFrequency").innerText = round(freqRange) +" Hz"; 
        document.getElementById("soundValueAmplitude").innerText = Number((amplRange).toFixed(1)); 

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
        rect(keyOffsetX + keySpace * 17 + keyWidth * 17,height/2,keyWidth,keyHeight);

        fill(0,0,0);
        stroke(255, 255, 255);
        rect(keyOffsetX + (keyWidth + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);
        rect(keyOffsetX + (keyWidth * 2 + keySpace * 1 + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);

        rect(keyOffsetX + (keyWidth * 4 + keySpace * 3 + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);
        rect(keyOffsetX + (keyWidth * 5 + keySpace * 4 + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);
        rect(keyOffsetX + (keyWidth * 6 + keySpace * 5 + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);

        rect(keyOffsetX + (keyWidth * 8 + keySpace * 7 + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);
        rect(keyOffsetX + (keyWidth * 9 + keySpace * 8 + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);

        rect(keyOffsetX + (keyWidth * 11 + keySpace * 10 + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);
        rect(keyOffsetX + (keyWidth * 12 + keySpace * 11 + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);
        rect(keyOffsetX + (keyWidth * 13 + keySpace * 12 + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);

        rect(keyOffsetX + (keyWidth * 15 + keySpace * 14 + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);
        rect(keyOffsetX + (keyWidth * 16 + keySpace * 15 + keySpace / 2) - keyWidth2 / 2,height/2,keyWidth2,keyHeight2);
        hit = false;
    }
}
function mousePressed() {  
    //Ende
    if((mouseX < keyOffsetX + keyWidth && mouseX > keyOffsetX && mouseY < height/2 + keyHeight && mouseY > height/2) && 
        !(mouseX < keyOffsetX + keyWidth && mouseX > keyOffsetX + (keyWidth + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[0][0]));
        console.log(diaton[0][0]);
        document.getElementById("soundValueNote").innerText = diaton[0][1];
        console.log(diaton[0][1]);
        hit = true;
    }//Anfang und Ende
    else if ((mouseX < keyOffsetX + keySpace * 2 + keyWidth * 2 && mouseX > keyOffsetX + keySpace * 1 + keyWidth * 1 && mouseY < height/2 + keyHeight && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 1 + keySpace * 1 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 1 + keySpace * 1 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 2 + keySpace * 1 && mouseX > keyOffsetX + keyWidth * 2 + keySpace * 1 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[1][0]));
        document.getElementById("soundValueNote").innerText = diaton[1][1];
        console.log(diaton[1][0]);
        hit = true;
    }//Anfang
    else if ((mouseX < keyOffsetX + keySpace * 3 + keyWidth * 3 && mouseX > keyOffsetX + keySpace * 2 + keyWidth * 2 && mouseY < height/2 + keyHeight && mouseY > height/2) && 
        !(mouseX < keyOffsetX + keyWidth * 2 + keySpace * 2 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 2 + keySpace * 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[2][0]));
        document.getElementById("soundValueNote").innerText = diaton[2][1];
        console.log(diaton[2][0]);
        hit = true;
    }//Ende
    else if ((mouseX < keyOffsetX + keySpace * 4 + keyWidth * 4 && mouseX > keyOffsetX + keySpace * 3 + keyWidth * 3 && mouseY < height/2 + keyHeight && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 4 + keySpace * 3 && mouseX > keyOffsetX + keyWidth * 4 + keySpace * 3 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[3][0]));
        document.getElementById("soundValueNote").innerText = diaton[3][1];
        console.log(diaton[3][0]);
        hit = true;
    }//Anfang und Ende
    else if ((mouseX < keyOffsetX + keySpace * 5 + keyWidth * 5 && mouseX > keyOffsetX + keySpace * 4 + keyWidth * 4 && mouseY < height/2 + keyHeight && mouseY > height/2) && 
        !(mouseX < keyOffsetX + keyWidth * 4 + keySpace * 4 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 4 + keySpace * 4  && mouseY < height/2 + keyHeight2 && mouseY > height/2) && 
        !(mouseX < keyOffsetX + keyWidth * 5 + keySpace * 4 && mouseX > keyOffsetX + keyWidth * 5 + keySpace * 4 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[4][0]));
        document.getElementById("soundValueNote").innerText = diaton[4][1];
        console.log(diaton[4][0]);
        hit = true;
    }//Anfang und Ende
    else if ((mouseX < keyOffsetX + keySpace * 6 + keyWidth * 6 && mouseX > keyOffsetX + keySpace * 5 + keyWidth * 5 && mouseY < height/2 + keyHeight && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 5 + keySpace * 5 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 5 + keySpace * 5 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 6 + keySpace * 5 && mouseX > keyOffsetX + keyWidth * 6 + keySpace * 5 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[5][0]));
        document.getElementById("soundValueNote").innerText = diaton[5][1];
        console.log(diaton[5][0]);
        hit = true;
    }//Anfang
    else if ((mouseX < keyOffsetX + keySpace * 7 + keyWidth * 7 && mouseX > keyOffsetX + keySpace * 6 + keyWidth * 6 && mouseY < height/2 + keyHeight && mouseY > height/2) && 
        !(mouseX < keyOffsetX + keyWidth * 6 + keySpace * 6 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 6 + keySpace * 6 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[6][0]));
        document.getElementById("soundValueNote").innerText = diaton[6][1];
        console.log(diaton[6][0]);
        hit = true;
    }//Ende
    else if ((mouseX < keyOffsetX + keySpace * 8 + keyWidth * 8 && mouseX > keyOffsetX + keySpace * 7 + keyWidth * 7 && mouseY < height/2 + keyHeight && mouseY > height/2) && 
    !(mouseX < keyOffsetX + keyWidth * 8 + keySpace * 7 && mouseX > keyOffsetX + keyWidth * 8 + keySpace * 7 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[7][0]));
        document.getElementById("soundValueNote").innerText = diaton[7][1];
        console.log(diaton[7][0]);
        hit = true;
    }//Anfang und Ende
    else if ((mouseX < keyOffsetX + keySpace * 9 + keyWidth * 9 && mouseX > keyOffsetX + keySpace * 8 + keyWidth * 8 && mouseY < height/2 + keyHeight && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 8 + keySpace * 8 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 8 + keySpace * 8 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 9 + keySpace * 8 && mouseX > keyOffsetX + keyWidth * 9 + keySpace * 8 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[8][0]));
        document.getElementById("soundValueNote").innerText = diaton[8][1];
        console.log(diaton[8][0]);
        hit = true;
    }//Anfang
    else if ((mouseX < keyOffsetX + keySpace * 10 + keyWidth * 10 && mouseX > keyOffsetX + keySpace * 9 + keyWidth * 9 && mouseY < height/2 + keyHeight && mouseY > height/2) && 
        !(mouseX < keyOffsetX + keyWidth * 9 + keySpace * 9 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 9 + keySpace * 9 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[9][0]));
        document.getElementById("soundValueNote").innerText = diaton[9][1];
        console.log(diaton[9][0]);
        hit = true;
    }//Ende
    else if ((mouseX < keyOffsetX + keySpace * 11 + keyWidth * 11 && mouseX > keyOffsetX + keySpace * 10 + keyWidth * 10 && mouseY < height/2 + keyHeight && mouseY > height/2) && 
        !(mouseX < keyOffsetX + keyWidth * 11 + keySpace * 10 && mouseX > keyOffsetX + keyWidth * 11 + keySpace * 10 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[10][0]));
        document.getElementById("soundValueNote").innerText = diaton[10][1];
        console.log(diaton[10][0]);
        hit = true;
    }//Anfang und Ende
    else if ((mouseX < keyOffsetX + keySpace * 12 + keyWidth * 12 && mouseX > keyOffsetX + keySpace * 11 + keyWidth * 11 && mouseY < height/2 + keyHeight && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 11 + keySpace * 11 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 11 + keySpace * 11 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 12 + keySpace * 11 && mouseX > keyOffsetX + keyWidth * 12 + keySpace * 11 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[11][0]));
        document.getElementById("soundValueNote").innerText = diaton[11][1];
        console.log(diaton[11][0]);
        hit = true;
    }//Anfang und Ende
    else if ((mouseX < keyOffsetX + keySpace * 13 + keyWidth * 13 && mouseX > keyOffsetX + keySpace * 12 + keyWidth * 12 && mouseY < height/2 + keyHeight && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 12 + keySpace * 12 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 12 + keySpace * 12 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 13 + keySpace * 12 && mouseX > keyOffsetX + keyWidth * 13 + keySpace * 12 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[12][0]));
        document.getElementById("soundValueNote").innerText = diaton[12][1];
        console.log(diaton[12][0]);
        hit = true;
    }//Anfang
    else if ((mouseX < keyOffsetX + keySpace * 14 + keyWidth * 14 && mouseX > keyOffsetX + keySpace * 13 + keyWidth * 13 && mouseY < height/2 + keyHeight && mouseY > height/2) && 
        !(mouseX < keyOffsetX + keyWidth * 13 + keySpace * 13 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 13 + keySpace * 13 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[13][0]));
        document.getElementById("soundValueNote").innerText = diaton[13][1];
        console.log(diaton[13][0]);
        hit = true;
    }//Ende
    else if ((mouseX < keyOffsetX + keySpace * 15 + keyWidth * 15 && mouseX > keyOffsetX + keySpace * 14 + keyWidth * 14 && mouseY < height/2 + keyHeight && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 15 + keySpace * 14 && mouseX > keyOffsetX + keyWidth * 15 + keySpace * 14 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[14][0]));
        document.getElementById("soundValueNote").innerText = diaton[14][1];
        console.log(diaton[14][0]);
        hit = true;
    }//Anfang und Ende
    else if ((mouseX < keyOffsetX + keySpace * 16 + keyWidth * 16 && mouseX > keyOffsetX + keySpace * 15 + keyWidth * 15 && mouseY < height/2 + keyHeight && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 15 + keySpace * 15 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 15 + keySpace * 15 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2) &&
        !(mouseX < keyOffsetX + keyWidth * 16 + keySpace * 15 && mouseX > keyOffsetX + keyWidth * 16 + keySpace * 15 - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[15][0]));
        document.getElementById("soundValueNote").innerText = diaton[15][1];
        console.log(diaton[15][0]);
        hit = true;
    }//Anfang
        else if ((mouseX < keyOffsetX + keySpace * 17 + keyWidth * 17 && mouseX > keyOffsetX + keySpace * 16 + keyWidth * 16 && mouseY < height/2 + keyHeight && mouseY > height/2) && 
        !(mouseX < keyOffsetX + keyWidth * 16 + keySpace * 16 + keyWidth2 / 2 && mouseX > keyOffsetX + keyWidth * 16 + keySpace * 16 && mouseY < height/2 + keyHeight2 && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[16][0]));
        document.getElementById("soundValueNote").innerText = diaton[16][1];
        console.log(diaton[16][0]);
        hit = true;
    }else if ((mouseX < keyOffsetX + keySpace * 18 + keyWidth * 18 && mouseX > keyOffsetX + keySpace * 17 + keyWidth * 17 && mouseY < height/2 + keyHeight && mouseY > height/2)){
        osci.freq(midiToFreq(diaton[17][0]));
        document.getElementById("soundValueNote").innerText = diaton[17][1];
        console.log(diaton[17][0]);
        hit = true;
    }

    else if (mouseX < keyOffsetX + (keyWidth + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[0][0]));
        document.getElementById("soundValueNote").innerText = pentaton[0][1];
        console.log(pentaton[0][0]);
        hit = true;
    }else if (mouseX < keyOffsetX + (keyWidth * 2 + keySpace * 1 + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth * 2 + keySpace * 1 + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[1][0]));
        document.getElementById("soundValueNote").innerText = pentaton[1][1];
        console.log(pentaton[1][0]);
        hit = true;
    }else if (mouseX < keyOffsetX + (keyWidth * 4 + keySpace * 3 + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth * 4 + keySpace * 3 + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[2][0]));
        document.getElementById("soundValueNote").innerText = pentaton[2][1];
        console.log(pentaton[2][0]);
        hit = true;
    }else if (mouseX < keyOffsetX + (keyWidth * 5 + keySpace * 4 + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth * 5 + keySpace * 4 + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[3][0]));
        document.getElementById("soundValueNote").innerText = pentaton[3][1];
        console.log(pentaton[3][0]);
        hit = true;
    }else if (mouseX < keyOffsetX + (keyWidth * 6 + keySpace * 5 + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth * 6 + keySpace * 5 + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[4][0]));
        document.getElementById("soundValueNote").innerText = pentaton[4][1];
        console.log(pentaton[4][0]);
        hit = true;
    }else if (mouseX < keyOffsetX + (keyWidth * 8 + keySpace * 7 + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth * 8 + keySpace * 7 + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[5][0]));
        document.getElementById("soundValueNote").innerText = pentaton[5][1];
        console.log(pentaton[5][0]);
        hit = true;
    }else if (mouseX < keyOffsetX + (keyWidth * 9 + keySpace * 8 + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth * 9 + keySpace * 8 + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[6][0]));
        document.getElementById("soundValueNote").innerText = pentaton[6][1];
        console.log(pentaton[6][0]);
        hit = true;
    }else if (mouseX < keyOffsetX + (keyWidth * 11 + keySpace * 10 + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth * 11 + keySpace * 10 + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[7][0]));
        document.getElementById("soundValueNote").innerText = pentaton[7][1];
        console.log(pentaton[7][0]);
        hit = true;
    }else if (mouseX < keyOffsetX + (keyWidth * 12 + keySpace * 11 + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth * 12 + keySpace * 11 + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[8][0]));
        document.getElementById("soundValueNote").innerText = pentaton[8][1];
        console.log(pentaton[8][0]);
        hit = true;
    }else if (mouseX < keyOffsetX + (keyWidth * 13 + keySpace * 12 + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth * 13 + keySpace * 12 + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[9][0]));
        document.getElementById("soundValueNote").innerText = pentaton[9][1];
        console.log(pentaton[9][0]);
        hit = true;
    }else if (mouseX < keyOffsetX + (keyWidth * 15 + keySpace * 14 + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth * 15 + keySpace * 14 + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[10][0]));
        document.getElementById("soundValueNote").innerText = pentaton[10][1];
        console.log(pentaton[10][0]);
        hit = true;
    }else if (mouseX < keyOffsetX + (keyWidth * 16 + keySpace * 15 + keySpace / 2) + keyWidth2 / 2 && mouseX > keyOffsetX + (keyWidth * 15 + keySpace * 15 + keySpace / 2) - keyWidth2 / 2 && mouseY < height/2 + keyHeight2 && mouseY > height/2){
        osci.freq(midiToFreq(pentaton[11][0]));
        document.getElementById("soundValueNote").innerText = pentaton[11][1];
        console.log(pentaton[11][0]);
        hit = true;
    }
    else{
        hit = false;
    }
    if(hit == true && playing == true){
        peerGynt();
    }
}
function mouseReleased() {
    hit = false;
    mozart();
}

window.addEventListener("keydown",(event) =>{
    console.log("Key pressed: " + event.key + " -> " + event.which);
    var key1 = event.which;
    var key2 = event.keyCode;
    if(key1 == diatonKey[0][0] || key2 == diatonKey[0][0]){
        osci.freq(midiToFreq(diaton[0][0]));
        document.getElementById("soundValueNote").innerText = diaton[0][1];
        hit = true; 
    }else if(key1 == diatonKey[1][0] || key2 == diatonKey[1][0]) {
        osci.freq(midiToFreq(diaton[1][0]));
        document.getElementById("soundValueNote").innerText = diaton[1][1];
        hit = true;
    }else if(key1 == diatonKey[2][0] || key2 == diatonKey[2][0]) {
        osci.freq(midiToFreq(diaton[2][0]));
        document.getElementById("soundValueNote").innerText = diaton[2][1];
        hit = true;
    }else if(key1 == diatonKey[3][0] || key2 == diatonKey[3][0]) {
        osci.freq(midiToFreq(diaton[3][0]));
        document.getElementById("soundValueNote").innerText = diaton[3][1];
        hit = true; 
    }else if(key1 == diatonKey[4][0] || key2 == diatonKey[4][0]) {
        osci.freq(midiToFreq(diaton[4][0]));
        document.getElementById("soundValueNote").innerText = diaton[4][1];
        hit = true; 
    }else if(key1 == diatonKey[5][0] || key2 == diatonKey[5][0]) {
        osci.freq(midiToFreq(diaton[5][0]));
        document.getElementById("soundValueNote").innerText = diaton[5][1];
        hit = true;
    }else if(key1 == diatonKey[6][0] || key2 == diatonKey[6][0]) {
        osci.freq(midiToFreq(diaton[6][0]));
        document.getElementById("soundValueNote").innerText = diaton[6][1];
        hit = true;
    }else if(key1 == diatonKey[7][0] || key2 == diatonKey[7][0]) {
        osci.freq(midiToFreq(diaton[7][0]));
        document.getElementById("soundValueNote").innerText = diaton[7][1];
        hit = true; 
    }else if(key1 == diatonKey[8][0] || key2 == diatonKey[8][0]) {
        osci.freq(midiToFreq(diaton[8][0]));
        document.getElementById("soundValueNote").innerText = diaton[8][1];
        hit = true; 
    }else if(key1 == diatonKey[9][0] || key2 == diatonKey[9][0]) {
        osci.freq(midiToFreq(diaton[9][0]));
        document.getElementById("soundValueNote").innerText = diaton[9][1];
        hit = true; 
    }else if(key1 == diatonKey[10][0] || key2 == diatonKey[10][0]) {
        osci.freq(midiToFreq(diaton[10][0]));
        document.getElementById("soundValueNote").innerText = diaton[10][1];
        hit = true; 
    }else if(key1 == diatonKey[11][0] || key2 == diatonKey[11][0]) {
        osci.freq(midiToFreq(diaton[11][0]));
        document.getElementById("soundValueNote").innerText = diaton[11][1];
        hit = true; 
    }

    if(key1 == pentatonKey[0][0] || key2 == pentatonKey[0][0]){
        osci.freq(midiToFreq(pentaton[0][0]));
        document.getElementById("soundValueNote").innerText = pentaton[0][1];
        hit = true; 
    }else if(key1 == pentatonKey[1][0] || key2 == pentatonKey[1][0]) {
        osci.freq(midiToFreq(pentaton[1][0]));
        document.getElementById("soundValueNote").innerText = pentaton[1][1];
        hit = true;
    }else if(key1 == pentatonKey[2][0] || key2 == pentatonKey[2][0]) {
        osci.freq(midiToFreq(pentaton[2][0]));
        document.getElementById("soundValueNote").innerText = pentaton[2][1];
        hit = true;
    }else if(key1 == pentatonKey[3][0] || key2 == pentatonKey[3][0]) {
        osci.freq(midiToFreq(pentaton[3][0]));
        document.getElementById("soundValueNote").innerText = pentaton[3][1];
        hit = true; 
    }else if(key1 == pentatonKey[4][0] || key2 == pentatonKey[4][0]) {
        osci.freq(midiToFreq(pentaton[4][0]));
        document.getElementById("soundValueNote").innerText = pentaton[4][1];
        hit = true; 
    }else if(key1 == pentatonKey[5][0] || key2 == pentatonKey[5][0]) {
        osci.freq(midiToFreq(pentaton[5][0]));
        document.getElementById("soundValueNote").innerText = pentaton[5][1];
        hit = true; 
    }else if(key1 == pentatonKey[6][0] || key2 == pentatonKey[6][0]) {
        osci.freq(midiToFreq(pentaton[6][0]));
        document.getElementById("soundValueNote").innerText = pentaton[6][1];
        hit = true;
    }else if(key1 == pentatonKey[7][0] || key2 == pentatonKey[6][1]) {
        osci.freq(midiToFreq(pentaton[7][0]));
        document.getElementById("soundValueNote").innerText = pentaton[7][1];
        hit = true; 
    }
    if(hit == true && playing == true){
        peerGynt();
    }
    
});

window.addEventListener("keyup",(event) =>{
    hit = false;
    mozart()       
});

function peerGynt(){
    osci.fade(0.5,0.08);
    osci.amp(env);
    osci.start();
}
function mozart(){
    osci.fade(0,0.38); 
}

function soundEnabled(){
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
