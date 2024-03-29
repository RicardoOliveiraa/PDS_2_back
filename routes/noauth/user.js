const router = express.Router()

const {
    addUser,
    updateUserSubUsers
} = require('../../controllers/user')

module.exports =
    router
        .post('/', addUser)
        .put('/', updateUserSubUsers)