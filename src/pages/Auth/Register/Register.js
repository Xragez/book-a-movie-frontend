import React, { useState } from 'react'
import styles from './Register.module.css'
import logo from '../../../assets/images/logo_black.svg'
import {Button, Form, InputGroup, Modal} from 'react-bootstrap'
import useAuth from '../../../hooks/useAuth'
import { useHistory } from 'react-router'
import axios from '../../../axios'
import {Link} from "react-router-dom";

const RegisterModal = (props) => {
  const show = props.show
  const history = useHistory()

  return (
      <Modal show={show}
             backdrop="static"
             keyboard={false}
             centered
      >
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <h4>You have been successfully registered!</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {history.push('/login')}}>
            Go to login page
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default function Register() {
  const [auth, setAuth] = useAuth()
  const history = useHistory()

  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [showModal, setShowModal] = useState(false)
  const handleShow = () => setShowModal(true)

  const submit = async (e) => {
    e.preventDefault()

    if(!password || !confPassword || !userName){
      setErrorMessage("All fields are required!")
    } else if(password !== confPassword){
      setErrorMessage("Passwords are different!")
    } else if (password.length < 8 || password.length > 30){
      setErrorMessage("Passwords must be between 8 and 30 characters!")
    }
    else{
      try {
        let res = await axios.post('auth/register', {
          password: password,
          username: userName
        })
        handleShow()
      }catch (ex) {
        console.log('axios error', ex)
      }
    }
  }

  if (auth) history.push('/home')

  return (
    <div className={styles.backgroundContainer}>
      <div className={`container d-flex flex-row p-4`}>
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
            <h2 className="mt-3">Create Account</h2>
            <div className="justify-content-center">
              <Form className="pt-3 pb-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>User name</Form.Label>
                  <Form.Control
                      required
                      type="text"
                      placeholder="User name"
                      onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Repeat password</Form.Label>
                  <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setConfPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Text className="pb-3" style={{color: "red"}}>
                  {errorMessage}
                </Form.Text>
                <Button variant="primary" type="submit" onClick={submit}>
                  Submit
                </Button>
              </Form>
            </div>
            <div className={`${styles.loginFooter} d-flex flex-row justify-content-center align-items-center `}>
              <h4 className="p-2">Already have account?</h4>
              <a className="p-2" href="login">Log in.</a>
            </div>
          </div>
        </div>
      </div>
      <RegisterModal show={showModal}/>
    </div>
  )
}