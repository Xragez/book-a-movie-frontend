import React from 'react';
import styles from './Header.module.css';
import Searchbar from './Searchbar/Searchbar';
import { ReactComponent as Logo} from '../../assets/images/logo_white.svg'
import Account from './Account/Account';
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";

function Header(props){
    return (
        <header className={`${styles.header} d-flex justify-content-between align-items-center`}>

            <Link to="/">
            <Logo className="float-left ml-3" />
            </Link>
            <div className={`${styles.header} d-flex justify-content-between align-items-center pl-4`}>
                <Button variant="dark" >Showtimes</Button>
                <Searchbar className="" query={props.query ? props.query : ''}/>
                <Account className="float-right" />
            </div>

        </header>
    );
}

export default Header;