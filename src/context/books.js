// Import all the necessary React functions and axios.
import { createContext, useState, useCallback } from "react";
import axios from "axios";

// Use createContext to create BooksContext.
const BooksContext = createContext();

// The Provider component is the top most component, and it will display the context that the other components need to use.
function Provider({ children }) {

    const [books, setBooks] = useState([]); // Create and initialize the state variable books. It will start as an empty array.

    // fetchBooks will get the books from json-server (using a GET request through axios) and update the books state variable appropriately.
    // Wrap the fetchBooks function in useCallback to ensure that the useEffect function (in App.js) knows that fetchBooks shouldn't change when rerendering.
    const fetchBooks = useCallback(async () => {
        const response = await axios.get(`http://citweb.lanecc.net:5023/books`); // Wait for a response from json-server to come back before setting the books.

        setBooks(response.data);
    }, []);

    
    // editBookById will use axios to edit a book's title, then update the books state variable appropriately.
    const editBookById = async (id, newTitle) => {
        const response = await axios.put(`http://citweb.lanecc.net:5023/books/${id}`, { // Use async/await and template literal syntax to make a PUT request to json-server.
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

        // Update the books state variable with the updated books. This step is repeated on lines 54 and 69.
        setBooks(updatedBooks);
    };

    // deleteBookById will delete a book, given its id, then update the books state variable appropriately.
    const deleteBookById = async (id) => {
        await axios.delete(`http://citweb.lanecc.net:5023/books/${id}`); // Use similar syntax to line 24 to make a DELETE request to json-server.

        // filter will return only the elements in the array that pass a certain condition.
        const updatedBooks = books.filter((book) => {
            return book.id !== id; // If the book's id doesn't equal the id we want to remove, it will be included in the new array updatedBooks.
        });

        setBooks(updatedBooks);
    };

    // This function will add a new book to the books array.
    const createBook = async (title) => {
        // Make a POST request to json-sever (and wait for it) that adds a new book with the title the user wants.
        const response = await axios.post(`http://citweb.lanecc.net:5023/books`, {
            title
        });

        const updatedBooks = [
            ...books, // Copy the books array, then...
            response.data // ...Take the data from the response (the new book) and add it to the copy of the books array.
        ];

        setBooks(updatedBooks);
    };

    /* Create an object containing the books array and all the functions. Keys and values match, so using just the key name is
    acceptable. */
    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks,
    }

    /* Return the JSX that contains the BooksContext provider. It receives the valueToShare as a prop from the top level Provider.
    Now, any child component has access to valueToShare through context. */
    return (
        <BooksContext.Provider value={valueToShare}>
            {children}
        </BooksContext.Provider>
    );
}

export { Provider }; // Export the Provider component as a named export.
export default BooksContext; // Also, export BooksContext as the default export.