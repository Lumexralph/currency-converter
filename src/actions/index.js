import { SET_AMOUNT, CURRENCY_DATA, SET_BASE, CONVERT_TO, SET_RESULT, SET_DATE, ERROR } from "../constants/action-types";

export function setAmount(payload) {
    return { type: SET_AMOUNT, payload };
};

export function currencyData(payload) {
    return { type: CURRENCY_DATA, payload };
};

export function setBase(payload) {
    return { type: SET_BASE, payload };
};

export function setConvertTo(payload) {
    return { type: CONVERT_TO, payload };
};

export function setResult(payload) {
    return { type: SET_RESULT, payload };
}

export function setDate(payload) {
    return { type: SET_DATE, payload };
}

export function setError(payload) {
    return { type: ERROR, payload };
}