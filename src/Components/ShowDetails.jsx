import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetail, setShowDetail] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch show details. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Show Details:', data);
        setShowDetail(data);
      } catch (error) {
        console.error('Error fetching show details:', error.message);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleSeasonSelect = (seasonNumber) => {
    console.log('Selected Season:', seasonNumber);
    setSelectedSeason(seasonNumber);
  };

  return (
    <div>
      {showDetail ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={showDetail.image} alt={showDetail.title} style={{ width: '50px', height: '50px' }} />
            <h1>{showDetail.title}</h1>
          </div>
          <p>{showDetail.description}</p>
          <h3>Last Updated: {new Date(showDetail.updated).toLocaleDateString()}</h3>

          <h4>Seasons:</h4>
          <ul>
            {showDetail?.seasons?.map((season) => (
              <li key={season.number}>
                <button onClick={() => handleSeasonSelect(season.number)}>
                  {season.title}
                </button>
              </li>
            ))}
          </ul>

          {selectedSeason && (
  <div>
    <h4>{`Season ${selectedSeason} Details:`}</h4>
    {showDetail.seasons
      .filter((season) => season.season === selectedSeason)
      .map((season) => (
        <div key={season.season}>
          <img src={season.image} alt={`Season ${season.season}`} style={{ width: '50px', height: '50px' }} />
          <h5>{season.title}</h5>
          <ul>
            {season.episodes.map((episode) => (
              <li key={episode.episode}>
                {episode.title} - {episode.description}
              </li>
            ))}
          </ul>
        </div>
      ))}
  </div>
)}

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowDetails;