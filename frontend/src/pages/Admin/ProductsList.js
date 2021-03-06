import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Table, Alert, Spinner, Row, Col } from 'react-bootstrap'
import { getListProducts, deleteProduct, createProduct } from '../../redux/actions/productListActions'
import { Link } from 'react-router-dom'
import Paginate from '../../components/Paginate'


const ProductsList = ({ history, match }) => {
    const pageNum = match.params.page || 1
    
    const dispatch = useDispatch()
    const { products, loading, error, createdProductId, deleted, pages, page } = useSelector(state => state.productList)
    const { userInfo } = useSelector(state => state.user)

    useEffect(() =>{
        if (createdProductId){
            history.push(`/admin/products/${createdProductId}/edit`)
        }

        if(deleted){
            window.location.reload()
        }

        if ( !userInfo || !userInfo.isAdmin){
            history.push('/')
        }
        dispatch( getListProducts('', pageNum) )
    }, [dispatch, userInfo, history, createdProductId, deleted, pageNum])

    const deleteProductHandler = (id) =>{
        dispatch( deleteProduct(id) )
    }

    const createProductHandler = () => {
        dispatch( createProduct() )
    }

    return (
        <main>
            <Row className='align-items-center'>
                <Col>
                    <h2>Products</h2>
                </Col>
                <Col className='text-right' >
                    <Button className='my-3' onClick={createProductHandler} >
                        <i className='fas fa-plus' ></i>
                    </Button>
                </Col>
            </Row>
         {loading ? <Spinner animation='border' role='status' style={{display: 'block', width: '100px', height: '100px', position: 'absolute', left: '45%', top: '42%'}} /> : error ? <Alert variant='danger'>{error}</Alert> :  (
            <>    
             <Table striped hover responsive bordered className="table-sm">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>NAME</th>
                         <th>PRICE</th>
                         <th>CATEGORY</th>
                         <th>BRAND</th>
                         <th>EDIT/DELETE</th>
                     </tr>
                 </thead>
                 <tbody>
                     {products.map(product =>(
                         <tr key={product._id} >
                             <td>{product._id}</td>
                             <td>{product.name}</td>
                             <td>${product.price}</td>
                             <td>
                                 {product.category}
                             </td>
                             <td>{product.brand}</td>
                             <td style={{display: 'flex'}}>
                                 <Link to={`/admin/products/${product._id}/edit`}>
                                     <Button style={{margin: 'auto'}} variant='light' className='btn-sm' > <i className='fas fa-edit '></i> </Button>
                                 </Link>
                                 <Button style={{margin: 'auto'}} variant='danger' className='btn-sm' onClick={() => deleteProductHandler(product._id)}>
                                     <i className='fas fa-trash' ></i>
                                 </Button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </Table>

            <Paginate pages={pages} page={page} isAdmin={true}  />
             </>
         )}
        </main>
    )
}

export default ProductsList
