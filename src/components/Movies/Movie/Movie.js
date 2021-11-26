import React, {useState} from 'react';
import styles from './Movie.module.css';
import {Link} from 'react-router-dom';
import {Badge, Card} from "react-bootstrap";

function Movie(props) {

    return (
        <div style={{padding: '1rem'}}>
            <Link className={styles.link} to={`/movie/${props.id}`}>
                <Card style={{ height: '34rem', width: '18rem'}}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${props.posterUrl}`} />
                    <Card.Body>
                        <Card.Title>
                            {props.title}
                        </Card.Title>
                        <Badge bg="warning">{props.rating}</Badge>
                    </Card.Body>
                </Card>
            </Link>
        </div>

    );
}

export default Movie;