import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Col, FormGroup, FormLabel, FormCheck} from 'react-bootstrap'
import { savePaymentMethod } from '../../redux/actions/cartActions'
import FormContainer from '../../components/Form'
import CheckoutSteps from '../../components/CheckoutSteps'

const PaymentPage = ({ history }) => {
    const shippingInfo = useSelector(state => state.cart.shippingInfo)
    const dispatch = useDispatch()

    if(!shippingInfo){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitForm = (e) =>{
        e.preventDefault()
        dispatch( savePaymentMethod( paymentMethod ) )
        history.push('/placeorder')
    }   

    return (
        <main>
            <CheckoutSteps step1 step2 step3 />
            <FormContainer>
                <h2 className='shiph3' >Payment Method</h2>
                <Form onSubmit={submitForm} >
                    <FormGroup controlId='method' >
                        <FormLabel as='legend' >Select Method</FormLabel>
                        <Col>
                            <FormCheck type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)} />
                        </Col>

                    </FormGroup>

                    <Button type='submit' variant='primary'>Continue</Button>
                </Form>
            </FormContainer>

            
        </main>
    )
}

export default PaymentPage
