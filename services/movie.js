const movieModel = require('../models/movieModel')

module.exports = {
    genericGetMovie: (...props) => {
        return movieModel.find( 
            ...props
        )
        .lean()
    },

    createMovie: ({ title, studio, launch_date, gender, file_id }) => {
        return new movieModel({
            title,
            studio,
            launch_date,
            gender,
            file_id
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