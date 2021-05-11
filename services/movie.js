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
        gender, 
        movie_id,
        small_image_id,
        big_image_id,
        medium_image_id,
        description
    }) => {
        return new movieModel({
            title,
            gender,
            movie_id,
            small_image_id,
            big_image_id,
            medium_image_id,
            description
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
    }
}