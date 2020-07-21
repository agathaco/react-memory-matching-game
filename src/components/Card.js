import React, { Component } from 'react'

class Card extends Component {
  state= {
  }

  render() {

    const dotNumber = 40
    let dots = [...Array(dotNumber)].map(index => {
      return (
        <div className="dot" key={index}></div>
      )
    })

    return (
      <div className="card-wrapper"  onClick={()=> this.props.onCardClick(this.props.card)}>
        <div className={`card-container ${this.props.card.isVisible ? "" : "is-flipped"}`}>
          <div className={`card card-front ${this.props.card.isMatched ? "is-matched" : ""}`} style={{backgroundColor: this.props.card.color}}>
          </div>
          <div className="card card-back"><div className="dots">{dots}</div></div>
        </div>
      </div>
    );
  }
}

export default Card


