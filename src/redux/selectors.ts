import {AppStateType} from "./store";

export const getIsLogged = (state: AppStateType) => state.auth.logged
