import {call, put, takeLatest} from '@redux-saga/core/effects'
import AuthAPI from '../../api/authAPI'
import {TOKEN_NAME} from '../../constants'
import {actions} from './authReducer'

function* doLogin(action) {
    yield put(actions.setLoadingAC(true))
    try {
        const {username, password} = action
        const res = yield call(AuthAPI.login, username, password)

        if (res.statusCode === 200) {
            localStorage.setItem(TOKEN_NAME, res.token)
            yield put(actions.setIsLoggedAC(true))
        } else {
            yield put(actions.setErrorTextAC(res.message))
            yield put(actions.setIsLoggedAC(false))
        }
    } catch (err) {
        console.log('catch', err)
        yield put(actions.setErrorTextAC(err.message))
        yield put(actions.setIsLoggedAC(false))
    }
    yield put(actions.setLoadingAC(false))
}

export function* doCheckLogged() {
    yield put(actions.setLoadingAC(true))
    const token = localStorage.getItem(TOKEN_NAME)
    console.log('TOKEN', token)
    if (token) {
        yield put(actions.setIsLoggedAC(true))
    } else {
        yield put(actions.setIsLoggedAC(false))
    }
    yield put(actions.setLoadingAC(false))
}

export function* AuthSaga() {
    yield takeLatest('LOGIN', doLogin)
    yield takeLatest('CHECK_IS_LOGGED', doCheckLogged)
}
