const express = require("express");
const app = express();
app.engine("html", require('ejs').renderFile);
app.set('view engine', 'html');
const { MongoClient } = require('mongodb');
let albums = [];

let artist;
let album;
let albumNumber;

app.use(express.static('public'));


app.get("/", (req, res) => {
    main().then(() => {
        res.render("index.html", { artist: artist, album: album, albumNumber: albumNumber });
    })
})

app.get("/next-album", (req, res) => {
    main().then(() => res.redirect('/'));
    //res.redirect("/");
});


async function main() {
    albums = [];
    const uri = "mongodb+srv://vdmclcv:albumdbpass@cluster0.t1wlx.mongodb.net/albums?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = await client.db("albumsdb");
    const collection = await db.collection("albums");
    collection.find().forEach((item) => {
        albums.push(item);
    }).then(() => {
        const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
        //console.log(`Next you should listen to ${randomAlbum.name} by ${randomAlbum.artist}`);
        artist = randomAlbum.artist;
        album = randomAlbum.name;
        albumNumber = albums.length;
    });
}


app.listen(process.env.PORT || 3000);
console.log("Running at " + process.env.PORT);
