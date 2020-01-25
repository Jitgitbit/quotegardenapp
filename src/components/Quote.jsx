import React, { Component } from 'react'

export default class Quote extends Component {
  render() {
    return (
      <div className="article card">
        <div className="row">
          <div className="col half">
            <h3>{ this.props.actQuote }</h3>
            <p>By: { this.props.author }</p>
          </div>
        </div>
      </div>
    )
  }
}
