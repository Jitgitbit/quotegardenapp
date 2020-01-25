import React, { Component } from 'react'

export default class Quote extends Component {
  state = {
    numLikes: 0,
    numDislikes: 0
  };
  increase = () => {
    this.setState({
      numLikes: this.state.numLikes + 1
    });
    console.log(this.state.numLikes);
  };
  decrease = () => {
    this.setState({
      numDislikes: this.state.numDislikes + 1
    });
    console.log(this.state.numDislikes);
  };
  render() {
    return (
      <div className="quote-list">
        <div className="row">
          <div className="col">
            <h3>{ this.props.actQuote }</h3>
              {'By: ' + this.props.author } 
              <button onClick={this.increase}>{`:)`}</button>   
              <button onClick={this.decrease}>{`:(`}</button>
          </div>
        </div>
      </div>
    )
  }
}
