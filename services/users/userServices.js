const userRepository = require('../../repository/users/userRepository')

//logica de negocio


module.exports = {
    saveUser: ()=> userRepository.saveUser(),
    buscarUser: () => "jorjais"
}