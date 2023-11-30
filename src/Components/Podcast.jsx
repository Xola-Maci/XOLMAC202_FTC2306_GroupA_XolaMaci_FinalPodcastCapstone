import React from "react";


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
    
    return(
        <main>
      <div className="preview">
      <h1>Podcasts</h1>
      <ul className="list--details">
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