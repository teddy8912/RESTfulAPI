var express = require('express');
var logger = require('morgan');
var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('port', 3030);



app.use(logger('dev'));


app.use('/', routes);
app.use('/users', users);

// app listen

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.listen(app.get('port'), function () {
    console.log('Server is running at 3030');
});



module.exports = app;
