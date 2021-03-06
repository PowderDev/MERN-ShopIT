import React from 'react'
import { Card, Button } from 'react-bootstrap'
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/actions/cartActions'


const Product = (props) => {
    function description(text){
        return text.substr(0, 40) + "..."
    }
    const dispatch = useDispatch()

    const addToCartHandler = (e) =>{
        const productId = e.target.dataset.id
        dispatch( addToCart(productId, 1) )
    }

    const { product } = props
    return (
        <Card style={{ width: '18rem', position: 'relative' }} className="ml-5 mb-3">
            <Card.Img variant="top" className='product-top-img' src={product.image} />
            <Card.Body>
                <Link to={`/products/${product._id}`} ><Card.Title>{product.name}</Card.Title></Link>
                <Card.Text className='mb-1'>
                    {description(product.description)}
                </Card.Text>
                    <StarRatings rating={product.rating} name='rating' starDimension="18px" starSpacing="5px" starRatedColor="yellow"  />
                <Card.Text>
                    {product.numReviews} reviews
                </Card.Text>
                <Card.Text as='h3' >
                    ${product.price}
                </Card.Text>
                <Button onClick={(e) => addToCartHandler(e)} data-id={product._id} variant="primary" style={{transform: 'translate(130px, -43px)'}}  disabled={ product.numInStock === 0 ? true : false} >Add To Cart</Button>
            </Card.Body>
        </Card>
    )
}

export default Product
