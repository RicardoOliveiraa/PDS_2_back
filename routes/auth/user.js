const router = express.Router()

const {
    updateUserSubUsers
} = require('../../controllers/user')

module.exports =
    router
        .put('/', updateUserSubUsers)