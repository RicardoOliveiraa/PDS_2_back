const mongoose = require('mongoose');

let mongoServer;

const connect = async () => {
    return await mongoose
        .connect(
            process.env.NODE_ENV && process.env.NODE_ENV.DB_URL || process.env.DB_URL, 
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            console.log('Connected to production db')
        )
    
}

const close = async () => {
    mongoose.Schemas = {}
    mongoose.models = {}
    await mongoose.disconnect();
    if (process.env.NODE_ENV == 'test') {
        await mongoServer.stop();
    } 
    
}

module.exports = {
    connect,
    close
}