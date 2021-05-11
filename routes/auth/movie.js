const router = express.Router()
multipart = require("connect-multiparty")
multipartMiddleware = multipart({
    maxFilesSize: 1024 * 5024,
})

const {
    addMovie,
    getMovie
} = require('../../controllers/movie')

module.exports =
    router
        .post('/', multipartMiddleware, addMovie)
        .get('/:gender', getMovie)