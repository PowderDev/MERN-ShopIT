import * as types from '../actionTypes'

const init ={
    loading: false,
    error: '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
}



export const userReducer = (state = init , action) =>{
    switch(action.type){
        case types.USER_LOGIN_REQUEST:
            return {...state, loading: true }

        case types.USER_LOGIN_SUCCESS: 
            return {...state, userInfo: action.payload.userInfo, loading: false, error: ''}
        
        case types.USER_LOGIN_FAIL:
            return {...state, loading: false, error: action.payload.error}   

        case types.USER_LOGOUT:
            return {} 
            
        case types.USER_REGISTER_REQUEST:
            return {...state, loading: true }

        case types.USER_REGISTER_SUCCESS: 
            return {...state, userInfo: action.payload.userInfo, loading: false, error: ''}
        
        case types.USER_REGISTER_FAIL:
            return {...state, loading: false, error: action.payload.error}   
            
        case types.USER_UPDATE_REQUEST:
            return {...state, loading: true }

        case types.USER_UPDATE_SUCCESS: 
            return {...state, loading: false, error: ''}
        
        case types.USER_UPDATE_FAIL:
            return {...state, loading: false, error: action.payload.error}   

        case types.USER_UPDATE_RESET:
            return { users: [] }

        default: return state    
    }
}

export const getAllUsers = (state = { users: [] } , action) =>{
    switch(action.type){
        case types.USER_LIST_REQUEST:
            return {...state, loading: true }

        case types.USER_LIST_SUCCESS: 
            return {...state, users: action.payload.users, loading: false, error: ''}
        
        case types.USER_LIST_FAIL:
            return {...state, loading: false, error: action.payload.error}   

        case types.USER_LIST_RESET:
            return { users: [] }

        case types.USER_DELETE_REQUEST:
            return state

        case types.USER_DELETE_SUCCESS: 
            return {...state, error: '', success: true}
        
        case types.USER_DELETE_FAIL:
            return {...state, error: action.payload.error} 

        default: return state    
    }
}

export const getUserById = (state = { user: {} }, action) =>{
    switch(action.type){
        case types.USER_BY_ID_REQUEST:
            return {...state, loading: true }

        case types.USER_BY_ID_SUCCESS: 
            return {...state, user: action.payload.user, loading: false, error: ''}
        
        case types.USER_BY_ID_FAIL:
            return {...state, loading: false, error: action.payload.error}   

        default: return state
    }
}

export const resetPassword = (state = {  }, action) =>{
    switch(action.type){
        case types.USER_RESET_PASSWORD_STAGE_1_REQUEST:
            return {...state, loading: true }

        case types.USER_RESET_PASSWORD_STAGE_1_SUCCESS: 
            return {...state, loading: false, success: 'The email was sent successfully', error: ''}
        
        case types.USER_RESET_PASSWORD_STAGE_1_FAIL:
            return {...state, loading: false, error: action.payload.error}   

        case types.USER_RESET_PASSWORD_STAGE_2_REQUEST:
            return {...state, loading: true }

        case types.USER_RESET_PASSWORD_STAGE_2_SUCCESS: 
            return {...state, loading: false, success: 'The password was reseted successfully', error: ''}
        
        case types.USER_RESET_PASSWORD_STAGE_2_FAIL:
            return {...state, loading: false, error: action.payload.error}   

        default: return state
    }
}