import {combineReducers} from 'redux'
import {authReducer} from './auth/authReducer'
import {applyMiddleware, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    auth: authReducer,
})

export const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type InferActionTypes<T> = T extends {[key: string]: infer U} ? U : never
export type ActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<InferActionTypes<T>>



