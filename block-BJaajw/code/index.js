let root = document.querySelector('ul');
let select = document.querySelector('select');

function createUI(arr) {
  let li = document.createElement('li');
  let img = document.createElement('img');
  img.src = arr.imageUrl;
  let div = document.createElement('div');
  let title = document.createElement('strong');
  title.innerText = arr.newsSite;
  let summary = document.createElement('p');
  summary.innerText = arr.summary;
  let a = document.createElement('a');
  a.innerText = `Read More`;
  a.href = arr.url;
  div.append(title, summary, a);
  li.append(img, div);
  root.append(li);
}

let dataPromise = fetch(
  `https://api.spaceflightnewsapi.net/v3/articles?_limit=30/l`
)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    res.json();
  })
  .then((info) => {
    if (Array.isArray(info)) {
      let options = [];
      for (let i = 0; i < info.length; i++) {
        if (!options.includes(info[i].newsSite)) {
          options.push(info[i].newsSite);
        }
      }

      options.forEach((element) => {
        let option = document.createElement('option');
        option.innerText = element;
        option.setAttribute('value', element);
        select.append(option);
      });

      info.forEach((data) => {
        createUI(data);
      });

      select.addEventListener('change', function (e) {
        root.innerText = '';
        info.forEach((data) => {
          if (data.newsSite == e.target.value) {
            createUI(data);
          }
        });
      });
    }
  })
  .catch((error) => {
    root.innerText = error;
  });
