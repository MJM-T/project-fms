/*-------------------------------------------------------------------------------------------
	PROJECT: Project Fine Motor Skills (FMS) for a stroke patient (mobile application)
	AUTHORS: Matthias Mitchell, Joseph Gonzalez, and Saud Alsaif
	FILE DESCRIPTION: Sub-file (child of main.js) to display the asteroids activity.
-------------------------------------------------------------------------------------------*/


// Variables
let timer = 200, endTimer = 300;
let numTouches = 0;
let selectedAsteroids = [];
let asteroidList = [];
let destroyedAsteroids = 0;
let maxDestroyedAsteroids = 0;
let spawnChoicesX = [], spawnChoicesY = [];
let spawnX, spawnY;

// Constants
const RADIUS = 50;


// Resets all variables so that file can be re-used after game over
function makeAsteroidsVariables() {
	timer = 200; endTimer = 300;
	numTouches = 0;
	selectedAsteroids = [];
	asteroidList = [];
	destroyedAsteroids = 0;
	spawnChoicesX = []; spawnChoicesY = [];
}
// Once an alloted time has passed (which decreases over time), an asteroid is randomly placed somewhere around the border
function tryToSpawnAsteroid() {
	if (timer < endTimer) timer++;
	else {
		spawnChoicesX = [dimX - random(0, dimX), dimX, -dimX]
		spawnChoicesY = [dimY, -dimY]
		
		spawnX = random(spawnChoicesX);
		if (spawnX === dimX || spawnX === -dimX) spawnY = dimY - random(0, dimY);
		else spawnY = random(spawnChoicesY);
		
		timer = 0;
		endTimer--;
		
		let ast = new Asteroid(spawnX, spawnY)
		ast.setCenter(dimX/2, dimY/2);
		asteroidList.push(ast);
	}
}
// Calls the move() method defined in fms.asteroid.js.
function moveAsteroids() {
	for (let i = 0; i < asteroidList.length; i++) moveAsteroid(asteroidList[i]);
}
// Function referenced in moveAsteroids
function moveAsteroid(item) {
	item.move();
	fill(item.r, item.g, item.b);
	circle(item.getPosX(), item.getPosY(), RADIUS);
	
	if (Math.sqrt((item.getPosX() - dimX/2)*(item.getPosX() - dimX/2) + (item.getPosY() - dimY/2)*(item.getPosY() - dimY/2)) < RADIUS) {
		makeAsteroidsVariables();
		
		fill(40);
		rect(0, 0, dimX, dimY);
		
		asteroidsLossSound.play();
		mgr.showScene( asteroidsLoss );
	}
}
// General function to add/remove asteroids to/from different arrays to be controlled, released, or destroyed by the user
function controlAsteroid() {
	
	// This is called if a new touch event occurs
	if (touches.length > numTouches) {
		numTouches++;
		// Iterate through all spawned asteroids to determine if any are close enough to be grabbed
		for (let i = 0; i < asteroidList.length; i++) {
			if (Math.abs(touches[touches.length - 1].x - asteroidList[i].getPosX()) < RADIUS && Math.abs(touches[touches.length - 1].y - asteroidList[i].getPosY()) < RADIUS) {
				selectedAsteroids.push(asteroidList[i]);
				asteroidList[i].setID(touches[touches.length - 1].id);
				asteroidList.splice(i, 1);
				break;
			}
		}
	}
	// This is called if the user releases a finger
	if (touches.length < numTouches) {
		numTouches--;
		// Iterate through the selectedAsteroids and current touches to determine whether any asteroids should be released
		for (let i = 0, found = false; i < selectedAsteroids.length; i++) {
			for (let j = 0; j < touches.length; j++) {
				if (selectedAsteroids[i].id === touches[j].id) {
					found = true;
					break;
				}
			}
			if (!found) {
				asteroidList.push(selectedAsteroids[i]);
				asteroidList[asteroidList.length - 1].setCenter(dimX/2, dimY/2);
				selectedAsteroids.splice(i, 1);
			}
		}
	}
	// Iterates through selectedAsteroids and current touches to move any selected asteroids to the respective fingers
	for (let i = 0; i < selectedAsteroids.length; i++) {
		for (let j = 0; j < touches.length; j++) {
			if (selectedAsteroids[i].id === touches[j].id) {
				
				selectedAsteroids[i].setPosX(touches[j].x);
				selectedAsteroids[i].setPosY(touches[j].y);
			}
		}
		fill('green');
		circle(selectedAsteroids[i].getPosX(), selectedAsteroids[i].getPosY(), RADIUS);
	}
}
// Determines whether two selected asteroids are close enough to be destroyed
function destroyAsteroids() {
	for (let i = 0; i < selectedAsteroids.length; i++) {
		for (let j = 0; j < selectedAsteroids.length; j++) {
			if (Math.abs(selectedAsteroids[i].getPosX() - selectedAsteroids[j].getPosX()) < 1.5 * RADIUS && Math.abs(selectedAsteroids[i].getPosY() - selectedAsteroids[j].getPosY()) < 1.5 * RADIUS && i != j) {
				selectedAsteroids.splice(i, 1);
				if (i < j) selectedAsteroids.splice(j - 1, 1);
				else selectedAsteroids.splice(j, 1);
				collision.play();
				destroyedAsteroids += 2;
				if (maxDestroyedAsteroids < destroyedAsteroids) maxDestroyedAsteroids = destroyedAsteroids;
			}
		}
	}
}

// General function
function asteroids() {
	this.setup = function() {
		
	}
	
	this.draw = function() {
		
		background(255);
		
		imageMode(CENTER);
		image(asteroidsBackground, dimX/2, dimY/2, dimX, dimY);
		imageMode(CORNER);
		
		imageMode(CENTER);
		image(ship, dimX/2, dimY/2, dimX/10, dimX/10);
		imageMode(CORNER);
		
		textSize(16);
		textAlign(LEFT);
		fill(255, 205, 0);
		text("Destroyed Asteroids: " + destroyedAsteroids, 10, 20);
		fill(200);
		text("Current Record: " + maxDestroyedAsteroids, 10, 40);
		
		tryToSpawnAsteroid();
		controlAsteroid();
		destroyAsteroids();
		moveAsteroids();
	}
}