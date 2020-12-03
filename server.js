// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {   
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        let notes = JSON.parse(data);
        res.json(notes.notes);
    });
    
});

app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes);
      let id = notes.notes[notes.notes.length - 1].id + 1
      let newNote = req.body;
      newNote.id = id;
      notes.notes.push(newNote);
  
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
        if (error) {
          return error
        }
        console.log(newNote)
        res.json(newNote);
      })
    })
  })

app.delete("/api/notes/:id", function(req, res){


})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});



// :3 :3 :3
//johnwestermeyer.github.io