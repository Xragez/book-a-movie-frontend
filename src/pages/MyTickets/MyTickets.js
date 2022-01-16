import React, {useEffect, useState} from "react"
import Header from "../../components/Header/Header"
import styles from "./MyTickets.module.css"
import axios from "../../axios"
import UserTickets from "../../components/Tickets/UserTickets"
import useAuth from "../../hooks/useAuth"

export default function MyTickets() {
    const [tickets, setTickets] = useState([])
    const [auth, setAuth] = useAuth()
    const fetchData = async () => {
        try {
            let res = await axios.get(`user/tickets`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }})
            setTickets(res.data.tickets)
            console.log(res.data.tickets)
        } catch (ex) {
            console.log('axios error', ex)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className={styles.background}>
            <Header/>
            <div className={styles.tickets}>
                <div className="align-items-start mt-5" style={{width: "75rem"}}>
                    <h4>
                        {`${auth.firstName} ${auth.surname}`}
                    </h4>
                </div>
                <h3>
                    Tickets:
                </h3>
                <UserTickets tickets={tickets}/>
            </div>
        </div>
    )
}