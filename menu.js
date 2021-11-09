/*-------------------------------------------------------------------------------------------
	PROJECT: Project Fine Motor Skills (FMS) for a stroke patient (mobile application)
	AUTHORS: Matthias Mitchell, Joseph Gonzalez, and Saud Alsaif
	FILE DESCRIPTION: Sub-file (child of main.js) to display the main menu.
-------------------------------------------------------------------------------------------*/



// Defines the size of an array of buttons
const NUM_BUTTONS = 4;
// Defines an array of buttons
let buttonList = Array();


// Functions to be referenced in setupMenuButtons for closure in a loop
function menuButtonHovered(btn) {
	return function() {
		btn.color = "#143c5a";
	} // This handler is unimportant for a mobile application. Consider removing.
}
function menuButtonOutside(btn) {
	return function() {
		btn.color = "#788296";
	}
}
	

// Initializes a NUM_BUTTONS amount of buttons
// NOTE: individual instantiations are also completed in here, so it is not completely automated. Update accordingly for new buttons.
function setupMenuButtons() {
	
	// Create array of buttons and define common f
	for (i = 0; i < NUM_BUTTONS; i++) {
		buttonList.push(new Clickable());
		
		buttonList[i].resize(180,50);
		buttonList[i].color = "#788296";
		buttonList[i].stroke = "#006482";
		buttonList[i].textSize = 20;
		
		buttonList[i].onHover = menuButtonHovered(buttonList[i]);
		buttonList[i].onOutside = menuButtonOutside(buttonList[i]);
	}
	
	// Define buttons individually
	buttonList[0].locate(1*dimX/5,1*dimY/9);
	buttonList[0].text = "Flick";
	buttonList[0].onPress = function() {
	    click1.play();
		background(255);
		fill(40);
		rect(0, 0, dimX, dimY)
	    mgr.showScene( treadmill );
	}
	
	buttonList[1].locate(1*dimX/5,4*dimY/9);
	buttonList[1].text = "Fling";
	buttonList[1].onPress = function() {
		background(255);
		fill(40);
		rect(0, 0, dimX, dimY)
	    click1.play();
	    mgr.showScene( asteroids );
	}
	
	buttonList[2].locate(1*dimX/5,7*dimY/9);
	buttonList[2].text = "Fly";
	buttonList[2].onPress = function() {
	    click1.play();
	    mgr.showScene( monkey );
	}
	
	buttonList[3].locate(3*dimX/5,7*dimY/9);
	buttonList[3].text = "Help";
	buttonList[3].onPress = function() {
	    click1.play();
	    mgr.showScene( help );
	}
}


// Function to be referenced in draw() in main.js
function displayMenuButtons() {
	for (i = 0; i < NUM_BUTTONS; i++) {
		buttonList[i].draw();
	}
}


// SceneManager function to be added to mgr in main.js
function mainMenu() {
	this.setup = function() {
		
		background(255);
		fill(40);
		rect(0, 0, dimX, dimY)
		
		setupMenuButtons();
	}
	
	this.draw = function() {
		fill(40);
		rect(0, 0, dimX, dimY)
		
		textSize(16);
		textAlign(LEFT);
		fill(200);
		text("Current Flick Record: " + treadmillRecord, 3*dimX/5, 2*dimY/9);
		text("Current Fling Record: " + maxDestroyedAsteroids, 3*dimX/5, 2*dimY/9 + 20);
		text("Current Fly Record: " + levelRecord, 3*dimX/5, 2*dimY/9 + 40);
		
		displayMenuButtons();
	}
}