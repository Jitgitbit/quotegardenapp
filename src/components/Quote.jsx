import React, { Component } from 'react';
//import PropTypes from "prop-types";


export default class Quote extends Component {
  // constructor(props) {
  //   super(props);
  //   this.increase = this.increase.bind(this);
  // }
  // state = {
  //    likes: 0,
  //    dislikes: 0,
  // };
  
  
  render() {
    
    return (
      <div className="quote-list">
        <div className="row">
          <div className="col">
            <h3>{ this.props.actQuote }</h3>
              {'By: ' + this.props.author } <br/>
              <b>{ this.props.likes }</b>
              <button onClick={this.props.increase}>{`:)`}</button>
              <b>{ this.props.dislikes }</b>   
              <button onClick={this.props.decrease}>{`:(`}</button>
          </div>
        </div>
      </div>
    )
  }
}
