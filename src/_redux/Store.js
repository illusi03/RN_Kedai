import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

import Menu from '../_reducers/Menu'
import Category from '../_reducers/Category'
import Transaction from '../_reducers/Transaction'
import Order from '../_reducers/Order'
import Home from '../_reducers/Home'

// this global states
const reducers = combineReducers({
    Menu,Category,Transaction,Order,Home
})
export default Store = createStore(
    reducers,
    applyMiddleware(promise, logger)
)  