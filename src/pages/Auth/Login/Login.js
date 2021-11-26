import React, { useState } from 'react';
import styles from './Login.module.css';
import loginImg from '../../../assets/images/login_screen.svg'
import logo from '../../../assets/images/logo_black.svg'
import Button from '../../../components/fundamental/actions/button/Button';
import useAuth from '../../../hooks/useAuth'
import { useHistory } from 'react-router';
import axios from '../../../axios'

export default function Login() {
    const [auth, setAuth] = useAuth()
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = async e => {
        e.preventDefault()
        try {
            let res = await axios.post('/login', {
                email: email,
                password: password
            })
            const token = res.data.token
            console.log(token)
            setAuth({
                token: token
            })
        history.push('/home')
        } catch (ex) {
            console.log('axios error', ex)
        }
    }
    if (auth) history.push('/home')

    return (
        <div className={styles.backgroundContainer}>
            <div className={`${styles.loginContainer} container d-flex flex-row p-4`}>
                <div className={`${styles.pictureContainer} container`}>
                    <img 
                        src={loginImg}
                        className="img-fluid" />
                </div>
                <div className={`${styles.formContainer} container flex-column`}>
                    <div className={`${styles.logoContainer}`} >
                        <img 
                            src={logo}
                            className={`${logo} img-fluid `} />
                    </div>
                    <div className={`${styles.formLogin} align-self-end`}>
                        <h2 className="mt-3">Sign in!</h2>
                        <form onSubmit={submit}>
                        <div className="justify-content-center">
                            <input type="text" className="form-control mt-5" onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                            <input type="password" className="form-control mt-3 mb-3" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
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