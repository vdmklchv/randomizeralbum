const albumAddForm = document.querySelector('#album-add-form');

albumAddForm.addEventListener('submit', addAlbum);

function addAlbum(event) {
  const name = document.querySelector("#album-title").value;
  const artist = document.querySelector("#artist").value;
  const year = document.querySelector("#year").value;
  const artwork = document.querySelector("#artwork-url").value;
  const album = new Album(name, artist, artwork, year);
  // send data to backend
  fetch('/add', {
    method: "POST",
    body: JSON.stringify(album),
    headers: {
      'content-type': 'application/json',
    }
  }).then((response) => {
    // check if operation is a success and add corresponding class
    if (response.status === 200) {
      showModal(true);
    } else {
      showModal(false);
    }
  })



  // clear inputs
  clearForm();
  event.preventDefault();
}

function Album(title, artist, artwork, year) {
  this.title = title;
  this.artist = artist;
  this.artwork = artwork;
  this.year = year;
}

// function to clear inputs
function clearForm() {
  document.querySelector("#album-title").value = '';
  document.querySelector("#artist").value = '';
  document.querySelector("#year").value = '';
  document.querySelector("#artwork-url").value = '';
}

// function to show modal
function showModal(isSuccessful) {
  let text = isSuccessful ? "Success! Added album to collection." : "Error! Failed to add album. Try again later.";
  const div = document.createElement('div');
  div.className = "alert alert-success";
  div.setAttribute('role', 'alert');
  div.appendChild(document.createTextNode(text));
  document.querySelector("#main-row").insertBefore(div, document.querySelector('#form-container'));
  setTimeout(function () {
    document.querySelector("#main-row").firstElementChild.remove();
  }, 3000)
}