// Importazione delle dipendenze necessarie
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../Redux/reducers/userReducer';

// Componente per la gestione del login e della registrazione
const LoginPage = () => {
  // Stato per gestire la modalità (login/registrazione)
  const [isLogin, setIsLogin] = useState(true);
  // Stato per gestire i dati del form
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  // Hook per il dispatch delle azioni Redux
  const dispatch = useDispatch();
  // Hook per la navigazione
  const navigate = useNavigate();

  // Gestione dell'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Creazione dell'oggetto utente in base alla modalità
    const userData = isLogin ? 
      { id: 1, email: formData.email, name: formData.email.split('@')[0] } : // Per login usa email come nome
      { id: 1, email: formData.email, name: formData.name }; // Per registrazione usa il nome inserito

    // Salvataggio dei dati utente nello store Redux
    dispatch(setUser(userData));
    // Reindirizzamento alla pagina utente
    navigate('/user');
  };

  return (
    // Container principale della pagina
    <div className="login-page">
      <div className="login-container">
        {/* Titolo dinamico in base alla modalità */}
        <h2>{isLogin ? 'Accedi' : 'Registrati'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo nome mostrato solo in modalità registrazione */}
          {!isLogin && (
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          )}
          {/* Campo email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          {/* Campo password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          {/* Pulsante di submit */}
          <button type="submit" className="submit-btn">
            {isLogin ? 'Accedi' : 'Registrati'}
          </button>
        </form>
        {/* Toggle per cambiare modalità */}
        <p className="toggle-form">
          {isLogin ? "Non hai un account? " : "Hai già un account? "}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Registrati' : 'Accedi'}
          </button>
        </p>
      </div>
    </div>
  );
};

// Esportazione del componente
export default LoginPage;
