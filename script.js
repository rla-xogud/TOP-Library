let myLibrary = [{title:"asdfaasdfasdfasdfasdfasdfasdfasdfasdfasdf asdf asdfasfdasdfasdfsd", author:"qweqweq", pages:"qweqwe" ,read:true}];
let bookMap = new Map();

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
    if(bookMap.get(title) == author){
        alert("Book is already in library")
        return;
    }else{
        bookMap.set(title, author);
    }
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
        let bookInfo = document.createElement('div');
        bookInfo.className = component;
        if(component == "author"){
            bookInfo.innerHTML = "By: " + book[component];
        }else{
            bookInfo.innerHTML = book[component];
        }
        newBook.appendChild(bookInfo);
    }
    
    let hex = genHex();
    console.log(hex.length)
    newBook.style.backgroundColor = hex;
    newBook.style.color = invertColor(hex, true);
    let removeBtn = document.createElement("button")
    removeBtn.className = "removeButton";
    removeBtn.innerHTML = "X"
    newBook.appendChild(removeBtn);//.innerHTML = book.title);
    newBook.addEventListener('mouseover', () => {showAdditionalDetails(newBook)});
    newBook.addEventListener('mouseout', () => {hideAdditionalDetails(newBook)});
    removeBtn.addEventListener('click', ()=>{removeBook(newBook)});
    return newBook;
}

function removeBook(book){
    alert("weewoo");
    book.parentNode.removeChild(book);
    
}

//Generates 6 digit hex number to randomize color of books
function genHex(){
    let hex = String(Math.floor(Math.random()*16777215).toString(16));
    if (hex.length < 6) {
        hex = hex.split("");
        while(hex.length < 6){
            hex.unshift('0');
        }
        hex = hex.join("")
    }
    return "#" + hex;
}
/* input: hex color, string "bw"
 * return: black or white color based on intensity of RGB color based
 * on stackoverflow linked in if(bw) section
 * 
 * code from stackoverflow thread:
 * https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
 */
function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/39    43023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}


/* Displays additional information about a book on hover 
*  (pages and if book has been read or not)
*  input: book
*
*/
function showAdditionalDetails(book){ 
    let children = book.children;

    for(let child of children){
        if(child.className == "pages" || child.className == "read"){
            child.style.display = "flex"
            child.style["justify-content"] = "center"
        }
    }
}

/* Hides additional information about a book when not hovering over it 
*  (pages and if book has been read or not)
*  input: book
*
*/
function hideAdditionalDetails(book){ 
    let children = book.children;

    for(let child of children){
        if(child.className == "pages" || child.className == "read"){
            child.style.display = "none"
        }
    }
}

//Function only used to test bookcase
function fillShelves(){
    for(let i = 0; i < 90; i++){
        let book = Object.create(Book);
        book.init(i,i,i,i);
        myLibrary.push(book);
    }
}
fillShelves();
displayLibrary();
