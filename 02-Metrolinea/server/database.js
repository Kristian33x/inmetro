const mongoose = require('mongoose');
const URI = 'mongodb://localhost/02-metrolinea'

mongoose.connect(URI)
    .then(db => console.log('DB esta conectada'))
    .catch(err => console.error(err));

module.exports = mongoose;