import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {authReducer} from './auth/authReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./rootSaga";
import {appReducer} from "./app/appReducer";
import {testReducer} from "./test/testReducer";

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    test: testReducer
})

export const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type InferActionTypes<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<InferActionTypes<T>>



