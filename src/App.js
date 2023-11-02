// Import the necessary React functions, the two child components, and the context created in books.js.
import { useEffect, useContext } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books";

// This is the parent component for this application.
function App() {
    const { fetchBooks } = useContext(BooksContext); // Use the useContext function to reach in and grab only the fetchBooks function from the object valueToShare.

    /* Use the useEffect function to ensure that the function only runs on the initial render, then only when fetchBooks changes
    (the code has been configured so that won't happen, more on that below). */
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    /*
        fetchBooks updates state. Without using useCallback on the fetchBooks function (which is books.js), the following infinite cycle will occur: 

                run the useEffect function, which calls fetchBooks, which updates state
                rerender the component because state changed
                run the useEffect function again (as there is now a new version of fetchBooks) and update state again
                rerender the component because state changed
                ....

        The fetchBooks function makes an API request, so this cycle will include an infinite stream of API requests. By using useCallback, the reference 
        to fetchBooks will be the same every time, and this cycle will not occur.
    */
    
    // Return the JSX for the app. It will contain instances of BookList and BookCreate.
    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList />
            <BookCreate />
        </div>
    );
}

export default App;