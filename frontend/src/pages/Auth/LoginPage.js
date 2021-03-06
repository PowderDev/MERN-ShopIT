import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, FormControl, FormGroup, FormLabel, Alert, Spinner } from 'react-bootstrap'
import { login } from '../../redux/actions/userActions'
import FormContainer from '../../components/Form'

const LoginPage = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : null

    const dispatch = useDispatch()
    const {loading, error, userInfo} = useSelector(state => state.user)

    useEffect(() =>{
        if (userInfo){
            history.push('/')
        }
    }, [userInfo, history, redirect])

    const submitForm = (e) =>{
        e.preventDefault()
        dispatch( login(email, password) )
    }

    return (
        <FormContainer>
            <h3>Sign in</h3>
            {error && <Alert variant='danger'>{error}</Alert>}
            {loading && <Spinner animation='border' role='status' style={{display: 'block', width: '100px', height: '100px', position: 'absolute', left: '45%', top: '42%'}} />}
            <Form onSubmit={submitForm} >
                <FormGroup controlId='email' >
                    <FormLabel>Email Address</FormLabel>
                    <FormControl type='email' placeholder='Enter your real email address'  value={email} onChange={(e) => setEmail(e.target.value)}  />
                </FormGroup>
                <FormGroup controlId='password' >
                    <FormLabel>Password</FormLabel>
                    <FormControl type='password' placeholder='Enter password'  value={password} onChange={(e) => setPassword(e.target.value)}  />
                </FormGroup>
                <Button type='submit' variant='primary' >Sing in</Button>
            </Form>

            <p>New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} >Register</Link></p>       
            <p>New Customer? <Link to='/reset' >Forgot you're password?</Link></p>              
        </FormContainer>
    )
}

export default LoginPage
