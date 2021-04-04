import {ActionsTypes} from "../store";

const initialState: InitialStateType = {wordsForTest: [], loading: false}

export const testReducer = (state = initialState, action: AppActionTypes) => {
    switch (action.type) {
        case "TEST/SET_IS_LOADING":
            return {...state, loading: action.isLoading}
        case "TEST/SET_WORDS_FOR_TEST":
            return {...state, wordsForTest: action.words}
        default:
            return state
    }
}

export const testActions = {
    setWordsForTestAC: (words: Array<WordType>) => ({type: 'TEST/SET_WORDS_FOR_TEST', words} as const),
    setIsLoadingAC: (isLoading: boolean) => ({type: 'TEST/SET_IS_LOADING', isLoading} as const),
    getWordsForTestAC: () => ({type: 'TEST/GET_WORDS_FOR_TEST'} as const),
}

type WordType = { id: number, word: string, translate: string }
type InitialStateType = { wordsForTest: Array<WordType>, loading: boolean }
type AppActionTypes = ActionsTypes<typeof testActions>

