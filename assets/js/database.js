const express = require("express");
const app = express();
app.engine("html", require('ejs').renderFile);
app.set('view engine', 'html');
const {
    MongoClient
} = require('mongodb');
let albums = [];

let artist;
let album;
let albumNumber;
let art = 'https://i2.wp.com/planx.co.il/wp-content/uploads/2011/05/400x400.png?fit=400%2C400&ssl=1';

app.use(express.static('public'));

app.get("/", (req, res) => {
    main().then(() => {
        res.render("index.html", {
            artist: artist,
            album: album,
            albumNumber: albumNumber,
            art: art,
        });
    })
})

app.get("/next-album", (req, res) => {
    main().then(() => res.redirect('/'));
    //res.redirect("/");
});


async function main() {
    albums = [];
    const uri = "mongodb+srv://vdmclcv:albumdbpass@cluster0.t1wlx.mongodb.net/albums?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useUnifiedTopology: true
    });
    await client.connect();
    const db = await client.db("albumsdb");
    const collection = await db.collection("albums");
    albumNumber = await collection.countDocuments();
    collection.find().forEach((item) => {
        albums.push(item);
    });
    if (albums.length !== 0) {
        const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
        artist = randomAlbum.artist;
        album = randomAlbum.name;
        art = randomAlbum.artwork;
    }
};


app.listen(process.env.PORT || 3000);
console.log("Running at " + process.env.PORT);