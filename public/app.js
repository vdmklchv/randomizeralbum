const albumAddForm = document.querySelector('#album-add-form');

albumAddForm.addEventListener('submit', addAlbum);

function addAlbum(event) {
  const name = document.querySelector("#album-title").value;
  const artist = document.querySelector("#artist").value;
  const year = document.querySelector("#year").value;
  const artwork = document.querySelector("#artwork-url").value;


  // Validate if data is provided
  if (!name || !artist || !year || !artwork) {
    showModal('warning', 'Please fill in all fields.');
  } else {
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
        showModal('success', 'Success! Album added to DB');
      } else {
        showModal('danger', 'Error! Something went wrong. Please try again later');
      }
      // clear inputs
      clearForm();
    })
  }

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
function showModal(className, text) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.setAttribute('role', 'alert');
  div.appendChild(document.createTextNode(text));
  document.querySelector("#main-row").insertBefore(div, document.querySelector('#form-container'));
  setTimeout(function () {
    document.querySelector("#main-row").firstElementChild.remove();
  }, 3000)
}