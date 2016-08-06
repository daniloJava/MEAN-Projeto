var mongoose = require('mongoose');
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/pools');

var Schema = mongoose.Schema;

var voteSchema = new Schema({
	name: { type: String, required: true },
	candidate: { type: String, required: true }
});

var Vote = mongoose.model('vote', voteSchema);

    function Vote() {
		this.name = '';
		this.candidate = '';
	}


module.exports = {

    // This function will answer to a POST on /addPool
    // and add the pool in MongoDB
    addPool: function (req, res) {

      // Show the data as JSON
      console.log(req.body);

      // Create the object with the data 
      // that came from the POST
      var vote = new Vote(req.body);

     // Save the object in MongoDB
      vote.save(function (error, contato) {
          if (error)
              res.sendStatus(500);

          res.sendStatus(201);
      });
  },

    // This function will answer to a GET on /listPools
    // and return all the pools
    listPool: function (req, res) {

      Vote.find({}, function (error, votes) {
          if (error)
              res.sendStatus(500);

          res.json({ votes: votes });
    });
  }
};


