
let shelfTitle = document.querySelector("#shelfTitle")

let body = document.querySelector("body")

// let addBookSection = document.querySelector("#bookSection")
// addBookSection.textContent = "Add a Book!"

// We get a stack of index cards of book info - book-data.js
// I enter all the info into a spreadsheet - contructor
// I use the spreadsheet to order books - addbook
// I take the books and put them onto shelf - render

class Book {
    // Create the four elements needed to categorize each book
    constructor(title, author, language, subject) {
        this.title = title;
        this.author = author;
        this.language = language;
        this.subject = subject;
        this.comment = [];
    }
    render(){

        // Attempt at favorites button...
        // The box to hold the amount of clicks
        let bookCover = document.createElement("section")
        bookCover.className = "bookCover"
        body.append(bookCover)

         // Create each element and style them
        let bookTitle = document.createElement("h1");
        bookTitle.textContent = `${this.title}`;
        bookTitle.style.fontSize = "50px"
        bookTitle.style.color = "maroon"
        
        let bookAuthor = document.createElement("h1");
        bookAuthor.textContent = `${this.author}` ;
        bookAuthor.style.fontSize = "30px"
        bookAuthor.style.color = "red"

        let bookLanguage = document.createElement("h2")
        bookLanguage.textContent = `${this.language}`;
        bookLanguage.style.fontSize = "20px"
        bookLanguage.style.color = "black"

        let bookSubject = document.createElement("ol")
        bookSubject.textContent = `${this.subject}`;
        bookSubject.style.fontSize = "20px"
        bookSubject.style.color = "black"
        bookSubject.style.border = "5px dotted black"
        bookSubject.style.display = "flex"
        bookSubject.style.textAlign = "center"
        bookSubject.style.padding = "5px"

        // Create button for the UI
        // Turns the book yellow if favorited
        let favoriteButton = document.createElement("button")
        favoriteButton.className = "favoriteButton"
        bookCover.append(favoriteButton)
        favoriteButton.textContent = "Favorite"
        favoriteButton.style.padding = "10px"
        favoriteButton.style.margin = "10px"
        favoriteButton.style.backgroundColor = "pink"
        favoriteButton.addEventListener("click", (event) => {
            bookItem.style.backgroundColor = "pink"
            if(event.target.classList.contains("favorite")){
                event.target.classList.remove("favorite")
            } else event.target.classList.add("favorite")
        })

        // Create a box to hold all the elements of the comments form
        // Idea is to have a text entry area, a button to submit the entry, and an area which displays the entry
        let commentBox = document.createElement('form')
        commentBox.className = "commentBox";
        commentBox.style.padding = "10px"
        // commentBox.style.display = "none"
        bookCover.append(commentBox)

        // Create the area which the user will input comments
        let commentArea = document.createElement("textarea")
        commentArea.className = "commentArea"
        commentArea.name = "comment"
        commentArea.style.height = "75px"
        commentArea.style.width = "99%"
        commentBox.append(commentArea)
        
        // Create a button element that will allow users to submit their comment
        const submitButton = document.createElement("button");
        submitButton.className = "submitButton";
        submitButton.textContent = "Add Comment"
        submitButton.style.backgroundColor = "gray"
        submitButton.style.color = "white"
        commentBox.append(submitButton)

        // Create an area that the user inputted comments get pushed to and appear
        let commentsAppear = document.createElement("div")
        commentsAppear.className = "commentsAppear"
        commentsAppear.style.height = "40px"
        commentBox.append(commentsAppear)

        // Add a click eventListener to the whole form
        // Using the added this.comment array in the constructor, get the commentArea to display the array
        // First, the user inputted comments will get pushed into the array
        commentBox.addEventListener("click", (event) => {
            event.preventDefault()
            this.comment.push(commentArea.value)
            commentsAppear.textContent = this.comment
            commentArea.value = ""
        })

        // Put all the elements into its own box, representing the cover of the books
        let bookItem = document.createElement("li");
        bookItem.append(bookTitle, bookAuthor, bookLanguage, bookSubject, favoriteButton, commentBox)
        bookItem.style.border = "10px solid black"
        bookItem.style.backgroundColor = "silver"
        bookItem.style.width = "30%"
        bookItem.style.height = "100%"
        bookItem.style.display = "inline-block"
        bookItem.style.verticalAlign = "top"
        bookItem.style.margin = "4px"
        
        return bookItem
    }
}


class Bookshelf {
    // This represents the spreadsheet
    // I want to take all the books and display them on the bookshelf
    // I am to place all the books into an array
    constructor() {
        this.arrayOfBooks = []
    }

    // Method to add book to the bookshelf
    addBook(addedBook) {
        this.arrayOfBooks.push(addedBook);
    }

    // Using seed method, loop through all the books and populate the shelf with the elements
    // of each book
    seed(arrayOfBooks){
    for(const book of arrayOfBooks){
        let bookInstance = new Book(book.title, book.author, book.language, book.subject, book.comment, book.commentSubmit)
        bookShelf.addBook(bookInstance)
    }
    }

    // Refactored render to use map
    render(){
        let shelf = document.querySelector("#shelf");

        let bookItemList = document.createElement("ul");

        const bookDOMelements = this.arrayOfBooks.map((book) => book.render())
        
        bookItemList.replaceChildren(...bookDOMelements)
        shelf.replaceChildren(bookItemList)
    }
    
    // Set all the functions for filtering by ascending, descending, and by subject
    stAscending() {
        this.arrayOfBooks.sort(function(a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
        return 0
        })
        console.log(this.arrayOfBooks)
        this.render()
    }
    stDescending() {
        let sortDescending = document.querySelector("#sortDescending")
        this.arrayOfBooks.sort(function(a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return 1
        if (a.title.toLowerCase() > b.title.toLowerCase()) return -1
        return 0
        })
        console.log(this.arrayOfBooks)
        this.render()
    }
    stSubject() {
        let sortSubject = document.querySelector("#sortSubject")
        this.arrayOfBooks.sort(function(a ,b) {
        if (a.subject.length > b.subject.length) return -1
        if (a.subject.length < b.subject.length) return 1
        })
        console.log(this.arrayOfBooks)
        this.render()
    } 
}


// console.log("this is a book test", new Book("JRR Tolkien", "English", ["Fantasy, Adventure"], "Lord of the Rings"))
// console.log("this be a Bookshelf test", new Bookshelf())

let book1 = new Book("title", "author", "language", ["subject1, subject2"]);
console.log("this is a rendered book", book1)
let bookShelf = new Bookshelf();
bookShelf.addBook(book1)

// Get the proper method from BookShelf to initiate when selected
let sortAscending = document.querySelector("#option")
// console.log(sortAscending)
sortAscending.addEventListener("change", (textEvent) => {
    console.log(textEvent.target.value)
    if (textEvent.target.value == "Sort Ascending") {
        bookShelf.stAscending()
    }
    else if (textEvent.target.value == "Sort Descending") {
        bookShelf.stDescending()
    }
})

/////////////////////////////////////////////////////////////////////////////////

// Add a addBook function which gives users to add a book to the bookShelf
// Create input fields for title, author, language, and subject in HTML
const addBook = document.querySelector("#addBook");
let submitButton = document.getElementById("submitButton")
submitButton.style.backgroundColor = "yellow"
submitButton.style.fontSize = "20px"
// Upon clicking submit, the input values in the fields will create a new Book instance and be pushed into the bookShelf
submitButton.addEventListener("click", (event) => {
  event.preventDefault()
  const title = document.querySelector("#titleUserInput").value
  const author = document.querySelector("#authorUserInput").value
  const language = document.querySelector("#languageUserInput").value
  const subjects = document.querySelector("#subjectsUserInput").value
  const bookInstance = new Book(title, author, language, subjects)
  // The bookShelf will rerender and the new Book will be added for good
  bookShelf.addBook(bookInstance)
  bookShelf.render()
});

///////////////////////////////////////////////////////////////////////////////////

bookShelf.seed(bookData)
bookShelf.render()
