import UserTicket from "./UserTicket"
import styles from "./UserTickets.module.css"

function UserTickets(props) {
    const tickets = props.tickets

    return (
        <div className={styles.tickets}>
            {tickets.map(ticket => (
                <UserTicket ticket={ticket}/>
            ))}
        </div>

    )
}

export default UserTickets