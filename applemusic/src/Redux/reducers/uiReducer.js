// Importazione delle dipendenze necessarie
import { createSlice } from '@reduxjs/toolkit';

// Creazione dello slice per gestire lo stato dell'interfaccia utente
const uiSlice = createSlice({
  name: 'ui',
  // Definizione dello stato iniziale
  initialState: {
    isLoading: false,        // Stato di caricamento dell'applicazione
    currentModal: null,      // Modale attualmente visualizzata
    notifications: [],       // Array delle notifiche attive
    searchHistory: [],      // Cronologia delle ricerche effettuate
    sidebarOpen: true,      // Stato della sidebar (aperta/chiusa)
    currentView: 'home'     // Vista corrente dell'applicazione
  },
  // Definizione dei reducers per modificare lo stato
  reducers: {
    // Imposta lo stato di caricamento
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // Imposta la modale corrente
    setModal: (state, action) => {
      state.currentModal = action.payload;
    },
    // Aggiunge una nuova notifica
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    // Rimuove una notifica specifica tramite ID
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    // Aggiunge un termine alla cronologia delle ricerche
    addToSearchHistory: (state, action) => {
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory.unshift(action.payload);
        // Mantiene solo le ultime 10 ricerche
        if (state.searchHistory.length > 10) state.searchHistory.pop();
      }
    },
    // Attiva/disattiva la visibilità della sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    // Imposta la vista corrente dell'applicazione
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    }
  }
});

// Esporta le actions per essere utilizzate nei componenti
export const { 
  setLoading, 
  setModal, 
  addNotification, 
  removeNotification,
  addToSearchHistory,
  toggleSidebar,
  setCurrentView
} = uiSlice.actions;

// Esporta il reducer per configurare lo store
export default uiSlice.reducer; 