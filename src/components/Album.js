import React, {Component} from 'react';
import albumdata from './../data/album';

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

  playButton(song) {
    this.setState({hover: song});
  }

  pauseButton(song) {
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
      this.playButton(song);
    }
    else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
      this.pauseButton(song);
    }
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
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)}>
                  <td className="songNumber" onMouseEnter={() => this.mouseOver(song)} onMouseLeave={() => this.mouseOut(song)}>
                    {(() => {
                      if (this.state.hover == song && !this.state.isPlaying) (
                        <span>
                          <ion-icon name="play"></ion-icon>
                        </span>
                      );
                      else if (this.state.isPlaying) (
                        <span>
                          <ion-icon name="pause"></ion-icon>
                        </span>
                      );
                      else (
                        index + 1
                      );
                    }) ()}
                  </td>
                  <td>{song.title}</td>
                  <td>{song.duration}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    )
  }
}

export default Album;
