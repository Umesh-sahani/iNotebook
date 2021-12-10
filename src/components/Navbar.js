import React from 'react'
import { Link } from "react-router-dom";
import Clock from './Clock';

const Navbar = () => {
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand p-0" style={{ fontSize: '1.5em' }} to="/">e<span className="text-warning">Notebook</span></Link>

                    <button className="navbar-toggler" style={{ background: '#adad1a' }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/notes">Notes</Link>
                            </li>
                           
                            <li className="nav-item">
                                <Link className="nav-link" to="/news">News</Link>
                            </li>
                            &nbsp; &nbsp;
                            <li className="nav-item">
                                <span className="text-warning" style={{ fontSize: '1.5em' }}><Clock /></span>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}
export default Navbar
