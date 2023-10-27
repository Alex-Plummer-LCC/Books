import { useState } from "react";

// The BookCreate component receives the onCreate prop from its parent App. 
function BookCreate({ onCreate }) {
    const [title, setTitle] = useState(""); // Create and initialize the title state variable.

    // handleChange will set the value of "title" based on what the user has entered into the form.
    const handleChange = (event) => {
        setTitle(event.target.value); // event.target.value will be the title. Set the title to this value.
    };

    // handleSubmit will make the necessary function calls when the user submits the form.
    const handleSubmit = (event) => {
        event.preventDefault(); // Stop the form from being sent to the server.
        onCreate(title); // This call to onCreate will pass the title back to the parent App.
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