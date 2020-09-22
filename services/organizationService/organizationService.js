const OrgErrors = require("../../errors/orgErrors/orgErrors");
const { menuRepository_Post, menuRepository_GetById, menuRepository_GetByQuery } = require('../../repository/orgRepository/orgRepository')

const isValid = (fieldName, value, message = "Field is required") => {
    let errors = null
    if (!value) {
        errors = {
            [fieldName]: { message: message }
        }
    }

    return errors;
}

const menuService_Post = async (menu) => {
    try {
        const { type, tittle, price, description } = menu;
        let errorMap = {}
        let errors = []
        errors.push(isValid('type', type, 'Please enter the type'))
        errors.push(isValid('tittle', tittle, 'Please enter the tittle'))
        errors.push(isValid('price', price, 'Please enter the price'))
        errors = errors.filter(err => err)
        errorMap = errors.length > 0 ?
            errors.reduce((obj, el) => ({
                ...obj,
                ...el
            }), {})
            :
            null;
        if (errorMap === null) {
            const { __v, ...data } = await menuRepository_Post(type, tittle, Number(price), description);
            return {
                ...data,
                status: 201
            }
        } else {
            throw { errorMap };
        }
    } catch (err) {
        return new OrgErrors(err, 400);
    }
}

const menuService_GetById = async (req) => {
    try {
        const idParameter = req.params.id;
        if (idParameter) {
            const result = await menuRepository_GetById(idParameter)
            if (!result)
                throw {
                    errors: [
                        {
                            id: {
                                message: "No se encuentran resultados"
                            }
                        }
                    ]
                };
            return result;
        }
    } catch (err) {
        return err;
    }
}

const menuService_GetByQuery = async (req) => {
    try {
        const { type, tittle, desc } = req.body;
        let query = { $or: [{ "tittle": "bistec" }, { "type": "Taco" }] };
        const result = await menuRepository_GetByQuery(query)
        return result;
    } catch (err) {
        return err;
    }
}

module.exports = {
    menuService_Post,
    menuService_GetById,
    menuService_GetByQuery
}