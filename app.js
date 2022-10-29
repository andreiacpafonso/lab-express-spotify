require("dotenv").config();

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("view engine", "ejs");
//require spotify-web-api-node package here:
// npm i express spotify-web-api-node dotenv ejs express-ejs-layouts
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
const SpotifyWebApi = require('spotify-web-api-node');
// INTERATION 1 / SPOTIFY API SETUP /INTERATION 2 / EXPRESS SETUP
// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Our routes go here:

app.get("/", (req, res) => {
    console.log("homepage");
    res.render("index");
  });
//   INTERATION 3 -SEARCH FOR AN ARTIST
 app.get('/artist-search', (req, res) => {
  spotifyApi
  .searchArtists(req.query.artist)
  .then(data => {
    let result = data.body.artists.items;
    res.render('artist-search-results', {result});
  // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
})
.catch(err => console.log('The error while searching artists occurred: ', err));

 });

// INTERATION 4 - VIEW ALBUMS

app.get('/albums/:id', async (req, res) => {
  const { albumsId } = req.params
  const albums = await albumsId.findById(albumsId)
  res.send(albums)
})


// INTERATION 5 - VIEW TRACKS 

app.get('/tracks/:id', async (req, res) => {
  const { tracksId } = req.params
  const tracks = await tracksId.findById(trackssId)
  res.send(tracks)
})

// The code to run the server

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));