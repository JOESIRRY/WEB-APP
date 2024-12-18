import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, author, isbn };

    try {
      await axios.post('http://localhost:5000/api/books', newBook);
      history.push('/'); // Redirect to home after successful post
    } catch (error) {
      console.error("There was an error adding the book!", error);
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN"
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
