require('dotenv').config();
express = require('express');
mongoose = require('mongoose');
Schema = mongoose.Schema;
const cors = require('cors');
AUTH_KEY = process.env.NODE_ENV ? process.env.NODE_ENV.AUTH_KEY || process.env.AUTH_KEY : process.env.AUTH_KEY

const {
    connect,
    close
} = require('./db/db');

const app = express();
const http = require('http');

const port = process.env.PORT || '4020';
app.set('port', port);

const server = http.createServer(app);

if (process.env.NODE_ENV && !process.env.NODE_ENV.includes('test')) {
    app.use(morgan('combined'));
}

app.use(express.static(__dirname + "/build"))

app.get('/', (req, res) => {
    res.render(path.join(__dirname + "/build/index.html"))
})

app.use(cors());
connect()
    .then(() => {
        if (!module.parent) {
            console.log('Conexão com banco estabelecida! :-)');
            server.listen(port, () => {
                console.log('Servidor rodando na porta ' + port);
            })
        }
    })

const noAuthRoutes = require('./routes/noauth/routes')
app.use("/", noAuthRoutes)

const authRoutes = require('./routes/auth/routes')
app.use("/auth", authRoutes)

module.exports = app;
