import axios from "axios";
import {useEffect, useState} from "react";
import {Badge, Card} from "react-bootstrap";
import { useHistory } from 'react-router'

const API_KEY = process.env.REACT_APP_API_KEY

function ShowTimeMovie(props){
    const showTime = props.showTime
    const movieId = showTime.movieId
    const hours = showTime.hours
    const movieTitle = showTime.movieTitle

    const HourBadge = (props) => {
        const hour = props.hour.hour
        const showTimeId = props.hour.showTimeId
        const history = useHistory()

        const onBadgeClick = () => {
            history.push(`/checkout/${movieId}/${showTimeId}`)
        }
        return (
            <h4>
                <Badge bg="warning" onClick={onBadgeClick}>
                    {hour}
                </Badge>
            </h4>
        )
    }

    return (
        <div style={{width: "80rem"}}>
        {movieId ?
            <Card className="mt-3 mb-3 p-3">
                <h4>
                    {movieTitle}
                </h4>
                <div>
                    {hours ? hours.map(hour =>(
                        <HourBadge hour={hour}/>
                    )) : ''}
                </div>
            </Card>
            :
            <div>
                <h4>
                    No show time added
                </h4>
            </div>
        }
        </div>


    )
}

export default ShowTimeMovie