require('./config/config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// routes
const routes = require('./routes');

// 
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

// Require routes
app.use(routes);

// cors
app.use(cors);

// Conexion con Mongo DB
mongoose.connect(process.env.MONGO_CONNEC_TO, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('ONLINE database!');
});

app.listen(PORT, () => console.log('Server has started on port: ', PORT));