import { combineReducers } from 'redux'
import { adminReducer } from 'react-admin'
import { connectRouter } from 'connected-react-router'


export default (history) => combineReducers({
    admin: adminReducer,
    router: connectRouter(history)
    // other reducers
});
