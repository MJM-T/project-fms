/*-------------------------------------------------------------------------------------------
	PROJECT: Project Fine Motor Skills (FMS) for a stroke patient (mobile application)
	AUTHORS: Matthias Mitchell, Joseph Gonzalez, and Saud Alsaif
	FILE DESCRIPTION: Brief file, child of main.js, that displays a "game over" screen.
-------------------------------------------------------------------------------------------*/



function asteroidsLoss() {
	this.setup = function() {
		
	}
	
	this.draw = function() {
		imageMode(CENTER);
		image(asteroidsGameOver, dimX/2, dimY/2);
		imageMode(CORNER);
		
		if (touches.length > 0) {
			fill(40);
			rect(0, 0, dimX, dimY);
			
			click2.play();
			mgr.showScene( mainMenu );
		}
	}
}