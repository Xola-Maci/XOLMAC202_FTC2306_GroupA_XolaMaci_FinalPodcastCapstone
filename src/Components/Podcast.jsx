import React from "react";
import { Link, Route, BrowserRouter as Router, useParams } from "react-router-dom";


export default function Podcast(){

    const [allpods, setAllpods] = React.useState([])

    React.useEffect(()=>{

        async function getShowsPreview(){
            const podResults = await fetch ("https://podcast-api.netlify.app/shows");
            const showData = await podResults.json()
            setAllpods(showData)
        }
        getShowsPreview()
    },[])
    
    // Handling the podcast Details
    const PodcastDetails = () => {
      const { id } = useParams(); // Extract podcast ID from URL parameters
    
      const [podDetails, setPodDetails] = React.useState({});
    
      React.useEffect(() => {
        async function getPodcastDetails() {
          const podResults = await fetch(`https://podcast-api.netlify.app/id/${id}`);
          const podcastData = await podResults.json();
          setPodDetails(podcastData);
        }
    
        getPodcastDetails();
      }, [id]);
    
      return (
        <div>
          <h2>{podDetails.title}</h2>
          <p>{podDetails.description}</p>
          {/* Add more details as needed */}
        </div>
      );
    };

    return(
        <main>
      <div className="preview">
      <h1>Podcasts</h1>
      <ul className="list--details" onClick={PodcastDetails}>
        {allpods.map((podcast) => (
            
          <ul key={podcast.id} className="podcast--info">
            <img src={podcast.image} className="podcast--main--image"></img>
            <h3 className="podcast--title">{podcast.title}</h3>
            <h3>{`Seasons: ${podcast.seasons}`}</h3>
          </ul>
        ))}
      </ul>
    </div>
             
        </main>
    )
}