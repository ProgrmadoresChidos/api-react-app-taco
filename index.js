const express = require('express');
const http = require('http');
const cors = require('cors');

// require controllers 
// const userControllers = require('./api/users/userController');
const routes = require('./routes');

const app = express();
// const server = http.createServer(app);
const PORT = process.env.PORT || 8080;


// app.use(userControllers);
app.use(routes);

app.use(cors);

// server.listen(PORT, () => console.log('Server has started on port: ', PORT));
app.listen(PORT, () => console.log('Server has started on port: ', PORT));