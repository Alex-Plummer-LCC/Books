import BookShow from "./BookShow"; // BookList needs access to its child BookShow (so it can render instances of BookShow).
import useBooksContext from "../hooks/use-books-context";

// The BookList component doesn't need props anymore because of context.
function BookList() {
    // Use the useBooksContext custom hook to reach into the context and grab the list of books.
    const { books } = useBooksContext();

    const renderedBooks = books.map((book) => { // Map the books prop into instances of the BookShow child component.
        return <BookShow key={book.id} book={book} />; /* Each BookShow instance will now have props of key (its unique key), 
        and book (the info about the book). It doesn't need the onEdit and onDelete props anymore because of context. */
    });

    // Return a styled div containing all of the instances of BookShow (renderedBooks).
    return (
        <div className="book-list">
            {renderedBooks}
        </div>
    );
}

export default BookList;