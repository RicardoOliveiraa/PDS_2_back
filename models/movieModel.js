const movieModel = Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    movie_url: { type: String, required: true },
    small_image_url: { type: String, required: true },
    big_image_url: { type: String, required: true },
    description: { type: String, required: true },
    maturity: {type: String, required: true }
})

movieModel.set('timestamps', true);

module.exports = mongoose.model('movie', movieModel)