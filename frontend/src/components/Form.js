import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Form = ({ children }) => {
    return (
        <main style={{display: 'flex', alignItems: 'center'}}>
            <Container >
                <Row className='justify-content-md-center' >
                    <Col xs={12} md={6} >
                        {children}
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Form
