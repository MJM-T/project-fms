class Button {
	constructor(posX, posY, wdth, hgth, btnText) {
		this.x = posX;
		this.y = posY;
		this.w = wdth;
		this.h = hgth;
		this.t = btnText;
	}
	
	
	has(mx, my) {
		if (mx - this.x < this.w && my - this.y < this.h && mx - this.x > 0 && my - this.y > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	
	display() {
		noStroke();
		fill(0, 100, 130);
		rect(this.x - 2, this.y - 2, this.w + 4, this.h + 4, 22);
		if (this.has(mouseX, mouseY)) {
			fill(20, 60, 90);
		} else {
			fill(120, 130, 150);
		}
		rect(this.x, this.y, this.w, this.h, 20);
		
		textSize(20);
		textStyle(BOLD);
		fill('black');
		text(this.t, this.x + this.w/2 - 35, this.y + this.h/2 + 8);
	}
	
	
	buttonToString() {
		return this.t;
	}
}