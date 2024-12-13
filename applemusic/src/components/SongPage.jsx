// Importazione delle dipendenze necessarie
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, togglePlay, setSongsList } from '../Redux/reducers/playerReducer';

// Componente che mostra la pagina di dettaglio di una canzone/playlist
const SongPage = () => {
  // Hook per accedere ai parametri di navigazione
  const location = useLocation();
  // Hook per il dispatch delle azioni Redux
  const dispatch = useDispatch();
  // Estrazione dello stato dal Redux store
  const { currentSong, isPlaying } = useSelector(state => state.player);
  // Estrazione dei dati della playlist dalla location
  const { playlistTitle, songs } = location.state || {};

  // Gestione del click su una canzone
  const handleSongClick = (song) => {
    if (currentSong?.id === song.id) {
      // Se è la stessa canzone, toggle play/pause
      dispatch(togglePlay());
    } else {
      // Se è una nuova canzone, imposta e avvia la riproduzione
      dispatch(setCurrentSong(song));
      dispatch(setSongsList(songs));
      dispatch(togglePlay(true));
    }
  };

  // Se non ci sono canzoni, mostra un messaggio
  if (!songs) {
    return <div className="loading">Nessuna playlist selezionata</div>;
  }

  return (
    // Container principale della pagina
    <div className="song-page">
      {/* Header della playlist con titolo e copertina */}
      <div className="playlist-header">
        <h1>{playlistTitle}</h1>
        <div className="playlist-info">
          <img 
            src={songs[0]?.album?.cover_medium} 
            alt={playlistTitle} 
            className="playlist-cover"
          />
          <div className="playlist-details">
            <p>{songs.length} brani</p>
          </div>
        </div>
      </div>

      {/* Lista delle canzoni */}
      <div className="songs-list">
        {songs.map((song, index) => (
          <div 
            key={song.id} 
            className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
            onClick={() => handleSongClick(song)}
          >
            {/* Numero o icona play/pause */}
            <div className="song-number">
              {currentSong?.id === song.id && isPlaying ? (
                <i className="bi bi-pause-fill"></i>
              ) : (
                index + 1
              )}
            </div>
            {/* Copertina della canzone */}
            <div className="song-cover">
              <img src={song.album.cover_small} alt={song.title} />
            </div>
            {/* Informazioni della canzone (titolo e artista) */}
            <div className="song-info">
              <div className="song-title">{song.title}</div>
              <div className="song-artist">{song.artist.name}</div>
            </div>
            {/* Durata della canzone */}
            <div className="song-duration">
              {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Esportazione del componente
export default SongPage;
