import React, { Component } from "react"
import { Link } from "react-router-dom"

class AppNavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        CreditPanel
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarMain"
                        aria-controls="navbarMain"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        {/* ml-auto for margin right */}
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default AppNavBar
