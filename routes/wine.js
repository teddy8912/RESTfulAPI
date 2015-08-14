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

exports.findAll = function(req, res) {
    db.collection('wines', function(err, collection){
        collection.find().toArray(function(err, items){
            res.send(items);
        });
    });
};

exports.addWine = function(req,res) {
    var wine = req.body;
    console.log('Adding wine' + JSON.stringify(wine));
    db.collection('wines', function (err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if(err) {
                res.send('error', 'error has occurred'); {
                }

            } else {
                console.log('Success' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    })

};

exports.updateWine = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine' + id);
    console.log(JSON.stringify(wine));
    db.collection('wines', function(err, collection){
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err,result) {
            if (!err) {
                console.log('')
            } else {
                console.log('' + result + 'document(s) updated');
                res.send(wine);
            }
        });
    });
};


exports.deleteWine = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('wines', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};


