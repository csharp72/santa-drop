function StarField(game){
	this.width = 4000;
	this.height = 8000;
	this.x = 0;
	this.y = 0;
	this.stars = [];
	this.starStep = game.speed / 4 / this.width;

	var numStars = 2000;

	for (var i=0; i<numStars; i++) {
		var newStar = Object.create(null);
		newStar.x = Math.random();
		newStar.y = Math.random();
		newStar.height = newStar.width = Math.ceil(Math.random() * 3);
		this.stars.push(newStar);
	}

	this.frameListener = radio.listen('frameEvent', function(eventType) {
		this[eventType] && this[eventType]();
	}.bind(this));

	// this.resizeListener = radio.listen('canvas-resize', function(canvas) {
	// 	this.height = canvas.height;
	// 	this.width = canvas.width;
	// }.bind(this));
}

StarField.prototype.drawFrame = function() {
	this.stars.forEach(function(star) {
		var x = star.x * this.width;
		var y = star.y * this.height;

		if (x + star.width > 0) {
			if (y < canvas.height && y + star.height > 0) {
				context.beginPath();
	    	context.rect(x, y, star.width, star.height);
	    	context.fillStyle = '#ffffff';
	    	context.fill();
	    }
	    star.x -= this.starStep;
	  } else {
	  	star.x = 1;
	  }
	}.bind(this))
}

StarField.prototype.destroy = function() {
	this.frameListener.destroy();
	// this.resizeListener.destroy();
	delete this;
}
