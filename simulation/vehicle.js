const events = require('events');


const loc = require('./locations');

class Vehicle extends events.EventEmitter {

	constructor(identity, nameFrom, nameTo) {
		super();
		this.identity = identity;
		this.nameFrom = nameFrom;
		this.nameTo = nameTo;

		this.vxy = 10; //units per second
		this.vz = 2;   //units per second

	  this.ptFrom = loc.getLocation(namFrom);
		this.ptTo = loc.getLocation(nameTo);
	
	  this.x = this.ptFrom['x'];
		this.y = this.ptFrom['y'];
		this.z = this.ptFrom['z'];
	}


}
