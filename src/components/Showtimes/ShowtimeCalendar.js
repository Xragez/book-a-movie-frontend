import {Card} from "react-bootstrap";
import styles from "./ShowtimeCalendar.module.css"
import {useState} from "react";



const DayCard = (props) =>{
    const date = props.date.date
    const id = props.date.id
    const activeId = props.activeId
    const setActiceId = props.setActiveId
    const onClick = () => {
        setActiceId(id)
    }
    return (
        <Card className={`${styles.date} ${activeId === id ? styles.active: ''}`} onClick={onClick}>
            <h4>
                {`${date.getDate()}.${date.getMonth()+1}`}
            </h4>
        </Card>
    )
}

function ShowtimeCalendar(props){
    const activeId = props.activeId
    const setActiveId = props.setActiveId
    const datesArray = props.datesArray

    return (
        <div className={styles.container}>
            {datesArray.map(date =>(
                <DayCard date={date} setActiveId={setActiveId} activeId={activeId}/>
            ))}

        </div>
    )
}

export default ShowtimeCalendar