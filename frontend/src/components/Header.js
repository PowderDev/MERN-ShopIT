import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/userActions'
import SearchBox from './SearchBox'
import { Route } from 'react-router-dom'

const Header = () => {

    const cartItems = useSelector(state => state.cart.cartItems)
    const userInfo = useSelector(state => state.user.userInfo)

    const notifNum = cartItems.length

    const dispatch = useDispatch()

    const logoutHandler =() =>{
        dispatch( logout() )
    }

    return (
        <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect >
            <Container>
                <LinkContainer to='/' >
                    <Navbar.Brand >ShopIT</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Route render={({ history }) => <SearchBox history={history} />} />
                    <Nav className="ml-auto">
                        <NavLink to='/cart' activeStyle={{color: 'white'}} ><i className='fas fa-shopping-cart'></i>Cart{notifNum > 0 ? <span className='notif'>{notifNum}</span> : null}</NavLink>
                        {!userInfo ? <NavLink to='/login' activeStyle={{color: 'white'}} ><i className='fas fa-user'></i>Sign in</NavLink> : null}

                        {userInfo ? <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile' >
                                <NavDropdown.Item style={{color: 'black', background: 'white'}} >Profile</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer activeStyle={{color: 'black', background: 'white'}} to='/logout'>
                            <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown> : null}

                        { userInfo && userInfo.isAdmin ? <NavDropdown title='AdminPanel' id='adminmenu'>
                            <LinkContainer to='/admin/users' >
                                <NavDropdown.Item active={false} >Users</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/products' >
                                <NavDropdown.Item active={false} >Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/orders' >
                                <NavDropdown.Item active={false} >Orders</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown> : null}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
}

export default Header
