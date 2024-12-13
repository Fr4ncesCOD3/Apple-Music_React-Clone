// Importazione delle immagini per gli episodi radio
import abuelo from '../assets/images/2a.png';
import wanderer from '../assets/images/2b.png';
import buble from '../assets/images/2c.png';

// Componente che mostra gli episodi radio più recenti
const RadioEpisode = () => {
  // Array di oggetti contenente i dati degli episodi radio
  const episodes = [
    {
      id: 1,
      title: "Prólogo con Abuelo",
      image: abuelo
    },
    {
      id: 2,
      title: "The Wanderer", 
      image: wanderer
    },
    {
      id: 3,
      title: "Michael Bublé & Carly Pearce",
      image: buble
    }
  ];

  return (
    // Sezione principale degli episodi radio
    <section className="radio-episodes">
      {/* Intestazione della sezione con titolo e pulsante "vedi tutti" */}
      <div className="section-header">
        <h2>Nuovi episodi radio</h2>
        <span className="see-all">{'>'}</span>
      </div>
      {/* Carousel/slider degli episodi */}
      <div className="episodes-carousel">
        {/* Mappatura dell'array episodes per creare le card */}
        {episodes.map((episode) => (
          <div key={episode.id} className="episode-card">
            {/* Contenitore dell'immagine dell'episodio */}
            <div className="episode-image">
              <img src={episode.image} alt={episode.title} />
            </div>
            {/* Titolo dell'episodio */}
            <p className="episode-title">{episode.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Esportazione del componente
export default RadioEpisode;
