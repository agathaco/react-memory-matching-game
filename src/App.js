//TO DO
//1. Add levels?
//2. Add animation and message when winning
//4. Add timer ?
//5. Replace colors with illustrations

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
    console.log('new Game')
    this.setState({ cards: [], flippedCards: [], matchedCards: [], isClickDisabled: false, moveCount: 0 })
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
    }
  }

  checkForMatch = (flippedCards) => {
    if (flippedCards[0].color === flippedCards[1].color) {
      let matchedCards = [];
      flippedCards.forEach(card => card.isMatched = true)
      matchedCards = flippedCards.concat(this.state.matchedCards)

      // set isMatched to true for matched cards
      this.setState({ flippedCards: [], matchedCards, isClickDisabled: false }, () => {
        this.checkForWin()
      })
    } else {
      setTimeout(() => {
        this.setState({ flippedCards: [] , isClickDisabled: false}, () => this.hideAllCards())
      }, 2000)
    }
  }

  hideAllCards = () => {
    const cards = [...this.state.cards]
    cards.map(card => !card.isMatched ? card.isVisible = false : card.isVisible = true)
    this.setState({cards})
  }

  checkForWin = () => {
    if (this.state.matchedCards.length === this.state.cards.length) {
      //all cards have been matched, game is won
      console.log('won')
    }

  }

  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <div className="move-count">Moves: {this.state.moveCount}</div>
          <button className="new-game" onClick={this.clearBoard}>New Game</button>
        </div>
        <div className="container">
          {this.state.cards.map((card, index) => {
            return (
              <Card card={card} key={index} onCardClick={this.handleCardClick}/>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;