const root = document.querySelector('.images');
const input = document.querySelector('input');

function createUI(xhr) {
  let imageData = JSON.parse(xhr.response);
  imageData.results.forEach((elm) => {
    let img = document.createElement('img');
    img.src = elm.urls.small;
    root.append(img);
  });
}

function handleInput() {
  return new Promise((resolve, reject) => {
    if (event.keyCode === 13) {
      let search = event.target.value;
      let xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        `https://api.unsplash.com/search/photos?client_id=O1wXEIvD2m030Ar7iYH4f-HZcgZjD95H_7GCZz3q8jE&query=${search}&page=1&per_page=12`
      );
      xhr.onload = () => resolve(createUI(xhr));
      xhr.onerror = () => reject(`Something went wrong`);
      xhr.send();
      root.innerHTML = '';
      event.target.value = '';
    }
  });
}

input.addEventListener('keyup', function () {
  handleInput();
});
