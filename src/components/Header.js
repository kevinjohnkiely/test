import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'
import { useHistory } from 'react-router-dom'

import { Nav, Navbar, Form, Button} from 'react-bootstrap'

export const Header = () => {

    const { currentUser, logout } = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()

    async function handleLogout(){
        setError('')

        try {
            await logout()
            history.push('/')
        } catch {
            setError('Failed to Log out correctly!')
        }
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="sm"  bg="primary" variant="dark">
                <Navbar.Brand>MOVIE-MATCH</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                <Nav className="mr-auto">
                {currentUser ? <>
                <Nav.Link as={Link} to="/add">Add My Movies</Nav.Link>               
                <Nav.Link as={Link} to="/dashboard">My Account</Nav.Link></> : null }
                </Nav>
                {currentUser ?
                <Form inline>
                <Button variant="outline-info" onClick={handleLogout}>Logout</Button>
                </Form> : null }
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}
