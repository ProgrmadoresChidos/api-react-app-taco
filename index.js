const express = require('express');
const http = require('http');
const cors = require('cors');

// require controllers 
const routes = require('./routes');

// 
const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors);

// use routes
app.use(routes);

app.listen(PORT, () => console.log('Server has started on port: ', PORT));