import React, {useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export const MyDetails = () => {

    const [yourName, setYourName] = useState('');
    const [yourGender, setYourGender] = useState('Male');
    const [lookingForGender, setLookingForGender] = useState('Male');
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

    const submitHandler = event => {
        event.preventDefault();
        alert("You will now need to login with your chosen email and password to confirm your account")
        onAddYourDetails({ name: yourName, gender: yourGender, lookingFor: lookingForGender });
      };

    const onAddYourDetails = (yourDetails) => {
        fetch('https://movie-match-4fe2b.firebaseio.com/db/users/' + currentUser.uid + '/userdetails.json',
        {
            method: 'POST',
            body: JSON.stringify(yourDetails),
            headers: { 'Content-Type':'application/json'}
        })
        handleLogout()
    }

    return (
        <div style={{width:'70%', margin: '0 auto', paddingTop: '2rem'}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add Your Personal Details</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group id="name">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control 
                                type="text" required 
                                value={yourName}
                                onChange={event => {
                                    setYourName(event.target.value);
                                  }}
                                />
                        </Form.Group>
                        <Form.Group id="gender">
                            <Form.Label>Your Gender</Form.Label>
                            <Form.Control 
                                as="select" required 
                                value={yourGender}
                                onChange={event => {
                                    setYourGender(event.target.value);
                                  }}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="lookingFor">
                            <Form.Label>You are looking for:</Form.Label>
                            <Form.Control 
                                as="select" required 
                                value={lookingForGender}
                                onChange={event => {
                                    setLookingForGender(event.target.value);
                                  }}>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Button className="w-100" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/"><Button>Login</Button></Link>
            </div>
        </div>
    )
}