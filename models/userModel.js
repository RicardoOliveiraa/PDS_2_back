const { Schema } = require("mongoose");

const userModel = Schema({
    password: { type: String, required: true },
    email: { type: String, required: true },
    payment_method: { type: String, required: true },
    card_number: { type: String },
    has_payed: { type: Boolean, default: false },
    plan: { type: String, required: true },
    profile_users: [
        {
            picture: { type: String, required: true },
            name: { type: String, required: true },
            liked_categories: [
                {
                    type: String, required: false 
                }
            ],
            seen_movies: [
                {
                    movie: { type: Schema.Types.ObjectId, ref: 'movie' }
                }
            ],
            last_seen_movie_time: { type: Date },
        }
    ]
})

userModel.set('timestamps', true);

module.exports = mongoose.model('user', userModel)