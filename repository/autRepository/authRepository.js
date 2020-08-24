const userModel = require('../../models/user/user');

module.exports = {
    signup_post: async ({ name, lastName, email, password }) =>{
        try{
            const {_doc} = await userModel.create({ name, lastName, email, password});
            return { 
                ..._doc,
                status: 201
            }
        }catch(err){
            return {
                ...err,
                status: 400
            }
        }
    }
}