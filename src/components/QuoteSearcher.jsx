import React, { Component } from 'react'
import Quote from './Quote';

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false,
    error: false
  }
  getQuotes() {
    fetch(`https://quote-garden.herokuapp.com/quotes/search/tree`)
     .then(res => res.json())
     .then(myJson => {
         console.log(myJson)
         this.setState({
           quotes: myJson.results,
           fetching: true,
         });    
     })
     .catch(err => 
       this.setState({
         error: true,
     }))
 }
 componentDidMount(){
   console.log('component is mounting')
   setTimeout(() => {this.getQuotes()}, 1000);
   console.log('component mounted')
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
    if(this.state.fetching){
      return (
        <div>
          <h1>Quotes</h1>
          <ul>
          { actQuotes }
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
