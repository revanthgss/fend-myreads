import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import AllBooks from './components/AllBooks';
import Search from './components/Search';

class BooksApp extends React.Component {
  state = {
    books : [],
  }
  refreshBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    })
  }
  componentDidMount() {
    this.refreshBooks();
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book,shelf).then((response) => {
      book.shelf = shelf;
      this.setState(prevState => {
        const updatedBooks = prevState.books;
        const books = updatedBooks.filter((newbook) => newbook.id === book.id);
        if(!books.length)
          updatedBooks.push(book);
        return {books: updatedBooks}
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <AllBooks books={this.state.books} onChangeShelf={this.changeShelf} onRefreshBooks={this.refreshBooks}/> 
        )}/>
        <Route path='/search/' render={() => (
          <Search books={this.state.books} onChangeShelf={this.changeShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
