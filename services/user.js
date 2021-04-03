const userModel = require('../models/userModel')

module.exports = {
    genericGetUser: (...props) => {
        return userModel.findOne(
            ...props
        )
        .lean()
    },

    createUser: ({ password, email, payment_method, plan, profile_users }) => {
        return new userModel({
            password,
            email,
            payment_method,
            plan,
            profile_users
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
    },

    updateUserSubUsers: (userId, subUser) => {
        return userModel
            .findOneAndUpdate( 
                {
                    _id: userId,
                },
                {
                    $push: {
                        profile_users: subUser
                    }
                },
                {
                    new: true
                }
            )
            .exec()
    }
}