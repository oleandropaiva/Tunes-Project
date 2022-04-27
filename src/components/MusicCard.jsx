import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      clicado: false,
      loading: false,
    };
  }

     favoritaCheckbox= async () => {
       this.setState({
         clicado: true,
         loading: true,
       });
       const { music } = this.props;
       await addSong(music);
       const songFavorited = await getFavoriteSongs();

       this.setState({
         loading: false,
         favoriteSong: songFavorited,
       });
     }

     render() {
       const { music } = this.props;
       const { clicado, loading, favoriteSong } = this.state;
       return (
         <div>
           <p>{ music.trackName }</p>
           <audio
             data-testid="audio-component"
             src={ music.previewUrl }
             controls
           >
             <track kind="captions" />
             O seu navegador não suporta o elemento
             <code>áudio</code>
           </audio>

           <label htmlFor="favorita">
             Favorita
             <input
               type="checkbox"
               id="favorita"
               name="favorita"
               data-testid={ `checkbox-music-${music.trackId}` }
               checked={ clicado }
               onChange={ this.favoritaCheckbox }
             />
           </label>
           {loading ? <Loading /> : favoriteSong }
         </div>
       );
     }
}

MusicCard.propTypes = {
  song: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
export default MusicCard;
