var express = require('express');
var logger = require('morgan');
var routes = require('./routes/index');
var users = require('./routes/users');
var wines = require('/routes/wines');


var app = express();

// view engine setup
app.set('port', 3030);





app.use(logger('dev'));


app.use('/', routes);
app.use('/users', users);

app.settings.env(function (){
    app.use(express.logger('dev'));
});

app.get('/api', function (req, res) {
    res.send('API is running');
});
app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById());
app.post('/wines', wines.addWine);
app.put('/wines/:id', wines.updateWine);
app.delete('/wines/:id', wines.deleteWine);


app.listen(app.get('port'), function () {
    console.log('Server is running at 3030');
});






// request





module.exports = app;






