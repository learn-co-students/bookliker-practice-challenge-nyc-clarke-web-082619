//     TASKS:
//1. render a list of books in <ul id="list">, each book is a li
//2. when clicking on a li, render bookimg, title, subtitle, author, description, liked users in <div id="show-panel">
//3. when click on the like button, patch the current user to book users


const bookList = document.getElementById('list');
const bookInfoContainer = document.getElementById('show-panel');
let currentBook; 


//----------- TASK 1
function fetchBooks(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(book => {
            printBookList(book)
        })
    })
}

function printBookList(book){
    let bookLi = document.createElement('li');
    bookLi.setAttribute('data-id', book.id);
    bookLi.innerText = book.title;
    bookList.appendChild(bookLi);
}

//----------- TASK 2 
function fetchBook(){
    fetch(`http://localhost:3000/books/${event.target.dataset.id}`)
    .then(resp => resp.json())
    .then(data => {
        printBookInfo(data);
        currentBook = data;
    })
}

function printBookInfo(book){
    bookInfoContainer.innerHTML = '';
    bookInfoContainer.innerHTML += `
        <img src='${book.img_url}'>
        <h1>${book.title}</h1>
        <h2>${book.subtitle}</h2>
        <h3>${book.author}</h3>
        <p>${book.description}</p>
        <ul id="liked"></ul>
        <button data-id="${book.id}" id="likeBtn">like</button>
    `;

    let likedUl = document.getElementById("liked");
    book.users.forEach(user => {
        let userLi = document.createElement("li");
        userLi.innerText = user.username;
        likedUl.appendChild(userLi);
    })
}


//----------- TASK 3
function updateLikedUsers(){
    // console.log(currentBookLikers);
    let currentUser = {"id":1, "username":"pouros"};
    let currentBookLikers = currentBook.users;
    let userIndex = currentBookLikers.findIndex(user => user.id == 1);

    if(userIndex != -1){
        currentBookLikers.splice(userIndex);
        console.log("You already liked");
    }else{
        currentBookLikers.push(currentUser)
    }

    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            users: currentBookLikers
        })
    }

    fetch(`http://localhost:3000/books/${event.target.dataset.id}`, configObj)
    .then(resp => resp.json())
    .then(data => printBookInfo(data));
}


//DOM manipulations
document.addEventListener("DOMContentLoaded", function() {
    console.log('loaded');
    fetchBooks();
});

document.addEventListener("click", (event) => {
    //if clicking on a li
    if(event.target.parentNode.id == "list"){
        fetchBook();
    }

    //if click on the like btn
    if(event.target.id == "likeBtn"){
        updateLikedUsers();
    }
})

