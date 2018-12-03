import React, { Component } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { compose } from "redux"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import Spinner from "../layout/spinner"

class Clients extends Component {
    state = {
        totalCredit: null
    }

    static getDerivedStateFromProps(props, state) {
        const { clients } = props
        if (clients) {
            // Add Credit
            const total = clients.reduce((total, client) => {
                return total + parseFloat(client.credit.toString())
            }, 0)
            return { totalCredit: total }
        }
        return null
    }

    render() {
        const { clients } = this.props
        const { totalCredit } = this.state
        if (clients) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>
                                <i className="fas fa-users" /> Clients
                            </h2>
                        </div>
                        <div className="col-md-6">
                            <h5 className="text-right text-secondary">
                                Total Credit{" "}
                                <span className="text-primary">
                                    ${parseFloat(totalCredit).toFixed(2)}
                                </span>
                            </h5>
                        </div>
                    </div>
                    <br />
                    <table className="table table-striped">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Credit</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>
                                    <td>
                                        {client.firstName} {client.lastName}
                                    </td>
                                    <td>{client.email}</td>
                                    <td>
                                        $ {parseFloat(client.credit).toFixed(2)}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/client/${client.id}`}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            <i className="fas fa-arrow-circle-right" />{" "}
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return <Spinner />
        }
    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
}

export default compose(
    firestoreConnect([{ collection: "clients" }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients)
