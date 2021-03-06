import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, ListGroup, ListGroupItem, Image, Card, Spinner, Alert, Button,} from 'react-bootstrap'
import { getOrderById, orderPay, updateOrdersToDelivered } from '../../redux/actions/orderActions'
import { Link } from 'react-router-dom'

const OrderPage = ({ match }) => {
    const dispatch = useDispatch()

    
    const { orderDetails, error, loading } = useSelector(state => state.orderDetails)
    const { success: successDelivered } = useSelector(state => state.orderDelivered)
    const { userInfo } = useSelector(state => state.user)

    useEffect(() =>{
        if (successDelivered){
            window.location.reload()
        }

        dispatch( getOrderById(match.params.id) )
    }, [dispatch, match.params.id, successDelivered])

    const payHandler = () =>{
        dispatch( orderPay(match.params.id) )
    }

    const deliverHandler = () =>{
        dispatch( updateOrdersToDelivered(match.params.id) )
    }

    return (
        <main>
            {loading ? <Spinner animation='border' role='status' style={{display: 'block', width: '100px', height: '100px', position: 'absolute', left: '45%', top: '42%'}} /> : error ? <Alert variant='danger'>{error}</Alert> :  (
            <Row style={{ marginTop: '50px' }} >
                <Col md={8}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <div className="userOrder">
                                <p>{orderDetails.user.name}</p>                         
                                <p>{orderDetails.user.email}</p>
                            </div>
                            <p>
                                <strong>Address: </strong>
                                {orderDetails.shippingInfo.address}, {orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.country}, {orderDetails.shippingInfo.postalCode}
                            </p>
                            {orderDetails.isDelivered ? <Alert className='paidAlert'  variant='success' >Delivered on {orderDetails.deliveredAt.substr(0, 10)}</Alert> : <Alert className='paidAlert' variant='danger' >Not Delivered</Alert>}
                        </ListGroup.Item>
                        <ListGroupItem>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>Method: </strong>
                                { orderDetails.paymentMethod }
                            </p>
                            {orderDetails.isPaid ? <Alert className='paidAlert'  variant='success' >Paid on {orderDetails.paidAt.substr(0, 10)}</Alert> : <Alert className='paidAlert' variant='danger' >Not Paid</Alert>}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h3>Order Items</h3>
                            {orderDetails.orderItems.length === 0 ? <Alert variant='danger'>Ваш заказ пуст</Alert> : (
                                <ListGroup variant='flush' >
                                    {orderDetails.orderItems.map((item, i) => (
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
                                    <Col>${orderDetails.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${orderDetails.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${orderDetails.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${orderDetails.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button variant='info' onClick={payHandler} >
                                    Buy (${orderDetails.totalPrice})
                                </Button>
                            </ListGroupItem>

                            {userInfo.isAdmin && orderDetails.isPaid && !orderDetails.isDelivered && (
                                <ListGroupItem>
                                    <Button className='btn btn-block' onClick={deliverHandler} >Make as Delivered</Button>
                                </ListGroupItem>
                            )}

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}

        </main>
    )
}

export default OrderPage
