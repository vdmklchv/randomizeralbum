'use strict';



const artistLabel = document.querySelector('#artist-title');
const container = document.querySelector('#albums');

const album = JSON.parse(sessionStorage.getItem('ralbum-cur-alb'));



const displayList = function (list) {
  for (let item of list) {
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

artistLabel.textContent = album?.artist;
displayList(album?.artistAlbums);