import React, { useState } from 'react';
import styles from './Login.module.css';
import logo from '../../../assets/images/logo_black.svg'
import {Button, Form} from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth'
import { useHistory } from 'react-router';
import axios from '../../../axios'
import {Link} from "react-router-dom";

export default function Login() {
    const [auth, setAuth] = useAuth()
    const history = useHistory()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const submit = async e => {
        e.preventDefault()
        if(!password || !username){
            setErrorMessage("All fields are required!")
        }else{
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
                        <h2 className="mt-4">Log in!</h2>
                        <Form className="pt-3 pb-3">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>User name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="User name"
                                    onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Form.Text className=" pb-3" style={{color: "red"}}>
                                {errorMessage}
                            </Form.Text>
                            <Button variant="primary" type="submit" onClick={submit}>
                                Submit
                            </Button>
                        </Form>
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