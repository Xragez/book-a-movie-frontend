import React from 'react';
import styles from './Account.module.css';
import useAuth from '../../../hooks/useAuth'


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
                    <a href="/account" className="btn btn-secondary" onClick={logout}>Log out</a>
                </div> 
                <div className={`${styles.account} ml-2 mr-2`}>
                    <a href="/login" className="btn btn-dark mr-4">My Account</a>
                </div> 
            </div>
         : 
            <div className={`${styles.account}`}>
                <a href="/login" className="btn btn-dark mr-4">Sign in</a>
            </div>
            
        }
        </>
    );
}

export default Account;