import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, FormControl, FormGroup, FormLabel, Row, Col, Alert, Spinner, Table } from 'react-bootstrap'
import { updateProfile } from '../../redux/actions/userActions'
import { getMyOrders } from '../../redux/actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'

const RegisterPage = ({ location, history, match }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const dispatch = useDispatch()
    const {userInfo, error, loading} = useSelector(state => state.user)
    let {myOrders, myError, MyLoading} = useSelector(state => state.myOrders)

    useEffect(() =>{
        if (!userInfo){
            history.push('/')
        } else{
            setEmail(userInfo.email)
            setName(userInfo.name)
            dispatch( getMyOrders(userInfo._id) )
        }
    }, [userInfo, history, dispatch])

    const submitForm = (e) =>{
        e.preventDefault()
        setPassword('')
        setNewPassword('')
        dispatch( updateProfile(email, password, name, newPassword) )
    }

    return (
        <Row>
            <Col md={3}>
            <h3>{userInfo.name} Profile</h3>
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
                    <FormGroup controlId='confPassword' >
                        <FormLabel>Confim Password</FormLabel>
                        <FormControl type='password' placeholder='Enter confirm password'  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}  />
                    </FormGroup>
                    <Button type='submit' variant='primary' >Update</Button>
                </Form>
            </Col>

            <Col md={9}>
                <h3>My orders</h3>
                {MyLoading ?  <Spinner animation='border' role='status' style={{display: 'block', width: '100px', height: '100px', position: 'absolute', left: '45%', top: '42%'}} /> : myError ? <Alert variant='danger' >{myError}</Alert> : (
                    <Table striped bordered hover responsive className='table-sm' >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total Price</th>
                                <th>is Paid</th>
                                <th>is Delivered</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myOrders.map(order =>(
                                <tr key={order._id} >
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substr(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substr(0, 10) : (
                                        <i className='fas fa-times fa-3x ' style={{color: 'red', marginLeft: '35%'}} ></i>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substr(0, 10) : (
                                        <i className='fas fa-times fa-3x' style={{color: 'red', marginLeft: '35%'}} ></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/orders/${order.id}`} >
                                            <Button variant='light' className='btn-sm' >Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}



export default RegisterPage
