import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/album';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData }
  }

  render() {
    return (
      <section className = 'library'>
        {
          this.state.albums.map( ( album, index ) =>
            <Link to= {`/album/${album.slug}`} key={index} className="album-link">
              <img src = {album.albumCover} alt = {album.title} className="album-cover"/>
              <section className="album-description">
                <div className="album-text">
                  <div className="album-title">{album.title}</div>
                  <div className="album-artist">{album.artist}</div>
                  <div className="album-songs">{album.songs.length} songs</div>
                </div>
              </section>
            </Link>
          )
        }
      </section>
    );
  }
}

export default Library;
