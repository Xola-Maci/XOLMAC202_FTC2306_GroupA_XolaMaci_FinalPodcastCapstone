import React from 'react';
import { Link } from 'react-router-dom';

const ShowList = ({ shows, onShowClick }) => (
  <div>
    <ul className="list--details">
      {shows.map(show => (
        <Link to={`/id/${show.id}`} key={show.id}>
          <li className="podcast--info" onClick={() => onShowClick(show.id)}>
            <img src={show.image} className="podcast--main--image" alt={show.title} />
            <h3 className="podcast--title">{show.title}</h3>
            <h3>{`Seasons: ${show.seasons}`}</h3>
          </li>
        </Link>
      ))}
    </ul>
  </div>
);

export default ShowList;
