exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://test:test@ds045242.mlab.com:45242/fullstack-capstone':
                            'mongodb://localhost/fullstack-capstone');
exports.PORT = process.env.PORT || 8080;