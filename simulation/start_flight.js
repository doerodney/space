const process = require('process');
const loc = require('./locations');


// states
const ascent = 0;
const horizonal = 1;
const descent = 2;
const landing = 3;

// velocity parameters (units per second)
const vClimb = 5; 
const vHorizontal = 40;
const vDescent = 5;
const vLanding = 0.5;

function handleInterval(err, data) {



}



const from = process.argv[2] || 'HQ';
const to = process.argv[3] || 'NE';

const fromValid = loc.isValidLocation(from);
const toValid = loc.isValidLocation(to);

if (fromValid && toValid) {
	const xyzFrom = loc.getLocation(from);
	const xyzTo = loc.getLocation(to);

  const ceiling = max(xzyFrom.z, xyzTo.z) + 400;


}
