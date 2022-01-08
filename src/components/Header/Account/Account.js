import React from 'react';
import styles from './Account.module.css';
import useAuth from '../../../hooks/useAuth'
import {Button, DropdownButton, Dropdown} from "react-bootstrap";


function Account(){
    const [auth, setAuth] = useAuth()

    const logout = () => {
        window.localStorage.clear()
        refresh()
    }

    const refresh = () => {
        window.location.reload()
    }

    return (
        <>
        {auth ?
            <div className="d-flex flex-row">
                <div className={`${styles.account} ml-2 mr-2`}>
                    <DropdownButton id="dropdown-basic-button" title="Account" variant="dark">
                        <Dropdown.Item>My tickets</Dropdown.Item>
                        <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                    </DropdownButton>
                </div> 
            </div>
         : 
            <div className={`${styles.account}`}>
                <Button href="/login" variant="dark">Log in</Button>
            </div>
            
        }
        </>
    );
}

export default Account;