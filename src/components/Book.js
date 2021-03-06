import React, { Component } from 'react'

class Book extends Component{
    changeshelf = (book,shelf) => {
        this.props.onChangeShelf(book,shelf);
    }

    render() {
        const book=this.props.book;
        const url= book.imageLinks?book.imageLinks.thumbnail:'';
        const title = book.title;
        const authors = book.authors && book.authors.join(' & ');
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf?book.shelf:'none'} onChange={(e) => {this.changeshelf(book,e.target.value)}}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        )
    }
}

export default Book