const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
	new: newTicket,
	create,
	delete: deleteTicket
};

function newTicket(req, res) {
	res.render('tickets/new', { flightId: req.params.id });
}

function create(req, res) {
	const flightId = req.params.id;
	console.log(req.body);
	req.body.flight = flightId
	Ticket.create(req.body, function(err, ticket) {
		res.redirect(`/flights/${flightId}`);
	});
}

function deleteTicket(req, res) {
	Ticket.findById(req.params.id).populate('flight').exec(function(err, ticket) {
		Ticket.findByIdAndDelete(req.params.id, function(err) {
			console.log(`deleting: ${ticket}`);
			res.redirect(`/flights/${ticket.flight._id}`);
		});
	});
}