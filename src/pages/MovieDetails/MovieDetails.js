import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './MovieDetails.module.css';
import axios from "axios";
import Header from '../../components/Header/Header';
import MovieCard from '../../components/Movies/MovieCard/MovieCard';
import Tickets from '../../components/Tickets/Tickets';
import NotFound from "../NotFound/NotFound";

const API_KEY = process.env.REACT_APP_API_KEY

export default function MovieDetails (){

  const [movie, setMovie] = useState('')
  const [genres, setGenres] = useState([])
  const { id } = useParams()

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  };

  const fetchMovie = async () => {   
      axios.request(options).then(function (response) {
          console.log(response)
          setMovie(response.data);
          setGenres(response.data.genres)
      }).catch(function (error) {
          console.error(error)
          return <NotFound/>
      });
  }

  useEffect(() => {
    fetchMovie()
  }, [])

    return (
        <div 
          className={styles.background}
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          }}>
          <Header/>
            { movie !== '' ?
            <>
                <MovieCard movieId={id} movie={movie} genres={genres}/>
                <Tickets movieId={id}/>
            </> : ''
            }

        </div>
    ); 
}
