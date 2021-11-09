/*-------------------------------------------------------------------------------------------
	PROJECT: Project Fine Motor Skills (FMS) for a stroke patient (mobile application)
	GROUP MEMBERS: Team #7, composed of Joseph Gonzalez, Matthias Mitchell, and Saud Alsaif
	FILE DESCRIPTION: Defines an Obstacle class for reference in monkey.js for barriers.
-------------------------------------------------------------------------------------------*/



let Obstacle = class {
	
	constructor(x, y, w, h, picture) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.picture = picture;
	}
	
	getX() {
		return this.x;
	}
	
	getY() {
		return this.y;
	}
	
	getW() {
		return this.w;
	}
	
	getH() {
		return this.h;
	}
	
	getPicture() {
		return this.picture;
	}
	
	hasHit(posX, posY) {
		return posX >= this.x && posX <= this.x + this.w && posY >= this.y;
	}
	
}