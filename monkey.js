/*-------------------------------------------------------------------------------------------
	PROJECT: Project Fine Motor Skills (FMS) for a stroke patient (mobile application)
	AUTHORS: Matthias Mitchell, Joseph Gonzalez, and Saud Alsaif
	FILE DESCRIPTION: Sub-file (child of main.js) to display the monkey activity (fly).
-------------------------------------------------------------------------------------------*/


// Variables for game
let monkeyRotation = 0;
let monkeyPosX = 0, monkeyPosY = 0, monkeyTime = 0, monkeyVelocityX = 0, monkeyVelocityY = 0;
let monkeyVarX = 0, monkeyVarY = 0;
let monkeyPrepared = false;
let slingshotStarted = false, monkeyShot = false;

// Variables for obstacles/platforms
let barrelX = 0, barrelY = 0;
let obstacleList = Array();
let levelNum = 0;

// Constants
const SLINGSHOT_RADIUS = 100;
const GRAVITY = 200;

// Resets all variables so that file can be re-used after game over
function makeMonkeyVariables() {
	monkeyRotation = 0;
	monkeyPosX = 0; monkeyPosY = 0; monkeyTime = 0; monkeyVelocityX = 0; monkeyVelocityY = 0;
	monkeyVarX = 0; monkeyVarY = 0;
	monkeyPrepared = false;
	slingshotStarted = false; monkeyShot = false;
	
	barrelX = 0, barrelY = 0;
	obstacleList = [];
}

// Randomizes the placement of the barrel of bananas
function spawnBarrel() {
	barrelX = random(8*dimX/10, 9*dimX/10);
	barrelY = random(2*dimY/9, 7*dimY/9);
	obstacleList.push(new Obstacle(barrelX - 20, barrelY + 70, 110, dimY - barrelY + 70, platform));
}

// Spawns barriers that user must avoid... difficulty slightly increases with consecutive levels
function spawnObstacles() {
	obstacleList.push(new Obstacle(10*dimX/30, random(dimY/3,4*dimY/5), 1*dimX/10, dimY, random([tree1,tree2,tree3,tree4])));
	obstacleList.push(new Obstacle(14*dimX/30, random(dimY/2,3*dimY/4), 1*dimX/10, dimY, random([tree1,tree2,tree3,tree4])));
	obstacleList.push(new Obstacle(18*dimX/30, random(dimY/2,2*dimY/3), 1*dimX/10, dimY, random([tree1,tree2,tree3,tree4])));
	
	if (levelNum > 2) obstacleList.push(new Obstacle(random(16*dimX/30, 18*dimX/30), -dimY, 1*dimX/10, random(11*dimY/30, 13*dimY/30), random([tree1,tree2,tree3,tree4])));
	
	if (levelNum > 3) obstacleList.push(new Obstacle(random(16*dimX/30, 18*dimX/30), -dimY, 1*dimX/10, random(11*dimY/30, 13*dimY/30), random([tree1,tree2,tree3,tree4])));
}

// Draws the barrel that was randomly placed in spawnBarrel
function drawBarrel() {
	image(barrel, barrelX, barrelY, 70, 70);
}

// Draws the barriers placed in spawnObstacles
function drawObstacles() {
	for (let i = 0; i < obstacleList.length; i++) {
		image(obstacleList[i].getPicture(), obstacleList[i].getX(), obstacleList[i].getY(), obstacleList[i].getW(), obstacleList[i].getH());
	}
}

// Primes the monkey for launch if and only if the user has two fingers within the launch radius
function prepareMonkey() {
	if (touches.length === 2) {
		if (Math.abs(touches[0].y - SLINGSHOT_POS_Y) < SLINGSHOT_RADIUS && Math.abs(touches[1].y - SLINGSHOT_POS_Y) < SLINGSHOT_RADIUS && Math.abs(touches[0].x - SLINGSHOT_POS_X) < SLINGSHOT_RADIUS && Math.abs(touches[1].x - SLINGSHOT_POS_X) < SLINGSHOT_RADIUS && !monkeyShot) {
			monkeyPrepared = true;
			slingshotStarted = true;
			
			if (touches[0].x < touches[1].x) {
				monkeyPosX = touches[0].x;
				monkeyPosY = touches[0].y;
			}
			else {
				monkeyPosX = touches[1].x;
				monkeyPosY = touches[1].y;
			}
			
			imageMode(CENTER);
			image(monkeyCharacter, monkeyPosX, monkeyPosY, 70, 70);
			imageMode(CORNER);
		}
		else monkeyPrepared = false;
	}
	else monkeyPrepared = false;
}

// General function to iterate through arrays and control monkey trajectory
function shootMonkey() {
	
	// To be called a single time once the monkey is released
	if (slingshotStarted && touches.length < 2 && !monkeyShot) {
		monkeyVelocityX = 4*(SLINGSHOT_POS_X - monkeyPosX);
		monkeyVelocityY = -4*(SLINGSHOT_POS_Y - monkeyPosY);
		monkeyShot = true;
		swoosh.play();
	}
	// Models the monkey movement with ideal projectile motion
	if (monkeyShot) {
		monkeyTime += 0.06
		monkeyVarX = monkeyPosX + monkeyVelocityX * monkeyTime;
		monkeyVarY = monkeyPosY - monkeyVelocityY * monkeyTime + 0.5 * GRAVITY * monkeyTime * monkeyTime;
		
		imageMode(CENTER);
		image(monkeyCharacter, monkeyVarX, monkeyVarY, 70, 70);
		imageMode(CORNER);
	}
	// Determines whether the monkey has hit the barrel
	if (barrelX < monkeyVarX && barrelX + 70 > monkeyVarX && barrelY < monkeyVarY) {
		fill(40);
		rect(0, 0, dimX, dimY);
		
		levelNum++;
		if (levelRecord < levelNum) levelRecord = levelNum;
		
		monkeyPoint.play();
		makeMonkeyVariables();
		spawnBarrel();
		spawnObstacles();
	}
	// Determines whether the monkey has hit any obstacles or gone outside of boundaries
	for (let i = 0; i < obstacleList.length; i++) {
		
		if ((monkeyVarX > obstacleList[i].getX() && monkeyVarX < obstacleList[i].getX() + obstacleList[i].getW() && monkeyVarY > obstacleList[i].getY() && monkeyVarY < obstacleList[i].getY() + obstacleList[i].getH()) || (monkeyVarY > dimY)) {
			monkeyHit.play();
			
			makeMonkeyVariables();
			spawnBarrel();
			spawnObstacles();
			levelNum = 0;
			
			fill(40);
			rect(0, 0, dimX, dimY);
			
			// Display "game over" screen
			mgr.showScene( monkeyLoss );
		}
	}
}

// Central function
function monkey() {
	this.setup = function() {
		makeMonkeyVariables();
		spawnBarrel();
		spawnObstacles();
	}
	
	this.draw = function() {
		background(255);

		imageMode(CENTER);
		image(monkeyBackground, dimX/2, dimY/2, dimX, dimY);
		imageMode(CORNER);
		
		drawBarrel();
		drawObstacles();
		
		if (!monkeyPrepared && !monkeyShot) {
			imageMode(CENTER);
			image(monkeyCharacter, SLINGSHOT_POS_X, SLINGSHOT_POS_Y, 70, 70);
			imageMode(CORNER);
		}
		
		textSize(16);
		textAlign(LEFT);
		fill(255, 205, 0);
		text("Collected Barrels: " + levelNum, 10, 20);
		fill(200);
		text("Current Record: " + levelRecord, 10, 40);
		
		
		stroke(100);
		noFill();
		circle(SLINGSHOT_POS_X, SLINGSHOT_POS_Y, 2*SLINGSHOT_RADIUS);
		noStroke();
		
		prepareMonkey();
		shootMonkey();
	}
}