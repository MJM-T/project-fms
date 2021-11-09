/*-------------------------------------------------------------------------------------------
	PROJECT: Project Fine Motor Skills (FMS) for a stroke patient (mobile application)
	AUTHORS: Matthias Mitchell, Joseph Gonzalez, and Saud Alsaif
	FILE DESCRIPTION: Defines an Asteroid class for reference in asteroids.js.
-------------------------------------------------------------------------------------------*/



let Asteroid = class {
	
	constructor(posX, posY) {
		this.posY = posY;
		this.posX = posX;
		this.id = 0;
		this.r = random(100,120); this.g = random(100,120); this.b = random(100,120);
	}
	
	setCenter(centerX, centerY) {
		this.distX = centerX - this.posX;
		this.distY = centerY - this.posY;
		this.dist = Math.sqrt(this.distX * this.distX + this.distY * this.distY);
	}
	
	move() {
		this.posX += this.distX/this.dist;
		this.posY += this.distY/this.dist;
	}
	
	setPosX(newValueX) {
		this.posX = newValueX;
	}
	
	setPosY(newValueY) {
		this.posY = newValueY;
	}
	
	setID(newID) {
		this.id = newID;
	}
	
	getPosX() {
		return this.posX;
	}
	
	getPosY() {
		return this.posY;
	}
	
	getID() {
		return this.id;
	}
}
