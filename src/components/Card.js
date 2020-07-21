import React, { Component } from 'react'

class Card extends Component {
  state= {
  }

  render() {
    return (
      <div className="card-wrapper"  onClick={()=> this.props.onCardClick(this.props.card)}>
        <div className={`card-container ${this.props.card.isVisible ? "" : "is-flipped"}`}>
          <div className={`card card-front ${this.props.card.isMatched ? "is-matched" : ""}`} style={{backgroundColor: this.props.card.color}}></div>
          <div className="card card-back"></div>
        </div>
      </div>
    );
  }
}

export default Card


