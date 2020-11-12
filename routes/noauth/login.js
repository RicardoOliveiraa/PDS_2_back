const router = express.Router()

const {
    userLoginAuth
} = require('../../controllers/user')

module.exports =
    router
        .post('/', userLoginAuth)