import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Table, Alert, Spinner } from 'react-bootstrap'
import { getUsersList, deleteUser } from '../../redux/actions/userActions'
import { Link } from 'react-router-dom'

const UsersList = ({ history }) => {
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector(state => state.usersList)
    const { userInfo } = useSelector(state => state.user)

    useEffect(() =>{
        if ( !userInfo || !userInfo.isAdmin){
            history.push('/')
        }
        dispatch( getUsersList() )
    }, [dispatch, userInfo, history])

    const deleteUserHandler = (id) =>{
        dispatch( deleteUser(id) )
        window.location.reload()
    }

    return (
        <main>
         <h2>Users</h2>
         {loading ? <Spinner animation='border' role='status' style={{display: 'block', width: '100px', height: '100px', position: 'absolute', left: '45%', top: '42%'}} /> : error ? <Alert variant='danger'>{error}</Alert> :  (
             <Table striped hover responsive bordered className="table-sm">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>NAME</th>
                         <th>EMAIL</th>
                         <th>ADMIN</th>
                         <th>EDIT/DELETE</th>
                     </tr>
                 </thead>
                 <tbody>
                     {users.map(user =>(
                         <tr key={user._id} >
                             <td>{user._id}</td>
                             <td>{user.name}</td>
                             <td>{user.email}</td>
                             <td>
                                 {user.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}} ></i>) : (<i className='fas fa-times' style={{color: 'red'}}></i>)}
                             </td>
                             <td style={{display: 'flex'}}>
                                 <Link to={`/admin/users/${user._id}/edit`}>
                                     <Button disabled={userInfo._id === user._id} style={{margin: 'auto'}} variant='light' className='btn-sm' > <i className='fas fa-edit '></i> </Button>
                                 </Link>
                                 <Button disabled={userInfo._id === user._id} style={{margin: 'auto'}} variant='danger' className='btn-sm' onClick={() => deleteUserHandler(user._id)}>
                                     <i className='fas fa-trash ' ></i>
                                 </Button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </Table>
         )}
        </main>
    )
}

export default UsersList
