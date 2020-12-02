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

app.post("/api/notes", function(req, res) {

    
});

app.delete("/api/notes/:id", function(req, res){


})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});


async function writeIt(input){
    fs.appendFile("./db/db.json", input, (err) => {
    if(err) throw err;
    console.log("file has been written")})
}

// :3 :3 :3
//johnwestermeyer.github.io