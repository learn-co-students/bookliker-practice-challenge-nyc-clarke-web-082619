document.addEventListener("DOMContentLoaded", function() {
    let bookDisplay = document.getElementById('show-panel');
    let bookList = document.getElementById('list');
    let thisUser = {"id":1, "username":"pouros"};
    let userList = [];

    fetch('http://localhost:3000/books')
    .then(resp => {
        return resp.json();
    })
    .then(bookInfo=>{
        for(const book of bookInfo){
            let li = document.createElement('li');
            li.id = book.id;
            li.innerText = book.title;
            let img = document.createElement('img');
            img.src = book.img_url;
            img.id = 'img';
            li.appendChild(img);
            bookList.appendChild(li);
        }
    })
    function renderBook(clickedBook){
        while(bookDisplay.firstChild){
            bookDisplay.removeChild(bookDisplay.firstChild);
        }
        let bookDiv = document.createElement('div');
        let imgTag = document.createElement('img');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');
        let like = document.createElement('button');
        like.innerText = '❤️📚';
        bookDiv.appendChild(h1);
        bookDiv.appendChild(imgTag);
        bookDiv.appendChild(p);
        bookDiv.appendChild(like);
        bookDisplay.appendChild(bookDiv);
        fetch(`http://localhost:3000/books/${clickedBook}`)
        .then(resp =>{
            return resp.json();
        })
        .then(thisBook =>{
            imgTag.src = thisBook.img_url;
            h1.innerText = thisBook.title;
            p.innerText = `Description: ${thisBook.description}`;
            like.id = 'btn';
            bookDiv.id = thisBook.id;
            for(const i of thisBook.users){
                let li = document.createElement('li');
                li.innerText = i.username;
                bookDiv.appendChild(li);
            }
            getUsers(thisBook.users);
        })
    }
    function getUsers(users){
        userList.length = 0;
        for(const i of users){
            userList.push(i);
        }
    }

    bookDisplay.addEventListener('click', function(){
        if (event.target.id === 'btn'){
            userList.push(thisUser);
            let id = event.target.parentNode.id;
            fetch(`http://localhost:3000/books/${id}`,{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                'users': userList
            })
        })
        }
    })

    document.getElementById('list-panel').addEventListener('click', function(){
        if(event.target.id === 'img'){
            let clickedBook = event.target.parentNode.id;
            renderBook(clickedBook);
        }
    })

});
