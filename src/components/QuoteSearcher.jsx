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
  componentDidMount() {
    console.log('component is mounting')
    fetch(`https://quote-garden.herokuapp.com/quotes/search/tree`)
     .then(res => res.json())
     .then(myJson => {
         console.log(myJson)
         setTimeout(this.setState({
           quotes: myJson.results,
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
           quotes: myJson.results,
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
  
  // const total = values.reduce((accumulator, currentValue) => {
  //   return accumulator + currentValue
  // }, initialValue)

  render() {
    const errorMessage = <h1>OOPSADAISY, ERRRRRRORRRR!!!</h1>
    const fetchingMessage = <h1>Loading.......Just give it a second!</h1>
    // const allLikes = this.props.liked.reduce((acc, curV) => {
    //   return acc + curV
    // }, 0);
    const actQuotes = this.state.quotes.map(item => {
      return (
        <Quote 
          key = {item._id}  
          actQuote = {item.quoteText}
          author = {item.quoteAuthor}
          liked = {this.props.liked}
          disliked = {this.props.disliked}
        />
      )
    })
    if(!this.state.fetching){
      return (
        <div>
          <h1>Quotes</h1>
    <p>total likes: </p>
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


