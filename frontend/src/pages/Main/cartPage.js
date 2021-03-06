import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Alert, ListGroup, ListGroupItem, Image, FormControl, Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../redux/actions/cartActions'

const CartPage = ({ match, location, history }) => {
    const dispatch = useDispatch()

    const cartItems = useSelector(state => state.cart.cartItems)

    const removeFromCartHandler =(id) => {
        dispatch( removeFromCart(id) )
    }

    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <main>
            <Row md={8}>
                <Col >
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ?
                     <Alert variant='info'>Your Cart is empty <Link to='/' >Go Back</Link> </Alert>
                    : (
                        <ListGroup variant='flush' >
                            {cartItems.map(item =>(
                                <ListGroupItem key={item.product._id} >
                                    <Row>
                                        <Col md={2} >
                                            <Image src={item.product.image} alt={item.product.name} style={{width: '110px'}} />
                                        </Col>
                                        <Col md={4} >
                                            <Link to={`/products/${item.product._id}`}>{item.product.name}</Link>
                                        </Col>
                                        <Col md={2} >
                                            ${item.product.price}
                                        </Col>
                                        <Col md={2} >
                                            <FormControl as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product._id, +e.target.value))}>
                                                {[...Array(item.product.numInStock).keys()].map(op =>(
                                                    <option key={op + 1} value={op + 1} >{op + 1}</option>
                                                ))}
                                            </FormControl>
                                        </Col>
                                        <Col md={2} >
                                            <Button variant='danger' onClick={() => removeFromCartHandler(item.product._id)} ><i className="fas fa-trash"></i></Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    )
                    
                    }
                </Col>

                <Col md={4} >
                    <Card>
                        <ListGroup variant='flush' >
                            <ListGroupItem>
                                <h4>Subtotal ( {cartItems.reduce((acc, item) =>{
                                    acc += item.qty
                                    return acc
                                }, 0)} ) items</h4>
                                <h4>${cartItems.reduce((acc, item) => acc += item.qty * item.product.price,0).toFixed(2)}</h4>
                            </ListGroupItem>
                            <ListGroupItem>
                                <LinkContainer to='/shipping' >
                                    <Button onClick={checkOutHandler}  className='btn-block' disabled={cartItems.length === 0 ? true : false} >Preceed to checkout</Button>
                                </LinkContainer>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </main>
    )
}

export default CartPage
