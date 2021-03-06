import * as types from '../actionTypes'
import axios from 'axios'

export const getListProducts = ( keyword='', page='' ) => async (dispatch) =>{
    try{
        dispatch({ type: types.PRODUCT_LIST_REQUEST })

        const { data } = await axios( `/api/products?keyword=${keyword}&page=${page}` )
        dispatch({
            type: types.PRODUCT_LIST_SUCCESS,
            payload: {
                products: data.products,
                pages: data.pages,
                page: data.page
            }
        })
    } catch(err){
        dispatch({
            type: types.PRODUCT_LIST_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.errorMessage
            }
        })
    }
}

export const getProductDetails = (id) => async (dispatch) =>{
    try{
        dispatch({ type: types.PRODUCT_DETAILS_REQUEST })

        const { data } = await axios( `/api/products/${id}` )

        dispatch({
            type: types.PRODUCT_DETAILS_SUCCESS,
            payload: {
                product: data.product
            }
        })
    } catch(err){
        dispatch({
            type: types.PRODUCT_DETAILS_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.errorMessage
            }
        })
    }
}

export const deleteProduct = (id) => async (dispatch) =>{
    try{
        dispatch({ type: types.PRODUCT_DELETE_REQUEST })

        await axios.delete( `/api/products/${id}` )

        dispatch({
            type: types.PRODUCT_DELETE_SUCCESS,
        })
    } catch(err){
        dispatch({
            type: types.PRODUCT_DELETE_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.errorMessage
            }
        })
    }
}

export const createProduct = (id) => async (dispatch) =>{
    try{
        dispatch({ type: types.PRODUCT_CREATE_REQUEST })

        const { data } = await axios.post( `/api/products`, {})
        
        dispatch({
            type: types.PRODUCT_CREATE_SUCCESS,
            payload: {
                id: data._id
            }
        })
    } catch(err){
        dispatch({
            type: types.PRODUCT_CREATE_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.errorMessage
            }
        })
    }
}

export const updateProduct = (name, price, description, image, brand, category, numInStock, id) => async (dispatch) =>{
    try{
        dispatch({ type: types.PRODUCT_UPDATE_REQUEST })

        const { data } = await axios.put( `/api/products/${id}`, {name, price, description, image, brand, category, numInStock})
        
        dispatch({
            type: types.PRODUCT_UPDATE_SUCCESS,
            payload: {
                update: data._id
            }
        })
    } catch(err){
        dispatch({
            type: types.PRODUCT_UPDATE_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.errorMessage
            }
        })
    }
}

export const reviewADD = (rating, comment, id) => async (dispatch) =>{
    try{
        dispatch({ type: types.PRODUCT_REVIEW_ADD_REQUEST })

        await axios.post( `/api/products/${id}`, {rating, comment})
        
        dispatch({
            type: types.PRODUCT_REVIEW_ADD_SUCCESS,
        })
    } catch(err){
        dispatch({
            type: types.PRODUCT_REVIEW_ADD_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.errorMessage
            }
        })
    }
}

export const topRatedProducts = (rating, comment, id) => async (dispatch) =>{
    try{
        dispatch({ type: types.PRODUCT_TOP_RATED_REQUEST })

        const { data } = await axios( `/api/products/top`)
        
        dispatch({
            type: types.PRODUCT_TOP_RATED_SUCCESS,
            payload: {
                products: data
            }
        })
    } catch(err){
        dispatch({
            type: types.PRODUCT_TOP_RATED_FAIL,
            payload: {
                error: err.response.data.errMessage || err.response.data.errorMessage
            }
        })
    }
}

export const deleteReview = (id, reviewId) => async (dispatch) =>{
        await axios.delete( `/api/products/${id}/reviews/${reviewId}`)
        
        dispatch({
            type: types.PRODUCT_REVIEW_DELETE,
        })

}