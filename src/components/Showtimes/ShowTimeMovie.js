import axios from "axios";
import {useEffect, useState} from "react";
import {Card} from "react-bootstrap";

const API_KEY = process.env.REACT_APP_API_KEY

function ShowTimeMovie(props){
    const showTime = props.showTime
    const movieId = showTime.movieId
    const [movie, setMovie] = useState()
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    };

    const fetchMovie = async () => {
        axios.request(options).then(function (response) {
            setMovie(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    useEffect(() => {
        fetchMovie()
        console.log(movie)
    }, [])
    return (
        <>
        {movie ?
            <Card>
                <h4>
                    {movie.title}
                </h4>
            </Card>
            :
            ''
        }
        </>


    )
}

export default ShowTimeMovie