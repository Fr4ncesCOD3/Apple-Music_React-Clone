// Importazione delle dipendenze necessarie
import React from 'react';
import { Container } from 'react-bootstrap';

// Componente Footer che mostra informazioni legali e link utili
const FooterComp = () => {
  return (
    // Footer con sfondo nero, testo bianco e margine inferiore per il player
    <footer className="bg-black text-white py-4" style={{ marginBottom: '80px' }}>
      <Container fluid className="px-4">
        {/* Sezione superiore con lingua e copyright */}
        <div className="d-flex flex-column gap-2">
          <small className="text-white-50">Italia | English (UK)</small>
          <small className="text-white-50">Copyright © 2024 Apple Inc. Tutti i diritti riservati.</small>
        </div>
        {/* Sezione inferiore con link utili */}
        <div className="d-flex flex-wrap gap-3 mt-2">
          {/* Link ai servizi e informazioni legali */}
          <small><button className="btn btn-link text-danger p-0 text-decoration-none">Condizioni dei servizi Internet</button></small>
          <small><button className="btn btn-link text-danger p-0 text-decoration-none">Apple Music e privacy</button></small>
          <small><button className="btn btn-link text-danger p-0 text-decoration-none">Avviso sui cookie</button></small>
          <small><button className="btn btn-link text-danger p-0 text-decoration-none">Supporto</button></small>
          <small><button className="btn btn-link text-danger p-0 text-decoration-none">Feedback</button></small>
        </div>
      </Container>
    </footer>
  );
};

// Esportazione del componente
export default FooterComp;
