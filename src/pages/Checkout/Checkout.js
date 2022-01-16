import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import Header from '../../components/Header/Header';
import styles from './Checkout.module.css'
import apiaxios from "../../axios"
import Seats from '../../components/Seats/Seats';
import useAuth from '../../hooks/useAuth';
import {Button} from "react-bootstrap";

const API_KEY = process.env.REACT_APP_API_KEY

export default function Checkout() {
    const {movieid, showtimeid} = useParams()
    const [showTime, setShowTime] = useState([])
    const [takenSeats, setTakenSeats] = useState()
    const [selectedSeats, setSelectedSeats] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [auth, setAuth] = useAuth()
    const history = useHistory()

    if (!auth) history.push('/home')

    const fetchShowTime = async () => {
        try {
            let res = await apiaxios.get(`/user/showtime/${showtimeid}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            setShowTime(res.data)
        } catch (ex) {
            console.log('axios error', ex)
        }
    }

    const fetchTakenSeats = async () => {
        try {
            let res = await apiaxios.get(`/user/showtime/taken-seats?showTimeId=${showtimeid}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            setTakenSeats(res.data.map(seat => seat.name))
            console.log(takenSeats)
        } catch (ex) {
            console.log('axios error', ex)
        }
    }

    const addTicket = async () => {
        try {
            let res = await apiaxios.post(`/user/tickets`, {
                userId: auth.userId,
                seats: selectedSeats,
                showTimeId: showtimeid
            },{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            setTakenSeats(res.data.map(seat => seat.name))
            console.log(takenSeats)
        } catch (ex) {
            console.log('axios error', ex)
        }
    }

    const addSeat = (seatId) => {
        if (selectedSeats.indexOf(seatId) <= -1) {
            setSelectedSeats([...selectedSeats, seatId])
            setDisabled(false)
        }
    }

    const deleteSeat = (seatId) => {
        const index = selectedSeats.indexOf(seatId)
        if (index > -1) {
            const array = selectedSeats
            array.splice(index, 1)
            setSelectedSeats(array)
        }
        if (selectedSeats.length === 0){
            setDisabled(true)
        }
    }

    const onClick = () => {
        console.log(selectedSeats)
        if(selectedSeats.length !== 0){
            addTicket().then(history.push('/my_tickets'))
        }
    }

    useEffect(() => {
        fetchShowTime()
        fetchTakenSeats()
    }, [])

    return (
        <div>
            <Header/>
            <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="align-items-left">
                    <div className="d-flex flex-column">
                        <h4><p>{showTime.movieTitle}</p></h4>
                        <h5>{showTime.date}</h5>
                        <h5>{showTime.time}</h5>
                    </div>
                    <div className={`${styles.screen}`}>SCREEN</div>
                </div>
                <div>
                    {takenSeats ?
                        <Seats takenSeats={takenSeats} addSeat={addSeat} deleteSeat={deleteSeat}/>
                        : ""
                    }
                </div>
                <Button
                    variant="dark"
                    className="mt-3"
                    disabled={disabled}
                    onClick={onClick}>
                    Book seats
                </Button>

            </div>
        </div>
    );
}
