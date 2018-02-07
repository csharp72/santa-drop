function addClass(el, className) {
	if (el.className.indexOf(className) === -1) {
		el.className = el.className.replace(/\s*$/, ' ' + className).replace(/^\s*/, '').replace(/\s/, ' ');
	}
}

function removeClass(el, className) {
	el.className = el.className.replace(className, '').replace(/^\s*/, '').replace(/\s/, ' ');
}

// TODO
function pickRandom(oddsObj) {
	for (key in oddsObj) {
		console.log(key, oddsObj[key])
	}
}

function removeFromArray(array, item) {
	var i = array.indexOf(item);
	if (i !== -1) {
		return array.splice(i, 1);
	}
}
