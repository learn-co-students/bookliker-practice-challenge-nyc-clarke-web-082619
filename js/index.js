const url = 'http://localhost:3000/books';
const ulTag = document.getElementById('list');
const showPanel = document.getElementById('show-panel');
let userArr = [];

document.addEventListener("DOMContentLoaded", function() {
    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => {
        data.forEach(book => {
            createBookList(book.title, book.id)
        })
    })

    document.addEventListener('click', function(){
        event.preventDefault();
        let id = event.target.id
        if(event.target.className === 'book'){
            fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(resp => resp.json())
            .then(data => {
                data.forEach(book => {
                    if(book.id == id){
                        renderBook(book.title, book.description, book.img_url, book.users, book.id);
                        book.users.forEach(user => {
                            userArr.push(user)
                        })
                    }
                })
            })

            
            document.addEventListener('click', function(){
                if(event.target.className === 'like-btn'){

                    let id = parseInt(event.target.parentNode.id);
                    let currentUser = {"id":1, "username":"pouros"}
        
                    userArr.push(currentUser)
        
                    fetch(url + `/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            'users': userArr
                        })
                    })
                    event.target.parentNode.location.reload();
                }            
            })
        }   
    })
});

function createBookList(title, id){
    let liTag = document.createElement('li');
    liTag.setAttribute('class','book');
    liTag.id = parseInt(id);
    liTag.innerHTML = `
        ${title}
    `;
    ulTag.appendChild(liTag);
}

function renderBook(title,  description, img_url, users, id){
    const bookCard = document.createElement('div');
    const showUserContainer = document.createElement('div');
    showUserContainer.setAttribute('class','show-container');
    bookCard.id = parseInt(id);
    bookCard.innerHTML = `
        <h2>${title}</h2>
        <img src=${img_url} />
        <p>${description}</p>
        <button class='like-btn'>Read Book</button>
    `
    if(users.length > 0){
        users.forEach(user => {
            let usersRead = document.createElement('p')
            usersRead.innerHTML = `${user.username}`;
            showUserContainer.appendChild(usersRead)
        });
    }
    bookCard.appendChild(showUserContainer);
    showPanel.innerHTML = ''
    showPanel.appendChild(bookCard);
}