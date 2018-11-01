import React, { Component } from 'react'
import Book from './Book';

class BookShelf extends Component{
    render(){
        const shelf = this.props.shelf;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                        {shelf.length!==0 && shelf.map((book) => (
                            <li key={book.id}>
                                <Book book ={book} onChangeShelf={this.props.onChangeShelf}/>
                            </li>
                        ))}
                        {shelf.length===0 && (<span>Nothing to show here</span>)}
                </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf