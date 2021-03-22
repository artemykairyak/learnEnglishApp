import {AppStateType} from "./store";

export const getIsLogged = (state: AppStateType) => state.auth.logged
export const getAuthErrorText = (state: AppStateType) => state.auth.errorText
export const getAuthLoading = (state: AppStateType) => state.auth.loading
