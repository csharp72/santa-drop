var canvas = document.getElementById('render-canvas');
var context = canvas.getContext('2d');

function sizeCanvas(){
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
}

window.addEventListener('resize', function(){
	sizeCanvas();
	radio.broadcast('canvas-resize', {
		height: canvas.height,
		width: canvas.width
	});
});

sizeCanvas();
