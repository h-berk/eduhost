import React from 'react';
import '../../App.css';
function NavBar() {
    return (
        <nav className="App-nav">
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;