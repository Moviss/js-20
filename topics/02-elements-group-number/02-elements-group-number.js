"use strict";

const fetchPostsBtn = document.querySelector(".btn");
const userList = document.querySelector(".posts");

fetchPostsBtn.addEventListener("click", () => {
  fetchPosts()
  .then((posts) => renderPosts(posts))
  .catch((error) => console.log(error));
});

function fetchPosts() {
  const params = new URLSearchParams({
    _limit: 10,
    _page: 100
  });

  return fetch(`https://jsonplaceholder.typicode.com/posts?${params}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  )
}

function renderPosts(posts) {
  const markup = posts
  .map(({ id, title, body, userId }) => {
    return `<li>
          <h2 class="post-title">${title.slice(0, 30)}...</h2>
          <p><b>Post id</b>: ${id}</p>
          <p><b>Author id</b>: ${userId}</p>
          <p class="post-body">${body}</p>
        </li>`;
  })
  .join("");
  userList.innerHTML = markup;
}


