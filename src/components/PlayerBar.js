import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <ion-icon name="skip-backward"></ion-icon>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick}>
            <span id="pp-icon">
              {this.props.isPlaying ?
                <ion-icon name="pause"></ion-icon>
                :
                <ion-icon name="play"></ion-icon>
              }
            </span>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <ion-icon name="skip-forward"></ion-icon>
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">
            {this.props.formatTime(this.props.currentTime)}
          </div>
          <input
            type="range"
            className="seek-bar"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
          <div className="total-time">
            {this.props.formatTime(this.props.duration)}
          </div>
        </section>
        <section id="volume-control">
          <ion-icon name="volume-low"></ion-icon>
          <input
            type="range"
            className="volume-bar"
            value= {this.props.volume}
            max= "100"
            min= "0"
            step= "1"
            onChange={this.props.handleVolumeChange}
             />
          <ion-icon name="volume-high"></ion-icon>
          <div className="volume">
            {this.props.volume}
          </div>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
