const authRepository = require('../../repository/autRepository/authRepository');

module.exports = {
    signup_post: async (usuario) =>{
        
        return await authRepository.signup_post(usuario);        

    }
}