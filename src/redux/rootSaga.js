import { all } from 'redux-saga/effects';
import {AuthSaga} from './auth/authSaga'

export default function* rootSaga() {
    yield all([AuthSaga()]);
}
