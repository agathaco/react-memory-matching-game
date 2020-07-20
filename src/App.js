
//TO DO
//1. Build grid with cards (use flex box and css)
//2. Have an array of colors (for now)
//3. Build card array with color, index (two of each)
//4. Make them hidden/visible status (add flip animaion later)

//5. store clicked card in clickedcardsArray. limit to two els
//6. when clickedcards has two el, compare them. if cards have same index/color, leave them visible, make them non clickable. else hide them again. have a matched variable
//7. if cards are match, check for win. user win when all cards have been matched



import React, { Component } from "react";
import Card from './components/Card';

import './styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      flippedCards: [],
      matchedCards: [],
      moveCount: 0,
      isClickDisabled: false,
      colors: ["#8b6af5","#74c2f9","#42dfbc","#f9dd5b","#feac5e","#ff5d9e","#f29ff5","#c154d8"]
    }
  }

  componentDidMount() {
    this.createBoard();
  }

  createBoard = () => {
    const cards = [];
    const cardColors = this.state.colors.concat(this.state.colors).sort(() => Math.random() - 0.5)
    for (let i=1; i <= cardColors.length; i++) {
      const card = {
        id: i,
        isVisible: false,
        isMatched: false,
        color: cardColors[i-1]
      }
      cards.push(card)
    }
    this.setState({ cards })
  }

  clearBoard = () => {
    this.setState({ cards: [], flippedCards: [], matchedCards: [], isClickDisabled: false })
    this.createBoard();
  }

  replay = () => {

  }

  handleCardClick = (clickedCard) => {
    // update flipped status
    const flippedCards = [...this.state.flippedCards]
    if (this.state.flippedCards.length < 2  && !this.state.isClickDisabled && !clickedCard.isVisible) {
      const cards = [...this.state.cards]
      cards.forEach(card => {
        if (card.id === clickedCard.id) {
          card.isVisible = !card.isVisible
          flippedCards.push(card)
        }
      })
      this.setState({cards, flippedCards}, () => {
        // max 2 cards flipped at once
        if (flippedCards.length === 2) {
          this.setState((state) => ({moveCount: state.moveCount + 1 }))
          this.setState({ isClickDisabled: true }, () => this.checkForMatch(flippedCards))
        }
      })

    } else {
      // disabling card flips while checking
      console.log('nothing')
      console.log('is click disabled', this.state.isClickDisabled)
    }


    // push card to flippedCards array
  }

  checkForMatch = (flippedCards) => {
    console.log('checking for match')
    console.log(this.state)
    if (flippedCards[0].color === flippedCards[1].color) {
      let matchedCards = [];
      flippedCards.forEach(card => card.isMatched = true)
      matchedCards = flippedCards.concat(this.state.matchedCards)
      console.log('matched cards', matchedCards)

      // set isMatched to true for matched cards
      this.setState({})
      this.setState({ flippedCards: [], matchedCards, isClickDisabled: false }, () => {
        this.checkForWin()
      })
    } else {
      console.log('no match', flippedCards[0].color, flippedCards[1].color)
      setTimeout(() => {
        this.setState({ flippedCards: [] , isClickDisabled: false}, () => this.hideAllCards())
      }, 2000)

    }
    // this.setState({ flippedCards: [] })

  }

  hideAllCards = () => {
    console.log('hiding all cards')
    const cards = [...this.state.cards]
    cards.map(card => !card.isMatched ? card.isVisible = false : card.isVisible = true)
    this.setState({cards})
  }

  checkForWin = () => {
    console.log('checking for Win')
    console.log(this.state.matchedCards.length, this.state.cards.length)

    if (this.state.matchedCards.length === this.state.cards.length) {
      //all cards have been matched, game is won
      console.log('won')
    }

  }

  render() {
    return (
      <div className="container">
      <div>Moves: {this.state.moveCount}</div>
        {this.state.cards.map((card, index) => {
          return (
            <Card card={card} key={index} onCardClick={this.handleCardClick}/>
          );
        })}


      </div>
    );
  }
}

export default App;
