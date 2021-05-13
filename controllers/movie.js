const {
    genericGetMovie,
    createMovie,
    getAllMovies
} = require('../services/movie')

const sendMovieToDrive = require("../resources/googleDrive")

const {
    refresh_token
} = require("../resources/oAuth/token.json")

module.exports = {
    addMovie: async (req, res) => {
        const {
            title,
            genre,
            description,
            maturity
        } = req.body

        const {
            movie,
            image_big,
            image_small,
        } = req.files

        const movie_url = await sendMovieToDrive({ body: movie, name: title, type: "video/mp4" })
        const big_image_url = await sendMovieToDrive({ body: image_big, name: `${title}_image_big`, type: "image/jpeg" })
        const small_image_url = await sendMovieToDrive({ body: image_small, name: `${title}_image_small`, type: "image/jpeg" })

        const movieObject = {
            title,
            genre,
            movie_url,
            small_image_url,
            big_image_url,
            description,
            maturity
        }

        createMovie(movieObject)
            .then(
                () => {
                    res.json({
                        success: true,
                        message: "Filme cadastrado com sucesso"
                    })
                }
            )
            .catch(
                (erro) => {
                    console.log("Occoreu o erro "+erro)
                    res.json({
                        success: false,
                        message: "Ocorreu um erro ao tentar salvar um filme!"
                    })
                }
            ) 
    },

    getMovie: (req, res) => {
        getAllMovies()
            .then(
                (dataMovie) => {
                    res.json({
                        success: true,
                        movies: dataMovie,
                        token_google: refresh_token
                    })
                }
            )
            .catch(
                err => {
                    console.log(err)
                    res.json({
                        success: false,
                        message: "Ocorreu um erro na busca por filme!"
                    })
                }
            )
    }
}