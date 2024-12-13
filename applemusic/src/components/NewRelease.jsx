// Importazione delle dipendenze necessarie
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  fetchSongs, 
  setCurrentSong, 
  togglePlay, 
  setSongsList 
} from '../Redux/reducers/playerReducer'

// Componente che mostra le nuove uscite musicali
const NewRelease = () => {
  // Hook per il dispatch delle azioni Redux
  const dispatch = useDispatch()
  // Hook per la navigazione
  const navigate = useNavigate()
  // Estrazione dello stato dal Redux store
  const { songsList, isLoading, currentSong, isPlaying } = useSelector((state) => state.player)

  // Effetto per caricare le nuove uscite all'avvio del componente
  useEffect(() => {
    dispatch(fetchSongs('new'))
  }, [dispatch])

  // Gestione del click su una canzone
  const handleSongClick = (song) => {
    if (currentSong?.id === song.id) {
      // Se è la stessa canzone, toggle play/pause
      dispatch(togglePlay())
    } else {
      // Se è una nuova canzone, imposta e avvia la riproduzione
      dispatch(setCurrentSong(song))
      dispatch(setSongsList(songsList))
      dispatch(togglePlay(true))
      // Naviga alla pagina della canzone
      navigate(`/song/${song.id}`, {
        state: {
          playlistTitle: 'Nuove uscite',
          songs: songsList
        }
      })
    }
  }

  // Mostra il loader durante il caricamento
  if (isLoading) return <div className="loading">Caricamento...</div>

  // Mostra messaggio se non ci sono canzoni
  if (!songsList || songsList.length === 0) {
    return <div className="loading">Nessun brano disponibile</div>
  }

  return (
    // Sezione principale delle nuove uscite
    <section className="new-releases">
      {/* Intestazione della sezione */}
      <div className="section-header">
        <h2>Nuove uscite</h2>
        <span className="see-all">{'>'}</span>
      </div>
      {/* Griglia delle canzoni */}
      <div className="releases-grid-wrapper">
        <div className="releases-grid">
          {/* Mostra le prime 10 canzoni della lista */}
          {songsList.slice(0, 10).map((song) => (
            <div 
              key={song.id} 
              className={`release-card ${currentSong?.id === song.id ? 'active' : ''}`}
              onClick={() => handleSongClick(song)}
              style={{ cursor: 'pointer' }}
            >
              {/* Copertina dell'album con overlay play/pause */}
              <div className="release-image">
                <img src={song.album.cover_medium} alt={song.title} />
                <div className="play-overlay">
                  {currentSong?.id === song.id && isPlaying ? (
                    <i className="bi bi-pause-fill"></i>
                  ) : (
                    <i className="bi bi-play-fill"></i>
                  )}
                </div>
              </div>
              {/* Titolo della canzone e nome dell'artista */}
              <p className="song-title">{song.title}</p>
              <p className="artist-name">{song.artist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Esportazione del componente
export default NewRelease
