// Importazione delle dipendenze necessarie
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Componente che protegge le rotte che richiedono autenticazione
// Accetta children come prop che rappresenta il contenuto da proteggere
const ProtectedRoute = ({ children }) => {
  // Ottiene lo stato dell'utente corrente dal Redux store
  const user = useSelector(state => state.user.currentUser);
  
  // Se non c'è un utente autenticato, reindirizza alla pagina di login
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Se l'utente è autenticato, renderizza il contenuto protetto
  return children;
};

// Esportazione del componente
export default ProtectedRoute; 