const searchBtn = document.querySelector("#search-button");

searchBtn.addEventListener('click', (e) => {
  search(e);
});

// search
function search(e) {
  let searchTerm = document.querySelector('#search').value;

  if (searchTerm === '') {
    showModal('danger', 'Please enter search term');
    e.preventDefault();
  } else {
    document.querySelector('#results').innerHTML = '';
    fetch(`/search-db?term=${searchTerm}`)
      .then((response) => {
        return response.json()
      }).then((data) => {
        if (data.length > 0) {
          document.querySelector('#search-placeholder').style.display = 'none';
          for (album of data) {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(`${album.artist} - ${album.name}`));
            li.classList.add('list-group-item');
            document.querySelector('#results').appendChild(li);
          }
        } else {
          document.querySelector('#search-placeholder').style.display = 'block';
          document.querySelector('#search-placeholder').textContent = "Sorry, no match";
        }
      });
    e.preventDefault();
  }

  document.querySelector('#search').value = '';
}

// DUPLICATE FROM APP.JS FIND WAY TO REMOVE
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