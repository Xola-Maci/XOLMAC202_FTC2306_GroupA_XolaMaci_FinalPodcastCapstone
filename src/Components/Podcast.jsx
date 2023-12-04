import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  const date = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, date);
};

const ShowList = ({ shows, onShowClick }) => (
  <div>
    <ul className="list--details">
      {shows.map(show => (
        <div className="podcast--info" key={show.id} >
          <img src={show.image} alt={show.title} className="podcast--main--image" 
          onClick={() => onShowClick(show.id)}/>
          <h3 className="podcast--title">{show.title}</h3>
          <h3>{`Seasons: ${show.seasons}`}</h3>
          <h4 className="date--updated">{`Last updated: ${formatDate(show.updated)}`}</h4>
        </div>
      ))}
    </ul>
  </div>
);

const ShowDetails = ({ details, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <h2>{details.title}</h2>
      <p>{details.description}</p>
    </div>
  </div>
);

const Podcast = () => {
  const [shows, setShows] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        const data = await response.json();

        // Use the provided code to enhance the podcasts with genres
        const enhancedPodcasts = data.map(async (podcast) => {
          const showDetailsResponse = await fetch(`https://podcast-api.netlify.app/id/${podcast.id}`);
          if (showDetailsResponse.ok) {
            const showDetailsData = await showDetailsResponse.json();
            return {
              ...podcast,
              genre: showDetailsData.genres && showDetailsData.genres.map((genre) => genre.name).join(', '),
            };
          }
          return podcast;
        });

        // Wait for all enhanced podcasts to be resolved
        const podcastsWithGenres = await Promise.all(enhancedPodcasts);

        setShows(podcastsWithGenres);
      } catch (error) {
        console.error('Error fetching show list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowClick = (id) => {
    setSelectedShowId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ShowList shows={shows} onShowClick={handleShowClick} />
      )}
      {showModal && <ShowDetails details={showDetails} onClose={handleCloseModal} />}
    </div>
  );
};

export default Podcast;
