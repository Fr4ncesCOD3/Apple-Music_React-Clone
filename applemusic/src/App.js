// Importazione delle librerie e componenti necessari
import React from 'react';
// Router per la gestione della navigazione
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importazione degli stili
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Importazione dei componenti personalizzati
import NavBar from './components/NavBar';
import FooterComp from './components/FooterComp';
import NewsSect from './components/NewsSect';
import RadioEpisode from './components/RadioEpisode';
import NewRelease from './components/NewRelease';
import Categories from './components/Categories';
import ExplorePage from './components/ExplorePage';
import PlayBar from './components/PlayBar';
import SongPage from './components/SongPage';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';
import ProtectedRoute from './components/ProtectedRoute';

// Componente HomePage che raggruppa le sezioni principali della pagina iniziale
const HomePage = () => {
  return (
    <>
      <NewsSect />      {/* Sezione notizie */}
      <RadioEpisode />  {/* Sezione episodi radio */}
      <NewRelease />    {/* Sezione nuove uscite */}
      <Categories />    {/* Sezione categorie */}
    </>
  );
};

// Componente principale dell'applicazione
function App() {
  return (
    <Router>
      {/* Container principale con layout flex e altezza minima viewport */}
      <div className="App d-flex flex-column min-vh-100">
        <NavBar />  {/* Barra di navigazione */}
        <main className="flex-grow-1">
          {/* Definizione delle rotte dell'applicazione */}
          <Routes>
            {/* Rotta homepage */}
            <Route path="/" element={<HomePage />} />
            {/* Rotta per l'esplorazione delle categorie */}
            <Route path="/explore/:category" element={<ExplorePage />} />
            {/* Rotta per la pagina dettaglio canzone */}
            <Route path="/song/:songId" element={<SongPage />} />
            {/* Rotta per la pagina di login */}
            <Route path="/login" element={<LoginPage />} />
            {/* Rotta protetta per la pagina utente */}
            <Route 
              path="/user" 
              element={
                <ProtectedRoute>
                  <UserPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <FooterComp /> {/* Footer dell'applicazione */}
        <PlayBar />    {/* Barra di riproduzione */}
      </div>
    </Router>
  );
}

// Esportazione del componente App
export default App;
