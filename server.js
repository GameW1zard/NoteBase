const express = require('express')
const app = express()
//const PORT = 6969
const PORT = process.env.PORT || 3001;
const notes = require("./db/db.json")
const path = require ('path')
const fs = require ('fs')
const uuid = require("./Utils/uuid.js")
var notePush;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));

app.get('/notes', function (req, res){
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', function (req, res){
    res.json(notes)
})

app.post('/api/notes', function (req,res) {
    res.json(`${req.method} request recived`)
    notePush = req.body
    notePush.id = uuid()
    notes.push(notePush)
    
    fs.writeFile('./db/db.json',
    JSON.stringify(notes, null, 4),
    (err) => err ? console.error(err) : console.log("Write success!"))
})

app.delete('/api/notes/:id', function (req, res){
    res.json(`${req.method} request recived`)
    for (var i = 0; i<= notes.length; i++){
        if (notes[i].id = req.params.id) {
            notes.splice(i,1)
            fs.writeFile('./db/db.json',
            JSON.stringify(notes, null, 4),
            (err) => err ? console.error(err) : console.log("Write success!"))
        }
    }

})

app.listen(PORT, function () {console.log(`serving static assets at ${PORT}`)})