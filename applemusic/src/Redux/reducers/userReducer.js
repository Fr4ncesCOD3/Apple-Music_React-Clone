// Importazione della funzione createSlice da Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Definizione dello stato iniziale dell'utente
const initialState = {
  currentUser: null,              // Dati dell'utente corrente
  isAuthenticated: false,         // Stato di autenticazione
  playedFirstSong: false,         // Flag per tracciare se l'utente ha riprodotto la prima canzone
  error: null,                    // Gestione degli errori
  preferences: {                  // Preferenze dell'utente
    theme: 'dark',               // Tema dell'interfaccia
    language: 'it',              // Lingua dell'applicazione
    notifications: true          // Stato delle notifiche
  },
  subscription: {                 // Dettagli dell'abbonamento
    plan: null,                  // Piano di abbonamento
    status: 'free',              // Stato dell'abbonamento
    expiryDate: null            // Data di scadenza
  },
  playlists: [],                 // Array delle playlist dell'utente
  favorites: {                    // Contenuti preferiti dell'utente
    songs: [],                   // Canzoni preferite
    artists: [],                 // Artisti preferiti
    albums: []                   // Album preferiti
  },
  recentlyPlayed: []             // Cronologia delle canzoni riprodotte di recente
};

// Creazione dello slice per la gestione dello stato dell'utente
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Imposta i dati dell'utente e lo stato di autenticazione
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    // Resetta lo stato dell'utente al logout
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    // Imposta il flag della prima canzone riprodotta
    setPlayedFirstSong: (state) => {
      state.playedFirstSong = true;
    },
    // Gestisce gli errori dell'applicazione
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Aggiorna le preferenze dell'utente
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    // Aggiorna i dettagli dell'abbonamento
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
    // Aggiunge una nuova playlist
    addToPlaylists: (state, action) => {
      state.playlists.push(action.payload);
    },
    // Aggiunge un elemento ai preferiti (canzone, artista o album)
    addToFavorites: (state, action) => {
      const { type, item } = action.payload;
      state.favorites[type].push(item);
    },
    // Rimuove un elemento dai preferiti
    removeFromFavorites: (state, action) => {
      const { type, id } = action.payload;
      state.favorites[type] = state.favorites[type].filter(item => item.id !== id);
    },
    // Aggiunge una canzone alla cronologia di riproduzione (max 20 elementi)
    addToRecentlyPlayed: (state, action) => {
      const exists = state.recentlyPlayed.find(song => song.id === action.payload.id);
      if (!exists) {
        state.recentlyPlayed.unshift(action.payload);
        if (state.recentlyPlayed.length > 20) state.recentlyPlayed.pop();
      }
    }
  }
});

// Esportazione delle azioni
export const { 
  setUser, 
  logoutUser, 
  setPlayedFirstSong, 
  setError, 
  updatePreferences, 
  setSubscription, 
  addToPlaylists, 
  addToFavorites, 
  removeFromFavorites, 
  addToRecentlyPlayed 
} = userSlice.actions;

// Esportazione del reducer
export default userSlice.reducer; 