import React, { useEffect, useState } from 'react';
import styles from './Seat.module.css';
import axios from "axios";
import { Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY

function Seat(props){

  const [state, setState] = useState(props.state)

  const changeStyle = (st) => {
    if(st === "available"){
      return { backgroundColor: "#7193A3" }
    } else if(st === "selected"){
      return { backgroundColor: "#EDA12A" }
    } else if(st === "unavailable"){
      return { backgroundColor: "#C4C4C4" }
    }
  }

  const onClick = () => {
    if(state === "available"){
      setState("selected")
    } else if(state === "selected"){
      setState("available")
    }
  }

  useEffect(() => {
    console.log(state)
  }, [state])


  return (
    <>
      {props.id === "" ?
      <div className={styles.seat}>
      
      </div>
      :
      <div className={`${styles.seat} btn ${state}`} onClick={onClick} style={changeStyle(state)}>
        {props.id}
      </div>
      }
      
    </>
  );
}

export default Seat;