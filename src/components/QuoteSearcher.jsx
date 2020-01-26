import React, { Component } from 'react'
import Quote from './Quote';
//import PropTypes from "prop-types";


export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: true,
    error: false,
    search: '',
    likes: 0,
    dislikes: 0,
  }
  increase = () => {
    this.setState({
      likes: this.state.likes + 1
    });
    console.log(this.state.likes);
  };
  decrease = () => {
    this.setState({
      dislikes: this.state.dislikes + 1
    });
    console.log(this.state.dislikes);
  };
  onlyOne = (quotesArray) => {
    return quotesArray.reduce((unique, next) => {
      if (!unique.some(obj => obj.quoteText === next.quoteText)) {
        unique.push(next);
      }
      return unique;
    }, []);
  };
  componentDidMount() {
    console.log('component is mounting')
    fetch(`https://quote-garden.herokuapp.com/quotes/search/tree`)
     .then(res => res.json())
     .then(myJson => {
         console.log(myJson)
         setTimeout(this.setState({
            quotes: this.onlyOne(myJson.results),
            fetching: false,
         }), 1000);    
     })
     .catch(err => 
       this.setState({
         error: true,
     }))
    console.log('component mounted')
  }
  getQuotes() {
    this.setState({
      fetching: true,
    })
    fetch(`https://quote-garden.herokuapp.com/quotes/search/${this.state.search}`)
     .then(res => res.json())
     .then(myJson => {
         console.log(myJson)
         setTimeout(this.setState({
            quotes: this.onlyOne(myJson.results),
            fetching: false,
         }), 1000);    
     })
     .catch(err => 
       this.setState({
         error: true,
     }))
  }
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      search: event.target.value,
    })
  }
  handleSubmit = (event) =>{
    event.preventDefault()
    console.log("search for this.state.search, ", this.state.search);
    this.getQuotes();
  }
  searchOutput = () => {
    this.state.quotes.map((quote, index) => {
      return <ul key={index}>{quote.value}</ul>;
    })
  }
  render() {
    const errorMessage = <h1>OOPSADAISY, ERRRRRRORRRR!!!</h1>
    const fetchingMessage = <h1>Loading.......Just give it a second!</h1>
    const actQuotes = this.state.quotes.map(item => {
      return (
        <Quote 
          key = {item._id}  
          actQuote = {item.quoteText}
          author = {item.quoteAuthor}
          likes = {this.state.likes}
          increase = {this.increase}
          dislikes = {this.state.dislikes}
          decrease = {this.decrease}
        />
      )
    })
    if(!this.state.fetching){
      return (
        <div>
          <h1>Quotes</h1>
    <p>total likes: <b>{ this.state.likes }</b> total dislikes: <b>{ this.state.dislikes }</b></p>           

          <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="search"
            onChange={this.handleInputChange}
            value={this.state.search}
          />
          <input
            type="submit"
            value="Search!"
            onClick={this.handleSubmit}
          />
        </form>
          <ul>
          { actQuotes }
          </ul>
          <ul>
          {this.searchOutput()}
          </ul>
        </div>
      );
    } else if (this.state.error) {
      return <div>{errorMessage}</div>;
    } else {
      return <div>{fetchingMessage}</div>;
    } 
  }
}


