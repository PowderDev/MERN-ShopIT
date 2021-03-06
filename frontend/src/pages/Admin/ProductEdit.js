import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, FormControl, FormGroup, FormLabel, Alert, Spinner,  FormFile } from 'react-bootstrap'
import FormContainer from '../../components/Form'
import { getProductDetails, updateProduct } from '../../redux/actions/productListActions'
import axios from 'axios'

const ProductEditPage = ({ match, history }) => {
    const id = match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [numInStock, setNumInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    let {loading, error, userInfo} = useSelector(state => state.user)
    const { product, updated } = useSelector(state => state.productDetails)

    useEffect(() =>{
        if(updated){
            window.location.reload()
        }

        if (!userInfo || !userInfo.isAdmin){
            history.push('/')
        } else{
            dispatch( getProductDetails(id) )
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setNumInStock(product.numInStock)
            setDescription(product.description)
        }
    }, [userInfo, history, dispatch, id, product.price, product.image, product.brand, product.category, product.numInStock, product.description, product.name, updated])

    const submitForm = (e) =>{
        e.preventDefault()
        dispatch( updateProduct(name, price, description, image, brand, category, numInStock, id) )  
    }

    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try{
            const config = { headers: { 'Content-Type': 'multipart/form-data' } }
            const { data } = await axios.post('/api/upload', formData, config)
            setUploading(false)
            setImage(data)
        } catch(err){
            console.log(err);
            setUploading(false)
        }
    }
    

    return (
        <main>
        <Link to='/admin/products' className='btn btn-light my-3' >Go Back</Link>
        <FormContainer>
            <h3>Edit Products</h3>
            {error && <Alert variant='danger'>{error}</Alert>}
            {loading && <Spinner animation='border' role='status' style={{display: 'block', width: '100px', height: '100px', position: 'absolute', left: '45%', top: '42%'}} />}
            <Form onSubmit={submitForm} >
                <FormGroup controlId='name' >
                    <FormLabel>Name</FormLabel>
                    <FormControl type='text' value={name}  onChange={(e) => setName(e.target.value)}  />
                </FormGroup>
                <FormGroup controlId='price' >
                    <FormLabel>Price</FormLabel>
                    <FormControl type='number' value={price} onChange={(e) => setPrice(+e.target.value)}  />
                </FormGroup>
                <FormGroup controlId='image' >
                    <FormLabel>Image</FormLabel>
                    <FormControl type='text' value={image} onChange={(e) => setImage(e.target.value)}  />
                    <FormFile id='image-file' lable='Choose file' onChange={uploadFileHandler} />
                    {uploading && <Spinner animation='border' role='status' />}
                </FormGroup>
                <FormGroup controlId='brand' >
                    <FormLabel>Brand</FormLabel>
                    <FormControl type='text' value={brand} onChange={(e) => setBrand(e.target.value)}  />
                </FormGroup>
                <FormGroup controlId='category' >
                    <FormLabel>Category</FormLabel>
                    <FormControl type='text' value={category} onChange={(e) => setCategory(e.target.value)}  />
                </FormGroup>
                <FormGroup controlId='numInStock' >
                    <FormLabel>NumInStock</FormLabel>
                    <FormControl type='number' value={numInStock} onChange={(e) => setNumInStock(e.target.value)}  />
                </FormGroup>
                <FormGroup controlId='description' >
                    <FormLabel>Description</FormLabel>
                    <FormControl type='text' value={description} onChange={(e) => setDescription(e.target.value)}  />
                </FormGroup> 
                <Button type='submit' variant='primary' >Update</Button>
            </Form>
        </FormContainer>

        </main>

    )
}

export default ProductEditPage
