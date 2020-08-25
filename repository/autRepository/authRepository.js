const userModel = require('../../models/user/user');

module.exports = {
    signup_post: async ({ name, lastName, email, password }) =>{

        return {_doc} = await userModel.create({ name, lastName, email, password});
        
    }
}