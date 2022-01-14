import React, {useEffect, useState} from 'react';
import styles from './Tickets.module.css';
import axios from "../../axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useAuth from '../../hooks/useAuth';
import HourBadge from "../Showtimes/HourBadge";

export default function Tickets(props) {

    const [date, setDate] = useState(new Date())
    const [auth, setAuth] = useAuth()
    const [showTimes, setShowTimes] = useState()
    const movieId = props.movieId

    const fetchShowTimes = async () => {
        if (date) {
            const fetchDate = date.toISOString().split('T')[0]
            try {
                let res = await axios.get(`user/showtime/hours?date=${fetchDate}&movieId=${movieId}`)
                setShowTimes(res.data.showTimes[0])
                console.log(res.data)
            } catch (ex) {
                console.log('axios error', ex)
            }
        }
    }

    const onDateChange = (date) => {
        const d = new Date(date)
        d.setHours(d.getHours() + 2)
        setDate(d)
    }

    useEffect(() => {
        fetchShowTimes()
    }, [date])

    return (
        <div className={`d-flex flex-row card m-3 p-3 ${styles.card}`}>
            <>
                <Calendar
                    value={date}
                    onChange={onDateChange}
                    minDate={new Date()}
                >
                </Calendar>
                <div className="m-1 ml-3">
                    <h3>Showtimes on {date.toISOString().slice(0, 10)}</h3>
                    {showTimes ? showTimes.hours.sort((a, b) => a.hour > b.hour ? 1 : -1).map(hour =>
                        <div className="mt- mb-2">
                            <HourBadge hour={hour} movieId={movieId} />
                        </div>
                    ) : ""}
                </div>
            </>
        </div>
    );
}
