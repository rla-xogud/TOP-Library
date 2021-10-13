let myLibrary = [];

const Book ={
     init: function(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    },
    info: function(){
        let string = this.title +" by " + this.author + ", " + this.pages + " pages, ";
        if(this.read){
            string += "read";
        }else{
            string += "not read yet";
        }
        return string;
    }
}

const addBook = document.querySelector("#addBookBtn");
addBook.addEventListener("click", ()=>{addBookToLibrary()});

const BOOKCASE = document.querySelector("#bookcase");

function addBookToLibrary(){
    let title = prompt("title");
    let author = prompt("author");
    let pages = prompt("pages");
    let read = prompt('read')
    let newBook = Object.create(Book);
    newBook.init(title,author,pages,read);
    myLibrary.push(newBook);
    displayLibrary();
}

function displayLibrary(){
    BOOKCASE.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++){
        BOOKCASE.appendChild(makeBook(myLibrary[i]));
    }
}

function makeBook(book){
    let newBook = document.createElement('div')
    newBook.className = "book";
    for(let component in book){
        if(component == "init" || component == "info"){
            continue;
        }
        let a = document.createElement('div');
        a.className = component;
        a.innerHTML = book[component];
        newBook.appendChild(a);
    }
    //newBook.appendChild(document.createElement("div"));//.innerHTML = book.title);
    return newBook;
}