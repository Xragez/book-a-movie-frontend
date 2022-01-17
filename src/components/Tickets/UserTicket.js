import {Card} from "react-bootstrap";

function UserTicket(props) {
    const ticket = props.ticket
    const userData = ticket.userData
    const seats = ticket.seats
    const showTime = ticket.showTime

    return (
        <div style={{width: "75rem"}}>
            {ticket ?
                <Card className="mt-3 mb-3 p-3">
                    {props.visibleName ?
                        <h4 className="mb-4">
                            {`${userData.firstName} ${userData.surname}`}
                        </h4> : ''
                    }
                    <h4>
                        {showTime.movieTitle}
                    </h4>
                    <h5 className="mt-2">
                        {showTime.date}
                    </h5>
                    <h5>
                        {showTime.time}
                    </h5>
                    <div className="d-flex">
                        <h5 className="mr-3">Code:</h5>
                        <h5>{ticket.code}</h5>
                    </div>
                    <div className="d-flex">
                        <h5>Seats:</h5>
                        <div className="d-flex ml-3">
                            {seats ? seats.sort((a, b) => a.hour > b.hour ? 1 : -1).map(seat => (
                                <div className="mr-3">
                                    <h5>
                                        {seat.name}
                                    </h5>
                                </div>
                            )) : ''}
                        </div>
                    </div>

                </Card>
                : ''}
        </div>

    )
}

export default UserTicket