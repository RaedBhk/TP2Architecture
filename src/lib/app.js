var express = require('express');
var app     = express();

//Body-Parser
//this will let us get the data from a POST
var bodyParser = require('body-parser');


// configure app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json());

// require('./db')(app);
// require('./parser')(app);

var actors = require('../routes/actors');
var movies = require('../routes/movies');

// middleware to use for all requests
app.use(function (req, res, next) {
    // do logging
    console.log('');
    console.log('###### Request Triggered ######');

    console.log('From :' + req.url);
    if (req.body !== null) {
        console.log('With a body content :');
        console.log(JSON.stringify(req.body));
    }
    console.log('###############################');
    console.log('');

    next(); // make sure we go to the next routes and don't stop here
});

// Actors routes
app.route('/actors')
  .get(actors.getAll)
  .post(actors.createOne);

app.route('/actors/:id')
  .get(actors.getOne)
  .put(actors.updateOne)
  .delete(actors.deleteOne);

app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id/movies/:mid', actors.deleteMovie);


// Movies routes
app.route('/movies')
  .get(movies.getAll)
  .post(movies.createOne);

app.route('/movies/:id')
  .get(movies.getOne)
  .put(movies.updateOne)
  .delete(movies.deleteOne);

app.post('/movies/:id/actors', movies.addActor);
app.delete('/movies/:id/actors/:mid', movies.deleteActor);


module.exports = app;
