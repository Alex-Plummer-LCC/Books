import { useState } from "react";
import BookEdit from "./BookEdit"; // BookShow needs access to BookEdit so it can render an instance of BookEdit.

/* The BookShow component will receive the list of books as a prop, as well as the onDelete and onEdit functions. The two functions originate from the
grandparent App. */
function BookShow({ book, onDelete, onEdit }) {
    const [showEdit, setShowEdit] = useState(false); // Create the state variable showEdit and initialize it to false, as we don't want to show the editing form right away.

    // If the user clicks on the delete icon, call the onDelete function (which originates as deleteBookById in the grandparent App).
    const handleDeleteClick = () => {
        onDelete(book.id);
    };

    // If the user clicks on the pencil icon, reverse the value of showEdit.
    const handleEditClick = () => {
        setShowEdit(!showEdit);
    };

    /* If the user submits the form, hide the editing form and call onEdit (which originates as editBookById in the grandparent App) .
    with the id and the newTitle of the book. */
    const handleSubmit = (id, newTitle) => {
        setShowEdit(false);
        onEdit(id, newTitle);
    };

    let content = <h3>{book.title}</h3>; // Set "content" to the book's title for now, as showEdit is false during the initial render.
    if (showEdit) { // However, if the user flips the value of showEdit by clicking the pencil icon...
        content = <BookEdit onSubmit={handleSubmit} book={book} />; // Change "content" to an instance of the BookEdit component, which is a form.
    };

    // Return the JSX for each book, including the appropriate class names and event handlers.
    // On line 36, use the book's id (in a template literal) to generate a different image for each book.
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