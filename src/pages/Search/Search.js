import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './Search.module.css';
import axios from "axios";
import Header from '../../components/Header/Header';
import MovieCardBasic from '../../components/Movies/MovieCardBasic/MovieCardBasic';

const API_KEY = process.env.REACT_APP_API_KEY

export default function MovieDetails (){

  const [movies, setMovies] = useState([])
  const { q } = useParams()

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${q}&page=1`
  };

const fetchMovies = async () => {   
    axios.request(options).then(function (response) {
        setMovies(response.data.results);
        console.log(response)
    }).catch(function (error) {
        console.error(error);
    });
}

useEffect(() => {
  fetchMovies()
}, [q])

    return (
      <div>
        <Header/>
        {movies.map(movie => 
          <MovieCardBasic movie={movie}/>
          )}
      </div>
    ); 
}
