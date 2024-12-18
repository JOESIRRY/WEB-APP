import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function BookUpdate() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        const { title, author, isbn } = response.data;
        setTitle(title);
        setAuthor(author);
        setIsbn(isbn);
      } catch (error) {
        console.error("There was an error fetching the book details!", error);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBook = { title, author, isbn };

    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, updatedBook);
      history.push('/'); // Redirect to home after successful update
    } catch (error) {
      console.error("There was an error updating the book!", error);
    }
  };

  return (
    <div>
      <h2>Update Book</h2>
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
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default BookUpdate;
