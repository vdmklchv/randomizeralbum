'use strict'

// query selectors
const relatedArtistAlbumsContainer = document.querySelector(".related-artist-albums");
const relatedYearAlbumsContainer = document.querySelector(".related-year-albums");

// After next album show 2 segments
// generic display albums data
const displayAlbums = function (list, container) {
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

// 1. more albums from same artist
const getArtistAlbums = async function () {
  // get artist name
  const artist = document.querySelector('#artist-name').textContent;

  // fetch albums from same artist
  await fetch(`/search-db?term=${artist}`)
    .then((response) => response.json())
    .then((data) => {
      // display albums from same artist
      displayAlbums(data, relatedArtistAlbumsContainer);
    });
}

getArtistAlbums();


// 2. albums of this year
const getYearAlbums = async function () {
  // get release year
  const year = document.querySelector('#release-year').textContent;

  await fetch(`/search-db?term=${year}`)
    .then((response) => response.json())
  .then((data) => displayAlbums(data, relatedYearAlbumsContainer))
}

getYearAlbums();