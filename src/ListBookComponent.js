import React, { useEffect, useState } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;
function ListBookComponent() {
    const [bookList, setBookList] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const apiURL = "http://127.0.0.1:8000/listbooks/";
    const fetchData = async () => {
        const response = await axios.get(apiURL,
            {'withCredentials': true });
        console.log(response)
        setBookList(response.data);
        console.log(bookList);
        console.log(response.data);
    }
    return (
        <div className="main-section">
            <h1>All Books</h1>
            <div className="book-list">
                {bookList.map((book, index) => (
                    <ul>
                        <li>Book: {book.name}</li>
                        <li>Author: {book.author}</li>
                    </ul>
                ))}
            </div>
        </div>
    );
}
export default ListBookComponent;