import { createStore , combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
})

const initialState = {}

const middleWares = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleWares)))


export default store