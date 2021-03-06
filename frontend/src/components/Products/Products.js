import React, {useEffect} from 'react'
import { Row } from 'react-bootstrap'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { getListProducts } from '../../redux/actions/productListActions'
import { Spinner, Alert } from 'react-bootstrap'
import Paginate from '../Paginate'
import ProductCarousel from '../ProductCarousel'

const Products = ({ match }) => {
    const keyword = match.params.keyword
    const pageNum = match.params.page || 1

    const dispatch = useDispatch()
    const {products, error, loading, pages, page } = useSelector( state => state.productList )

    useEffect(() =>{
        dispatch( getListProducts(keyword, pageNum) )
    }, [dispatch, keyword, pageNum])


    return (
        <>
        {!keyword && <ProductCarousel  />}
            {loading ? <Spinner animation='border' role='status' style={{ width: '120px', height: '120px', margin: 'auto', display: 'block' }} /> 
             : error ?
              <Alert variant='danger' >{error}</Alert>
             :
                <>
                    <Row className='mr-2' >
                        {products.map(item =>(
                            <Product product={item} key={item._id} />
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword} />
                </>
            }
        </>
    ) 
}

export default Products
