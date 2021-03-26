const express = require("express");
const app = express();
app.engine("html", require('ejs').renderFile);
app.set('view engine', 'html');
const { MongoClient } = require('mongodb');
const albums = [];

let artist;
let album;

app.use(express.static('public'));


app.get("/", (req, res) => {
    main().then(() => {
        res.render("index.html", { artist: artist, album: album });
    })
})

app.get("/next-album", (req, res) => {
    main().then(() => res.redirect('/'));
    //res.redirect("/");
});


async function main() {
    const uri = "mongodb+srv://vdmclcv:testdb@cluster0.t1wlx.mongodb.net/albums?retryWrites=true&w=majority";
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
    });
}


app.listen(process.env.PORT);
console.log("Running at " + process.env.PORT);
