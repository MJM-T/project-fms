/*-------------------------------------------------------------------------------------------
	PROJECT: Project Fine Motor Skills (FMS) for a stroke patient (mobile application)
	AUTHORS: Matthias Mitchell, Joseph Gonzalez, and Saud Alsaif
	FILE DESCRIPTION: Driver file. INTENDED TO BE RUN ON A SMARTPHONE.
-------------------------------------------------------------------------------------------*/


// Application dimension constants:
const dimX = window.innerWidth;
const dimY = window.innerHeight;
// Constants for activity 3 (monkey):
const SLINGSHOT_POS_X = dimX / 6, SLINGSHOT_POS_Y = 2 * dimY / 3;
// Variables for activity 3 (monkey):
let levelRecord = 0;
// Array that will include scenes for activities 1-3 and the menu
var mgr;

// Load images and sound files before anything else
function preload() {
	soundFormats('mp3');
	
	click1 = loadSound('sounds/click1.mp3');
	click2 = loadSound('sounds/click2.mp3');
	step = loadSound('sounds/footstep.mp3'); step.playMode('sustain');
	collision = loadSound('sounds/collision.mp3');
	swoosh = loadSound('sounds/swoosh.mp3');
	monkeyPoint = loadSound('sounds/hitBananas.mp3');
	
	track = loadImage('images/treadmill.jpg');
	ship = loadImage('images/spaceship.png');
	monkeyCharacter = loadImage('images/monkey.PNG');
	tree1 = loadImage('images/tree1.png'); tree2 = loadImage('images/tree2.png');
	tree3 = loadImage('images/tree3.png'); tree4 = loadImage('images/tree4.png');
	platform = loadImage('images/platform.png');
	barrel = loadImage('images/barrel.png');
	
	asteroidsBackground = loadImage('images/asteroidsBackground.jpg');
	monkeyBackground = loadImage('images/monkeyBackground.jpg');
	
	treadmillGameOver = loadImage('images/treadmillGameOver.jpg');
	asteroidsGameOver = loadImage('images/asteroidsGameOver.jpg');
	monkeyGameOver = loadImage('images/monkeyGameOver.jpg');
	
	monkeyHit = loadSound('sounds/hitObstacle.mp3');
	treadmillLossSound = loadSound('sounds/treadmillGameOver.mp3');
	asteroidsLossSound = loadSound('sounds/asteroidsGameOver.mp3');
	
	treadmillHelp = loadImage('images/treadmillHelp.jpg');
	asteroidsHelp = loadImage('images/asteroidsHelp.jpg');
	monkeyHelp = loadImage('images/monkeyHelp.jpg');
}

// Set up a SceneManager (custom p5 library) to create a hierarchy of files to partition the program
function setup() {
	strokeWeight(1);
	
	createCanvas(dimX,dimY);
	
	mgr = new SceneManager();
	
	mgr.addScene( mainMenu );
	mgr.addScene( treadmill );
	mgr.addScene( asteroids );
	mgr.addScene( monkey );
	
	mgr.addScene( treadmillLoss );
	mgr.addScene( asteroidsLoss );
	mgr.addScene( monkeyLoss );
	
	mgr.addScene( help );
	
	mgr.showScene( mainMenu );
}

// Starts the SceneManager
function draw() {
	mgr.draw();
}