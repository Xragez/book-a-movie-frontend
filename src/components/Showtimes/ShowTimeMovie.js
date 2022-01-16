import {Card} from "react-bootstrap"
import HourBadge from "./HourBadge"
import { useHistory } from 'react-router'
import {Link} from "react-router-dom";


const API_KEY = process.env.REACT_APP_API_KEY

function ShowTimeMovie(props) {
    const showTime = props.showTime
    const movieId = showTime.movieId
    const hours = showTime.hours
    const movieTitle = showTime.movieTitle
    const history = useHistory()

    return (
        <div style={{width: "75rem"}}>
            {movieId ?
                <Card className="mt-3 mb-3 p-3">
                    <Link to={`/movie/${movieId}`}>
                        <h4>
                            {movieTitle}
                        </h4>
                    </Link>
                    <div className="d-flex mt-3">
                        {hours ? hours.sort((a, b) => a.hour > b.hour ? 1 : -1).map(hour => (
                            <div className="mr-3">
                                <HourBadge hour={hour} movieId={movieId}/>
                            </div>
                        )) : ''}
                    </div>
                </Card>
                : ''}
        </div>


    )
}

export default ShowTimeMovie