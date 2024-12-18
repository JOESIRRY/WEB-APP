import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import BookUpdate from './components/BookUpdate';
import NavBar from './components/NavBar'; // Optional, for navigation

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={BookList} />
        <Route path="/add" component={AddBook} />
        <Route path="/update/:id" component={BookUpdate} />
      </Switch>
    </div>
  );
}

export default App;
