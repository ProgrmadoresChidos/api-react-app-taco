const router = require('express').Router();
const Error = require('../../errors/classes/Error');
const { menuService_Post } = require('../../services/organizationService/organizationService');


const validResult = (result, res) =>{
    if( result instanceof Error){
        const { status, ...data} = result.toJson();
        res.status(status).send(data)
    } else {
        const { status, ...data} = result;
        res.status(status).send(data)
    }
}

const menuController_Post = async (req, res) => {
    const result = await menuService_Post(req.body);
    validResult(result, res);
}
const menuController_Get = async (req, res) => {
    // const result = await menuService_Get(req.body);
    res.send(req.params.id)
    // validResult(result, res);
}


module.exports = {
    menuController_Post,
    menuController_Get
}