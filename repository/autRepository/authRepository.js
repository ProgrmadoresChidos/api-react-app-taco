const bcrypt = require('bcrypt');
const userModel = require('../../models/user/user');

module.exports = {
    signup_post: async ({ name, lastName, email, password }) => {

        const bcryptPassword = bcrypt.hashSync(password, 10);
        const user = new userModel({
            name: name,
            lastName: lastName,
            email: email,
            password: bcryptPassword
        })

        return await user.save();
    }
}