const data = require('./toronto_coordinates.json')
const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/coordinates', function (req, res) {
    res.json(data);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))