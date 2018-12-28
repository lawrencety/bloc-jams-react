import React, {Component} from 'react';
import albumdata from './../data/album';
import PlayerBar from './PlayerBar'

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumdata.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 80,
      isPlaying: false,
      hover: false,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.EventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.EventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.EventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.EventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.EventListeners.durationchange);
  }

  play() {
    this.audioElement.play();
    this.setState({isPlaying: true});
  }

  pause() {
    this.audioElement.pause();
    this.setState({isPlaying: false});
  }

  setHover(song) {
    this.setState({hover: song});
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong: song});
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (isSameSong && this.state.isPlaying) {
      this.pause();
      this.setHover(song);
    }
    else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
      this.setHover(song);
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex-1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.min(this.state.album.songs.length-1, currentIndex+1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({currentTime: newTime});
  }

  formatTime(seconds) {
    if ((seconds < 0) || isNaN(seconds) || (typeof seconds != "number")) {
      return "-:--"
    } else {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      if (secs < 10) {
        return (mins + ":0" + secs);
      } else {
        return mins + ":" + secs;
      }

    };
  }

  handleVolumeChange(e) {
    const newVol = e.target.value;
    this.audioElement.volume = newVol/100;
    this.setState({volume: newVol});
  }

  mouseOver(song) {
      this.setState({hover: song});
  }

  mouseOut(song) {
      this.setState({hover: false});
  }


  render() {
    return (
      <section className = "album">
        <section id = "album-info">
          <img id="album-cover-art" src={ this.state.album.albumCover } alt={ this.state.album.title }/>
          <div className = "album-details">
            <h1 id="album-title">{ this.state.album.title }</h1>
            <h2 className="artist">{ this.state.album.artist }</h2>
            <div id="release-info">{ this.state.album.releaseInfo }</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.mouseOver(song)} onMouseLeave={() => this.mouseOut(song)}>
                  <td className="songNumber" >
                    {(() => {
                      if (this.state.isPlaying && (this.state.currentSong === song)) {
                        return(
                          <span>
                            <ion-icon name="pause"></ion-icon>
                          </span>
                        )
                      } else if (this.state.hover === song) {
                        return (
                          <span>
                            <ion-icon name="play"></ion-icon>
                          </span>
                        )
                      } else {
                        return (index + 1)
                      }
                    }) ()}
                  </td>
                  <td>{song.title}</td>
                  <td>{this.formatTime(Number(song.duration))}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          isPlaying = {this.state.isPlaying}
          currentSong = {this.state.currentSong}
          currentTime = {this.state.currentTime}
          duration = {this.state.duration}
          volume = {this.state.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(e) => this.formatTime(e)}
        />
      </section>
    )
  }
}

export default Album;
