import React, { Component } from "react";
import "./App.css";
import Tile from "./Tile";
import logos from "./logos";

class App extends Component {
  state = {
    logos,
    moves: 0,
    shuffledLogos: [],
    revealedLogos: [],
    matchedLogos: []
  };

  componentDidMount() {
    this.shuffleLogos();
  }

  shuffleLogos() {
    const array = this.state.logos;
    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.setState({ shuffledLogos: array });
  }

  onReveal = (logo, index) => {
    let { revealedLogos, matchedLogos, shuffledLogos } = this.state;
    if (shuffledLogos[revealedLogos[0]] === logo) {
      matchedLogos.push(logo);
      revealedLogos = [];
    }
    if (revealedLogos.length === 2) revealedLogos = [];
    revealedLogos.push(index);
    this.setState({ moves: this.state.moves + 1, revealedLogos, matchedLogos });
  };

  renderTiles = () => {
    if (this.state.shuffledLogos.length) {
      const logos = this.state.shuffledLogos;
      let tiles = [];
      logos.map((logo, i) => {
        let reveal = false;
        if (this.state.matchedLogos.includes(logo)) reveal = true;
        if (this.state.revealedLogos.includes(i)) reveal = true;
        tiles.push(
          <div key={i} className="col s2">
            <Tile
              logo={logo}
              onClick={this.onReveal}
              reveal={reveal}
              index={i}
            />
          </div>
        );
        return null;
      });
      return tiles;
    }
  };

  render() {
    return (
      <div className="App container">
        <div class="row">
          <span>Moves: {this.state.moves} </span>
        </div>
        <div class="row">{this.renderTiles()}</div>
      </div>
    );
  }
}

export default App;
