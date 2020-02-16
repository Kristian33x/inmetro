'use strict'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const properties = require('./config/properties');
const DB = require('./config/db')
const morgan = require('morgan');
// const { mongoose } = require('./database');

DB();

const app = express();
const router = express.Router();


const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors());

app.use('/api', router);

authRoutes(router);
router.get('/', (req, res) => {
    res.send('Hello from home');
});

// index.js

// Settings
// app.set('port', process.env.PORT || 3000);

// // Middlewares
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(cors({ origin: 'http://localhost:4200' }))

// Routes
app.use('/api/buses', require('./routes/bus.routes'));
app.use('/api/conductores', require('./routes/conductor.routes'));

// fin index.js



app.use(router);
app.listen(properties.PORT, () => console.log(`Server runing on port ${properties.PORT}`));