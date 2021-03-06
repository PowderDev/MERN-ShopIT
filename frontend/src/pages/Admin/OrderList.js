import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Table, Alert, Spinner } from 'react-bootstrap'
import { getAllOrders } from '../../redux/actions/orderActions'
import { Link } from 'react-router-dom'

const  OrderList = ({ history }) => {
    const dispatch = useDispatch()
    const { orders, loading, error } = useSelector(state => state.orderList)
    const { userInfo } = useSelector(state => state.user)

    useEffect(() =>{
        if ( !userInfo || !userInfo.isAdmin){
            history.push('/')
        }
        dispatch( getAllOrders() )
    }, [dispatch, userInfo, history])

    return (
        <main>
         <h2>Orders</h2>
         {loading ? <Spinner animation='border' role='status' style={{display: 'block', width: '100px', height: '100px', position: 'absolute', left: '45%', top: '42%'}} /> : error ? <Alert variant='danger'>{error}</Alert> :  (
             <Table striped hover responsive bordered className="table-sm">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>USER</th>
                         <th>DATE</th>
                         <th>TOTAL</th>
                         <th>PAID</th>
                         <th>DELIVERED</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {orders.map(order =>(
                         <tr key={order._id} >
                             <td style={{ padding:' .9rem'}}>{order._id}</td>
                             <td style={{ padding:' .9rem'}}>{order.user.name}</td>
                             <td style={{ padding:' .9rem'}}>{order.createdAt.substr(0, 10)}</td>
                             <td style={{ padding:' .9rem'}}>${order.totalPrice}</td>
                             <td style={{ padding:' .9rem'}}>
                                 {order.isPaid ? (order.paidAt.substr(0, 10)) : (<i className='fas fa-times fa-2x' style={{color: 'red'}}></i>)}
                             </td>
                            <td style={{display: 'flex', justifyContent: 'center'}}>
                                 {order.isDelivered ? (order.deliveredAt.substr(0, 10)) : (<i   className='fas fa-times fa-2x' style={{color: 'red'}}></i>)}
                             </td>
                             <td >
                                 <Link to={`/orders/${order._id}`}>
                                     <Button style={{margin: 'auto'}} variant='light' className='btn-sm' > Details </Button>
                                 </Link>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </Table>
         )}
        </main>
    )
}

export default OrderList
