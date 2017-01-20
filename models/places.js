var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;

