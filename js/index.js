document.addEventListener("DOMContentLoaded", () => {
  const booksUrl = "http://localhost:3000/books";
  const bookList = document.getElementById("list");
  const bookInfo = document.getElementById("show-panel");
  let likedUsers = [];
  const pouros = { id: 1, username: "pouros" };

  function getBooks() {
    fetch(booksUrl)
      .then(resp => resp.json())
      .then(books => renderBooks(books));
  }

  function renderBooks(bookData) {
    for (const book of bookData) {
      bookList.innerHTML += `<li class='book-name' data-id='${book.id}'>${book.title}</li>`;
    }
  }

  function getInfo(bookId) {
    fetch(`${booksUrl}/${bookId}`)
      .then(resp => resp.json())
      .then(book => renderInfo(book));
  }

  function insertUsers() {
    const fans = document.getElementById("fans");
    likedUsers.map(
      user =>
        (fans.innerHTML += ` <li>${user.username}</li>
            </ul>
            </div>`)
    );
  }
  function renderInfo(book) {
    bookInfo.innerHTML += `<div id =${book.id}>
        <h2>${book.title}</h2>
        <img src=${book.img_url}>
        <p>${book.description}</p><br>
        <button data-id='${book.id}' id='like-btn'>Like This Book</button><br>
        <h4>Users Who Like This Book:</h4>
        <ul id='fans'>`;

    book.users.map(user => likedUsers.push(user));
    insertUsers();
  }

  function updateLikeList() {
    fetch(`${booksUrl}/${event.target.parentNode.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ users: likedUsers })
    });
  }

  document.addEventListener("click", event => {
    event.preventDefault();

    if (event.target.className === "book-name") {
      bookInfo.innerHTML = "";
      getInfo(event.target.dataset.id);
    }

    if (
      event.target.id === "like-btn" &&
      event.target.innerText === "Like This Book"
    ) {
      let likeButton = document.getElementById("like-btn");
      likeButton.innerText = "Un-Like This Book";
      fans.innerHTML = "";
      likedUsers.push(pouros);

      insertUsers();
      updateLikeList();
    } else if (
      event.target.id === "like-btn" &&
      event.target.innerText === "Un-Like This Book"
    ) {
      let likeButton = document.getElementById("like-btn");
      likeButton.innerText = "Like This Book";
      fans.innerHTML = "";
      likedUsers = likedUsers.filter(user => user !== pouros);

      insertUsers();
      updateLikeList();
    }
  });

  getBooks();
});
