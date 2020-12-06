// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
const db = require("./db/db.json");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
var dbPath = "/db/db.json";

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
        let notes = db;
        res.json(notes.notes);    
});

app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + dbPath, 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes);
      let id = "1";
      if(notes.notes.length > 0){
        id = JSON.stringify(parseFloat(notes.notes[notes.notes.length - 1].id) + 1)}
      
      let newNote = req.body;
      newNote.id = id;
      notes.notes.push(newNote);
  
      writeToFile(JSON.stringify(notes))
      res.json(newNote);
    })
  })

app.delete("/api/notes/:id", function(req, res){
  let id = req.params.id;
  fs.readFile(__dirname + dbPath, 'utf8', function (error, notes) {
    if (error) {
      return console.log(error)
    }
    notes = JSON.parse(notes);
    for(let i = 0; i < notes.notes.length; i++){
      if(notes.notes[i].id === id){
        notes.notes.splice(i,1);        
      }
    }
    writeToFile(JSON.stringify(notes));
    
    res.json(notes);
  })
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});


function writeToFile(input){
  fs.writeFile(__dirname + dbPath, input, function (error, data) {
    if (error) {
      return error
    }
    return;
  })
}

// :3 :3 :3
//johnwestermeyer.github.io