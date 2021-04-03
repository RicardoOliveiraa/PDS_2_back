const movieModel = require('../models/movieModel')

module.exports = {
    genericGetMovie: (...props) => {
        return movieModel.find( 
            ...props
        )
        .lean()
    },

    createMovie: ({ title, studio, launch_date, gender, total_seen_times, drive_path }) => {
        return new movieModel({
            title,
            studio,
            launch_date,
            gender,
            total_seen_times,
            drive_path
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