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

// **************************
// Seed
// **************************
process.env.SEED = process.env.SEED || 'test-token'

// **************************
// Domain cors
// **************************
process.env.DOMAIN = process.env.DOMAIN || 'http://localhost:3000'

// **************************
// Vencimiento del token
// **************************
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60;
