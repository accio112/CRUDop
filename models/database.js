const mongoose = require('mongoose');

const connection = 'mongodb://dkv:dheeraj1234@ds253094.mlab.com:53094/comment_db';

mongoose.connect(connection, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('MongoDB connection successfully connected.');
    }
    else {
        console.log('Error in DB connection : ' + err);
    }
});

require('./product.model');
