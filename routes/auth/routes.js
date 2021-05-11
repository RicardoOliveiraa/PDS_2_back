const jwt = require('jsonwebtoken')
const router = express.Router()

router.use(
    (req, res, next) => {
        const token = req.headers.authorization

        if (token) {
            jwt.verify(token, AUTH_KEY, (err, decoded) => {
                if (err) {
                    res.json({ success: false, err: "Falha na autenticação do token." })
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.status(403).json({
                success: false,
                err: "Nenhum token de autenticação enviado.",
            })
        }
})

const movie = require('./movie')
router.use('/movie', movie)

const user = require('./user')
router.use('/user', user)

module.exports = router