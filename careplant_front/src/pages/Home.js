import React, { useState, useEffect } from 'react';
import './Home.css'; 
const Home = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://careplant-backend.onrender.com/api/arrosages'); 
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">Erreur : {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="no-data">Aucune donnée disponible.</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>CarePlant 🌱</h1>
        <p>L'outil indispensable ( en construction ) pour réussir l'adoption et l'entretien de vos plantes !</p>
      </header>

      <main className="main-content">
        <h2>Voici les premières données reçues :</h2>
        <div className="data-card">
          <p><strong>Identifiant :</strong> {data[0]._id}</p>
          <p><strong>Fréquence d'arrosage :</strong> {data[0].frequence} fois par semaine</p>
          <p><strong>Saison :</strong> {data[0].saison}</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
