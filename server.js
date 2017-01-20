var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
//Create runServer function that connects to the mongoose db and logs out if it is listening on localhost
var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

//require the mongoose schemas
var Place = require('./models/places');
var Book = require('./models/books');
var Restaurant = require('./models/restaurants');

//make a get call to the api endpoint of the specified 'feature' (places, books, restaurants)
app.get('/items/:feature', function(req, res) {
    if (req.params.feature === "places") {
        Place.find(function(err, items) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            
            res.json(items);
        }).sort({_id: 1});
    };
    if (req.params.feature === "books") {
        Book.find(function(err, items) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.json(items);
        });
    }
    if (req.params.feature === "restaurants") {
        Restaurant.find(function(err, items) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.json(items);
        });
     }
});
//Make a post request to add items to a certain api endpoint 
app.post('/items/:feature', function(req, res) {
    if (req.params.feature === "places") {
        Place.create({
            name: req.body.name
        }, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(item);
        });
    };
    if (req.params.feature === "books") {
        Book.create({
            title: req.body.title,
            author: req.body.author
        }, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(item);
        });
    }
    if (req.params.feature === "restaurants") {
        Restaurant.create({
            name: req.body.name,
            loc: req.body.loc
        }, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(item);
        });
    }

});
//Edit items of api endpoints based on id
app.put('/items/:feature/:id', function(req, res) {
    if (req.params.feature === "places") {
        Place.update({ _id: req.params.id }, { name: req.body.name }, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }

            res.status(201).json(item);
        });
    };
    if (req.params.feature === "books") {
        Book.update({ _id: req.params.id }, { title: req.body.title, author: req.body.author }, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }

            res.status(201).json(item);
        });
    }
    if (req.params.feature === "restaurants") {
        Restaurant.update({ _id: req.params.id }, { name: req.body.name, loc: req.body.loc }, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }

            res.status(201).json(item);
        });
    }

});
//Delete items from api endpoints
app.delete('/items/:feature/:id', function(req, res) {
    if (req.params.feature === "places") {
        Place.remove({ _id: req.params.id }, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }

            res.status(201).json(item);
        });
    };
    if (req.params.feature === "books") {
        Book.remove({ _id: req.params.id }, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }

            res.status(201).json(item);
        });
    }
    if (req.params.feature === "restaurants") {
        Restaurant.remove({ _id: req.params.id }, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }

            res.status(201).json(item);
        });
    }
});
//Handle requests to invalid endpoints graciously
app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
