const router = express.Router()

const {
    addMovie,
    getMovie
} = require('../../controllers/movie')

module.exports =
    router
        .post('/', addMovie)
        .get('/:gender', getMovie)