import React, { useEffect, useState } from 'react';
import styles from './MovieCard.module.css';
import { jsPDF } from "jspdf";
import {Button, Card, Form, Modal} from "react-bootstrap";
import {useHistory} from "react-router";
import axios from "../../../axios";


export default function MovieCard (props){

  const [movie, setMovie] = useState([])
  const [genres, setGenres] = useState([])
  const [showModal, setShowModal] = useState(false)
  const movieId = props.movieId
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  useEffect(() => {
    setMovie(props.movie)
    setGenres(props.genres)
  }, [props.movie, props.genres])

  const exportMovieToPDF = () => {
    const doc = new jsPDF();
    let y = 15
    doc.setFontSize(36);
    const title = doc.splitTextToSize(movie.title, 180)
    title.forEach((line) => {
      doc.text(line, 10, y + 5)
      y = y + 15
    })
    doc.setFontSize(16);
    let genreStr = '|'
    genres.forEach((genre)=>{
      genreStr += ` ${genre.name} |`
    })
    doc.text(genreStr, 75, y + 25)
    doc.text(`Release date: ${movie.release_date}`, 75, y + 35)
    doc.text(`Runtime: ${movie.runtime} min`, 75, y + 45)
    doc.text(`Rating: ${movie.vote_average}, ${movie.vote_count} votes`, 75, y + 55)
    doc.addImage(`https://image.tmdb.org/t/p/original${movie.poster_path}`, 'jpg', 10, y, 60, 90)
    const overview = doc.splitTextToSize(movie.overview, 180)
    overview.forEach((text) => console.log(text))
    doc.text(overview, 10, 105 + y)
    console.log(movie)
    doc.save(`${movie.title}.pdf`)
  }

  const AddShowTimeModal = (props) => {
    const show = props.show
    const handleClose = props.onHide
    const [date, setDate] = useState()
    const [time, setTime] = useState()

    const history = useHistory()

    const postShowtime = async () => {
        try {
          let res = await axios.post(`admin/showtime`,{
                movieId: movieId,
                movieTitle: movie.title,
                date: date,
                time: time
              })
        } catch (ex) {
          console.log('axios error', ex)
        }
    }

    const onSubmit = () => {
      postShowtime().then(history.push('/showtimes'))
    }

    return (
        <Modal show={show}
               onHide={handleClose}
               backdrop="static"
               keyboard={false}
               centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add ShowTime</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="Date"
                    onChange={(e) =>{setDate(e.target.value)}}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hour</Form.Label>
                <Form.Control
                    type="time"
                    placeholder="Hour"
                    onChange={(e) =>{setTime(e.target.value)}}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="dark" onClick={onSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }

  return (
    <Card className={`d-flex flex-row m-3 p-3 ${styles.card}`}>
      <div className="flex-column">
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className={styles.poster}/>
      </div>
      <div className="ml-4 mr-4 mt-4">
        <div className=" d-flex flex-row justify-content-between ">
          <h2>{movie.title}</h2>
        </div>
        <div className="mb-2 mt-2">
          <Button variant="dark" onClick={exportMovieToPDF} className="p-2 mr-2">Export to PDF</Button>
          <Button variant="dark" onClick={handleShow} className="p-2 mr-2">Add ShowTime</Button>
        </div>
        <p>
          {movie.runtime} min  
        </p>
        <p>
          {genres.map( genre =>
            <span className="badge badge-secondary mr-2">{genre.name + " "}</span>
            )}
        </p>
        <p>
          {movie.overview}
        </p>
        <p>
          Release date: {movie.release_date}
        </p>
        <p>
          Rating: {movie.vote_average}/10 {movie.vote_count} votes
        </p>
      </div>
      <AddShowTimeModal show={showModal} onHide={handleClose}/>
    </Card>
  ); 
}
