const albumAddForm = document.querySelector('#album-add-form');

albumAddForm.addEventListener('submit', addAlbum);

function addAlbum(event) {
  const name = document.querySelector("#album-title").value;
  const artist = document.querySelector("#artist").value;
  const year = document.querySelector("#year").value;
  const artwork = document.querySelector("#artwork-url").value;
  const album = new Album(name, artist, artwork, year);

  fetch('/add', {
    method: "POST",
    body: JSON.stringify(album),
    headers: {
      'content-type': 'application/json',
    }
  })
  clearForm();
  event.preventDefault();
}

function Album(title, artist, artwork, year) {
  this.title = title;
  this.artist = artist;
  this.artwork = artwork;
  this.year = year;
}

function clearForm() {
  document.querySelector("#album-title").value = '';
  document.querySelector("#artist").value = '';
  document.querySelector("#year").value = '';
  document.querySelector("#artwork-url").value = '';
}