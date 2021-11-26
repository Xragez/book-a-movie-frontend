import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieCardBasic.module.css';


export default function MovieCardBasic (props){

  const [movie, setMovie] = useState([])

  useEffect(() => {
    setMovie(props.movie)
  })

  return (
    
    <div className={`card m-3 ${styles.card}`}>
      <Link to={`/movie/${movie.id}`}>
        <div className="d-flex flex-row m-3" >
          <div className="flex-column">
              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className={styles.poster}/>
          </div>
          <div className="m-4">
              <h4>{movie.title}</h4>
            <p>
              Release date: {movie.release_date}
            </p>
            <p>
              Rating: {movie.vote_average}/10 {movie.vote_count} votes
            </p>
          </div>
        </div>
      </Link>
    </div>
  ); 
}
