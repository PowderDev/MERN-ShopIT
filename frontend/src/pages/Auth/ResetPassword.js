import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, FormControl, FormGroup, FormLabel, Alert, Spinner } from 'react-bootstrap'
import { resetPasswordSecond } from '../../redux/actions/userActions'
import FormContainer from '../../components/Form'

const ReserPasswordPage = ({ match }) => {
    const token = match.params.token

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const dispatch = useDispatch()
    const {loading, error, success} = useSelector(state => state.resetPassword) 

    const submitForm = (e) =>{
        e.preventDefault()
        dispatch( resetPasswordSecond(password, confirmPassword, token) )
    }

    return loading ? <Spinner animation='border' role='status' style={{width: "150px", height: '150px', position: 'absolute', top: '43%', left: '43%'}} /> 
       : (
        <>   
        {error && <Alert variant='danger' >{error}</Alert>}
        {success && <Alert variant='success' >{success}</Alert>}
        <Link to='/login' className='btn btn-light my-3' >Go Sing in</Link>
        <FormContainer>
            <h3>Reser you're Password</h3>
            <Form onSubmit={submitForm} >
                <FormGroup controlId='password' >
                    <FormLabel>Password</FormLabel>
                    <FormControl type='password' placeholder='Enter password'  value={password} onChange={(e) => setPassword(e.target.value)}  />
                </FormGroup>
                <FormGroup controlId='password' >
                    <FormLabel>ConfirmPassword</FormLabel>
                    <FormControl type='password' placeholder='Enter Confirm Password'  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  />
                </FormGroup>
                <Button type='submit' variant='primary' >Sing in</Button>
            </Form>          
        </FormContainer>
        </>
    )
}

export default ReserPasswordPage
