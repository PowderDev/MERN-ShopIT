import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import MainPage from './pages/Main/MainPage'
import ProductPage from './pages/Main/ProductPage'
import CartPage from './pages/Main/cartPage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import ProfilePage from './pages/Auth/ProfilePage'
import ShippingPage from './pages/Order/ShippingPage'
import PaymentPage from './pages/Order/PaymentPage'
import PlaceOrderPage from './pages/Order/PlaceOrderPage'
import OrderPage from './pages/Order/OrderPage'
import UsersList from './pages/Admin/UsersList'
import UserEditPage from './pages/Admin/UserEditPage'
import ProductsList from './pages/Admin/ProductsList'
import ProductEditPage from './pages/Admin/ProductEdit'
import OrderList from './pages/Admin/OrderList'
import Reset from './pages/Auth/Reset'
import ReserPasswordPage from './pages/Auth/ResetPassword'

function App() {
  return (
    <>
    <Header />
      <Container>
        <Switch>
          <Route path='/' component={MainPage} exact />
          <Route path='/products/:id' component={ProductPage} />
          <Route path='/cart' component={CartPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/shipping' component={ShippingPage} />
          <Route path='/payment' component={PaymentPage} />
          <Route path='/placeorder' component={PlaceOrderPage} />
          <Route path='/orders/:id' component={OrderPage} />
          <Route path='/admin/users' component={UsersList} exact />
          <Route path='/admin/users/:id/edit' component={UserEditPage} />
          <Route path='/admin/products' component={ProductsList} exact />
          <Route path='/admin/products/:page' component={ProductsList} exact />
          <Route path='/admin/products/:id/edit' component={ProductEditPage} />
          <Route path='/admin/orders' component={OrderList} />
          <Route path='/search/:keyword' component={MainPage} exact />
          <Route path='/search/:keyword/page/:page' component={MainPage}  />
          <Route path='/page/:page' component={MainPage} />
          <Route path='/reset' component={Reset} exact />
          <Route path="/reset/:token" component={ReserPasswordPage} />
        </Switch>
      </Container>
    <Footer />
    </>
  );
}

export default App;
