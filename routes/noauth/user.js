const router = express.Router()

const {
    addUser,
    UpdateUserSubUsers
} = require('../../controllers/user')

module.exports =
    router
        .post('/', addUser)
        .post('/update', UpdateUserSubUsers)