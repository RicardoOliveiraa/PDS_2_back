const userModel = require('../models/userModel')

module.exports = {
    genericGetUser: (...props) => {
        return userModel.findOne(
            ...props
        )
        .lean()
    },

    createUser: ({name, password, email, payment_method, plan}) => {
        return new userModel({
            name,
            password,
            email,
            payment_method,
            plan
        })
        .save()
    },

    genericUpdateUser: (userId, ...props) => {
        return userModel
            .updateOne(
                {
                    _id: userId
                },
                ...props
            )
            .exec()
    }
}