// Importazione delle dipendenze necessarie
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, playNext, playPrevious } from '../Redux/reducers/playerReducer';
import { setPlayedFirstSong } from '../Redux/reducers/userReducer';

// Componente PlayBar per la riproduzione musicale
const PlayBar = () => {
  const dispatch = useDispatch();
  // Estrazione dello stato dal Redux store
  const { isPlaying, currentSong } = useSelector((state) => state.player);
  const { isAuthenticated, playedFirstSong } = useSelector((state) => state.user);
  // Riferimento all'elemento audio HTML5
  const audioRef = useRef(new Audio());

  // Effetto per gestire la riproduzione audio
  useEffect(() => {
    const audio = audioRef.current;

    // Se esiste un'anteprima della canzone, imposta la sorgente audio
    if (currentSong?.preview) {
      audio.src = currentSong.preview;
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    // Gestione automatica del passaggio alla prossima canzone
    audio.onended = () => {
      dispatch(playNext());
    };

    // Cleanup dell'effetto
    return () => {
      audio.pause();
      audio.onended = null;
    };
  }, [currentSong, isPlaying, dispatch]);

  // Gestione del pulsante play/pause
  const handlePlay = () => {
    if (!isAuthenticated && playedFirstSong) {
      // Se l'utente non è autenticato e ha già riprodotto una canzone, mostra il modale
      return;
    }
    if (!playedFirstSong) {
      dispatch(setPlayedFirstSong());
    }
    dispatch(togglePlay());
  };

  // Gestione del pulsante precedente
  const handlePrevious = () => {
    dispatch(playPrevious());
  };

  // Gestione del pulsante successivo
  const handleNext = () => {
    dispatch(playNext());
  };

  return (
    // Container principale della barra di riproduzione
    <div className="playbar fixed-bottom bg-dark-subtle bg-opacity-75 backdrop-blur border-top">
      <div className="d-flex justify-content-between align-items-center p-3">
        {/* Sezione informazioni brano corrente */}
        <div className="d-flex align-items-center gap-2 flex-grow-1">
          {currentSong ? (
            <>
              {/* Copertina album */}
              <div className="playbar-artwork">
                <img 
                  src={currentSong?.album?.cover_small || '/placeholder.png'} 
                  alt="cover" 
                  className="rounded"
                  width="40"
                  height="40"
                />
              </div>
              {/* Informazioni brano e artista */}
              <div className="playbar-info">
                <div className="song-title text-white text-truncate">
                  {currentSong?.title || 'Seleziona un brano'}
                </div>
                <div className="artist-name text-white-50 small text-truncate">
                  {currentSong?.artist?.name || 'Apple Music'}
                </div>
              </div>
            </>
          ) : (
            // Messaggio quando nessun brano è selezionato
            <div className="text-white">
              <i className="bi bi-music-note-beamed me-2"></i>
              Riproduci
            </div>
          )}
        </div>

        {/* Controlli di riproduzione */}
        <div className="playbar-controls d-flex align-items-center gap-3">
          {/* Pulsante brano precedente */}
          <button 
            className="btn btn-link text-white p-0"
            onClick={handlePrevious}
            disabled={!currentSong}
          >
            <i className="bi bi-skip-backward-fill fs-4"></i>
          </button>
          {/* Pulsante play/pause */}
          <button 
            className="btn btn-link text-white p-0"
            onClick={handlePlay}
            disabled={!currentSong}
          >
            <i className={`bi ${isPlaying ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'} fs-3`}></i>
          </button>
          {/* Pulsante brano successivo */}
          <button 
            className="btn btn-link text-white p-0"
            onClick={handleNext}
            disabled={!currentSong}
          >
            <i className="bi bi-skip-forward-fill fs-4"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayBar;
