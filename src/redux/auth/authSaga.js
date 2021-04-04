import {call, put, takeLatest} from '@redux-saga/core/effects'
import AuthAPI from '../../api/authAPI'
import {TOKEN_NAME} from '../../constants'
import {authActions} from './authReducer'

function* doLogin(action) {
    yield put(authActions.setLoadingAC(true))
    try {
        const {username, password} = action
        const res = yield call(AuthAPI.login, username, password)

        if (res.statusCode === 200) {
            localStorage.setItem(TOKEN_NAME, res.token)
            yield put(authActions.setIsLoggedAC(true))
        } else {
            yield put(authActions.setErrorTextAC(res.message))
            yield put(authActions.setIsLoggedAC(false))
        }
    } catch (err) {
        console.log('catch', err)
        yield put(authActions.setErrorTextAC(err.message))
        yield put(authActions.setIsLoggedAC(false))
    }
    yield put(authActions.setLoadingAC(false))
}

export function* doCheckLogged() {
    yield put(authActions.setLoadingAC(true))
    const token = localStorage.getItem(TOKEN_NAME)
    console.log('TOKEN', token)
    if (token) {
        yield put(authActions.setIsLoggedAC(true))
    } else {
        yield put(authActions.setIsLoggedAC(false))
    }
    yield put(authActions.setLoadingAC(false))
}

export function* AuthSaga() {
    yield takeLatest('LOGIN', doLogin)
    yield takeLatest('CHECK_IS_LOGGED', doCheckLogged)
}
