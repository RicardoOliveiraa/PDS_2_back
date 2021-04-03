const movieModel = Schema({
    title: { type: String, required: true },
    studio: { type: String, required: false },
    launch_date: { type: Date },
    gender: { type: String, required: true },
    total_seen_times: { type: Number, default: 0 },
    drive_path: { type: String, required: true }
})

movieModel.set('timestamps', true);

module.exports = mongoose.model('movie', movieModel)