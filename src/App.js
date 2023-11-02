// Adding an extra comment so I can see if my new repo is working correctly...

// Import the necessary React functions, axios, and the two child components.
import { useState, useEffect } from "react";
import axios from "axios";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books";

// This is the parent component for this application.
function App() {
    const [books, setBooks] = useState([]); // Create and initialize the state variable books. It will start as an empty array.

    // fetchBooks will get the books from json-server (using a GET request through axios) and update the books state variable appropriately.
    const fetchBooks = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books`); // Wait for a response from json-server to come back before setting the books.

        setBooks(response.data);
    };

    // Using [] as a second argument to useEffect will allow the fetchBooks function to only run on the first render.
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    // editBookById will use axios to edit a book's title, then update the books state variable appropriately.
    const editBookById = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, { // Use async/await and template literal syntax to make a PUT request to json-server.
            title: newTitle, // Add an object containing the newTitle as an argument within the request.
        });

        // Update the books array by creating a new one using the map function.
        const updatedBooks = books.map((book) => {
            if (book.id === id) { // If we find the book with the id that we want...
                return { ...book, ...response.data }; 
                /* ...Use a copy of response.data and add it to a copy of the specific book object. This ensures the books state array will 
                display the current properties. Also, it would appear that the book's title will appear twice, but the oldest title will 
                be removed. */
            }

            // If the id of the book doesn't match up, just return the book.
            return book;
        });

        // Update the books state variable with the updated books. This step is repeated on lines 55 and 70.
        setBooks(updatedBooks);
    };

    // deleteBookById will delete a book, given its id, then update the books state variable appropriately.
    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`); // Use similar syntax to line 25 to make a DELETE request to json-server.

        // filter will return only the elements in the array that pass a certain condition.
        const updatedBooks = books.filter((book) => {
            return book.id !== id; // If the book's id doesn't equal the id we want to remove, it will be included in the new array updatedBooks.
        });

        setBooks(updatedBooks);
    };

    // This function will add a new book to the books array.
    const createBook = async (title) => {
        // Make a POST request to json-sever (and wait for it) that adds a new book with the title the user wants.
        const response = await axios.post("http://localhost:3001/books", {
            title
        });

        const updatedBooks = [
            ...books, // Copy the books array, then...
            response.data // ...Take the data from the response (the new book) and add it to the copy of the books array.
        ];

        setBooks(updatedBooks);
    };

    // Return the JSX for the app. It will contain instances of BookList and BookCreate, with appropriate props.
    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList />
            <BookCreate />
        </div>
    );
}

export default App;