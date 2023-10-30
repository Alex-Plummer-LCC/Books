import { useState } from "react";
// Import the custom hook useBooksContext to simplify the code. This import was also made in all the other files in the components folder.
import useBooksContext from "../hooks/use-books-context";


// The BookCreate component doesn't receive props anymore because of context.
function BookCreate() {
    const { createBook } = useBooksContext(); // Reach into the context and grab only the createBook function (using the useBooksContext custom hook).

    const [title, setTitle] = useState(""); // Create and initialize the title state variable.

    // handleChange will set the value of "title" based on what the user has entered into the form.
    const handleChange = (event) => {
        setTitle(event.target.value); // event.target.value will be the title. Set the title to this value.
    };

    // handleSubmit will make the necessary function calls when the user submits the form.
    const handleSubmit = (event) => {
        event.preventDefault(); // Stop the form from being sent to the server.
        createBook(title); // This call to createBook will pass the title back to the parent App.
        setTitle(""); // Reset the form after the user submits it.
    };

    // Return the JSX for the form (with appropriate event handlers and class names).
    return (
        <div className="book-create">
            <h3>Add a Book</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className="input" value={title} onChange={handleChange} />
                <button className="button">Add the book!</button>
            </form>
        </div>
    );
}

export default BookCreate;