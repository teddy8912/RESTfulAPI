/**
 * Created by leedw on 15. 8. 14..
 */


var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

exports.findAll = function(req, res) {
    res.send([{name : 'wine1'}, {name : 'wine2'}, {name:'wine3'}]);
};

exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The name", description: "description"});
};

var server = new Server('localhost', 3030, {auto_reconnect: true});
db = new Db('winedb', server);

db.open(function(err, db){
    if(err) {
        console.log('The wines collection doesnt exist');
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retriveing wine' + id);
    db.collection('wines', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, item) {
            res.send(item);
        });
    });
};


