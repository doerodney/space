const process = require('process');
const loc = require('./locations');

// interval
const msInterval = 1000;

// states
const sAscent = 0;
const sHorizontal = 1;
const sDescent = 2;
const sLanding = 3;
let sCurrent = sAscent;

// velocity parameters (units per second)
const vAscent = 5.0;
const vHorizontal = 40.0;
const vDescent = -5.0;
const vLanding = -1.0;

const from = process.argv[2] || 'HQ';
const to = process.argv[3] || 'WH';

// positions 
const xyzFrom = loc.getLocation(from);
const xyzTo = loc.getLocation(to);
let xyzCurrent = xyzFrom;
const ceiling = 50.0 + Math.max(xyzFrom.z, xyzTo.z);
const zLanding = xyzTo.z + 10;

// thresholds
const thresholdAscent = Math.abs(2 * vAscent);
const thresholdHorizontal = Math.abs(2 * vHorizontal);
const thresholdDescent = Math.abs(2 * vDescent);
const thresholdLanding = Math.abs(2 * vLanding);

// angles
const theta = getCourseAngle(xyzTo, xyzFrom);
const dx = msInterval * vHorizontal * Math.cos(theta) / 1000.0;
const dy = msInterval * vHorizontal * Math.sin(theta) / 1000.0;
const dzAscent = msInterval * vAscent / 1000.0;
const dzDescent = msInterval * vDescent / 1000.0;
const dzLanding = msInterval * vLanding / 1000.0;

// interval management
let intervalObj = null;

function distXY(x1, y1, x2, y2) {
	let dx = x2 - x1;
	let dy = y2 - y1;
	let distance = Math.sqrt(dx * dx + dy * dy);
	return distance;
}


function getCourseAngle(xyzTo, xyzFrom) {
	let theta = 0.0;
	let dx = xyzTo.x - xyzFrom.x;
	let dy = xyzTo.y - xyzFrom.y;
	if (dx === 0.0) {
		theta = Math.PI / 2.0;
		if (dy < 0) {
			theta = -1.0 * theta;
		}
	} else {
		theta = Math.atan(dy / dx);
	}

	return theta;
}


function onIntervalComplete(err, data) {
	switch (sCurrent) {
		case sAscent:
			xyzCurrent.z += dzAscent;			
			if (xyzCurrent.z > ceiling) {
				xyzCurrent.z = ceiling;
				sCurrent = sHorizontal;
			} else {
				console.log('Ascent:', xyzCurrent.x, ',', xyzCurrent.y, ',', xyzCurrent.z);
			}
			break;

		case sHorizontal:
			xyzCurrent.x += dx;
			xyzCurrent.y += dy;			
			let dist = distXY(xyzCurrent.x, xyzCurrent.y, xyzTo.x, xyzTo.y);
			console.log('Distance to descent point:', dist);
			if (dist < thresholdHorizontal) {
				xyzCurrent.x = xyzTo.x;
				xyzCurrent.y = xyzTo.y;
				xyzCurrent.z = ceiling;
				sCurrent = sDescent;
			} else {
				console.log('Horizontal:', xyzCurrent.x, ',', xyzCurrent.y, ',', xyzCurrent.z);
			}
			break;

		case sDescent:
			xyzCurrent.z += dzDescent;			
			if (xyzCurrent.z < zLanding) {
				sCurrent = sLanding;
			}
			console.log('Descent:', xyzCurrent.x, ',', xyzCurrent.y, ',', xyzCurrent.z);
			break;

		case sLanding:
			xyzCurrent.z += dzLanding;	
			console.log('Landing:', xyzCurrent.x, ',', xyzCurrent.y, ',', xyzCurrent.z);
			if ((xyzCurrent.z - xyzTo.z) < thresholdLanding) {
                console.log('Landed:', xyzTo.x, ',', xyzTo.y, ',', xyzTo.z)
				clearInterval(intervalObj); // All done!
			}			
			break;

		default:
			console.log('Invalid state detected.');
			break;
	}

}


const fromValid = loc.isValidLocation(from);
const toValid = loc.isValidLocation(to);

if (fromValid && toValid) {
	console.log('Travel from', xyzFrom, 'to', xyzTo, 'at a ceiling of', ceiling);
	intervalObj = setInterval(onIntervalComplete, msInterval);
}
