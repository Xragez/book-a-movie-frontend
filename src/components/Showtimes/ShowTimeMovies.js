import axios from "../../axios"
import {useEffect, useState} from "react"
import ShowTimeMovie from "./ShowTimeMovie"
import styles from './ShowTimeMovies.module.css'


function ShowTimeMovies(props) {
    const date = props.date
    const [showTimes, setShowTimes] = useState([])
    const fetchData = async () => {
        if (date) {
            const fetchDate = date.toISOString().split('T')[0]
            try {
                let res = await axios.get(`user/showtime/hours?date=${fetchDate}`)
                setShowTimes(res.data.showTimes)
                console.log(res.data)
            } catch (ex) {
                console.log('axios error', ex)
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [date])
    return (
        <div className={styles.showtimemovie}>
            {showTimes.map(showTime => (
                <ShowTimeMovie showTime={showTime}/>
            ))}
        </div>

    )
}

export default ShowTimeMovies