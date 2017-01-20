var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    loc: { type: String, required: true }
});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;