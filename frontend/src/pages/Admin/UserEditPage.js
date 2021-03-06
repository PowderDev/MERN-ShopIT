import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, FormControl, FormGroup, FormLabel, Alert, Spinner, FormCheck } from 'react-bootstrap'
import FormContainer from '../../components/Form'
import { updateUser, userById } from '../../redux/actions/userActions'

const UserEditPage = ({ match, history }) => {
    const id = match.params.id
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [name, setName] = useState('')

    const dispatch = useDispatch()
    let {loading, error, userInfo} = useSelector(state => state.user)
    const { user } = useSelector(state => state.userById)

    useEffect(() =>{
        if (!userInfo || !userInfo.isAdmin){
            history.push('/')
        } else{
            dispatch( userById(id) )
            setEmail(user.email)
            setName(user.name)
            setIsAdmin(user.isAdmin)
        }
    }, [userInfo, history, dispatch, id, user.email, user.name, user.isAdmin])

    const submitForm = (e) =>{
        e.preventDefault()
        dispatch( updateUser(name, email, isAdmin, id) )
        
    }

    return (
        <main>
        <Link to='/admin/users' className='btn btn-light my-3' >Go Back</Link>
        <FormContainer>
            <h3>Edit User</h3>
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
                    <FormCheck type='checkbox' label='isAdmin'  checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}/>
                </FormGroup>
                <Button type='submit' variant='primary' >Update</Button>
            </Form>
        </FormContainer>

        </main>

    )
}

export default UserEditPage
