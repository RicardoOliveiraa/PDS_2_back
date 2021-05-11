const {
    genericGetMovie,
    createMovie,
    getAllMovies
} = require('../services/movie')

const sendMovieToDrive = require("../resources/googleDrive")

module.exports = {
    addMovie: async (req, res) => {
        const {
            title,
            gender,
            description
        } = req.body

        const {
            movie,
            image_big,
            image_medium,
            image_small,
        } = req.files

        const movie_id = await sendMovieToDrive({ body: movie, name: title, type: "video/mp4" })
        const big_image_id = await sendMovieToDrive({ body: image_big, name: `${title}_image_big`, type: "image/jpeg" })
        const medium_image_id = await sendMovieToDrive({ body: image_medium, name: `${title}_image_medium`, type: "image/jpeg" })
        const small_image_id = await sendMovieToDrive({ body: image_small, name: `${title}_image_small`, type: "image/jpeg" })

        const movieObject = {
            title,
            gender,
            movie_id,
            small_image_id,
            big_image_id,
            medium_image_id,
            description
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
                        data: dataMovie
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