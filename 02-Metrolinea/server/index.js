// const express = require('express');
// const morgan = require('morgan');
// const app = express();
// const cors = require('cors');
// const { mongoose } = require('./database');


// Settings
// app.set('port', process.env.PORT || 3001);

// Middlewares
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(cors({ origin: 'http://localhost:4200' }))

// // Routes
// app.use('/api/buses', require('./routes/bus.routes'));
// app.use('/api/conductores', require('./routes/conductor.routes'));

//Starting the server
// const server = 
// app.listen(app.get('port'), () => {
//     console.log('server running on port ', app.get('port'))
// });


// const SocketIO = require('socket.io');
// const io = SocketIO(server);

// // Web Sockets
// io.on('connection', () => {
//     console.log('new Connecton');
// })