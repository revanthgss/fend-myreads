import React, { Component } from 'react'
import BookShelf from './BookShelf';

class AllBooks extends Component{
    render() {
        const books = this.props.books;
        const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading');
        const wantToRead = books.filter((book) => book.shelf === 'wantToRead');
        const read = books.filter((book) => book.shelf === 'read');
        return (
            <div>
                <BookShelf shelf={currentlyReading} title='Currently Reading'/>
                <BookShelf shelf={wantToRead} title='Want To Read'/>
                <BookShelf shelf={read} title='Read'/>
            </div>
        )
    }
}

export default AllBooks