import React from 'react'
import { Container } from 'react-bootstrap'
import Products from '../../components/Products/Products'
import { Route } from 'react-router-dom'

function MainPage() {
  return (
    <>
      <main className='py-3'>
        <Container>
            <h1 style={{padding: '2rem'}} >Welcome to ShopIT</h1>
            <Route render={({ match }) => <Products match={match} />} />
            
        </Container>
      </main>
    </>
  );
}

export default MainPage;
