require('./config/config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// routes
const routes = require('./routes');

// 
const app = express();
const PORT = process.env.PORT;

// Require routes
app.use(routes);

// cors
app.use(cors);


// Conexion con Mongo DB
// mongoose.connect('mongodb://localhost:27017/app-del-taco', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// }, (err, res) => {
//     if (err) throw err;
//     console.log('ONLINE database!');
// });

app.listen(PORT, () => console.log('Server has started on port: ', PORT));