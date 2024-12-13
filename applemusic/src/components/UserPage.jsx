// Importazione delle dipendenze necessarie
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logoutUser } from '../Redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { Carousel, Container, Row, Col } from 'react-bootstrap';

// Componente principale della pagina utente
const UserPage = () => {
  // Estrazione dei dati utente dal Redux store
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Stati locali per la gestione della modifica del profilo
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Array dei piani di abbonamento disponibili
  const subscriptionPlans = [
    {
      title: 'Piano Individuale',
      price: '9.99',
      features: [
        'Accesso illimitato a tutti i brani',
        'Ascolto offline',
        'No pubblicità',
        'Audio in alta qualità'
      ],
      color: '#1DB954'
    },
    {
      title: 'Piano Famiglia',
      price: '14.99',
      features: [
        'Fino a 6 account',
        'Controllo genitori',
        'Ascolto offline',
        'Audio in alta qualità'
      ],
      color: '#E91429'
    },
    {
      title: 'Piano Studenti',
      price: '4.99',
      features: [
        'Prezzo speciale per studenti',
        'Accesso illimitato',
        'Ascolto offline',
        'No pubblicità'
      ],
      color: '#FF6B00'
    }
  ];

  // Gestione del salvataggio delle modifiche al profilo
  const handleSave = () => {
    dispatch(setUser(editedUser));
    setIsEditing(false);
  };

  // Gestione del logout utente
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  // Reindirizzamento alla pagina di login se non c'è un utente
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container className="user-page py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          {/* Sezione del profilo utente */}
          <div className="profile-section mb-5">
            {/* Header del profilo con avatar e nome */}
            <div className="profile-header text-center">
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="profile-status">
                  <span className="badge bg-success">Online</span>
                </div>
              </div>
              <h2 className="mt-3 mb-4">{user.name}</h2>
            </div>

            {/* Form di modifica del profilo (visibile solo in modalità editing) */}
            {isEditing ? (
              <div className="edit-form p-4">
                <div className="form-group mb-4">
                  <label className="mb-2">Nome</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="mb-2">Email</label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                  />
                </div>
                <div className="buttons d-flex justify-content-center gap-3">
                  <button className="save-btn px-4 py-2" onClick={handleSave}>
                    <i className="bi bi-check2 me-2"></i>Salva
                  </button>
                  <button className="cancel-btn px-4 py-2" onClick={() => setIsEditing(false)}>
                    <i className="bi bi-x me-2"></i>Annulla
                  </button>
                </div>
              </div>
            ) : (
              // Visualizzazione delle informazioni del profilo (modalità normale)
              <div className="profile-info text-center p-4">
                <div className="info-item mb-3">
                  <strong className="text-muted">Email:</strong>
                  <p className="mb-0">{user.email}</p>
                </div>
                <button className="edit-btn px-4 py-2 mt-3" onClick={() => setIsEditing(true)}>
                  <i className="bi bi-pencil me-2"></i>Modifica Profilo
                </button>
              </div>
            )}
            
            {/* Pulsante di logout */}
            <div className="text-center mt-4">
              <button className="logout-btn px-4 py-2" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Sezione dei piani di abbonamento */}
      <div className="subscription-section">
        <h3 className="text-center mb-5">Scegli il tuo Piano</h3>
        {/* Carousel dei piani di abbonamento */}
        <Carousel 
          interval={null} 
          className="subscription-carousel"
          indicators={true}
          prevIcon={<i className="bi bi-chevron-left fs-1"></i>}
          nextIcon={<i className="bi bi-chevron-right fs-1"></i>}
        >
          {/* Mappatura dei piani di abbonamento */}
          {subscriptionPlans.map((plan, index) => (
            <Carousel.Item key={index}>
              <div className="plan-card" style={{ borderColor: plan.color }}>
                <div className="plan-header mb-4">
                  <h4>{plan.title}</h4>
                  <div className="price">
                    €{plan.price}<span>/mese</span>
                  </div>
                </div>
                {/* Lista delle caratteristiche del piano */}
                <ul className="features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="bi bi-check2-circle me-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className="subscribe-btn mt-4" 
                  style={{ backgroundColor: plan.color }}
                >
                  <i className="bi bi-music-note-beamed me-2"></i>
                  Abbonati Ora
                </button>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

// Esportazione del componente
export default UserPage;
