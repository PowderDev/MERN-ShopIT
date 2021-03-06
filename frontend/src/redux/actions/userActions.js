import * as types from '../actionTypes'
import axios from 'axios'

export const login = ( email, password ) =>  async (dispatch) =>{
    try{
        dispatch({
            type: types.USER_LOGIN_REQUEST
        })

        const { data } = await axios.post('/api/users/login', { email, password })

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: {
                userInfo: data.user
            }
        })

        localStorage.setItem('userInfo', JSON.stringify(data.user))

    } catch(err){
        dispatch({
            type: types.USER_LOGIN_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}

export const logout = () => async (dispatch) =>{
    await axios.post('/api/users/logout')

    localStorage.removeItem('userInfo')
    
    dispatch({type: types.USER_LOGOUT})
    dispatch({type: types.USER_LIST_RESET})
}

export const register = ( email, password, name ) =>  async (dispatch) =>{
    try{
        dispatch({
            type: types.USER_REGISTER_REQUEST
        })

        const { data } = await axios.post('/api/users/register', { email, password, name })

        dispatch({
            type: types.USER_REGISTER_SUCCESS,
            payload: {
                userInfo: data.user
            }
        })

        localStorage.setItem('userInfo', JSON.stringify(data.user))

    } catch(err){
        dispatch({
            type: types.USER_REGISTER_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}

export const updateProfile = (email, password, name, newPassword) => async (dispatch) =>{
    try{
        dispatch({
            type: types.USER_REGISTER_REQUEST
        })

        const { data } = await axios.put('/api/users/profile/update', { email, password, name, newPassword })

        dispatch({
            type: types.USER_REGISTER_SUCCESS,
            payload: {
                userInfo: data.updatedUser
            }
        })

        localStorage.setItem('userInfo', JSON.stringify(data.updatedUser))

    } catch(err){
        dispatch({
            type: types.USER_REGISTER_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}

export const getUsersList = () => async (dispatch) =>{
    try{
        dispatch({
            type: types.USER_LIST_REQUEST
        })

        const { data } = await axios.get('/api/users')
        
        dispatch({
            type: types.USER_LIST_SUCCESS,
            payload: {
                users: data
            }
        })

    } catch(err){
        dispatch({
            type: types.USER_LIST_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}

export const deleteUser = (id) => async (dispatch) =>{
    try{
        dispatch({type: types.USER_DELETE_REQUEST})

        await axios.delete(`/api/users/${id}`)
        
        dispatch({type: types.USER_DELETE_SUCCESS})

    } catch(err){
        dispatch({
            type: types.USER_DELETE_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}


export const updateUser = (name, email, isAdmin, id) => async (dispatch) =>{
    try{
        dispatch({type: types.USER_UPDATE_REQUEST})

        await axios.put(`/api/users/${id}`, {name, email, isAdmin})
        
        dispatch({
            type: types.USER_UPDATE_SUCCESS
        })


    } catch(err){
        dispatch({
            type: types.USER_UPDATE_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}


export const userById = (id) => async (dispatch) =>{
    try{
        dispatch({type: types.USER_BY_ID_REQUEST})

        const {data} = await axios.get(`/api/users/${id}`)
        
        dispatch({type: types.USER_BY_ID_SUCCESS,
            payload: {
                user: data.user
            }
        })

    } catch(err){
        dispatch({
            type: types.USER_BY_ID_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}

export const resetPasswordFirst = (email) => async (dispatch) =>{
    try{
        dispatch({type: types.USER_RESET_PASSWORD_STAGE_1_REQUEST})

        await axios.post(`/api/users/password/forgot`, { email })
        
        dispatch({
            type: types.USER_RESET_PASSWORD_STAGE_1_SUCCESS
        })


    } catch(err){
        dispatch({
            type: types.USER_RESET_PASSWORD_STAGE_1_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}

export const resetPasswordSecond = (password, confirmpassword, token) => async (dispatch) =>{
    try{
        dispatch({type: types.USER_RESET_PASSWORD_STAGE_2_REQUEST})

        await axios.put(`/api/users/password/reset/${token}`, { password, confirmpassword })
        
        dispatch({
            type: types.USER_RESET_PASSWORD_STAGE_2_SUCCESS
        })


    } catch(err){
        dispatch({
            type: types.USER_RESET_PASSWORD_STAGE_2_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.message
            }
        })
    }
}

