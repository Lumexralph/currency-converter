import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TopDisplay, {
    ConversionDisplay,
    CurrencySelectionDisplay,
    CurrencySwap
} from "./ConverterComponents";
import {
    setAmount,
    currencyData,
    setBase,
    setConvertTo,
    setResult,
    setDate,
    setError
} from "./actions";

const CurrencyConverter = () => {
    const currencies = useSelector(state => state.currencies);
    const amount = useSelector(state => state.amount);
    const base = useSelector(state => state.base);
    const convertTo = useSelector(state => state.convertTo);
    const result = useSelector(state => state.result);
    const date = useSelector(state => state.date);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();


    const getCurrencyData = useCallback(() => {
        return dispatch => {
            if (Number.isNaN(amount)) {
                return;
            } else {
                fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
                    .then(response => response.json())
                    .then(data => {
                        dispatch(currencyData(data));
                        const date = data.date;
                        const result = (data.rates[convertTo] * amount).toFixed(2);

                        dispatch(setResult(result));
                        dispatch(setDate(date));
                    })
                    .catch(err => {
                        dispatch(setError(true));
                    });

            }
        };
    }, [amount, base, convertTo]);

    useEffect(() => {
        dispatch(getCurrencyData());
    }, [dispatch, getCurrencyData]);

    const handleInput = e => {
        let target = e.target;
        dispatch(setAmount(target.value));
        dispatch(setResult(null));
        dispatch(setDate(null));
    };

    const handleSelect = e => {
        let target = e.target;

        if (target.name === "base") {
            dispatch(setBase(target.value));
        } else {
            dispatch(setConvertTo(target.value));
        }

        dispatch(setResult(null));
    };

    const handleSwap = e => {
        e.preventDefault();
        dispatch(setConvertTo(base));
        dispatch(setBase(convertTo));
        dispatch(setResult(null));
    };

    return (
        error ?
            <h5>Oops! Problem occurred converting your amount</h5>
            :
            <div className="container">
                <div className="row">
                    <div>
                        <TopDisplay
                            amount={amount}
                            base={base}
                        />
                        <ConversionDisplay
                            amount={amount}
                            result={result}
                            convertTo={convertTo}
                            date={date}
                        />
                        <div className="row">
                            <div className="col-lg-10">
                                <CurrencySelectionDisplay
                                    type={"number"}
                                    name={"base"}
                                    amount={amount}
                                    disabled={false}
                                    onInput={handleInput}
                                    onSelect={handleSelect}
                                    convertTo={base}
                                    currencies={currencies}
                                />

                                <CurrencySelectionDisplay
                                    type={"number"}
                                    name={"convertTo"}
                                    amount={
                                        amount === ""
                                            ? "0"
                                            : result === null
                                                ? "Calculating..."
                                                : result
                                    }
                                    disabled={true}
                                    onInput={null}
                                    onSelect={handleSelect}
                                    convertTo={convertTo}
                                    currencies={currencies}
                                />
                            </div>

                            <CurrencySwap
                                onSwap={handleSwap}
                            />
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default CurrencyConverter;
