const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
    genericGetUser,
    createUser,
    genericUpdateUser
} = require('../services/user')

module.exports = {
    addUser: (req, res) => {
        const {
            name,
            password,
            passwordCheck,
            email,
            payment_method,
            plan
        } = req.body

        if (password === passwordCheck) {
            bcrypt.hash(password, 8, (err, hashedPassword) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Ocorreu um erro ao tentar criar a senha no sistema'
                    })
                    console.log('aqui o carai do erro', err)
                } else {
                    const userObj = Object.assign({}, {
                        name,
                        email,
                        password: hashedPassword,
                        payment_method,
                        plan
                    })

                    createUser(userObj)
                        .then(response => {
                            res.json({
                                success: true,
                                data: response
                            })
                        })
                        .catch(err => {
                            console.log('aqui o carai do erro', err)
                            res.json({
                                success: false,
                                message: 'Deu treta na criação do usuário'
                            })
                        })
                }
            })
        } else {
            res.json({
                success: false,
                message: 'As senha precisão ser iguais.'
            })
        }
    },

    userLoginAuth: async (req, res) => {
        const {
            email,
            password
        } = req.body

        if (email && password) {
            try {
                const userData = await genericGetUser({ email })

                if (userData) {
                    const isEqual = bcrypt.compareSync(password, userData.password)

                    if (isEqual) {
                        const payload = JSON.stringify({_id: userData._id})

                        const token = jwt.sign(payload, AUTH_KEY)

                        if (token) {
                            res.json({
                                success: true,
                                token,
                                data: {
                                    ...userData
                                }
                            })
                        } else {
                            res.json({
                                success: false,
                                message: 'Ocorreu treta na criação do token!'
                            })
                        }
                    } else {
                        res.json({
                            success: false,
                            message: 'Senha incorreta magrão!'
                        })
                    }
                } else {
                    res.json({
                        success: false,
                        message: 'Email ou senha incorretos!'
                    })
                }
            } catch (err) {
                res.json({
                    success: false,
                    message: 'Opsss! )=',
                    error: String(err)
                })
            }
        } else {
            res.json({
                success: false,
                message: 'Campos são obrigatórios para realizar o login!'
            })
        }
    }
}