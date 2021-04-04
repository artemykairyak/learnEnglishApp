import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import {AddWord} from "./pages/AddWord/AddWord";
import g from './assets/styles/Main.module.scss';
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {getGlobalErrorText, getIsLogged} from "./redux/selectors";
import {Auth} from "./pages/Auth/Auth";
import {authActions} from "./redux/auth/authReducer";
import {store} from "./redux/store";
import {appActions} from "./redux/app/appReducer";
import {Alert} from "./components/Alert/Alert";
import {Test} from "./pages/Test/Test";

export const handleGlobalError = (err: any) => {
    console.log('error', err)
    store.dispatch(appActions.setGlobalErrorTextAC(err.message))
}


export const App: React.FC = () => {
    const logged = useSelector(getIsLogged)
    const dispatch = useDispatch()

    const globalErrorText = useSelector(getGlobalErrorText)

    useEffect(() => {
        dispatch(authActions.checkIsLogged())
    }, [])

    return (
        <>
            {globalErrorText && <Alert title={'Ошибка'} text={globalErrorText} onOK={() => dispatch(appActions.setGlobalErrorTextAC(''))}/>}
            <div className={g.root}>
                {logged ?
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <AddWord/>}
                        />
                        <Route
                            exact
                            path="/test"
                            render={() => <Test/>}
                        />
                    </Switch>
                    : <Auth/>
                }
            </div>
        </>
    );
}

export default App;
