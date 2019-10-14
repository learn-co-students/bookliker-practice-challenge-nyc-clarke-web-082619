document.addEventListener("DOMContentLoaded", function() {

    function createBookList(json){
        list = document.getElementById('list');
        json.forEach( (elem) => {
            let bookLi = document.createElement('li');
            bookLi.setAttribute('id', elem.id);
            bookLi.classList.add("bookLi")
            let bookTextNode = document.createTextNode(elem.title);
            bookLi.appendChild(bookTextNode);
            list.appendChild(bookLi);
        })
    }

    function fetchBooks(){
        fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(json => {
            createBookList(json);
        });
    }

    function fetchBookInfo(id){
        return fetch(`http://localhost:3000/books/${id}`)
        .then(response => response.json());
    }

    function createUserList(arr){
        let userList = document.getElementById('user-list');
        while(userList.firstChild){
            userList.removeChild(userList.firstChild);
        }
        arr.forEach( (user) => {
            let userNode = document.createElement('li');
            let userText = document.createTextNode(user.username);
            userNode.appendChild(userText);
            userList.appendChild(userNode);
        })
    }

    function createBookInfo(json){
        let showPanel = document.getElementById('show-panel');
        let userList = document.createElement('ul');
        userList.setAttribute('id', 'user-list');
        while(showPanel.firstChild){
            showPanel.removeChild(showPanel.firstChild);
        }
        let bookImg = document.createElement('img');
        bookImg.src = json.img_url;
        let bookHeader = document.createElement('h2');
        let bookNameText = document.createTextNode(json.title);
        bookHeader.appendChild(bookNameText);
        let bookDescription = document.createElement('p');
        let bookDescriptionText = document.createTextNode(json.description);
        bookDescription.appendChild(bookDescriptionText);
        let likeButton = document.createElement('button');
        likeButton.textContent = "Like";
        showPanel.appendChild(bookImg);
        showPanel.appendChild(bookHeader);
        showPanel.appendChild(bookDescription);
        showPanel.appendChild(userList);
        showPanel.appendChild(likeButton);
        createUserList(json.users);
        likeButton.addEventListener("click", (event) => {
            let id = json.id;
            fetchBookInfo(id)
            .then(json => {
                let users = json.users;
                let containsUser = users.some(user => user.id === 1);
                if(containsUser){
                    alert("You already liked this book!");
                }
                else{
                    users.push({"id":1, "username":"pouros"});
                    let formData = {
                        "users": users
                    }
                    configObj = {
                        method: "PATCH",
                        headers: {
                            "Content-Type": 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify(formData)
                    }
                    fetch(`http://localhost:3000/books/${id}`, configObj)
                    .then(response => response.json())
                    .then(json => {
                        createUserList(json.users);
                    })
                }
            })
        })
    }

    document.getElementById('list-panel').addEventListener("click", (event) => {
        target = event.target;
        if(target.classList.contains("bookLi")){
            fetchBookInfo(target.id).
            then(json => {
                createBookInfo(json);
            })
        }
    })

    fetchBooks();
});
