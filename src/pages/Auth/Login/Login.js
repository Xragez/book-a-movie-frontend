import React, { useState } from 'react';
import styles from './Login.module.css';
import logo from '../../../assets/images/logo_black.svg'
import {Button} from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth'
import { useHistory } from 'react-router';
import axios from '../../../axios'
import {Link} from "react-router-dom";

export default function Login() {
    const [auth, setAuth] = useAuth()
    const history = useHistory()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async e => {
        e.preventDefault()
        try {
            let res = await axios.post('auth/login', {
                username: username,
                password: password
            })
            const token = res.data.token
            setAuth(token)
        history.push('/home')
        } catch (ex) {
            console.log('axios error', ex)
        }
    }
    if (auth) history.push('/home')

    return (
        <div className={styles.backgroundContainer}>
            <div className={` container d-flex flex-row p-4`}>
                <div className={`${styles.formContainer} container flex-column p-4`}>
                    <div className={`${styles.logoContainer}`} >
                        <Link to="/">
                            <img
                                src={logo}
                                className={`${logo} img-fluid `}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className={`${styles.formLogin} align-self-end`}>
                        <h2 className="mt-4">Sign in!</h2>
                        <form onSubmit={submit}>
                            <div className="justify-content-center">
                                <input
                                    type="text"
                                    className="form-control mt-5"
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="User Name"
                                />
                                <input
                                    type="password"
                                    className="form-control mt-3 mb-3"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <div className="d-flex mb-3 justify-content-center">
                                    <Button>Login</Button>
                                </div>
                            </div>
                        </form>
                        <div className={`${styles.loginFooter} d-flex flex-row justify-content-center align-items-center `}>
                            <h4 className="p-2">Not a member?</h4>
                            <a className="p-2" href="/register">Sing up.</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        )
}