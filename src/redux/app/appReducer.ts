import {ActionsTypes} from "../store";
import {INITIAL_LOADABLE_STATE, withLoadable} from "../HORs/WithLoadable";

const initialState = {globalErrorText: '', ...INITIAL_LOADABLE_STATE}

export const appReducer = (state = initialState, action: AppActionTypes) => {
    switch (action.type) {
        case "SET_GLOBAL_ERROR_TEXT":
            return {...state, globalErrorText: action.errorText}
        default:
            return state
    }
}

export const appActions = {
    setGlobalErrorTextAC: (errorText: string) => ({type: 'SET_GLOBAL_ERROR_TEXT', errorText} as const),
}

// export const appReducer = withLoadable({
//     isLoadingAction: 'APP/IS_LOADING',
//     successAction: 'APP/SUCCESS',
//     errorAction: 'APP/ERROR'
// })(baseAppReducer)


type AppActionTypes = ActionsTypes<typeof appActions>

