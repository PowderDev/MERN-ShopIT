import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, FormControl, FormGroup, FormLabel, Row, Col, Alert, Spinner } from 'react-bootstrap'
import { register } from '../../redux/actions/userActions'
import FormContainer from '../../components/Form'

const RegisterPage = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [Confpassword, setConfpassword] = useState('')

    const redirect = location.search ? location.search.splt('=')[1] : null

    const dispatch = useDispatch()
    let {loading, error, userInfo} = useSelector(state => state.user)

    useEffect(() =>{
        if (userInfo){
            history.push('/')
        }
    }, [userInfo, history, redirect])

    const submitForm = (e) =>{
        e.preventDefault()
        if(password !== Confpassword){
            error = "Passwords doesn't match"
        } else{
            dispatch( register(email, password, name) )
        }   
    }

    return (
        <FormContainer>
            <h3>Sign in</h3>
            {error && <Alert variant='danger'>{error}</Alert>}
            {loading && <Spinner animation='border' role='status' style={{display: 'block', width: '100px', height: '100px', position: 'absolute', left: '45%', top: '42%'}} />}
            <Form onSubmit={submitForm} >
                <FormGroup controlId='name' >
                    <FormLabel>Name</FormLabel>
                    <FormControl type='text' placeholder='Enter your name'  value={name} onChange={(e) => setName(e.target.value)}  />
                </FormGroup>
                <FormGroup controlId='email' >
                    <FormLabel>Email Address</FormLabel>
                    <FormControl type='email' placeholder='Enter your real email address'  value={email} onChange={(e) => setEmail(e.target.value)}  />
                </FormGroup>
                <FormGroup controlId='password' >
                    <FormLabel>Password</FormLabel>
                    <FormControl type='password' placeholder='Enter password'  value={password} onChange={(e) => setPassword(e.target.value)}  />
                </FormGroup>
                <FormGroup controlId='password' >
                    <FormLabel>Confim Password</FormLabel>
                    <FormControl type='password' placeholder='Enter confirm password'  value={Confpassword} onChange={(e) => setConfpassword(e.target.value)}  />
                </FormGroup>
                <Button type='submit' variant='primary' >Sing up</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Already Customer? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} >Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterPage
