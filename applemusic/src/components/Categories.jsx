// Importazione delle dipendenze necessarie
import React from 'react';
import { Link } from 'react-router-dom';

// Componente che mostra le categorie di esplorazione musicale
const Categories = () => {
  // Array di oggetti che definisce le diverse categorie disponibili
  const categories = [
    { 
      id: 1, 
      name: 'Esplora per genere', // Categoria per esplorare musica per genere
      path: '/explore/genre',
      apiCategory: 'genre'
    },
    { 
      id: 2, 
      name: 'Decenni', // Categoria per esplorare musica per decennio
      path: '/explore/decades', 
      apiCategory: 'decades'
    },
    { 
      id: 3, 
      name: 'Attività e stati d\'animo', // Categoria per musica basata su mood
      path: '/explore/moods',
      apiCategory: 'moods'
    },
    { 
      id: 4, 
      name: 'Worldwide', // Categoria per musica internazionale
      path: '/explore/worldwide',
      apiCategory: 'worldwide'
    },
    { 
      id: 5, 
      name: 'Classifiche', // Categoria per le classifiche musicali
      path: '/explore/charts',
      apiCategory: 'charts'
    }
  ];

  return (
    // Sezione principale che contiene tutte le categorie
    <section className="categories-section">
      <h2>Altro da esplorare</h2>
      <div className="categories-list">
        {/* Mapping dell'array delle categorie per creare i link di navigazione */}
        {categories.map((category) => (
          <Link 
            key={category.id} // Chiave univoca per React
            to={category.path} // Percorso di navigazione
            state={{ // Stato da passare alla navigazione
              title: category.name,
              apiCategory: category.apiCategory 
            }}
            className="category-item"
          >
            <span>{category.name}</span>
            {/* Icona freccia per indicare che è cliccabile */}
            <i className="bi bi-chevron-right"></i>
          </Link>
        ))}
      </div>
    </section>
  );
};

// Esportazione del componente
export default Categories;
