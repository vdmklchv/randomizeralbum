const express = require("express");
const app = express();
app.engine("html", require('ejs').renderFile);
app.set('view engine', 'html');
const dotenv = require('dotenv');
dotenv.config();
const {
    MongoClient
} = require('mongodb');
const bodyParser = require("body-parser");

let artist;
let album;
let albumNumber;
let art = 'https://i2.wp.com/planx.co.il/wp-content/uploads/2011/05/400x400.png?fit=400%2C400&ssl=1';
let artistNumber;
let year;

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// connecting to db
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    useUnifiedTopology: true
});
client.connect()
    .then(() => {
        const db = client.db("albumsdb");
        return db;
    })
    .then((db) => {
        const collection = db.collection("albums");
        return collection;
    })
    .then((collection) => {
        app.get("/", function (req, res) {
            getRandomAlbum().then(getNumberOfArtists).then(() => {
                res.render("index.html", {
                    artist: artist,
                    album: album,
                    albumNumber: albumNumber,
                    artistNumber: artistNumber,
                    art: art,
                    year: year,
                });
            });
        })

        app.get("/next-album", function (req, res) {
            getRandomAlbum().then(() => res.redirect('/'));
        });

        app.get("/add", function (req, res) {
            res.render("add.html");
        })

        app.get("/search", function (req, res) {
            res.render("search.html");
        })

        app.get("/search-db", function (req, res) {
            const term = req.query.term;
            findInDb(term).then((response) => {
                res.send(JSON.stringify(response));
            }).catch((e) => {
                console.log("Error fetching data " + e);
            })
            //console.log("This is from app.get /search-db: " + term);
            // res.send(JSON.stringify(results));
        })

        app.post("/add", function (req, res) {
            saveToDb(req.body)
                .then(res.redirect('/'));
        })

        async function findInDb(query) {
            const searchResults = [];
            if (query) {
                await collection.find().forEach((item) => {
                    if (item.artist.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase()) || item.year === query) {
                        searchResults.push(item);
                    }
                })
            }
            return searchResults;
        }

        async function getNumberOfAlbums() {
            albumNumber = await collection.countDocuments();
            return albumNumber;
        }

        async function getNumberOfArtists() {
            const artists = [];
            await collection.find().forEach((item) => {
                artists.push(item.artist);
            })
            artistNumber = new Set(artists).size;
        }

        async function getRandomAlbum() {
            let albums = [];
            const numberOfAlbums = await getNumberOfAlbums();
            if (albums.length !== numberOfAlbums) {
                await collection.find().forEach((item) => {
                    albums.push(item);
                });
            }
            if (albums.length !== 0) {
                const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
                artist = randomAlbum.artist;
                album = randomAlbum.name;
                art = randomAlbum.artwork;
                year = randomAlbum.year;
            }
        }

        async function saveToDb(album) {
            await collection.insertOne({
                artist: album.artist,
                name: album.title,
                year: album.year,
                artwork: album.artwork
            })
        }
    });






app.listen(process.env.PORT || 3000);
console.log("Running at " + process.env.PORT);