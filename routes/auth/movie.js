const router = express.Router()

const {
    addMovie,
    getMovie
} = require('../../controllers/movie')

module.exports =
    router
        .post('/', multipartMiddleware, addMovie)
        .get('/:gender', getMovie)