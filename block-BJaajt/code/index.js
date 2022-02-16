const input = document.querySelector('input');
const root = document.querySelector('.user-info');
const btn = document.querySelector('button');
const catImg = document.querySelector('.cat-img');

function handleInput(event) {
  root.innerText = '';
  if (event.keyCode === 13) {
    let userImg = document.createElement('img');
    userImg.classList.add('user-img');
    let name = document.createElement('h3');
    let userName = document.createElement('p');
    let followersElm = document.createElement('ul');
    let followingElm = document.createElement('ul');

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      userImg.src = userData.avatar_url;
      name.innerText = userData.name;
      userName.innerText = userData.login;

      let followersData = new XMLHttpRequest();
      followersData.open('GET', userData.followers_url);
      followersData.onload = function () {
        let followers = JSON.parse(followersData.response);
        let label = document.createElement('li');
        label.innerText = 'Followers :';
        followersElm.append(label);
        for (let i = 0; i < 5; i++) {
          let li = document.createElement('li');
          let img = document.createElement('img');
          img.src = followers[i].avatar_url;
          li.append(img);
          followersElm.append(li);
        }
      };
      followersData.send();

      let followingData = new XMLHttpRequest();
      followingData.open(
        'GET',
        `https://api.github.com/users/${event.target.value}/following`
      );
      followingData.onload = function () {
        let following = JSON.parse(followingData.response);
        let label = document.createElement('li');
        label.innerText = 'Following :';
        followingElm.append(label);
        for (let i = 0; i < 5; i++) {
          let li = document.createElement('li');
          let img = document.createElement('img');
          img.src = following[i].avatar_url;
          li.append(img);
          followingElm.append(li);
        }
      };
      followingData.send();
      input.value = '';
    };
    xhr.send();
    root.append(userImg, name, userName, followersElm, followingElm);
  }
}

function handleClick(event) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.thecatapi.com/v1/images/search');
  xhr.onload = function () {
    let catData = JSON.parse(xhr.response);
    catImg.src = catData[0].url;
  };
  xhr.send();
}

input.addEventListener('keyup', handleInput);

btn.addEventListener('click', handleClick);
