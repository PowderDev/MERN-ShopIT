import React, { useState } from 'react'
import {Alert, Button, Form, FormControl, FormGroup, FormLabel, Spinner} from 'react-bootstrap'
import FormContainer from '../../components/Form'
import { resetPasswordFirst } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'


const Reset = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState()

    const { loading, error, success } = useSelector(state => state.resetPassword)

    const submitForm = () =>{
        dispatch( resetPasswordFirst(email) )
    }

    return loading ? <Spinner animation='border' role='status' style={{width: "150px", height: '150px', position: 'absolute', top: '43%', left: '43%'}} /> 
       : (
        <>   
        {error && <Alert variant='danger' >{error}</Alert>}
        {success && <Alert variant='success' >{success}</Alert>}
        <FormContainer>
            <h3>Enter you're Email</h3>
            <Form onSubmit={submitForm} >
                <FormGroup controlId='email' >
                    <FormLabel>Email Address</FormLabel>
                    <FormControl type='email' placeholder='Enter your real email address'  value={email} onChange={(e) => setEmail(e.target.value)}  />
                </FormGroup>
                <Button type='submit' variant='primary'>Reset</Button>
            </Form>            
        </FormContainer>
        </>
    )
}

export default Reset
