let page = 0;
let helpTimer = 0;

function help() {
	this.setup = function() {
		
	}
	
	this.draw = function() {
		helpTimer++;
		
		if (touches.length > 0 && helpTimer > 50) {
			page++;
			helpTimer = 0;
			click1.play();
		}
		
		imageMode(CENTER);
		if (page === 0) image(treadmillHelp, dimX/2, dimY/2, 4*dimX/5, dimY);
		else if (page === 1) image(asteroidsHelp, dimX/2, dimY/2, 4*dimX/5, dimY);
		else if (page === 2) image(monkeyHelp, dimX/2, dimY/2, 4*dimX/5, dimY);
		else {
			page = 0;
			mgr.showScene( mainMenu );
		}
		imageMode(CORNER);
		
		textSize(16);
		textAlign(CENTER);
		fill(255, 205, 0);
		text("Tap anywhere to continue", dimX/2, 10*dimY/11);
	}
}