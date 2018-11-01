import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import AllBooks from './components/AllBooks';
import Search from './components/Search';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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
      let updatedbooks = this.state.books.slice(0);
      const books = updatedbooks.filter((newbook) => newbook.id === book.id);
      if(books.length){
        books[0].shelf = shelf;
      } else {
        updatedbooks.push(book);
        console.log(book);
      }
      this.setState({books:updatedbooks});
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
