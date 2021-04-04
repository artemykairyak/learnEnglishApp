import {call, put, takeEvery, takeLatest} from '@redux-saga/core/effects'
import WordsAPI from '../../api/wordsAPI'
import {testActions} from './testReducer'
import {appActions} from '../app/appReducer'

function* doGetWordsForTest(action) {
    try {
        const res = yield call(WordsAPI.getWordsForTest)
        console.log(res)

        if (res.statusCode === 200) {
            yield put(testActions.setWordsForTestAC(res.words))
        } else {
            yield put(appActions.setGlobalErrorTextAC(res.message))
        }
    } catch (err) {
        console.log('catch', err)
        yield put(appActions.setGlobalErrorTextAC(err?.message))
    }
}

export function* TestSaga() {
    yield takeEvery('TEST/GET_WORDS_FOR_TEST', doGetWordsForTest)
}
