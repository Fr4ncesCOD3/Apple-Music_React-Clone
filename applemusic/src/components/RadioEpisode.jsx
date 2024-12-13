import abuelo from '../assets/images/2a.png';
import wanderer from '../assets/images/2b.png';
import buble from '../assets/images/2c.png';

const RadioEpisode = () => {
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
    <section className="radio-episodes">
      <div className="section-header">
        <h2>Nuovi episodi radio</h2>
        <span className="see-all">{'>'}</span>
      </div>
      <div className="episodes-carousel">
        {episodes.map((episode) => (
          <div key={episode.id} className="episode-card">
            <div className="episode-image">
              <img src={episode.image} alt={episode.title} />
            </div>
            <p className="episode-title">{episode.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RadioEpisode;
