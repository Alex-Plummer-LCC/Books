import { useState } from "react";

/* The BookEdit component receives the book and onSubmit props. The onSubmit prop originates from the parent BookShow, and the
book prop originates from the great grandparent component App. */
function BookEdit({ book, onSubmit }) {
    const [title, setTitle] = useState(book.title); // Use the title property from the book object to initialize the state variable "title".

    // handleChange will set the value of "title" based on what the user entered for the new title.
    const handleChange = (event) => {
        setTitle(event.target.value); // As usual, event.target.value will be the text that is currently in the form. Set the title to that value.
    };

    // handleSubmit will stop the form from being sent to the server and call the onSubmit function (which is in the parent BookShow).
    const handleSubmit = (event) => {
        event.preventDefault(); // Don't send the form to the server.

        onSubmit(book.id, title); // Call the onSubmit function with the book's id and the state variable title (which will contain the updated title).
    };

    // Any time the user edits a book, they will see the current title of that book (this is why title is initialized to book.title on line 6).
    // Return the JSX for the form that handles editing the title.
    return (
        <form onSubmit={handleSubmit} className="book-edit">
            <label>Title</label>
            <input className="input" value={title} onChange={handleChange} />
            <button className="button is-primary">
                Save
            </button>
        </form>
    );
}

export default BookEdit;