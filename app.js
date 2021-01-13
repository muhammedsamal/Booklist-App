// jshint esversion:6
// Book class : represents a Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI class : Handle UI tasks
class UI{
    static displayBooks(){
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'David',
                isbn: '3673451526'
            },
            {
                title: 'Book two', 
                author: 'Mike', 
                isbn: '6242625'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    
    static showAlert(message, className){
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        // Vanish in 3sec
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }

}
// Store class : handle storage

// Events: Display Books 
document.addEventListener('DOMContentLoaded', UI.displayBooks)
// Events: Add a Book
document.querySelector("#book-form").addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
    
    // Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    // Validate
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert("Please fill in all fields.", "danger");
    } else {
    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Add book to UI
    UI.addBookToList(book); 

    // show success message
    UI.showAlert('Book added', 'success');

    // Cleat fields
    UI.clearFields();
    }
});
// Events: Remove Book
document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target);
    UI.showAlert('Book removed!', 'info');
});