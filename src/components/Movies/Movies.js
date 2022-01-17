import React, { useEffect, useState } from 'react';
import styles from './Movies.module.css';
import Movie from './Movie/Movie';
import axios from "axios";
import Carousel, { slidesToShowPlugin  } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const API_KEY = process.env.REACT_APP_API_KEY

function Movies(props) {

  const [movies, setMovies] = useState([])

  const optionsMovies = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${props.sortBy}?api_key=${API_KEY}` +
      `&language=en-US`
  };
  
  const fetchMovies = async () => {
    console.log(optionsMovies.url)
    axios.request(optionsMovies).then(function (response) {
      setMovies(response.data.results);
      console.log(response.data.results);
    }).catch(function (error) {
      console.error(error);
    });
  }
  
  useEffect(() => {
    fetchMovies()
  }, [])


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5
  };

  
  return (
    <div className="m-3">
      <h3 className={styles.title}>{props.title}</h3>
      <Carousel
        plugins={[
          'infinite',
          'arrows',
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 5
            }
          },
        ]}
        draggable="true"
        breakpoints={{
          1600: {
            plugins: [
              'infinite',
              'arrows',
              {
                resolve: slidesToShowPlugin,
                options: {
                numberOfSlides: 4
                }
              },
            ]
          },
          1300: {
            plugins: [
              'infinite',
              'arrows',
              {
                resolve: slidesToShowPlugin,
                options: {
                numberOfSlides: 3
                }
              },
            ]
          },
          1000: {
              plugins: [
              'infinite',
              'arrows',
                {
                  resolve: slidesToShowPlugin,
                  options: {
                  numberOfSlides: 2
                  }
                },
              ]
          },
          700: {
              plugins: [
              'infinite',
              'arrows',
                {
                  resolve: slidesToShowPlugin,
                  options: {
                  numberOfSlides: 1
                  }
                },
              ]
            }
        }}
      >
        {movies.map(movie =>
          <div style={{margin: '1rem'}} >
            <Movie className="ml-1 mr-1"
                   title={movie.title}
                   rating={movie.vote_average}
                   posterUrl={movie.poster_path}
                   id={movie.id}
                   key={movie.id}
            />
          </div>
        )}
      </Carousel>
    </div>
  )
}

export default Movies;