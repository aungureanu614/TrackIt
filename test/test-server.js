// global.DATABASE_URL = 'mongodb://test:test@ds045242.mlab.com:45242/fullstack-capstone';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();
var app = server.app;
var storage = server.storage;
var placeId;
var bookId;
var restaurantId;

var Place = require('../models/places');
var Book = require('../models/books');
var Restaurant = require('../models/restaurants');

chai.use(chaiHttp);

describe('Fullstack Capstone Places Tests', function() {
    
    before(function(done) {
        server.runServer(function() {
            Place.create({name: 'Bali, Indonesia'},
                        {name: 'Prague, Czech Republic'},
                        {name: 'MOMA Museum, San Francisco'}, function() {
                done();
            });
            
        });
    });
    

    after(function(done) {
        Place.remove(function() {
            done();
        });
        
    });
    
    
    
    it('should get html', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.html;
                done();
           });
    });
    
    it('should list places on GET', function(done) {
        chai.request(app)
            .get('/items/places')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Bali, Indonesia');
                res.body[1].name.should.equal('Prague, Czech Republic');
                res.body[2].name.should.equal('MOMA Museum, San Francisco');
                // console.log(res.body);
                done();
            });
    });
    
    it('should add a place on POST', function(done) {
        chai.request(app)
            .post('/items/places')
            .send({'name': 'Paris, France'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body.name.should.equal('Paris, France');
                placeId = res.body._id;
                done();
            });
    });
    
    it('should edit a place on PUT', function(done) {
        chai.request(app)
            .put('/items/places/' + placeId)
            .send({'name':'Milano, Italy'})
            .end(function(err, res){
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.ok.should.equal(1);
                res.body.nModified.should.equal(1);
                res.body.n.should.equal(1);
                done();
            });
    });
    
    it('should delete a place on DELETE', function(done) {
        chai.request(app)
            .delete('/items/places/' + placeId)
            .end(function(err, res){
               should.equal(err, null);
                res.should.be.json;
                res.body.ok.should.equal(1);
                res.body.n.should.equal(1);
                done();
            });
    });
    
});

describe('Fullstack Capstone Books Tests', function() {
    before(function(done) {
        server.runServer(function() {
            Book.create({title: 'Elegant Universe', author: 'Brian Greene'},
                        {title: 'Universe From Nothing', author: 'Lawrence Krauss'},
                        {title: 'Our Mathematical Universe', author: 'Max Tegmark'}, function() {
                done();
            });
            
        });
    });
    

    after(function(done) {
        Book.remove(function() {
            done();
        });
        
    });
    
    it('should list books and authors on GET', function(done) {
        chai.request(app)
            .get('/items/books')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('author');
                res.body[0].title.should.be.a('string');
                res.body[0].author.should.be.a('string');
                res.body[0].title.should.equal('Elegant Universe');
                res.body[0].author.should.equal('Brian Greene');
                res.body[1].title.should.equal('Universe From Nothing');
                res.body[1].author.should.equal('Lawrence Krauss');
                res.body[2].title.should.equal('Our Mathematical Universe');
                res.body[2].author.should.equal('Max Tegmark');
                done();
            });
     });
     
     it('should add a book title and author on POST', function(done) {
        chai.request(app)
            .post('/items/books')
            .send({'title': 'My Book', 'author': 'My Author'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('author');
                res.body.should.have.property('_id');
                res.body.title.should.be.a('string');
                res.body.author.should.be.a('string');
                res.body.title.should.equal('My Book');
                res.body.author.should.equal('My Author');
                bookId = res.body._id;
                done();
            });
    });
    
    it('should edit a book title and author on PUT', function(done) {
        chai.request(app)
            .put('/items/books/' + bookId)
            .send({'title': 'Change Title', 'author': 'Change Author'})
            .end(function(err, res){
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.ok.should.equal(1);
                res.body.nModified.should.equal(1);
                res.body.n.should.equal(1);
                done();
            });
    });
    
    it('should delete a book entry on DELETE', function(done) {
        chai.request(app)
            .delete('/items/books/' + bookId)
            .end(function(err, res){
               should.equal(err, null);
                res.should.be.json;
                res.body.ok.should.equal(1);
                res.body.n.should.equal(1);
                res.body.should.be.a('object');
                done();
               
            });
    });
    
});

describe('Fullstack Capstone Restaurants Tests', function() {
    before(function(done) {
        server.runServer(function() {
            Restaurant.create({name: 'Restaurant 1', loc: 'Location 1'},
                        {name: 'Restaurant 2', loc: 'Location 2'},
                        {name: 'Restaurant 3', loc: 'Location 3'}, function() {
                done();
            });
            
        });
    });
    

    after(function(done) {
        Restaurant.remove(function() {
            done();
        });
        
    });
    
    it('should list restaurants and locations on GET', function(done) {
        chai.request(app)
            .get('/items/restaurants')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('loc');
                res.body[0].name.should.be.a('string');
                res.body[0].loc.should.be.a('string');
                res.body[0].name.should.equal('Restaurant 1');
                res.body[0].loc.should.equal('Location 1');
                res.body[1].name.should.equal('Restaurant 2');
                res.body[1].loc.should.equal('Location 2');
                res.body[2].name.should.equal('Restaurant 3');
                res.body[2].loc.should.equal('Location 3');
                done();
            });
     });
     
     it('should add a restaurant name and/or location on POST', function(done) {
        chai.request(app)
            .post('/items/restaurants')
            .send({'name': 'My Restaurant', 'loc': 'My Location'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('loc');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body.loc.should.be.a('string');
                res.body.name.should.equal('My Restaurant');
                res.body.loc.should.equal('My Location');
                restaurantId = res.body._id;
                done();
            });
    });
    
    it('should edit a name and/or location on PUT', function(done) {
        chai.request(app)
            .put('/items/restaurants/' + restaurantId)
            .send({'name': 'Change Restaurant', 'loc': 'Change Location'})
            .end(function(err, res){
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.ok.should.equal(1);
                res.body.nModified.should.equal(1);
                res.body.n.should.equal(1);
                done();
            });
    });
    
    it('should delete a name and/or location on DELETE', function(done) {
        chai.request(app)
            .delete('/items/restaurants/' + restaurantId)
            .end(function(err, res){
              should.equal(err, null);
                res.should.be.json;
                 res.body.ok.should.equal(1);
                 res.body.n.should.equal(1);
                 res.body.should.be.a('object');
                done();
               
            });
    });
    
});