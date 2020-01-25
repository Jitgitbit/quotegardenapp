import React, { Component } from 'react'
import Quote from './Quote';

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: true,
    error: false,
    search: '',
  }
  componentDidMount() {
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
  }
  // componentDidMount(){
  //   console.log('component is mounting')
  //   setTimeout(() => {this.getQuotes()}, 1000);
  //   console.log('component mounted')
  // }
  getQuotes() {
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
    console.log("search for this.state.search", this.state.search);
    this.getQuotes()
  }

  searchOutput = () => {
    return this.state.quotes.map((quote, index) => {
      return <li key={index}>{quote.value}</li>;
    })
  }
  render() {
    const errorMessage = <h1>OOPSADAISY, ERRRRRRORRRR!!!</h1>
    const fetchingMessage = <h1>Loading.......Just give it a second!</h1>
    const actQuotes = this.state.quotes.map(item => {
      return (
        <Quote 
          key = {item._id}  /** in console, it will ask for this key to be defined, give react what it wants! */
          actQuote = {item.quoteText}
          author = {item.quoteAuthor}
          numLikes = {this.props.numLikes}
          numDislikes = {this.props.numDislikes}
        />
      )
    })
    if(!this.state.fetching){
      return (
        <div>
          <h1>Quotes</h1>
          <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="search"
            onChange={this.handleInputChange}
            value={this.state.search}
          />
          <input
            type="submit"
            value="Search"
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
    } else if (this.state.fetching){
      return <div>{fetchingMessage}</div>;
    } 
  }
}
