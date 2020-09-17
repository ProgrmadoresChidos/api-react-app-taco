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

module.exports = {
    menuRepository_Post
}