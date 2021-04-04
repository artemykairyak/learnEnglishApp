import {ActionsTypes} from "../store";

const initialState = {logged: false, loading: false, errorText: ''}

export const authReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case "SET_IS_LOGGED":
            return {...state, logged: action.isLogged}
        case "SET_ERROR_TEXT":
            return {...state, errorText: action.errorText}
        case "SET_IS_LOADING":
            return {...state, loading: action.isLoading}
        default:
            return state
    }
}

export const authActions = {
    loginAC: (username: string, password: string) => ({type: 'LOGIN', username, password} as const),
    setIsLoggedAC: (isLogged: boolean) => ({type: 'SET_IS_LOGGED', isLogged} as const),
    setLoadingAC: (isLoading: boolean) => ({type: 'SET_IS_LOADING', isLoading} as const),
    setErrorTextAC: (errorText: string) => ({type: 'SET_ERROR_TEXT', errorText} as const),
    checkIsLogged: () => ({type: 'CHECK_IS_LOGGED'} as const),
}

type AuthActionTypes = ActionsTypes<typeof authActions>

