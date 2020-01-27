import React, { Component } from 'react';

export default class Quote extends Component {
 
  render() {
    
    return (
      <div className="quote-list">
        <div className="row">
          <div className="col">
            <h3>{ this.props.actQuote }</h3>
              {'By: ' + this.props.author } <br/>
              <b>{ this.props.setLiked }</b>
              <button onClick={this.props.increase}>{`:)`}</button>
              {/* <b>{ this.props.dislikes }</b>    */}
              <button onClick={this.props.decrease}>{`:(`}</button>
          </div>
        </div>
      </div>
    )
  }
}
