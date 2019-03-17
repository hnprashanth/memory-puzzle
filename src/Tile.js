import React, { Component } from "react";

class Tile extends Component {
  toggleReveal = () => {
    const { logo, index } = this.props;
    this.props.onClick(logo, index);
  };

  render() {
    return (
      <div>
        <div class="card tile" onClick={this.toggleReveal}>
          <div class="card-content">
            {this.props.reveal && <p>{this.props.logo}</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default Tile;
