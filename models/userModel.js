const { Schema } = require("mongoose");

const userModel = Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    liked_categorys: [
        {
            name: { type: String }
        }
    ],
    payment_method: { type: String, required: true },
    card_number: { type: String },
    has_payed: { type: Boolean, default: false},
    seen_movies: [
        {
            movie: { type: Schema.Types.ObjectId, ref: 'movie'}
        }
    ],
    last_seen_movie_time: { type: Date },
    plan: { type: String, required: true},
    sub_user: [
        {
            name: { type: String, required: true },
            liked_categorys: [
                {
                    name: { typer: String }
                }
            ],
            seen_movies: [
                {
                    movie: { type: Schema.Types.ObjectId, ref: 'movie'}
                }
            ],
            last_seen_movie_time: { type: Date },
        }
    ]
})

userModel.set('timestamps', true);

module.exports = mongoose.model('user', userModel)