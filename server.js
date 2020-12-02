// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.port || 3000;
let notes = [{}];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    readIt();
    res.json("Read");    
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
  
    notes.push(newNote);
    
    res.json("Note Added");
  });

app.delete("/api/notes/:id", function(req, res){


})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

function readIt(){
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if(err){
            console.log(err);
            return;
        }        
        notes = data;        
    });
}

// :3 :3 :3
//johnwestermeyer.github.io