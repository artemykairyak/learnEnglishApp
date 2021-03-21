import {ActionsTypes} from "../store";

type InitialStateType = {logged: boolean}

const initialState: InitialStateType = {logged: false}

export const authReducer = (state = initialState, action: AuthActionTypes): InitialStateType => {
    switch(action.type) {
        case "SET_IS_LOGGED":
            console.log('here', action)
            return {
                ...state,
                logged: action.isLogged
            }
        default:
            return state
    }
}

export const actions = {
    loginAC: (username: string, password: string) => ({type: 'LOGIN', username, password} as const),
    setIsLoggedAC: (isLogged: boolean) => ({type: 'SET_IS_LOGGED', isLogged} as const),
}

type AuthActionTypes = ActionsTypes<typeof actions>

