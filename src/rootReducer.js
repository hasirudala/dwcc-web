import { combineReducers } from 'redux'
import { adminReducer, USER_LOGOUT } from 'react-admin'
import { connectRouter } from 'connected-react-router'


const rootReducer = (history) => combineReducers({
    admin: adminReducer,
    router: connectRouter(history)
    // other reducers
});

export default (adminHistory) => (state, action) =>
    rootReducer(adminHistory)(action.type !== USER_LOGOUT ? state : undefined, action);
