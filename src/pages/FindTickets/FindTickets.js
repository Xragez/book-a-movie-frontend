import React, {useEffect, useState} from "react"
import Header from "../../components/Header/Header"
import styles from "./FindTickets.module.css"
import axios from "../../axios"
import UserTickets from "../../components/Tickets/UserTickets"
import useAuth from "../../hooks/useAuth"
import {Button} from "react-bootstrap";
import { useHistory } from 'react-router';


export default function FindTickets() {
    const [tickets, setTickets] = useState([])
    const [code, setCode] = useState('')
    const [auth, setAuth] = useAuth()
    const history = useHistory()

    if(!auth.roles.includes('ROLE_ADMIN')) history.push('/home')

    const fetchData = async () => {
        try {
            let res = await axios.get(`admin/tickets/${code}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }})
            setTickets(res.data.tickets)
            console.log(res.data)
        } catch (ex) {
            console.log('axios error', ex)
        }
    }

    const onKeyDown = (e) =>{
        if(e.key === 'Enter') {
            onSearch()
        }
    }

    const onSearch = () =>{
        if(code.length !== 0)
            fetchData()
    }

    return (
        <div className={styles.background}>
            <Header/>
            <div className={styles.tickets}>
                <div className="d-flex align-items-start mt-5 mb-4" style={{width: "75rem"}}>
                    <input onKeyDown={onKeyDown}
                           value={code}
                           onChange={event => setCode(event.target.value)}
                           className="form-control"
                           type="text"
                           placeholder="Code"
                    />
                    <div className="ml-2">
                        <Button variant="dark" onClick={onSearch}>
                            Search
                        </Button>
                    </div>
                </div>
                <h3>
                    Tickets:
                </h3>
                <UserTickets tickets={tickets} visibleName/>
            </div>
        </div>
    )
}