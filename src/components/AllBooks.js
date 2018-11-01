import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';


class AllBooks extends Component{
    componentDidMount() {
        this.props.onRefreshBooks();
    }
    render() {
        const books = this.props.books;
        const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading');
        const wantToRead = books.filter((book) => book.shelf === 'wantToRead');
        const read = books.filter((book) => book.shelf === 'read');
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    <BookShelf shelf={currentlyReading} title='Currently Reading' onChangeShelf={this.props.onChangeShelf}/>
                    <BookShelf shelf={wantToRead} title='Want To Read' onChangeShelf={this.props.onChangeShelf}/>
                    <BookShelf shelf={read} title='Read' onChangeShelf={this.props.onChangeShelf}/>
                </div>
                </div>
                <div className="open-search">
                    <Link to='/search/'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default AllBooks