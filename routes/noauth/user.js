const router = express.Router()

const {
    addUser
} = require('../../controllers/user')

module.exports =
    router
        .post('/', addUser)