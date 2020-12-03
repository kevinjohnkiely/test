import React, {useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/add")
        } catch (error) {
            setError('Failed to login!')
        }
        setLoading(false)
    }

    return (
        <div style={{width:'70%', margin: '0 auto', paddingTop: '2rem'}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    <h6 className="text-center mb-4">For demo purposes use the following login 
                    details: Email - test@test.com, Password - 123456</h6>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Login</Button>
                    </Form>
                    <div className="w-100 text-center mt-3" >
                        <Link to="/forgot-password" style={{color:'black'}}>Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup"><Button>Sign Up</Button></Link>
            </div>
        </div>
    )
}