import { applyMiddleware, compose, createStore } from "redux"
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { createHashHistory } from 'history'

import { isDevEnv } from "./common/constants";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

export const adminHistory = createHashHistory({ basename: '/admin' })

const configureStore = initialState => {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = (isDevEnv && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const store = createStore(rootReducer(adminHistory),
        initialState,
        composeEnhancers(
            applyMiddleware(
                sagaMiddleware,
                routerMiddleware(adminHistory),
            )
        )
    );

    sagaMiddleware.run(rootSaga);

    return store;
};

export const store = configureStore();
