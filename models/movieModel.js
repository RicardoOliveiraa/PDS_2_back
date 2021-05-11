const movieModel = Schema({
    title: { type: String, required: true },
    gender: { type: String, required: true },
    movie_id: { type: String, required: true },
    small_image_id: { type: String, required: true },
    big_image_id: { type: String, required: true },
    medium_image_id: { type: String, required: true },
    description: { type: String, required: true },
})

movieModel.set('timestamps', true);

module.exports = mongoose.model('movie', movieModel)