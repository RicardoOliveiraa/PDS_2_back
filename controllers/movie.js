const {
    genericGetMovie,
    createMovie,
    genericUpdateMovie
} = require('../services/movie')

const sendMovieToDrive = require("../resources/googleDrive")

module.exports = {
    addMovie: async (req, res) => {
        const {
            title,
            studio,
            launch_date,
            gender,
            file
        } = req.body

       

        const response = await sendMovieToDrive({ body: file, name: title })

        const MovieObj = {
            title,
            studio,
            launch_date,
            gender,
            file_id: response
        }
            
        createMovie(MovieObj)
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
        const {
            gender
        } = req.params

        if (gender) {
            genericGetMovie({ gender })
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
        } else {
            res.json({
                success: false,
                message: "O genero do filme é obrigatorio!"
            })
        }
    }
}