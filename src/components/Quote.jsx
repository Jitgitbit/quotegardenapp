import React, { Component } from 'react';
//import PropTypes from "prop-types";


export default class Quote extends Component {
  // constructor(props) {
  //   super(props);
  //   this.increase = this.increase.bind(this);
  // }
  state = {
     likes: 0,
     dislikes: 0
  };
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
