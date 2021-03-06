import * as types from '../actionTypes'

const init ={
    products: [],
    loading: true,
    error: '',
    createdProductId: null,
    deleted: false,
    updated: ''
}

export const productDetailsReducer = (state = { product:{ reviews: [] }, updated: null, reviewAdded: false, reviewDeleted: false }, action) =>{
    switch(action.type){
        case types.PRODUCT_DETAILS_REQUEST:
            return {...state, loading: true }

        case types.PRODUCT_DETAILS_SUCCESS: 
            return {...state, product: action.payload.product, loading: false, updated: null, reviewAdded: false, reviewDeleted: false}
        
        case types.PRODUCT_DETAILS_FAIL:
            return {...state, loading: false, error: action.payload.error}  


        case types.PRODUCT_UPDATE_REQUEST:
            return {...state}

        case types.PRODUCT_UPDATE_SUCCESS: 
            return {...state, updated: action.payload.update}
        
        case types.PRODUCT_UPDATE_FAIL:
            return {...state}

        case types.PRODUCT_REVIEW_ADD_REQUEST:
            return {...state}

        case types.PRODUCT_REVIEW_ADD_SUCCESS: 
            return {...state, reviewAdded: true}
        
        case types.PRODUCT_REVIEW_ADD_FAIL:
            return {...state}

        case types.PRODUCT_REVIEW_DELETE: 
            return {...state, reviewDeleted: true }   
            
        default: return state    
    }
}

export const productListReducer = (state = init, action) =>{
    switch(action.type){
        case types.PRODUCT_LIST_REQUEST:
            return {...state, loading: true }

        case types.PRODUCT_LIST_SUCCESS: 
            return {...state, products: action.payload.products,
                    loading: false,
                    createdProductId: null,
                    pages: action.payload.pages,
                    page: action.payload.page}
        
        case types.PRODUCT_LIST_FAIL:
            return {...state, loading: false, error: action.payload.error}
            
        case types.PRODUCT_DELETE_REQUEST:
            return {...state }

        case types.PRODUCT_DELETE_SUCCESS: 
            return {...state, deleted: true}
        
        case types.PRODUCT_DELETE_FAIL:
            return {...state}  


        case types.PRODUCT_CREATE_REQUEST:
            return {...state}

        case types.PRODUCT_CREATE_SUCCESS: 
            return {...state, createdProductId: action.payload.id}
        
        case types.PRODUCT_CREATE_FAIL:
            return {...state} 

        default: return state    
    }
}


export const topRatedProducts = (state = { products:[] }, action) =>{
    switch(action.type){
        case types.PRODUCT_TOP_RATED_REQUEST:
            return {...state, loading: true }

        case types.PRODUCT_TOP_RATED_SUCCESS: 
            return {...state, products: action.payload.products, loading: false}
        
        case types.PRODUCT_TOP_RATED_FAIL:
            return {...state, loading: false, error: action.payload.error} 
            
        default: return state    
    }
}
