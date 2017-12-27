var posX, posY;
var dirX, dirY;
var dirArray = [-1,1];
var stepArray = [1,1];
var count, timeout;
var circleSize = 100;
var minX, maxX;
var minY, maxY;

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);
    minX = circleSize/2 + 3;                                            //left: position measured form the canter of the circle, circle will bounce of at the edge of the canvas (+/-3 pixels)
    maxX = width - circleSize/2 - 3;                                    //right
    minY = circleSize/2 + 3;                                            //top
    maxY = height - circleSize/2 - 3;                                   //bottom
    posX = Math.floor(Math.random() * (maxX - minX + 1) + minX);        //set position of the circle at a random position
    posY = Math.floor(Math.random() * (maxY - minY + 1) + minY);
    
    count = 130;                                                        //maximum steps before new direction will be applied to the circle
    timeout = count;  
}
function draw(){
    background(0);
    
    fill(132, 132, 132, 80);                                            //color of the circle and transparency
    ellipse(posX, posY, circleSize, circleSize);                        //create circle

    if(count == timeout){                                               //if timeout is reached, a new direction to the movement is applied 
        // console.log(count);
        dirX = dirArray[Math.floor(Math.random() * dirArray.length)];
        dirY = dirArray[Math.floor(Math.random() * dirArray.length)];
        stepX = stepArray[Math.floor(Math.random() * stepArray.length)];
        stepY = stepArray[Math.floor(Math.random() * stepArray.length)];
        if(stepX == 0 && stepY == 0){                                   //prevent deadlock
            while(stepX == 0){
                stepX = stepArray[Math.floor(Math.random() * stepArray.length)];
            }
        }
        count = 0;
    }
    //  console.log("width = " + width);
    //  console.log("innerwidth = " + innerWidth);
        if(count < timeout && posX > minX && posX < maxX && posY == minY) { //if border gets hit, change direction
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
}



