var express = require('express');
var logger = require('morgan');
var routes = require('./routes/index');
var users = require('./routes/users');
var wines = require('./routes/wines');


var app = express();

// view engine setup
app.set('port', 3030);



app.use(logger('dev'));


app.use('/', routes);
app.use('/users', users);

app.settings.env(function (){
    app.use(express.logger('dev'));
    app.use(express.bodyPaser());
})

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


process.on('uncaughtException', function (err) {
    console.log('CaughtException' + err);
});

app.use(function (req, res, next) {
    res.staus(404);

});
// request
if(req.accept('html')) {
    res.render('404', { url: req.url});
    return;
}

// response
if(res.accept('json')) {
    res.send({ error: 'Not Found'});
    return;
}

// default to plain-text
res.type('txt').send('Not Found');


module.exports = app;






