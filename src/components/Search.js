import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book';

class Search extends Component {
    state = {
        query: '',
        books: [],
        error: false
    }

    queryTimer =null;

    updateQuery = (val) => {
        clearTimeout(this.queryTimer);
        this.setState({query: val});
        this.queryTimer = setTimeout(this.updateBooks, 250);
    }
    updateShelves = (selected,updated) => {
        /****Updating shelves on books found****/
        let dict = {}
        selected.forEach((book) => dict[book.id] = book.shelf);
        
        updated.forEach((book) => {
            book.shelf = dict[book.id] || 'none';
        })
        return updated;
    }
    updateBooks = () => {
        if(this.state.query===''){
            this.setState({books:[],error:false});
            return;
        }
        BooksAPI.search(this.state.query).then((response) => {
            let error=false;
            let newbooks=[];
            if(response===undefined || (response.error && response.error!=='empty query'))
                error=true;
            else if(response.length){
                newbooks = response; 
            }
            newbooks = this.updateShelves(this.props.books, newbooks);
            this.setState({books:newbooks,error});
        })
    }
    render(){
        const showingBooks = this.state.books;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link to='/' className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" onChange={(e) => {this.updateQuery(e.target.value)}}/>

                </div>
                </div>
                <div className="search-books-results">
                {this.state.error && (<span>There is an error in getting the books.</span>)}
                {!this.state.error && (
                    <div>
                        <span>Showing {showingBooks.length} books</span>
                        <ol className="books-grid">
                            {showingBooks && showingBooks.map((book) => (
                                <li key={book.id}>
                                    <Book book={book} onChangeShelf={this.props.onChangeShelf}/>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
                </div>
            </div>
        )
    }
}

export default Search