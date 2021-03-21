import {call, put, takeLatest} from '@redux-saga/core/effects'
import AuthAPI from '../../api/authAPI'
import {TOKEN_NAME} from '../../constants'
import {actions} from './authReducer'

function* doLogin(action) {
    console.log(action)
    // yield put(setLoadingAC(true))
    try {
        const {username, password} = action
        const res = yield call(AuthAPI.login, username, password)

        if (res.statusCode === 200) {
            console.log('if');
            localStorage.setItem(TOKEN_NAME, res.token)
            yield put(actions.setIsLoggedAC(true))
        } else {
            console.log('else');

            localStorage.setItem(TOKEN_NAME, JSON.stringify(res.token))
            // yield put(setTokenAC(res.accessToken))
            // yield put(setLoggedAC(true))
        }
    } catch (err) {
        console.log('catch', err)
        // yield put(setErrorAC)
    }
    // yield put(setLoadingAC(false))
}

// export function* doCheckLogged() {
//     yield put(setLoadingAC(true))
//     const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA_NAME))?.token
//     console.log('TOKEN', token)
//     try {
//         const res = yield call(AuthAPI.checkToken, token)
// //todo: camelcase
//         if (res.StatusCode) {
//             yield put(setLoggedAC(false))
//         } else {
//             yield put(setTokenAC(token))
//             yield put(setLoggedAC(true))
//         }
//     } catch (err) {
//         console.log('catch', err)
//     }
//     yield put(setLoadingAC(false))
// }

export function* AuthSaga() {
    yield takeLatest(actions.loginAC, doLogin)
    // yield takeLatest(CHECK_LOGGED, doCheckLogged)
}
