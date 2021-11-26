import React, { useEffect, useState } from 'react';
import styles from './MovieCard.module.css';
import { jsPDF } from "jspdf";
import {Button, Card} from "react-bootstrap";


export default function MovieCard (props){

  const [movie, setMovie] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    setMovie(props.movie)
    setGenres(props.genres)
  })

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(36);
    doc.text(movie.title, 10, 15);
    doc.setFontSize(16);
    doc.text(`Genres: `, 75, 40)
    doc.text(`Release date: ${movie.release_date}`, 75, 50)
    doc.text(`Runtime: ${movie.runtime} min`, 75, 60)
    doc.text(`Rating: ${movie.vote_average}, ${movie.vote_count} votes`, 75, 70)
    doc.addImage(`https://image.tmdb.org/t/p/original${movie.poster_path}`, 'jpg', 10, 20, 60, 90)
    const overview = doc.splitTextToSize(movie.overview, 180);
    doc.text(overview, 10, 120);
    console.log(movie)
    doc.save(`${movie.title}.pdf`);
  }

  return (
    <Card className={`d-flex flex-row m-3 p-3 ${styles.card}`}>
      <div className="flex-column">
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className={styles.poster}/>
      </div>
      <div className="ml-4 mr-4 mt-4">
        <div className=" d-flex flex-row justify-content-between ">
          <h2>{movie.title}</h2>
          <Button variant="secondary" onClick={exportToPDF}>Export to PDF</Button>
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
          {console.log(movie)}
        </p>
        <p>
          Release date: {movie.release_date}
        </p>
        <p>
          Rating: {movie.vote_average}/10 {movie.vote_count} votes
        </p>
      </div>
    </Card>
  ); 
}
