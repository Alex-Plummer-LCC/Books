import BookShow from "./BookShow"; // BookList needs access to its child BookShow (so it can render instances of BookShow).

/* The BookList component will receive the list of books from its parent App as a prop, as well as the onDelete and onEdit functions 
(which it won't use, it will only pass them down to the child BookShow). */
function BookList({ books, onDelete, onEdit }) {
    const renderedBooks = books.map((book) => { // Map the books prop into instances of the BookShow child component.
        return <BookShow onDelete={onDelete} onEdit={onEdit} key={book.id} book={book} />; /* Each BookShow instance will have props of onDelete (the function to 
        call when/if it is deleted), onEdit (the function to call when the book is being edited), key (its unique key), and book (the info about the book). */
    });

    // Return a styled div containing all of the instances of BookShow (renderedBooks).
    return <div className="book-list">{renderedBooks}</div>;
}

export default BookList;