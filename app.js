var app = require('./src/lib/app');
const mongoose = require('mongoose');

var mongoUrl = 'mongodb://ec2-34-248-57-210.eu-west-1.compute.amazonaws.com:27017/movies';
// index route
app.get('/', function (req, res) {
    res.status(200).json({message: 'Film Store API is running !', Status: "green"});
});
mongoose.connect(mongoUrl, {

    mongoose: {
        safe: true
    }

}, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
});
mongoose.connection.on('connected', function () {
    console.log('connected to database ');

});
//start server
app.listen(3000, function () {
    console.log('server started on port 3000');
});