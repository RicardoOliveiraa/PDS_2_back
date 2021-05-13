const movieModel = require('../models/movieModel')

module.exports = {
    genericGetMovie: (...props) => {
        return movieModel.find( 
            ...props
        )
        .lean()
    },

    createMovie: ({ 
        title, 
        genre, 
        movie_url,
        small_image_url,
        big_image_url,
        description,
        maturity
    }) => {
        return new movieModel({
            title,
            genre,
            movie_url,
            small_image_url,
            big_image_url,
            description,
            maturity
        })
        .save()
    },

    genericUpdateMovie: (movieId, ...props) => {
        return movieModel
            .updateOne(
                {
                    _id: movieId
                },
                ...props
            )
            .exec()
    },

    getAllMovies: () => 
        movieModel.find({}).lean()
}