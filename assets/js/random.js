'use strict'

// query selectors
const relatedArtistAlbumsContainer = document.querySelector(".related-artist-albums");
const relatedYearAlbumsContainer = document.querySelector(".related-year-albums");
const albumLabel = document.querySelector('#album');
const artistLabel = document.querySelector('#artist-name');
const yearLabel = document.querySelector('#release-year');
const artwork = document.querySelector('#artwork');
const albumNumLabel = document.querySelector('#album-num');
const artistNumLabel = document.querySelector('#artist-num');

// After next album show 2 segments
// generic display albums data
const displayAlbums = function (list, container) {
  container.innerHTML = '';
  // Get up to 5 albums of 
  let displayList = [];
  const newList = list.filter((album) => {
    return album.name !== document.querySelector('#album').textContent;
  });
  if (newList.length > 5) {
    while (displayList.length < 5) {
      const randomIndex = Math.trunc(Math.random() * (list.length - 1));
      if (!displayList.includes(newList[randomIndex])) {
        displayList.push(newList[randomIndex]);
      }
    }
  } else {
    displayList = newList;
  }

  // display items
  for (let item of displayList) {
    const li = document.createElement('li');
    li.className = "d-flex justify-content-between list-group-item";
    const img = document.createElement('img');
    img.className = "img-fluid";
    const p = document.createElement('p');
    img.src = item.artwork;
    p.textContent = item.name;
    li.appendChild(p);
    li.appendChild(img);
    container.appendChild(li);
  }
}

const displayRandomAlbum = function (album) {
  albumLabel.textContent = album.name;
  artistLabel.textContent = album.artist;
  yearLabel.textContent = album.year;
  artwork.src = album.artwork;
  artistNumLabel.textContent = album.totalArtists;
  albumNumLabel.textContent = album.totalAlbums;
}

// Get random number on frontend
document.querySelector('#next-album').addEventListener('click', (e) => {
  e.preventDefault();
  fetch('http://localhost:3000/random')
    .then((response) => response.json())
    .then(data => {
      displayRandomAlbum(data);
      displayAlbums(data.artistAlbums, relatedArtistAlbumsContainer);
      displayAlbums(data.onThisYear, relatedYearAlbumsContainer);
    });
});

document.querySelector('#next-album').click();


