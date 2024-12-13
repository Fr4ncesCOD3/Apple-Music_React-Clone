// Importazione delle dipendenze necessarie da Redux Toolkit e dei reducers
import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './reducers/playerReducer'
import userReducer from './reducers/userReducer'
import uiReducer from './reducers/uiReducer'

// Configurazione e creazione dello store Redux
export const store = configureStore({
  // Combinazione dei reducers per gestire i diversi stati dell'applicazione
  reducer: {
    player: playerReducer,  // Gestisce lo stato del player musicale
    user: userReducer,      // Gestisce lo stato dell'utente
    ui: uiReducer          // Gestisce lo stato dell'interfaccia utente
  },
  // Configurazione del middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false  // Disabilita il controllo di serializzazione per gestire oggetti complessi
    })
})
