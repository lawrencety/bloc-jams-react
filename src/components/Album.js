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
      isPlaying: false,
      hover: false,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
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
                      if ((this.state.hover === song)
                      || (!this.state.isPlaying && (this.state.currentSong === song))) {
                        return (
                          <span>
                            <ion-icon name="play"></ion-icon>
                          </span>
                        )
                      }
                      else if (this.state.isPlaying && (this.state.currentSong === song)) {
                        return(
                          <span>
                            <ion-icon name="pause"></ion-icon>
                          </span>
                        )
                      }
                      else {
                        return (index + 1)
                      }
                    }) ()}
                  </td>
                  <td>{song.title}</td>
                  <td>{song.duration}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          isPlaying = {this.state.isPlaying}
          currentSong = {this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
        />
      </section>
    )
  }
}

export default Album;
