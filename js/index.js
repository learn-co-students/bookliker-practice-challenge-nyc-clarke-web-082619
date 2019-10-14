
const list = document.getElementById('list');
const show = document.getElementById('show-panel')

document.addEventListener("DOMContentLoaded", function(event) {
    fetchBooks();
});

document.addEventListener('click', (event) => {
    // console.log(event.target);
    if(event.target.tagName === "P"){
        console.log(event.target);
        fetchBook();
    } else if (event.target.tagName === "BUTTON"){
        console.log(event.target)
        patchUser();
    }
})


function fetchBooks(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(json =>json.forEach(showBooks))
}

function showBooks(book){

    let booklist = document.createElement('li');
    booklist.innerHTML =
    `<div class = "book-card"> 
    <p data-id=${book.id}>${book.title}</p>
    </div>
    `
    list.append(booklist);
}

function fetchBook(){
    fetch(`http://localhost:3000/books/${event.target.dataset.id}`)
    .then(resp => resp.json())
    .then(json => showBook(json))
}
let users;
function showBook(book){
    // let users = book.users.map()
    users = book.users
    show.innerHTML = `
    <h1>${book.title} </h1>
    <img src = ${book.img_url}>
    <p>${book.description}</p>
    ${users.map(user => user.username).join("<br>")}<br>
    <button data-id = ${book.id}>Read Book</button>
    `
}

function patchUser(){
    console.log(users)
    // const formData = new formData();
    // formData.append({"id": 1, "username": "amber"})
    fetch(`http://localhost:3000/books/${event.target.dataset.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(
            { 
                users: [...users, {"id": 10, "username": "amber"}]
             }
            
        )
    })
    .then(resp => resp.json())
    .then(json => showBook(json))
    
}
