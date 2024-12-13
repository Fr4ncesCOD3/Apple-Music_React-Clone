// Importazione delle dipendenze necessarie
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { 
  setCurrentSong, 
  togglePlay, 
  setSongsList 
} from '../Redux/reducers/playerReducer';

// Configurazione delle categorie musicali con titoli e query di ricerca
const categoryConfigs = {
  // Categoria Generi musicali
  genre: [
    { title: 'Top Pop', query: 'pop hits' },
    { title: 'Hip-Hop Hits', query: 'hip hop hits' },
    { title: 'Rock Classics', query: 'rock classics' },
    { title: 'Electronic Vibes', query: 'electronic dance' }
  ],
  // Categoria Stati d'animo e attività
  moods: [
    { title: 'Workout', query: 'workout music gym' },
    { title: 'Relax', query: 'chill relax ambient' },
    { title: 'Party', query: 'party hits dance' },
    { title: 'Focus', query: 'focus study concentration' }
  ],
  // Categoria Decenni musicali
  decades: [
    { title: 'Anni \'80', query: '80s hits' },
    { title: 'Anni \'90', query: '90s hits' },
    { title: 'Anni 2000', query: '2000s hits' },
    { title: 'Anni 2010', query: '2010s hits' }
  ],
  // Categoria Classifiche
  charts: [
    { title: 'Top Italia', query: 'italian hits' },
    { title: 'Top Global', query: 'global hits' },
    { title: 'Trending Now', query: 'trending music' },
    { title: 'New Releases', query: 'new releases' }
  ],
  // Categoria Musica internazionale
  worldwide: [
    { title: 'Latino', query: 'latin hits reggaeton' },
    { title: 'K-Pop', query: 'kpop hits' },
    { title: 'Afrobeats', query: 'afrobeats hits' },
    { title: 'Bollywood', query: 'bollywood hits' }
  ],
  // Categoria Radio
  radio: [
    { 
      title: 'Radio Italia', 
      query: 'italian radio hits' 
    },
    { 
      title: 'Radio Rock', 
      query: 'rock radio hits' 
    },
    { 
      title: 'Radio Pop', 
      query: 'pop radio hits' 
    },
    { 
      title: 'Radio Hip-Hop', 
      query: 'hip hop radio' 
    },
    { 
      title: 'Radio Dance', 
      query: 'dance radio hits' 
    },
    { 
      title: 'Radio Jazz', 
      query: 'jazz radio' 
    }
  ]
};

// Componente principale della pagina di esplorazione
const ExplorePage = () => {
  // Hooks per la gestione del routing e dello stato
  const { category } = useParams(); // Ottiene la categoria dalla URL
  const location = useLocation(); // Accesso allo stato della location corrente
  const navigate = useNavigate(); // Per la navigazione programmatica
  const dispatch = useDispatch(); // Per dispatching delle azioni Redux
  
  // Stati locali
  const [sections, setSections] = useState([]); // Sezioni di contenuto
  const [isLoading, setIsLoading] = useState(true); // Stato di caricamento

  // Funzione per recuperare i dati della categoria selezionata
  const fetchCategoryData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Ottiene la configurazione per la categoria corrente
      const config = categoryConfigs[category] || [];
      // Crea array di promesse per le chiamate API
      const fetchPromises = config.map(section => 
        axios.get(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${section.query}`)
      );

      // Attende tutte le risposte
      const responses = await Promise.all(fetchPromises);
      
      // Formatta i dati ricevuti
      const sectionsData = responses.map((response, index) => ({
        id: index + 1,
        title: categoryConfigs[category][index].title,
        items: response.data.data.slice(0, 10) // Limita a 10 risultati
      }));

      setSections(sectionsData);
    } catch (error) {
      console.error('Errore nel caricamento dei dati:', error);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  // Effetto per caricare i dati quando cambia la categoria
  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  // Gestore del click su una canzone
  const handleSongClick = (song, sectionSongs, sectionTitle) => {
    dispatch(setCurrentSong(song)); // Imposta la canzone corrente
    dispatch(togglePlay(true)); // Avvia la riproduzione
    dispatch(setSongsList(sectionSongs)); // Imposta la playlist
    // Naviga alla pagina della canzone
    navigate(`/song/${song.id}`, { 
      state: { 
        playlistTitle: sectionTitle,
        songs: sectionSongs
      }
    });
  };

  // Mostra il loader durante il caricamento
  if (isLoading) {
    return <div className="loading">Caricamento...</div>;
  }

  // Rendering del componente
  return (
    <div className="explore-page">
      <h1 className="page-title">{location.state?.title || 'Esplora'}</h1>
      
      {/* Mappa le sezioni della categoria */}
      {sections.map((section) => (
        <section key={section.id} className="new-releases">
          <div className="section-header">
            <h2>{section.title}</h2>
            <span className="see-all">{'>'}</span>
          </div>
          <div className="releases-grid-wrapper">
            <div className="releases-grid">
              {/* Mappa le canzoni di ogni sezione */}
              {section.items.map((song) => (
                <div 
                  key={song.id} 
                  className="release-card"
                  onClick={() => handleSongClick(song, section.items, section.title)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="release-image">
                    <img src={song.album.cover_medium} alt={song.title} />
                    <div className="play-overlay">
                      <i className="bi bi-play-fill"></i>
                    </div>
                  </div>
                  <p className="song-title">{song.title}</p>
                  <p className="artist-name">{song.artist.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ExplorePage;
