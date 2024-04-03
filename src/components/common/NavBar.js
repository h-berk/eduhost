import React from 'react';
import '../../App.css';
import navBarLogo from '../../assets/images/navbar-logo.png';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function NavBar() {
    const handleOnLogInClick = () => {
        window.location.href = "/dashboard"; 
    };
    return (
        <nav className="App-nav">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li className="unauth-logo"><img src={navBarLogo} alt="App Logo" /></li>
                <li className="login-signup"><Button onClick={handleOnLogInClick}>My Account</Button></li>
            </ul>
        </nav>
    );
}

export default NavBar;