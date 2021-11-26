import React, { useState } from 'react'
import styles from './Register.module.css'
import logo from '../../../assets/images/logo_black.svg'
import Button from '../../../components/fundamental/actions/button/Button'
import useAuth from '../../../hooks/useAuth'
import { useHistory } from 'react-router'
import axios from '../../../axios'


export default function Register() {
  const [auth, setAuth] = useAuth()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [userName, setUserName] = useState('')

  const submit = async e => {
    e.preventDefault()

    if(password != confPassword){
      console.log("Error, different passwords")
    }
    try {
      let res = await axios.post('/register', {
        email: email,
        password: password,
        username: userName
      })
      history.push('/login')
    }catch (ex) {
      console.log('axios error', ex)
    }

  }

  if (auth) history.push('/home')

  return (
    <div className={styles.backgroundContainer}>
      <div className={`${styles.loginContainer} container d-flex flex-row p-4`}>
        <div className={`${styles.formContainer} container flex-column`}>
          <div className={`${styles.logoContainer}`} >
            <img 
              src={logo}
              className={`${logo} img-fluid `} />
          </div>
          <div className={`${styles.formLogin} align-self-end`}>
            <h2 className="mt-3">Create Account</h2>
            <form onSubmit={submit}>
            <div className="justify-content-center">
              <input type="text" className="form-control mt-3" onChange={(e) => setUserName(e.target.value)} placeholder="User Name"></input>
              <input type="text" className="form-control mt-3" onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
              <input type="password" className="form-control mt-3" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
              <input type="password" className="form-control mt-3 mb-3" onChange={(e) => setConfPassword(e.target.value)} placeholder="Password"></input>
              <div className="d-flex mb-3 justify-content-center">
              <Button>Register</Button>
              </div>
            </div>
            </form>
            <div className={`${styles.loginFooter} d-flex flex-row justify-content-center align-items-center `}>
              <h4 className="p-2">Already have account?</h4>
              <a className="p-2" href="login">Log in.</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}