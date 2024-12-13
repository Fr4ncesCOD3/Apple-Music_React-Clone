// Importazione delle dipendenze necessarie
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Creazione di un'azione asincrona per recuperare le canzoni da Deezer
export const fetchSongs = createAsyncThunk(
  'player/fetchSongs',
  async (category) => {
    const response = await axios.get(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${category}`
    )
    return response.data.data
  }
)

// Creazione dello slice per gestire lo stato del player musicale
const playerSlice = createSlice({
  name: 'player',
  // Definizione dello stato iniziale
  initialState: {
    currentSong: null,        // Canzone attualmente in riproduzione
    isPlaying: false,         // Stato di riproduzione (play/pause)
    songsList: [],           // Lista delle canzoni disponibili
    currentIndex: -1,        // Indice della canzone corrente nella lista
    isLoading: false,        // Stato di caricamento
    error: null,             // Gestione degli errori
    volume: 1,               // Volume del player (0-1)
    repeat: false,           // Modalità ripetizione
    shuffle: false,          // Modalità riproduzione casuale
    queue: [],              // Coda di riproduzione
    history: []             // Cronologia delle canzoni riprodotte
  },
  // Definizione dei reducers per modificare lo stato
  reducers: {
    // Imposta la canzone corrente e aggiorna l'indice
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.currentIndex = state.songsList.findIndex(song => song.id === action.payload.id);
    },
    // Attiva/disattiva la riproduzione
    togglePlay: (state, action) => {
      state.isPlaying = action.payload ?? !state.isPlaying;
    },
    // Imposta la lista delle canzoni
    setSongsList: (state, action) => {
      state.songsList = action.payload;
    },
    // Passa alla canzone successiva
    playNext: (state) => {
      if (state.currentIndex < state.songsList.length - 1) {
        state.currentIndex += 1;
        state.currentSong = state.songsList[state.currentIndex];
      }
    },
    // Passa alla canzone precedente
    playPrevious: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentSong = state.songsList[state.currentIndex];
      }
    },
    // Regola il volume
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    // Attiva/disattiva la modalità ripetizione
    toggleRepeat: (state) => {
      state.repeat = !state.repeat;
    },
    // Attiva/disattiva la riproduzione casuale
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    // Aggiunge una canzone alla coda
    addToQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    // Rimuove una canzone dalla coda
    removeFromQueue: (state, action) => {
      state.queue = state.queue.filter(song => song.id !== action.payload);
    },
    // Aggiunge una canzone alla cronologia (max 50 elementi)
    addToHistory: (state, action) => {
      state.history.unshift(action.payload);
      if (state.history.length > 50) state.history.pop();
    }
  },
  // Gestione delle azioni asincrone
  extraReducers: (builder) => {
    builder
      // Gestione dello stato di caricamento
      .addCase(fetchSongs.pending, (state) => {
        state.isLoading = true;
      })
      // Gestione del successo del caricamento
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.songsList = action.payload;
        state.error = null;
      })
      // Gestione degli errori di caricamento
      .addCase(fetchSongs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
})

// Esportazione delle azioni
export const { 
  setCurrentSong, 
  togglePlay, 
  setSongsList,
  playNext,
  playPrevious,
  setVolume,
  toggleRepeat,
  toggleShuffle,
  addToQueue,
  removeFromQueue,
  addToHistory
} = playerSlice.actions;

// Esportazione del reducer
export default playerSlice.reducer;