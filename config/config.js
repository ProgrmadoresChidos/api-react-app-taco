// variables de entorno
const dotenv = require('dotenv');
dotenv.config();

// **************************
// Puerto
// **************************
process.env.PORT = process.env.PORT || 8080;

// **************************
// Entorno
// **************************
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
 
// **************************
// MongoDB
// **************************
process.env.MONGO_CONNEC_TO = process.env.MONGO_CONNEC_TO || 'mongodb://localhost:27017/app-del-taco'