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
    },
    login_post: async (email, password) => {
        const user = await userModel.findOne({ email });
        if (!user) {
            return {
                error: {
                    message: 'Wrong (user) or password'
                }
            }
        }

        if (!bcrypt.compare(password, user.password)) {
            return {
                error: {
                    message: 'Wrong user or password'
                }
            }
        }

        return {
            user
        }
    },
}