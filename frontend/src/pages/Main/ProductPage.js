import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Rating from 'react-star-ratings'
import { Col, Card, Image, ListGroup, ListGroupItem, Row, Button, FormControl, Form, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Alert } from 'react-bootstrap'
import { addToCart } from '../../redux/actions/cartActions'
import { getProductDetails, reviewADD, deleteReview } from '../../redux/actions/productListActions'


const ProductPage = ({ match, history }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const { product, loading, error, reviewAdded, reviewDeleted } = useSelector(state => state.productDetails)
    const { userInfo } = useSelector(state => state.user)

    useEffect(() =>{
        if(reviewAdded || reviewDeleted){
            setRating(0)
            setComment('')
        }


        dispatch( getProductDetails(match.params.id) )
    }, [dispatch, match.params.id, reviewAdded, reviewDeleted])

    const addToCartHandler = () =>{
        dispatch( addToCart(product._id, qty) )
    }

    const submitReview = (e) =>{
        e.preventDefault()
        dispatch( reviewADD(rating, comment, match.params.id) )
    }

    const deleteReviewHandler = (e, reviewId, prodID) => {
        dispatch( deleteReview(prodID, reviewId) )
    }

    return (
        <main>
            <Link className='btn btn-light my-3' to='/' >Go Back</Link>
            {loading ? <Spinner animation='border' role='status' style={{display: 'block', width: '100px', height: '100px', position: 'absolute', left: '45%', top: '42%'}} /> : error ? <Alert variant='danger' >{error}</Alert> :(
                <>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={6}>
                        <ListGroup variant='flush' >
                            <ListGroupItem>
                                <h2>{product.name}</h2>
                            </ListGroupItem>
                            <ListGroupItem style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} > 
                                <Rating rating={product.rating} name='rating' starDimension="40px" starSpacing="10px" starRatedColor="yellow"  />
                                {product.numReviews} reviews
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: ${product.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                {product.description}
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card>
                                    <ListGroup variant='flush' >
                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Price: 
                                                </Col>
                                                <Col>
                                                    {product.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Status: 
                                                </Col>
                                                <Col>
                                                    {product.numInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>

                                        {product.numInStock > 0 ? (
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Quantity</Col>
                                                    <Col>
                                                        <FormControl as='select' value={qty} onChange={(e) => setQty(+e.target.value)}>
                                                            {[...Array(product.numInStock).keys()].map(op =>(
                                                                <option key={op + 1} value={op + 1} >{op + 1}</option>
                                                            ))}
                                                        </FormControl>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ) : null }

                                        <ListGroupItem>
                                            <Button onClick={addToCartHandler} className='btn-block' type='button'  disabled={product.numInStock > 0 ? false : true}>
                                                Add to Cart
                                                </Button>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} >
                        <h3>Reviews</h3>
                        {product.reviews.length === 0 && <Alert variant='info'>No Reviews</Alert>}
                        <ListGroup  variant='flush' >
                                <ListGroupItem>
                                    <h4>Write a Review</h4>
                                    {userInfo ? (
                                        <Form onSubmit={submitReview}>
                                            <FormGroup controlId='rating' >
                                                <FormLabel>Rating</FormLabel>
                                                <FormControl as='select' value={rating} onChange={(e) => setRating(e.target.value)} >
                                                    <option disabled >Select...</option>
                                                    <option  value='1' >1 - Poor</option>
                                                    <option  value='2' >2 - Fair</option>
                                                    <option  value='3' >3 - Fine</option>
                                                    <option  value='4' >4 - Good</option>
                                                    <option  value='5' >5 - Excellent</option>
                                                </FormControl>
                                            </FormGroup>
                                            <FormGroup controlId='comment' >
                                                <FormLabel>Comment</FormLabel>
                                                <FormControl as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></FormControl>
                                            </FormGroup>
                                            <Button type='submit' variant='primary' >Submit</Button>
                                        </Form>


                                    ) : <Alert><Link to='/login'>Sing in</Link> to write a review </Alert>}
                                </ListGroupItem>

                                {product.reviews.map(review =>(
                                   <ListGroupItem style={{ border: '1px solid black', marginBottom: '7px' }}  key={review._id} >
                                        <div className="review-top">
                                            <strong>{review.name}</strong>
                                            <Rating rating={review.rating} name='rating' starDimension="18px" starSpacing="5px" starRatedColor="yellow" />
                                            <i className='fas fa-trash' onClick={(e) => deleteReviewHandler(e, review._id, product._id)} ></i> 
                                        </div>

                                        <div className="comment">
                                            <p>{review.comment}</p>
                                        </div>

                                        <div className="createdAtReview">
                                            <p>{review.createdAt.substr(0, 10)}</p>
                                        </div>
                                   </ListGroupItem>
                                ))}                           
                        </ListGroup>
                    </Col>                                              
                </Row>
                
                </>
            )}
        </main>
    )
}

export default ProductPage
