const express = require('express')
const app = express()
const PORT = 6969
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
async function deleteCreator () {
for (var i = 0; i <= notes.length; i++){
    let object = notes[i]
    console.log(object.id)
    app.delete(`/api/notes/${object.id}`, function (req, res){
        console.log(req)
    })
}}
//console.log(notes[1])

app.listen(PORT, function () {console.log(`serving static assets at ${PORT}`), deleteCreator()})