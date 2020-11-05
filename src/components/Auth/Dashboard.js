import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export const Dashboard = () => {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
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
        <div style={{width:'70%', margin: '0 auto', paddingTop: '2rem'}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile Page</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: {currentUser.email}</strong><br/>
                    <strong>User Id: {currentUser.uid}</strong>
                    <Link to = "/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    )
}

