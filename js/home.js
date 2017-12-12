var posX, posY;
var dirX;
var dirY;
var dirArray = [-1,1];
var stepArray = [1,1];
var count;
var timeout;
var circleSize = 100;
var minX;
var maxX;
var minY;
var maxY;
var dots = 5
function setup(){
    createCanvas(window.innerWidth,window.innerHeight);
    minX = circleSize/2 + 3;
    maxX = width - circleSize/2 - 3;
    minY = circleSize/2 + 3;
    maxY = height - circleSize/2 - 3;
    posX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
    posY = Math.floor(Math.random() * (maxY - minY + 1) + minY);
    
    count = 130;
    timeout = count;
    
}
function draw(){
    background(0);
    var c = color(132, 132, 132);  // Define color 'c'
    
    fill(132, 132, 132, 80);
    ellipse(posX, posY, circleSize, circleSize);

    if(count == timeout){
        // console.log(count);
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
    //  console.log("width = " + width);
    //  console.log("innerwidth = " + innerWidth);
    //if(count < timeout && ((posX - circleSize/2) > 3 && (posX + circleSize/2) < width-3) && ((posY - circleSize/2) > 3 && (posY + circleSize/2) < height-3)){
        if(count < timeout && posX > minX && posX < maxX && posY == minY) {
            dirX = dirArray[Math.floor(Math.random() * dirArray.length)];
            dirY = dirY * -1;
            posY = posY - stepY * dirY;              
            posX = posX - stepX * dirX;
            // console.log("x = " + posX + ", y = " + posY);
            count = 0;
        }
        else if(count < timeout && posX > minX && posX < maxX && posY == maxY) {
            dirX = dirArray[Math.floor(Math.random() * dirArray.length)];
            dirY = dirY * -1;
            // console.log("x = " + posX + ", y = " + posY);
            posY = posY - stepY * dirY;              
            posX = posX - stepX * dirX;
            count = 0;
        }
        else if(count < timeout && posY > minY && posY < maxY && posX == minX) {
            dirY = dirArray[Math.floor(Math.random() * dirArray.length)];
            dirX = dirX * -1;
            // console.log("x = " + posX + ", y = " + posY);
            posY = posY - stepY * dirY;              
            posX = posX - stepX * dirX;
            count = 0;
        }
        else if(count < timeout && posY > minY && posY < maxY && posX == maxX) {
            dirY = dirArray[Math.floor(Math.random() * dirArray.length)];
            dirX = dirX * -1;
            // console.log("x = " + posX + ", y = " + posY);
            posY = posY - stepY * dirY;              
            posX = posX - stepX * dirX;
            count = 0;
        }
        else if(count < timeout && posX == minX && posY == minY || posX == maxX && posY == maxY || posX == maxX && posY == minY || posX == minX && posY == maxY) {
            dirX = dirX * -1;
            dirY = dirY * -1;
            // console.log("x = " + posX + ", y = " + posY);
            posY = posY - stepY * dirY;              
            posX = posX - stepX * dirX;
            count = 0;
        }
        else{
            posX = posX - stepX * dirX;
            posY = posY - stepY * dirY; 
            
            count = count + 1;
        }
    //}
    // if(count < timeout && ((posX - circleSize/2) > 3 && (posX + circleSize/2) < width-3) && ((posY - circleSize/2) > 3 && (posY + circleSize/2) < height-3)){
    //     posX = posX - stepX * dirX;
    //     posY = posY - stepY * dirY; 
    //     count = count + 1;
        
    // }else{
    //     if((posX - circleSize/2) > 3 && (posX + circleSize/2) < width-3){
    //         // stepX = stepArray[Math.floor(Math.random() * stepArray.length)];
    //         // stepY = stepArray[Math.floor(Math.random() * stepArray.length)];
    //         // if(stepX == 0 && stepY == 0){
    //         //     while(stepX == 0){
    //         //         stepX = stepArray[Math.floor(Math.random() * stepArray.length)];
    //         //     }
    //         // }
    //         dirX = dirArray[Math.floor(Math.random() * dirArray.length)];
    //         dirY = dirY * -1;
    //         posY = posY - stepY * dirY;              
    //         posX = posX - stepX * dirX;
    //         count = 0;
    //     }
    //     else if((posY - circleSize/2) > 5 && (posY + circleSize/2) < width-3){
    //         // stepX = stepArray[Math.floor(Math.random() * stepArray.length)];
    //         // stepY = stepArray[Math.floor(Math.random() * stepArray.length)];
    //         // if(stepX == 0 && stepY == 0){
    //         //     while(stepY == 0){
    //         //         stepY = stepArray[Math.floor(Math.random() * stepArray.length)];
    //         //     }
    //         // }
    //         dirY = dirArray[Math.floor(Math.random() * dirArray.length)];
    //         dirX = dirY * -1;
    //         posY = posY - stepY * dirY;              
    //         posX = posX - stepX * dirX;
    //         count = 0;
    //     }
    //     // else if(((posX - circleSize/2) > 3 && (posX + circleSize/2) < width-3) && ((posY - circleSize/2) > 3 && (posY + circleSize/2) < height-3)){
    //     //     count = timeout;
    //     // }
    // }
    
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



