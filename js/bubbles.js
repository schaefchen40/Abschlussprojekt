
	var container = document.getElementById("divBubble");
	var svgns = "http://www.w3.org/2000/svg";
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttributeNS(null, "width", window.innerWidth);
	svg.setAttributeNS(null, "height", window.innerHeight);
	
	var border = 5;
	var header = 100;
	var blobMaxX = 8;
	var blobSpace = (window.innerWidth - 2 * border) / blobMaxX * 0.25 ;		
	var blobRad = (window.innerWidth - blobSpace - blobSpace * blobMaxX)/blobMaxX/2;
	var blobMaxY = 1;
	
	var path ="media/";
	var file = ["birds.mp3", "bell.mp3", "chord.wav", "startrek.mp3", "pterodactyl.wav", "roadrunner.wav", "whistle.wav"];
	var temp = 2 * blobRad + blobSpace;
	while((window.innerHeight - 2 * border - header) > blobMaxY * temp){
		blobMaxY++;
	}
	blobMaxY-=1;
	var startBlobX = blobRad + border;
	var startBlobY = blobRad + border + header;
	var cntX = 0;
	var cntY = 0;
	var cntTotal = 2;
	while(cntX < blobMaxX && cntY < blobMaxY){
		var blob = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		if(cntX < blobMaxX){
			blob.setAttributeNS(null, "cx", startBlobX + cntX * (2 * blobRad + blobSpace));
			blob.setAttributeNS(null, "cy", startBlobY + cntY * (2 * blobRad + blobSpace));
			blob.setAttributeNS(null, "r",  blobRad);
			blob.setAttributeNS(null, "stroke", "none");
			blob.setAttributeNS(null, "id", cntTotal);
			blob.setAttributeNS(null, "class", Math.floor(Math.random()*(file.length-0)+0) + ", blob");
			blob.setAttributeNS(null, "fill", "rgb(132, 132, 132)");
			blob.setAttributeNS(null, "fill-opacity", "0.4");
			cntX++;
		}
		cntTotal++;
		svg.appendChild(blob);
		document.body.appendChild(svg);
		blob.addEventListener("click", mouseClick);
		if(cntX == blobMaxX){
			cntX = 0;
			cntY++;
		}
	}
	
	function mouseClick() {
	    var sound = new Audio(); 
	    console.log(path + file[3]); 
	    // console.log("This ID:" + this.id);
		console.log("This Class:" + document.getElementById(this.id).getAttribute("class")); 
		var classVal = document.getElementById(this.id).getAttribute("class").split(",");
		// console.log("ClassVal: " + classVal[0]);
	    sound.src = path + file[classVal[0]];  
	    sound.play();   
	                                   
	}

