var posX, posY;
var dirX;
var dirY;
var dirArray = [-1,1];
var stepArray = [1,1];
var count;
var timeout;
function setup(){
    createCanvas(window.innerWidth,window.innerHeight);

    posX = random(width-20);
    posY = random(height-20);
    count = 130;
    timeout = count;
    
}
function draw(){
    background(0);
    var c = color(132, 132, 132);  // Define color 'c'
    var circleSize = 100;
    fill(132, 132, 132, 80);
    ellipse(posX, posY, circleSize, circleSize);

    if(count == timeout){
        console.log(count);
        dirX = dirArray[Math.floor(Math.random() * dirArray.length)];
        dirY = dirArray[Math.floor(Math.random() * dirArray.length)];
        stepX = stepArray[Math.floor(Math.random() * stepArray.length)];
        stepY = stepArray[Math.floor(Math.random() * stepArray.length)];
        if(stepX == 0 && stepY == 0){
            while(stepX == 0){
                stepX = stepArray[Math.floor(Math.random() * stepArray.length)];
            }
        }
        count = 0;
    }
    
    
    if(count < timeout && ((posX - circleSize/2) > 3 && (posX + circleSize/2) < width-3) && ((posY - circleSize/2) > 3 && (posY + circleSize/2) < height-3)){
        posX = posX - stepX * dirX;
        posY = posY - stepY * dirY; 
        count = count + 1;
        
    }else{
        if((posX - circleSize/2) > 3 && (posX + circleSize/2) < width-3){
            stepX = stepArray[Math.floor(Math.random() * stepArray.length)];
            stepY = stepArray[Math.floor(Math.random() * stepArray.length)];
            if(stepX == 0 && stepY == 0){
                while(stepX == 0){
                    stepX = stepArray[Math.floor(Math.random() * stepArray.length)];
                }
            }
            dirX = dirArray[Math.floor(Math.random() * dirArray.length)];
            dirY = dirY * -1;
            posY = posY - stepY * dirY;              
            posX = posX - stepX * dirX;
            count = 0;
        }
        else if((posY - circleSize/2) > 3 && (posY + circleSize/2) < width-3){
            stepX = stepArray[Math.floor(Math.random() * stepArray.length)];
            stepY = stepArray[Math.floor(Math.random() * stepArray.length)];
            if(stepX == 0 && stepY == 0){
                while(stepY == 0){
                    stepY = stepArray[Math.floor(Math.random() * stepArray.length)];
                }
            }
            dirY = dirArray[Math.floor(Math.random() * dirArray.length)];
            dirX = dirY * -1;
            posY = posY - stepY * dirY;              
            posX = posX - stepX * dirX;
            count = 0;
        }
        else if(((posX - circleSize/2) > 3 && (posX + circleSize/2) < width-3) && ((posY - circleSize/2) > 3 && (posY + circleSize/2) < height-3)){
            count = timeout;
        }
    }
    
        // posX = posX + step * fact + 20;
        // posY = posY + step * fact + 20;
        // var withinBorder = true;
        // while(withinBorder == true && fact > 0){
        //     if((posX < width) && (posY < height)){
        //         posX = posX + step;
        //         posY = posY + step;
        //         ellipse(posX, posY, 40, 40);
        //     }else{
        //         withinBorder = false;
        //         fact = -1;
        //     }
        // }
       
    
    
}



