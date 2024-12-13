// Importazione delle dipendenze necessarie
import React from 'react';
import { Modal } from 'react-bootstrap'; // Componente Modal di React Bootstrap
import { useNavigate } from 'react-router-dom'; // Hook per la navigazione

// Componente modale per il login che richiede due props:
// show: booleano che controlla la visibilità del modale
// onHide: funzione chiamata alla chiusura del modale
const LoginModal = ({ show, onHide }) => {
  // Hook per la navigazione tra le pagine
  const navigate = useNavigate();

  return (
    // Componente Modal centrato verticalmente
    <Modal show={show} onHide={onHide} centered>
      {/* Header del modale con titolo e pulsante di chiusura */}
      <Modal.Header closeButton>
        <Modal.Title>Accedi per continuare</Modal.Title>
      </Modal.Header>
      {/* Corpo del modale con icona e messaggio */}
      <Modal.Body>
        <div className="text-center">
          <i className="bi bi-music-note-beamed music-icon"></i>
          <p>Per ascoltare tutti i brani disponibili, accedi o registrati gratuitamente.</p>
        </div>
      </Modal.Body>
      {/* Footer del modale con pulsante di azione */}
      <Modal.Footer>
        <button 
          className="btn btn-danger w-100"
          onClick={() => {
            onHide(); // Chiude il modale
            navigate('/login'); // Naviga alla pagina di login
          }}
        >
          Accedi o Registrati
        </button>
      </Modal.Footer>
    </Modal>
  );
};

// Esportazione del componente
export default LoginModal; 