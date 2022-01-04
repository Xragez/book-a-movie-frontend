import axios from "../../axios";
import {useEffect, useState} from "react";
import ShowTimeMovie from "./ShowTimeMovie";

function ShowTimeMovies(props){
    const date = props.date
    const [showTimes, setShowTimes] = useState([])
    const fetchData = async () => {
        if (date){
            const fetchDate = date.toISOString().split('T')[0]
            try {
                let res = await axios.get(`user/showtime?date=${fetchDate}`)
                setShowTimes(res.data)
            } catch (ex) {
                console.log('axios error', ex)
            }
        }
    }
    useEffect(() =>{
        fetchData().then()
    },[date])
    return (
        <div>
            <h4>
                {showTimes.map(showTime => (
                    <ShowTimeMovie showTime={showTime}/>
                ))}
            </h4>
        </div>

    )
}

export default ShowTimeMovies