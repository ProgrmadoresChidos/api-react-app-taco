const userRepository = require('../../repository/usersRepository/userRepository')

//logica de negocio
module.exports = {
    saveUser: () => userRepository.saveUser(),
    buscarUser: () => "jorjais"
}