const express = require("express");
const app = express();
app.engine("html", require('ejs').renderFile);
app.set('view engine', 'html');
const dotenv = require('dotenv');
dotenv.config();
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
    getRandomAlbum().then(() => res.redirect('/'));
    //main().then(() => res.redirect('/'));
    //res.redirect("/");
});


async function main() {
    //albums = [];
    const numberOfAlbums = await getNumberOfAlbums();
    if (albums.length !== albumNumber) {
        await retrieveAlbums();
    }
    await getRandomAlbum();
};

async function retrieveAlbums() {
    const collection = await getDbCollection();
    collection.find().forEach((item) => {
        albums.push(item);
    });
}

async function getNumberOfAlbums() {
    const collection = await getDbCollection();
    albumNumber = await collection.countDocuments();
    return albumNumber;
}

async function getDbCollection() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, {
        useUnifiedTopology: true
    });
    await client.connect();
    const db = await client.db("albumsdb");
    const collection = await db.collection("albums");
    return collection;
}

async function getRandomAlbum() {
    if (albums.length !== 0) {
        const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
        artist = randomAlbum.artist;
        album = randomAlbum.name;
        art = randomAlbum.artwork;
    }
}


app.listen(process.env.PORT || 3000);
console.log("Running at " + process.env.PORT);