import { useState } from "react";
import BookEdit from "./BookEdit"; // BookShow needs access to BookEdit so it can render an instance of BookEdit.
import useBooksContext from "../hooks/use-books-context";

// The BookShow component receives only the book prop from the grandparent App (it doesn't need onDelete or onEdit because of context).
function BookShow({ book }) {
    const [showEdit, setShowEdit] = useState(false); // Create the state variable showEdit and initialize it to false, as we don't want to show the editing form right away.
    const { deleteBookById } = useBooksContext(); // Reach into the context and grab only the deleteBookById function (using the useBooksContext custom hook).

    // If the user clicks on the delete icon, call the deleteBookById function. Thanks to context, BookShow can now access the function directly.
    const handleDeleteClick = () => {
        deleteBookById(book.id);
    };

    // If the user clicks on the pencil icon, reverse the value of showEdit.
    const handleEditClick = () => {
        setShowEdit(!showEdit);
    };

    // If the user submits the form, hide the editing form.
    const handleSubmit = () => {
        setShowEdit(false);
    };

    let content = <h3>{book.title}</h3>; // Set "content" to the book's title for now, as showEdit is false during the initial render.
    if (showEdit) { // However, if the user flips the value of showEdit by clicking the pencil icon...
        content = <BookEdit onSubmit={handleSubmit} book={book} />; // Change "content" to an instance of the BookEdit component, which is a form.
    };

    // Return the JSX for each book, including the appropriate class names and event handlers.
    // On line 35, use the book's id (in a template literal) to generate a different image for each book.
    return ( <div className="book-show">
        <img
            alt="books"
            src={`https://picsum.photos/seed/${book.id}/300/200`}
        />
        <div>{content}</div>
        <div className="actions">
            <button className="edit" onClick={handleEditClick}>
                Edit
            </button>
            <button className="delete" onClick={handleDeleteClick}>
                Delete
            </button>
        </div>
    </div>
    );

}

export default BookShow;