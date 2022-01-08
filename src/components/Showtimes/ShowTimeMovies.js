import axios from "../../axios";
import {useEffect, useState} from "react";
import ShowTimeMovie from "./ShowTimeMovie";

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
        <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}>
            {showTimes.map(showTime => (
                <ShowTimeMovie showTime={showTime}/>
            ))}
        </div>

    )
}

export default ShowTimeMovies