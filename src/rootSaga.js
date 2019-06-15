import { all, fork } from 'redux-saga/effects';
import { adminSaga, defaultI18nProvider } from 'react-admin';

import { authProvider, dataProvider as springDataProvider } from './admin';

const dataProvider = springDataProvider('/api');
const i18nProvider = defaultI18nProvider;


export default function* rootSaga() {
    yield all([
        adminSaga(dataProvider, authProvider, i18nProvider),
        // other sagas
    ].map(fork));
}
