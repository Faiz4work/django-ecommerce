import { createStore , combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({})

const initialState = {}

const middleWares = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleWares)))


export default store