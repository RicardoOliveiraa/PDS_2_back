const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    //Aqui vai ficar o host do servidor de email que vamos usar, tem que criar um email para a conta
    //Vou deixar gmail mas só trocar depois
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        //Aqui vai ficar o email que vai mandar as mensagens.
        user: "Disneyflix@gmail.com",
        password: "SenhaProvisóriaShow",

    }
})

const {
    genericGetUser,
    createUser,
    genericUpdateUser,
    updateUserSubUsers
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
            bcrypt.hash(password, 8, async (err, hashedPassword) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Ocorreu um erro ao tentar criar a senha no sistema'
                    })
                    console.log('aqui o carai do erro', err)
                } else {
                    const profile_users = [
                        {
                            picture: '1',
                            name,
                        }
                    ]

                    const userObj = Object.assign({}, {
                        email,
                        password: hashedPassword,
                        payment_method,
                        plan,
                        profile_users
                    })

                    const userData = await genericGetUser({ email })

                    if (userData) {
                        res.json({
                            success: false,
                            message: "Já existe uma conta com esse email, tente realizar o login"
                        })
                    } else {
                        createUser(userObj)
                            .then(response => {
                                //Parte de mandar email aqui após o cadastro bem sucedido
                                // transporter.sendMail({
                                //     from: "DisneyFlix <Disneyflix@gmail.com>",
                                //     to: userObj.email,
                                //     subject: "Aqui fica o titulo do email",
                                //     text: "Texto do email",
                                //     html: "Da de mandar html, imagino que seja legal um link para o site de volta <a href='https://disneyflix.com'>Só dale</a> estilo assim"   
                                // }).then(message => {
                                //     console.log("Foi" , message);
                                // }).catch(err => {
                                //     console.log("Não foi" , err);
                                // })
                                //Termina parte de enviar email
                                res.json({
                                    success: true,
                                    data: response,
                                })
                            })
                            .catch(err => {
                                console.log('aqui o carai do erro', err)
                                res.json({
                                    success: false,
                                    message: 'Ocorreu um erro na criação do usuário ):',
                                    error: err
                                })
                            })
                    }

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
            genericGetUser({ email })
                .then(
                    userData => {
                        if (userData !== null) {
                            const isEqual = bcrypt.compareSync(password, userData.password)
        
                            if (isEqual) {
                                const payload = JSON.stringify({userId: userData._id})
                                const token = jwt.sign(payload, AUTH_KEY)
        
                                if (token) {
                                    res.json({
                                        success: true,
                                        token,
                                        user: {
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
                    }
                )
                .catch(
                    e => {
                        console.log(e)
                        res.json({
                            success: false,
                            message: "Ocorreu um erro na busca por usuário"
                        })
                    }
                )
        } else {
            res.json({
                success: false,
                message: 'Campos são obrigatórios para realizar o login!'
            })
        }
    },

    updateUserSubUsers:  async (req, res) => {
        const {
            picture,
            name,
            liked_categories,
        } = req.body

        const {
            userId
        } = req.decoded

        if (picture && name && liked_categories) {
            try {
                const subUser = {
                    picture,
                    name,
                    liked_categories: liked_categories.split(','),
                }

                const userDataUpdate = await updateUserSubUsers(userId, subUser)

                if (userDataUpdate) {
                    res.json({
                        success: true,
                        data: userDataUpdate.profile_users
                    })
                } else {
                    res.json({
                        success: false,
                        message: 'Houve um erro ao adicionar usuários!'
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
                message: 'Não foram preenchidos todos os dados!'
            })
        }
    }
}