const express =  require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const PORT = 8080;

// API REST con express
// Autenticacion de usuarios
// JWT tokens
// middelwares para validar usuarios

app.get("/",(req, res)=>{
    res.send('hola mundo');
})


server.listen( PORT, () =>{
    console.info("Aplicación corriendo en el puerto " + PORT);
})