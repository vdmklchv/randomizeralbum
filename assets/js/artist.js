'use strict';



const artistLabel = document.querySelector('#artist-title');
const container = document.querySelector('#albums');

const album = JSON.parse(sessionStorage.getItem('ralbum-cur-alb'));

album?.artistAlbums.push(album);
const fullAlbumList = album?.artistAlbums.slice().sort((a, b) => a.year - b.year);
console.log(fullAlbumList);

const displayList = function (list) {
  console.log(list);
  for (let item of list) {
    const li = document.createElement('li');
    li.className = "d-flex justify-content-between list-group-item";
    const img = document.createElement('img');
    img.className = "img-fluid";
    const textDiv = document.createElement('div');
    textDiv.className = "d-flex justify-content-between flex-grow-1 me-4";
    const p = document.createElement('p');
    p.textContent = item.name;
    const year = document.createElement('p');
    year.textContent = item.year;
    img.src = item.artwork;
    textDiv.appendChild(p);
    textDiv.appendChild(year);
    li.appendChild(textDiv);
    li.appendChild(img);
    container.appendChild(li);
  }
}

artistLabel.textContent = album?.artist;
displayList(fullAlbumList);