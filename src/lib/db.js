var mongoose = require('mongoose');
var mongoUrl ='mongodb://127.0.0.1:27017/movies';

module.exports = function(app) {
  mongoose.connect(mongoUrl, {

    mongoose: {
      safe: true
    }

  }, function(err) {
    if (err) {
      return console.log('Mongoose - connection error:', err);
    }
  });
    mongoose.connection.on('connected', function () {
        console.log('connected to database ' + config.database);

    });

   mongoose.set('debug', true);

  return mongoose;
};
