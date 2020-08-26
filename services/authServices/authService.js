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
        const passRegex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
        try{
            let errors = null
            const { password } = usuario;
            if(!passRegex.test(password)){
                errors  = {
                    ...errors,
                    'password' : 'Please enter a valid password: at least 1 uppercase letter, 1 digit, 1 special character'
                }
            }
            if(errors === null){
                const {_doc} = await authRepository.signup_post(usuario);   
                return { 
                    ..._doc,
                    status: 201
                }
            }else{
                return {
                    errors : errors,
                    status: 400
                }
            }
        }catch(err){
            return {
                ...handleError(err),
                status: 400
            }
        }
    }
}