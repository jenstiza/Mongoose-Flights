const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var destinationSchema = new Schema({
	airport: {
		type: String,
		enum: [ 'AUS', 'DFW', 'DEN', 'LAX', 'SAN' ]
	},
	arrival: Date
});

var flightSchema = new Schema({
	airline: {
		type: String,
		enum: [ 'American', 'Southwest', 'United', 'Delta' ]
	},
	flightNo: {
		type: Number,
		min: 10,
		max: 9999
	},
	departs: {
		type: Date,
		default: function() {
			let d = new Date();
			let year = d.getFullYear();
			let month = d.getMonth();
			let day = d.getDate();
			let result = new Date(year + 1, month, day);
			return result;
		}
	},
	airport: {
		type: String,
		enum: [ 'AUS','LAX', 'SAN','DFW', 'DEN' ]
	},
	destinations: [ destinationSchema ]
});

module.exports = mongoose.model('Flight', flightSchema);