import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Header from '../../components/Header/Header';
import styles from './Checkout.module.css'
import axios from "axios";
import apiaxios from "../../axios"
import Seats from '../../components/Seats/Seats';
import useAuth from '../../hooks/useAuth';

const API_KEY = process.env.REACT_APP_API_KEY

export default function Checkout (){
  const {movieid, showtimeid} = useParams()
  const [movie, setMovie] = useState([])
  const [showTime, setShowTime] = useState([])
  const [auth, setAuth] = useAuth()
  const history = useHistory()

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieid}?api_key=${API_KEY}&language=en-US`
  };

  const fetchShowTime = async () => {
    try {
      let res = await apiaxios.get(`/api/show_times/${showtimeid}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
      })
      console.log(res.data)
      setShowTime(res.data)
    } catch (ex) {
        console.log('axios error', ex)
    }
  }

  const fetchMovie = async () => {   
      axios.request(options).then(function (response) {
          setMovie(response.data);
      }).catch(function (error) {
          console.error(error);
      });
  }

  useEffect(() => {
    fetchMovie()
    fetchShowTime()
  }, [])

  if (!auth) history.push('/home')

  return (
    <div>
      <Header/>
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <div className="align-items-left">
          <div className="d-flex flex-column">
            <h5><p>{movie.title}</p></h5>
            <span>{showTime.date && showTime.date.slice(0, 10)}</span>
            <p>{showTime.hour && showTime.hour.slice(11, 16)}</p>
          </div>
          <div className={`${styles.screen}`}>SCREEN</div>
        </div>
        <div>
          <Seats takenSeats={showTime.takenSeats}></Seats>
          <button className="btn btn-dark float-right mt-3">Buy</button>
        </div>
      </div>
    </div>
  ); 
}
