/*-------------------------------------------------------------------------------------------
	PROJECT: Project Fine Motor Skills (FMS) for a stroke patient (mobile application)
	AUTHORS: Matthias Mitchell, Joseph Gonzalez, and Saud Alsaif
	FILE DESCRIPTION: Sub-file (child of main.js) to display the treadmill activity (flick).
-------------------------------------------------------------------------------------------*/



// Variables to move treadmill track
let trackY = 0;
let dy = 0, dyPrev = 0;
let mvmtY = 0;
let treadmillRecord = 0;

// Variables for user feedback
let lineR = 0, lineG = 255, lineB = 0;
let expectedSpeedFeedback = "", approxSpeedFeedback = "", maxSpeedFeedback = "";
let dyApprox = 0, dyMax = 0;
let numFeet = 0;

// Variables to increase game difficulty
let expectedSpeed = 0, penalty = 1, reward = 5, tracker = 2.72;

// Resets all variables so that activity can be repeated after game over
function makeTreadmillVariables() {
	trackY = 0; dy = 0; dyPrev = 0; mvmtY = 0;
	lineR = 0; lineG = 255; lineB = 0;
	expectedSpeedFeedback = ""; approxSpeedFeedback = ""; maxSpeedFeedback = "";
	dyApprox = 0; dyMax = 0;
	expectedSpeed = 0; penalty = 1; reward = 5; tracker = 2.72;
}

// Short setup function
function setupTreadmill() {
	trackY = -4 * dimY / 5;
}

// Moves treadmill downward and occasionally discretely moves treadmill upward so that image can be re-used
function moveTreadmill() {
	mvmtY++;
    if (mouseY - pmouseY > 0) {
		trackY += mouseY - pmouseY;
	}
	
	if (trackY + mvmtY > -2 * dimY / 5) {
		trackY -= 2 * dimY / 5 - mvmtY;
		mvmtY = 0;
	}
	
	imageMode(CORNER);
	image(track, dimX / 3, trackY + mvmtY, dimX / 2, dimY * 2);
}

// Approximates the current speed for reference in adjustLineColor
function calculateCurrentSpeed() {
    if (mouseY >= pmouseY) {
		dyPrev = dy;
        dy = mouseY - pmouseY;
		
        if (dy > dyPrev) dyApprox = dy;
		else if (0.95 * dyApprox > dy) dyApprox *= 0.95;
		else dyApprox = dy;
		
		if (dyApprox > dyMax) dyMax = dyApprox;
    }
    else {
        dy = 0;
		if (0.95 * dyApprox > 0) dyApprox *= 0.95;
		else dyApprox = 0;
    }
	
	
}

// Adjusts line color for user feedback as to whether they are falling behind the expected speed
function adjustLineColor() {
    calculateCurrentSpeed();
    tracker++;
    expectedSpeed = 4 * Math.log((1/5) * tracker) + 0.0075 * tracker;
    
    if (dy >= expectedSpeed && lineG + reward < 255) {
        lineG += reward;
        lineR -= reward;
    }
    
    if (dy < expectedSpeed && lineR + penalty < 255) {
        lineR += penalty;
        lineG -= penalty;
    }
}

// Displays the treadmill speed, current speed, and maximum speed attained so far... variations in statistics are smoothed out and rounded for simplicity's sake
function displayStats() {
    textSize(16);
    textAlign(LEFT);
    
    stroke(40);
	fill(40);
    text(expectedSpeedFeedback, 10, 20);
    text(approxSpeedFeedback, 10, 40);
	text(maxSpeedFeedback, 10, 60);
    
	expectedSpeedFeedback = "Expected Speed: " + (expectedSpeed / 8).toFixed(2) + " mph";
	approxSpeedFeedback = "Current Speed: " + (dyApprox / 8).toFixed(2) + " mph";
	maxSpeedFeedback = "Maximum Speed: " + (dyMax / 8).toFixed(2) + " mph";
	
	if (treadmillRecord < expectedSpeed / 8) treadmillRecord = (expectedSpeed / 8).toFixed(2);
	
	fill(255, 205, 0);
    text(expectedSpeedFeedback, 10, 20);
	fill(200);
    text(approxSpeedFeedback, 10, 40);
	text(maxSpeedFeedback, 10, 60);
}

// Play a footstep sound whenever user touches the screen
function playFootstep() {
	if (touches.length > numFeet) step.play();
	
	numFeet = touches.length;
}

// Central function
function treadmill() {
    this.setup = function() {
		
        background(255);

		fill(40);
		rect(0, 0, dimX, dimY)
        
        setupTreadmill();
    }
    
    this.draw = function() {
		// Draw the line that gives user feedback
		stroke(lineR, lineG, lineB);
		strokeWeight(3);
		line(9 * dimX / 10, 0, 9 * dimX / 10, dimY);
		strokeWeight(1);
		
		adjustLineColor();
		displayStats();
        moveTreadmill();
		playFootstep();
        
        if (lineG - 2 < 0) {
			lineR = 0, lineG = 255, lineB = 0;
			
			fill(40);
			rect(0, 0, dimX, dimY);
			
			makeTreadmillVariables();
			treadmillLossSound.play();
            mgr.showScene( treadmillLoss );
        }
    }
}