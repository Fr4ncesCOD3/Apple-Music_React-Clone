// Importazione delle dipendenze necessarie
import React, { useState, useEffect, useCallback } from 'react';
import { ReactComponent as AppleLogo } from '../assets/logos/apple.svg';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setSongsList } from '../Redux/reducers/playerReducer';
import axios from 'axios';
import LoginModal from './LoginModal';

// Componente principale della barra di navigazione
const NavBar = () => {
  // Stati per gestire il menu mobile, la ricerca e il modale di login
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Hook per la navigazione e la gestione dello stato
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Verifica se siamo nella homepage e ottiene l'utente corrente
  const isHomePage = location.pathname === '/';
  const user = useSelector(state => state.user.currentUser);

  // Funzione per effettuare la ricerca delle canzoni
  const fetchSearchResults = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchQuery}`
      );
      setSearchResults(response.data.data.slice(0, 5));
      setShowResults(true);
    } catch (error) {
      console.error('Errore nella ricerca:', error);
    }
  }, [searchQuery]);

  // Effetto per gestire il debounce della ricerca
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        fetchSearchResults();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, fetchSearchResults]);

  // Gestione del click su un risultato di ricerca
  const handleSearchClick = (song) => {
    dispatch(setCurrentSong(song));
    dispatch(setSongsList([song]));
    navigate(`/song/${song.id}`, {
      state: {
        playlistTitle: 'Risultati ricerca',
        songs: [song]
      }
    });
    setSearchQuery('');
    setShowResults(false);
    if (isMenuOpen) toggleMenu();
  };

  // Toggle del menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  // Effetto per chiudere i risultati quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar principale */}
      <Navbar bg="black" variant="dark" fixed="top" className="py-2 border-bottom border-secondary">
        <Container fluid className="px-3">
          <div className="d-flex align-items-center w-100">
            {/* Pulsante back/menu per mobile */}
            <div className="d-lg-none">
              {isHomePage ? (
                <button 
                  className="btn btn-link text-white p-0 me-3"
                  onClick={toggleMenu}
                >
                  <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'} fs-4`}></i>
                </button>
              ) : (
                <Link 
                  to="/" 
                  className="btn btn-link text-white p-0 me-3 back-button"
                >
                  <i className="bi bi-chevron-left fs-4"></i>
                </Link>
              )}
            </div>

            {/* Logo Apple Music */}
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-4">
              <AppleLogo className="me-1" fill="white" width="20" height="20" />
              <span className="fs-6">Music</span>
            </Navbar.Brand>

            {/* Menu di navigazione desktop */}
            <Nav className="d-none d-lg-flex">
              <Nav.Link as={Link} to="/" className="text-white px-3">Home</Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/explore/radio" 
                state={{ title: 'Radio' }}
                className="text-white px-3"
              >
                Radio
              </Nav.Link>
            </Nav>

            {/* Barra di ricerca e profilo utente desktop */}
            <div className="ms-auto d-flex align-items-center">
              <div className="d-none d-lg-block me-3 search-container position-relative">
                <div className="search-box bg-secondary bg-opacity-25 rounded-pill px-3 py-1 d-flex align-items-center">
                  <i className="bi bi-search text-white-50"></i>
                  <input 
                    type="text" 
                    placeholder="Cerca" 
                    className="bg-transparent border-0 text-white ms-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowResults(true)}
                  />
                </div>
                
                {/* Risultati della ricerca desktop */}
                {showResults && searchResults.length > 0 && (
                  <div className="search-results">
                    {searchResults.map((song) => (
                      <div 
                        key={song.id}
                        className="search-result-item"
                        onClick={() => handleSearchClick(song)}
                      >
                        <img src={song.album.cover_small} alt={song.title} />
                        <div className="search-result-info">
                          <div className="search-result-title">{song.title}</div>
                          <div className="search-result-artist">{song.artist.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Pulsante profilo/login */}
              {user ? (
                <button 
                  onClick={() => navigate('/user')} 
                  className="profile-button p-0 border-0 bg-transparent"
                >
                  <div className="profile-avatar-small">
                    <i className="bi bi-person-circle text-white fs-4"></i>
                  </div>
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/login')} 
                  className="btn text-danger fw-bold border-0"
                >
                  Accedi
                </button>
              )}
            </div>
          </div>
        </Container>
      </Navbar>

      {/* Menu mobile con ricerca */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'show' : ''}`}>
        <div className="mobile-menu-content">
          {/* Barra di ricerca mobile */}
          <div className="mobile-search-box mb-4 search-container position-relative">
            <div className="bg-secondary bg-opacity-25 rounded-pill px-3 py-2 d-flex align-items-center">
              <i className="bi bi-search text-white-50"></i>
              <input 
                type="text" 
                placeholder="Cerca" 
                className="bg-transparent border-0 text-white ms-2 w-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Risultati della ricerca mobile */}
            {showResults && searchResults.length > 0 && (
              <div className="search-results mobile">
                {searchResults.map((song) => (
                  <div 
                    key={song.id}
                    className="search-result-item"
                    onClick={() => handleSearchClick(song)}
                  >
                    <img src={song.album.cover_small} alt={song.title} />
                    <div className="search-result-info">
                      <div className="search-result-title">{song.title}</div>
                      <div className="search-result-artist">{song.artist.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Link di navigazione mobile */}
          <nav className="mobile-nav">
            <Link to="/" className="mobile-nav-item" onClick={toggleMenu}>
              <i className="bi bi-house-door"></i>
              <span>Home</span>
            </Link>
            <Link 
              to="/explore/radio" 
              state={{ title: 'Radio' }}
              className="mobile-nav-item" 
              onClick={toggleMenu}
            >
              <i className="bi bi-broadcast"></i>
              <span>Radio</span>
            </Link>
          </nav>

          {/* Sezione account mobile */}
          <div className="mobile-account">
            {user ? (
              <button 
                className="mobile-nav-item border-0 bg-transparent w-100 text-start"
                onClick={() => {
                  navigate('/user');
                  toggleMenu();
                }}
              >
                <i className="bi bi-person-circle"></i>
                <span>{user.name}</span>
              </button>
            ) : (
              <button 
                className="mobile-nav-item border-0 bg-transparent w-100 text-start"
                onClick={() => {
                  navigate('/login');
                  toggleMenu();
                }}
              >
                <i className="bi bi-person-circle"></i>
                <span>Accedi</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modale di login */}
      <LoginModal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default NavBar;
