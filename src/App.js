import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import cards from "./cards.json";
import "./App.css";

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    cards,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, () => {
        console.log(this.state.highscore);
      });
    }
    this.state.cards.forEach(card => {
      card.count = 0;
    });
    alert(`Game Over! \nYour Score: ${this.state.score}`);
    this.setState({score: 0});
    return true;
  }

  clickCard = cardID => {
    this.state.cards.find((element, i) => {
      //find corresponding element in card object and change count on click
      if (element.id === cardID) {
        console.log(element);
        //game goes on only if card[i].count is 0, else game over
        if(cards[i].count === 0){
          cards[i].count = cards[i].count + 1;
          this.setState({score : this.state.score + 1}, function(){
            console.log(this.state.score);
            if(this.state.score === 12) {
              alert('You Win!');
              this.setState({highscore: this.state.score}, () => {
                console.log(this.state.highscore);
              });
              this.state.cards.forEach(card => {
                card.count = 0;
              });
              this.setState({score: 0});
            }
          });
            
          
          shuffleCards(this.state.cards);
          return true;
        } else {
          this.gameOver();
        }
      }
    });
  }
  // Map over this.state.cards and render a cardCard component for each card object
  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highscore={this.state.highscore}></Header>
        {this.state.cards.map(card => (
          <Card
            clickCard={this.clickCard}
            id={card.id}
            key={card.id}
            image={card.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
