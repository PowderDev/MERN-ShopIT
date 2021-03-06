import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { topRatedProducts } from '../redux/actions/productListActions'
import { useDispatch, useSelector } from 'react-redux'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const { products } = useSelector(state => state.topRatedProducts)

    useEffect(() =>{
        dispatch( topRatedProducts() )
    }, [dispatch])

    return (
        <Carousel pause='hover' style={{marginBottom: '3rem'}} className='bg-dark'>
            {products.map(product =>(
                <Carousel.Item key={product._id}  >
                    <Link to={`/products/${product.id}`} >
                        <Carousel.Caption className='carousel-caption'>
                            <h3>{product.name} ({product.price})</h3>
                        </Carousel.Caption>
                        <Image  src={product.image} alt={product.name} fluid />
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
