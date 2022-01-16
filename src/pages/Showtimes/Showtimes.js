import Header from "../../components/Header/Header"
import ShowtimeCalendar from "../../components/Showtimes/ShowtimeCalendar"
import styles from "./Showtimes.module.css"
import useAuth from "../../hooks/useAuth"
import {useEffect, useState} from "react"
import ShowTimeMovies from "../../components/Showtimes/ShowTimeMovies"
import {Button, Form, Modal} from "react-bootstrap"
import { useHistory } from 'react-router'

const getDates = (startDate, days) => {
    let dates = []
    for ( let i = 0; i < days; i ++){
        let date = new Date(startDate)
        date.setDate(date.getDate() + i)
        dates.push({date: date, id: i})
    }
    return dates
}

const SearchMovieModal = (props) => {
    const show = props.show
    const handleClose = props.onHide
    const [query, setQuery] = useState()
    const history = useHistory()
    const onSearch = () =>{
        history.push(`/search/${query}`)
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
                <Form onSubmit={onSearch}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Find movie</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            onChange={(e) =>{setQuery(e.target.value)}}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="dark" onClick={onSearch}>
                    Search
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default function Showtimes () {

    const [auth, setAuth] = useAuth()
    const days = 14
    const date = new Date()
    const datesArray = getDates(date, days)
    const [activeId, setActiveId] = useState(0)
    const [activeDate, setActiveDate] = useState()
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

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
            <div className={styles.showtimes}>
                <ShowtimeCalendar datesArray={datesArray} activeId={activeId} setActiveId={setActiveId} />
                <ShowTimeMovies date={activeDate}/>
                {auth && auth.roles.includes('ROLE_ADMIN') ?
                    <Button variant="dark" onClick={handleShow}>Add Showtime</Button>
                    : ''
                }
            </div>
            <SearchMovieModal show={showModal} onHide={handleClose}/>
        </div>

    )
}