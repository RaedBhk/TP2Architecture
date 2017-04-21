var app = require('./src/lib/app')
const mongoose = require('mongoose');
var mongoUrl ='mongodb://127.0.0.1:27017/movies';
// index route
app.get('/', function (req,res) {
    res.send('invalid endpoint');
})
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
    console.log('connected to database ');

});
//start server
app.listen(3000,function () {

    console.log('server started on port 3000');

});