const router = require('express').Router();
const Error = require('../../errors/classes/Error');
const { menuService_Post, menuService_GetById, menuService_GetByQuery } = require('../../services/organizationService/organizationService');


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
const menuController_GetById = async (req, res) => {
    // const result = await menuService_Get(req.body);
    // console.log(req.params.id);
    const result = await menuService_GetById(req);
    res.send(result)
    // validResult(result, res);
}
const menuController_GetByQuery = async (req, res) => {
    // const result = await menuService_Get(req.body);
    // console.log(req.params.id);
    const result = await menuService_GetByQuery(req);
    res.send(result)
    // validResult(result, res);
}


module.exports = {
    menuController_Post,
    menuController_GetById,
    menuController_GetByQuery
}