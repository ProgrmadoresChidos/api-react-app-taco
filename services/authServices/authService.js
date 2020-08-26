const authRepository = require('../../repository/autRepository/authRepository');

const handleError = ( error ) => {

    let errors = {}

    Object.keys(error).forEach( value => {
        if( value === "name"){
            errors = {
                "mongoDB": error.name,
                "code": error.code
            }
        }else if(value === "errors"){
            errors = Object.keys(error.errors).reduce( (acc, key) =>
            ({
                ...acc,
                [key]: error.errors[key].message
            })
            , {})
        }
    })

    return {
        errors: {
            ...errors
        }
    }
}

module.exports = {
    signup_post: async (usuario) =>{
        
        try{
            const doc = await authRepository.signup_post(usuario);        
            return { 
                ...doc,
                status: 201
            }
        }catch(err){
            return {
                ...err,
                // ...handleError(err),
                status: 400
            }
        }
    }
}