const mongoose = require('mongoose');
const URI = 'mongodb://localhost/02-metrolinea'
const URI2 = 'mongodb+srv://Kristian33x:Fraija123@cluster0-8cfql.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(URI)
    .then(db => console.log('DB esta conectada'))
    .catch(err => console.error(err));

module.exports = mongoose;