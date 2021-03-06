import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap'
import { saveShippingInfo } from '../../redux/actions/cartActions'
import FormContainer from '../../components/Form'
import CheckoutSteps from '../../components/CheckoutSteps'

const ShippingPage = ({ history }) => {
    const shippingInfo = useSelector(state => state.cart.shippingInfo)

    const dispatch = useDispatch()
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [country, setCountry] = useState(shippingInfo.country)


    const submitForm = (e) =>{
        e.preventDefault()
        dispatch( saveShippingInfo({ address, city, postalCode, country }) )
        history.push('/payment')
    }   

    return (
        <main>
            <CheckoutSteps step1 step2 />
            <FormContainer>
                <h2 className='shiph3' >Shipping</h2>
                <Form onSubmit={submitForm} >
                    <FormGroup controlId='address' >
                        <FormLabel>Address</FormLabel>
                        <FormControl type='text' placeholder='Enter your address'  value={address} onChange={(e) => setAddress(e.target.value)} required  />
                    </FormGroup>
                    <FormGroup controlId='city' >
                        <FormLabel>City</FormLabel>
                        <FormControl type='text' placeholder='Enter your city'  value={city} onChange={(e) => setCity(e.target.value)} required />
                    </FormGroup>
                    <FormGroup controlId='postalCode' >
                        <FormLabel>PostalCode</FormLabel>
                        <FormControl type='text' placeholder='Enter postalCode'  value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </FormGroup>
                    <FormGroup controlId='country' >
                        <FormLabel>Country</FormLabel>
                        <FormControl type='text' placeholder='Enter confirm country'  value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </FormGroup>
                    <Button type='submit' variant='primary'>Continue</Button>
                </Form>
            </FormContainer>
        </main>
    )
}

export default ShippingPage
