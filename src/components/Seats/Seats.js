import React, { useEffect, useState } from 'react';
import Seat from './Seat/Seat';

const API_KEY = process.env.REACT_APP_API_KEY

function Seats(props){

  const [takenSeats, setTakenSeats] = useState(props.takenSeats)
  const [selectedSeats, setSelectedSeats] = useState([])

  const [seats, setSeats] = useState([
    ["A1", "A2", "A3", "A4", "A5", "A6", "", "","A7", "A8", "A9", "A10", "A11"], 
    ["B1", "B2", "B3", "B4", "B5", "B6", "", "","B7", "B8", "B9", "B10", "B11"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "", "","C7", "C8", "C9", "C10", "C11"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "", "","D7", "D8", "D9", "D10", "D11"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "", "","E7", "E8", "E9", "E10", "E11"]
  ])

  const isSeatAvailable = (seatId) => {
    if(takenSeats.indexOf(seatId) > -1){
      return false
    }
    return true
  }

  useEffect(() => {
    console.log(props.takenSeats)
    setTakenSeats(props.takenSeats)
  }, [props])

  return (
    <div className="mt-5">
      {takenSeats ?
      seats.map( row => 
        <div className="d-flex flex-row m-2">
          {row.map(seat =>
            <div className="mr-2">
              {takenSeats && isSeatAvailable(seat) ?
              <Seat id ={seat} state="available"/>
              :
              <Seat id ={seat} state="unavailable"/>}
            </div>
          )}
        </div>
      )
      :
      null
      }
    </div>  
  );
}

export default Seats;