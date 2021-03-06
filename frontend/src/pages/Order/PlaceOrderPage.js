import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Row, ListGroup, ListGroupItem, Image, Card, Spinner, Alert,} from 'react-bootstrap'
import { createOrder } from '../../redux/actions/orderActions'
import CheckoutSteps from '../../components/CheckoutSteps'
import { Link } from 'react-router-dom'

const PlaceOrderPage = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems, shippingInfo, paymentMethod} = cart



    const addDecimals = (num) =>{
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(+(0.15 * cart.itemsPrice).toFixed(2))
    cart.totalPrice =  (+cart.itemsPrice + +cart.shippingPrice + +cart.taxPrice).toFixed(2)

    const { order, success, error, loading } = useSelector(state => state.order)

    useEffect(() =>{
        if(success){
            history.push(`/orders/${order._id}`)
        }
    }, [history, success, order])

    const placeOrderHandler = () =>{
        dispatch( createOrder({
            orderItems: cartItems,
            shippingInfo: shippingInfo,
            paymentMethod: paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <main>
            <CheckoutSteps step1 step2 step3 step4  />
            <Row style={{ marginTop: '50px' }} >
                <Col md={8}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p>
                                <strong>Address: </strong>
                                {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.country}, {shippingInfo.postalCode}
                            </p>
                        </ListGroup.Item>
                        <ListGroupItem>
                            <h3>Payment Method</h3>
                            <strong>Method: </strong>
                            { paymentMethod }
                        </ListGroupItem>
                        <ListGroupItem>
                            <h3>Order Items</h3>
                            {cartItems.length === 0 ? history.push('/') : (
                                <ListGroup variant='flush' >
                                    {cartItems.map((item, i) => (
                                        <ListGroupItem key={i} >
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.product.image} alt={item.product.name} style={{ height: '50px' }} />
                                                </Col>
                                                <Col>
                                                    <Link to={`products/${item.product._id}`}>{item.product.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.product.price} = ${(item.qty * item.product.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    {loading && <Spinner animation='border' role='status' style={{display: 'block', width: '100px', height: '100px', position: 'absolute', left: '45%', top: '42%'}} />}
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3>Order Summary</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button className='btn-block' onClick={placeOrderHandler} >Place Order</Button>
                                
                            </ListGroupItem>
                                {error && <Alert variant='dangen' >{error}</Alert>}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </main>
    )
}

export default PlaceOrderPage
