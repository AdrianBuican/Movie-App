import React from 'react';
import {useState, useEffect} from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard'

const App = () => {
   const [movies, setMovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

   const searchMovies = async (title) => {
      const url = 'http://www.omdbapi.com?apikey=241d1526';
      const response = await fetch(`${url}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search)
   }

   useEffect(() => {
      searchMovies('Spiderman')
   }, [])

   return(
      <div className="app">
         <h1>Cinema Island</h1>
         <div className="search">
            <input 
            placeholder="Browse movies" 
            value={searchTerm}
            onChange = {(e) => setSearchTerm(e.target.value)} //Now we can type into the search bar
            />

            <img 
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)} //every time you type something in the searchbar and click on the search icon, the state will dynamically change
            />
      </div>
   
      {/* Render movies: Loop over the 'movies' array (which is fetched from an API), then take each individual movie and dynamically pass it as a prop to MovieCard*/}
         {
            movies?.length > 0 
            ? (
            <div className="container">
               {movies.map((movie) => (
                  <MovieCard movie={movie}/> //must pass prop (movie={movie}) else you get error
               ))}
            </div>
            ) :
            (
               <div className="empty">
                  <h2>Movie not found</h2>
               </div>
            )
         }
      </div>
   );
};

export default App;