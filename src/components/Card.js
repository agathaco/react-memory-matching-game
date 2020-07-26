import React from 'react'
import Donut from './images/Donut'
import Icecream from './images/Icecream'
import Mushrooms from './images/Mushrooms'
import Hearts from './images/Hearts'
import Balloons from './images/Balloons'
import Rainbow from './images/Rainbow'
import Star from './images/Star'
import Unicorn from './images/Unicorn'

const Card = (props) => {
  let image;
  const cardImage = props.card.image
  if (cardImage === 'Hearts') {
    image = (
      <Hearts/>
    )
  } else  if (cardImage === 'Donut') {
    image = (
      <Donut/>
    )
  } else  if (cardImage === 'Icecream') {
    image = (
      <Icecream/>
    )
  } else  if (cardImage === 'Mushrooms') {
    image = (
      <Mushrooms/>
    )
  } else  if (cardImage === 'Balloons') {
    image = (
      <Balloons/>
    )
  } else  if (cardImage === 'Rainbow') {
    image = (
      <Rainbow/>
    )
  } else  if (cardImage === 'Star') {
    image = (
      <Star/>
    )
  } else  if (cardImage === 'Unicorn') {
    image = (
      <Unicorn/>
    )
  }

  const dotNumber = 80
  let dots = [...Array(dotNumber)].map((e, i) => {
    return (
      <div className="dot" key={i}></div>
    )
  })

  return (
    <div className="card-wrapper"  onClick={() => props.onCardClick(props.card)}>
      <div className={`card-container ${props.card.isVisible ? "" : "is-flipped"}`}>
        <div className={`card card-front ${props.card.isMatched ? "is-matched" : ""}`}>
          {image}
        </div>
        <div className="card card-back"><div className="dots">{dots}</div></div>
      </div>
    </div>
  );
}

export default Card


