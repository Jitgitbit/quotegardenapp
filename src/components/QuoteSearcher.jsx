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
   setTimeout(() => {this.getQuotes()}, 500);
   console.log('component mounted')
   //this.getQuote();
 }
  render() {
    const actQuotes = this.state.quotes.map(item => {
      return (
        <Quote 
          key = {item._id}  /** in console, it will ask for this key to be defined, give react what it wants! */
          actQuote = {item.quoteText}
          author = {item.quoteAuthor}
        />
      )
    })
    return (
      <div>
        <h1>Quotes</h1>
        <ul>
        { actQuotes }
        </ul>
      </div>// articleCards is the newly mapped array represented in the form of a list!
    );
  }
}

// render() {
//   const errorMessage = <h1>OOPSADAISY, ERRRRRRORRRR!!!</h1>
//   if (this.state.loading) {
//     return <div>
//               <h3>Random Quote!!</h3>
//               {this.state.data.value}
//               <div>
//                 {/* <button onClick={this.newQuote()}>Get another random quote!</button> */}
//                 <button onClick={() => {this.newQuote()}}>Get another random quote!</button> {/* Look! adding the arrowfunction solved it! */}
//               </div>
//               <LikeCounter/>
//               <br/>
//               <Link to={ `/searchQuotePage/` } style={{color: 'white'}}>Look up a quote</Link>
//             </div>;
//   } else if (this.state.error) {
//     return <div>{errorMessage}</div>;
//   } else {
//     return <div>{'Loading.......Just give it one second!'}</div>;
//   }
// }