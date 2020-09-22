const menuModel = require('../../models/menu/menu');

const menuRepository_Post = async (type, tittle, price, description) => {

    const menu = new menuModel({
        type: type,
        tittle: tittle,
        price: price,
        description: description
    })

    return (await menu.save()).toJSON();
}

const menuRepository_GetById = async (id) => {
    // const menu = new menuModel();
    // const result = await menuModel.find({ _id: id })
    const result = await menuModel.findById(id);
    return result;
}

const menuRepository_GetByQuery = async ( query ) => {
    const result = await menuModel.find(query);
    return result;
}

module.exports = {
    menuRepository_Post,
    menuRepository_GetById,
    menuRepository_GetByQuery
}