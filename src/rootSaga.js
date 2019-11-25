import { all, fork } from 'redux-saga/effects';
import { adminSaga } from 'react-admin';

import { authProvider, dataProvider } from './admin';


export default function* rootSaga() {
    yield all([
        adminSaga(dataProvider, authProvider),
        // other sagas
    ].map(fork));
}
