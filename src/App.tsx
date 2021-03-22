import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {AddWord} from "./pages/AddWord/AddWord";
import g from './assets/styles/Main.module.scss';
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {getIsLogged} from "./redux/selectors";
import {Auth} from "./pages/Auth/Auth";
import {actions} from "./redux/auth/authReducer";

export const App: React.FC = () => {
    const logged = useSelector(getIsLogged)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.checkIsLogged())
    },[])

    useEffect(() => {
        console.log(logged)
    }, [logged])
    return (
        <div className={g.root}>
            {logged ?
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <AddWord/>}
                    />
                </Switch>
                : <Auth/>
            }
        </div>
    );
}

export default App;
