import React from "react";
import SearchBox from "./SearchBox";

export default function Header(){
    return(
        <header className="header">
           <nav>
              <ul className="Navigate">
              <h1 className="nav--title"> The X-WAY</h1>
               <SearchBox/>
                <a href="index.html">Home</a>
                <a href="index.html">Discover</a>
                <a href="index.html">Favourites</a>

              </ul>
             
           </nav>
        </header>
    )
}