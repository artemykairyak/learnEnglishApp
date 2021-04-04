import { all } from 'redux-saga/effects';
import {AuthSaga} from './auth/authSaga'
import {TestSaga} from './test/testSaga'

export default function* rootSaga() {
    yield all([AuthSaga(), TestSaga()]);
}
