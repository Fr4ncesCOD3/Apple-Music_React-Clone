// Importazione delle dipendenze necessarie
import React from 'react';
// Importazione delle immagini utilizzate nella sezione news
import chillImage from '../assets/images/1a.png';
import latinaImage from '../assets/images/1b.png';

// Componente che mostra la sezione delle novità/news
const NewsSect = () => {
  // Array di oggetti contenente i dati delle news da visualizzare
  const news = [
    {
      id: 1,
      title: "Rilassati, al resto pensiamo noi.",
      subtitle: "Ascolta Apple Music Chill",
      tag: "NUOVA STAZIONE RADIO",
      image: chillImage,
    },
    {
      id: 2,
      title: "Ecco la nuova casa latina",
      tag: "NUOVA STAZIONE RADIO", 
      image: latinaImage,
    }
  ];

  return (
    // Sezione principale delle news
    <section className="news-section">
      <h2>Novità</h2>
      {/* Carousel/slider delle news */}
      <div className="news-carousel">
        {/* Mappatura dell'array news per creare le card */}
        {news.map((item) => (
          <div key={item.id} className="news-item">
            {/* Contenitore del testo della news */}
            <div className="news-text-item">
              <div className="news-tag">{item.tag}</div>
              <h3 className="news-title">{item.title}</h3>
              {/* Rendering condizionale del sottotitolo se presente */}
              {item.subtitle && <p className="news-subtitle">{item.subtitle}</p>}
            </div>
            {/* Card contenente l'immagine della news */}
            <div className="news-card">
              <div className="news-image">
                <img src={item.image} alt={item.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Esportazione del componente
export default NewsSect;
