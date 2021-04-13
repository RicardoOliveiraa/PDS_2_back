const movieModel = Schema({
    title: { type: String, required: true },
    studio: { type: String, required: false },
    launch_date: { type: Date },
    gender: { type: String, required: true },
    file_id: { type: String, required: true }
})

movieModel.set('timestamps', true);

module.exports = mongoose.model('movie', movieModel)