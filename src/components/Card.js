import React, { Component } from 'react'

class Card extends Component {
  state= {
  }

  render() {
    const cardColor = this.props.card.isVisible ? this.props.card.color : '#fff'
    const cardStyle = {
      backgroundColor: cardColor
    }
    return (
      <div className="card" style={cardStyle} onClick={()=> this.props.onCardClick(this.props.card)}>
      </div>
    );
  }
}

export default Card


