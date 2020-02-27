import { SET_AMOUNT, CURRENCY_DATA, SET_BASE, CONVERT_TO, SET_RESULT, SET_DATE, ERROR } from "../constants/action-types";

const initialState = {
    currencies: ["USD", "EUR", "JPY", "GBP"],
    base: "USD",
    amount: "",
    convertTo: "EUR",
    result: "",
    date: "",
    error: false,
    data: null,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CURRENCY_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case SET_AMOUNT:
            return  {
                ...state,
                amount: action.payload,
            };
        case SET_BASE:
            return  {
                ...state,
                base: action.payload,
            };
        case CONVERT_TO:
            return {
                ...state,
                convertTo: action.payload,
            };
        case SET_RESULT:
            return {
                ...state,
                result: action.payload,
            };
        case SET_DATE:
            return {
                ...state,
                date: action.payload,
            };
        case ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
