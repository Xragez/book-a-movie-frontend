import {Badge, Overlay} from "react-bootstrap"
import { useHistory } from 'react-router'
import styles from "./HourBadge.module.css"
import useAuth from "../../hooks/useAuth";
import {Button, Popover, Tooltip} from "react-bootstrap";
import {useRef, useState} from "react";

function HourBadge(props){
    const hour = props.hour.hour
    const showTimeId = props.hour.showTimeId
    const movieId = props.movieId
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [auth, setAuth] = useAuth()
    const target = useRef(null);


    const onBadgeClick = () => {
        if (auth){
            history.push(`/checkout/${movieId}/${showTimeId}`)
        } else{
            setShow(!show)
        }
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Popover right</Popover.Header>
            <Popover.Body>
                And here's some <strong>amazing</strong> content. It's very engaging.
                right?
            </Popover.Body>
        </Popover>
    )

    return (
        <>
            <h4>
                <Badge ref={target} className={styles.badge} bg="warning" onClick={onBadgeClick}>
                    {hour}
                </Badge>
            </h4>
            <Overlay target={target.current} show={show} placement="top">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        You need to log in to book a ticket
                    </Tooltip>
                )}
            </Overlay>
        </>


    )
}

export default HourBadge