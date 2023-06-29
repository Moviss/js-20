'use strict';

const fetchPostsBtn = document.querySelector('.btn');
const postsList = document.querySelector('.posts');
const alertPopup = document.querySelector('.alert');
let isAlertVisible = false;

let page = 1;
let limit = 50;
const totalPages = 100 / limit;

fetchPostsBtn.addEventListener('click', () => {
  if (page > totalPages) {
    return toggleAlertPopup();
  }

  fetchPosts().then((posts) => {
    renderPosts(posts);
    page += 1;

    if (page > 1) {
      fetchPostsBtn.textContent = 'Fetch more posts';
    }
  }).catch((error) => console.log(error));

});

function fetchPosts () {
  const params = new URLSearchParams({
    _limit: limit,
    _page: page,
  });

  return fetch(`https://jsonplaceholder.typicode.com/posts?${params}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    },
  );
}

function renderPosts (posts) {
  const markup = posts.map(({ id, title, body, userId }) => {
    return `<li>
          <h2 class="post-title">${title.slice(0, 30)}...</h2>
          <p><b>Post id</b>: ${id}</p>
          <p><b>Author id</b>: ${userId}</p>
          <p class="post-body">${body}</p>
        </li>`;
  }).join('');
  postsList.insertAdjacentHTML('beforeend', markup);
}

function toggleAlertPopup () {
  if (isAlertVisible) {
    return;
  }

  isAlertVisible = true;
  alertPopup.classList.add('is-visible');
  setTimeout(() => {
    alertPopup.classList.remove('is-visible');
    isAlertVisible = false;
  }, 3000);
}
