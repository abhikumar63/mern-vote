require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const connectDB = require('./db/connect')

const db = require('./models');
const handle = require('./handlers');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.json({Hello: "World"});
})

app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);

app.use(handle.notFound)

app.use(handle.errors)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()