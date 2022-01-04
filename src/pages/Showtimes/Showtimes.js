import Header from "../../components/Header/Header"
import ShowtimeCalendar from "../../components/Showtimes/ShowtimeCalendar"
import styles from "./Showtimes.module.css"
import useAuth from "../../hooks/useAuth"
import {useEffect, useState} from "react";
import ShowTimeMovies from "../../components/Showtimes/ShowTimeMovies";
import {Button} from "react-bootstrap";

const getDates = (startDate, days) => {
    let dates = []
    for ( let i = 0; i < days; i ++){
        let date = new Date(startDate)
        date.setDate(date.getDate() + i)
        dates.push({date: date, id: i})
    }
    return dates
}

export default function Showtimes () {

    const [auth, setAuth] = useAuth()
    const days = 14
    const date = new Date()
    const datesArray = getDates(date, days)
    const [activeId, setActiveId] = useState(0)
    const [activeDate, setActiveDate] = useState()

    const getActiveDate = () => {
        const date = datesArray.find(d => d.id === activeId)
        return date.date
    }
    useEffect(() => {
        setActiveDate(getActiveDate())
    }, [activeId])
    return (
        <div className={styles.background}>
            <Header/>
            <ShowtimeCalendar datesArray={datesArray} activeId={activeId} setActiveId={setActiveId} />
            <ShowTimeMovies date={activeDate}/>
            <Button variant="dark" href="/showtimes/add">Add Showtime</Button>
        </div>

    )
}