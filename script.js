let bookMap = new Map();
// let BOOKOPEN = false;

const Book ={
     init: function(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        // this.open = false;
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
//popup for book info
const modal = document.getElementById("bookModal");
const addBookModal = document.getElementById("addBookModal");

//closes modal if clicking outside it when it's open
window.onclick = function(event) {
    if (event.target == modal || event.target == addBookModal) {
        closeModal(event.target);
    }
    document.body.style.overflow = "visible";
}

function closeModal(close){
    close.style.display = "none";
}
const addBook = document.querySelector("#addBookBtn");
addBook.addEventListener("click", ()=>{addBookToLibrary()});
const BOOKCASE = document.querySelector("#bookcase");

function addBookToLibrary(){
    addBookModal.style.display = "block";
    document.body.style.overflow = "hidden";

    for(let child of addBookModal.childNodes){
        if(child.id == "addBook"){
            for(let info of child.childNodes){
                //add onclick for x button
                if(info.className == "addModalClose"){
                    info.addEventListener('click', () => closeModal(addBookModal))
                    break;
                }
            }
        }
    }
    // let close = document.getElementsByClassName("addModalClose")[0];
    // close.onclick = function(){
    //     addBookModal.style.display = "none";
    //     return;
    // }
    // let title = prompt("title");
    // let author = prompt("author");
    // //Use title + author to duplicate check because there can be books with same title by different authors
    // let titleauthor = (title+author).toLowerCase();
    // if(bookMap.get(titleauthor) != null){
    //     alert("Book is already in library")
    //     return;
    // }
    // let pages = prompt("pages");
    // let read = prompt('read')
    // let newBook = Object.create(Book);
    // newBook.init(title,author,pages,read);
    // bookMap.set(titleauthor, newBook);
    // displayLibrary();
}
function submitBook(){
    //trim to remove leading and trailing spaces and replace multiple spaces with single
    let title = document.getElementById("titleInput").replace(/\s+/g,' ').value.trim();
    if(title.length == 0){
        alert("Title can't be empty");
        return
    }
    let author = document.getElementById("authorInput").replace(/\s+/g,' ').value.trim();
    if(author.length == 0){
        alert("Author can't be empty");
        return
    }
    let pages = document.getElementById("pagesInput").value;
    if(pages.length == 0){
        alert("Enter number of pages");
        return
    }
    let read = document.getElementById("readInput").value;

    //title+author because you can have same title different author
    let titleauthor = (title + author).toLowerCase();
    
    if(bookMap.get(titleauthor) != null){
        alert("Book is already in library")
        return;
    }

    let newBook = Object.create(Book);
    newBook.init(title, author, pages, read);
    bookMap.set(titleauthor,newBook);

    BOOKCASE.appendChild(makeBook(newBook));
    document.getElementById("addBookForm").reset();
    
    closeModal(addBookModal);
    //displayLibrary();
    //alert("hello" + title  +author+ pages+ read)
}

function displayLibrary(){
    BOOKCASE.innerHTML = ""
    for(let book of bookMap){
        BOOKCASE.appendChild(makeBook(book[1]));
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
        bookInfo.innerHTML = book[component];
        newBook.appendChild(bookInfo);
    }
    
    let hex = genHex();
    newBook.style.backgroundColor = hex;
    newBook.style.color = invertColor(hex, true);
    let removeBtn = document.createElement("button")
    removeBtn.className = "removeButton";
    removeBtn.innerHTML = "x"
    newBook.appendChild(removeBtn);
    removeBtn.addEventListener('click', ()=>{removeBook(newBook)});
    newBook.addEventListener('click', () => {openModal(newBook)});
    return newBook;
}

//Opens pop-up modal to display more information about book that was selected
function openModal(book){
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    
    //matches id of modal elements with classname of book elements and changes what's shown on modal
    for(let child of modal.childNodes){
        if(child.id == "bookContent"){
            for(let info of child.childNodes){
                //add onclick for x button
                if(info.className == "modalClose"){
                    info.addEventListener('click', () => closeModal(modal))
                    continue;
                }
                for(let bookInfo of book.childNodes){
                    if(info.id == bookInfo.className){
                        info.innerHTML = bookInfo.innerHTML;
                    }
                }
            }
        }
    }
}

//Remove book from data structure and display
function removeBook(book){
    book.parentNode.removeChild(book);
    let titleauthor = book.querySelector(".title").innerHTML + book.querySelector(".author").innerHTML;
    bookMap.delete(titleauthor.toLowerCase());
}

//Generates 6 digit hex number to randomize color of books
function genHex(size = 6){
    let hex = String(Math.floor(Math.random()*16777215).toString(16));
    if (hex.length < size) {
        hex = "000000" + hex;
        hex = hex.substr(hex.length - size)
    }
    return "#" + hex;
}
/* input: hex color, boolean bw
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


// /* Displays additional information about a book on hover 
// *  (pages and if book has been read or not)
// *  input: book
// *
// */
// function showAdditionalDetails(book){ 
    
// //    let children = book.children;

//     for(let child of book.children){
//         if(child.className == "pages" || child.className == "read"|| 
//         child.className == "removeButton"){
//             child.style.display = "flex"
//             //child.style["justify-content"] = "center"  
//         }
//         child.style["writing-mode"] = "horizontal-tb"
//     }
// }

// /* Hides additional information about a book when not hovering over it 
// *  (pages and if book has been read or not)
// *  input: book
// *
// */
// function hideAdditionalDetails(book){ 
//     let children = book.children;

//     for(let child of children){
//         if(child.className == "pages" || child.className == "read" || 
//             child.className == "removeButton"){
//             child.style.display = "none"
//         }
//         child.style["writing-mode"] = "vertical-rl";
//     }
// }

//Function only used to test bookcase
function fillShelves(){
    for(let i = 0; i < 90; i++){
        let book = Object.create(Book);
        book.init("a"+i,i+"b",i,i);
        //myLibrary.push(book);
        bookMap.set("a"+i + i +"b", book)
    }
}
fillShelves();
displayLibrary();
