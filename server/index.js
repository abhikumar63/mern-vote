const express = require('express');

const app = express();
const port = 4000;

app.get('/', (req,res) => {
    res.json({Hello: "World"});
})

app.use((req,res,next) => {
    const err = new Error('Not Found');
    err.status = 404;

    next(err);
})

app.use((err,req,res,next) => {
    res.status(err.status || 500).json({
        err: err.message || 'Something went Wrong'
    })
})

app.listen(port, console.log(`Server is listening on port ${port}`));