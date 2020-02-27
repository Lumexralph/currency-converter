import React, { Fragment } from "react";

const TopDisplay = ({ amount, base }) => {
    return (<h5>{amount} {base} is equivalent to:</h5>);
};

const ConversionDisplay = ({ amount, result, convertTo, date }) => {
    return (
        <Fragment>
            <h2>
                {
                    amount === ""
                        ? "0"
                        : result === null
                            ? "Calculating..."
                            : result
                }
                {" "}
                {convertTo}
            </h2>
            <p>as of {amount === "" ? "..." : date === null ? "" : date}</p>
        </Fragment>
    );
};

const CurrencySelectionDisplay = ({
    amount,
    convertTo,
    onInput,
    onSelect,
    currencies,
    disabled,
    type,
    name,
}) => {
    return (
        <form className="form-inline mb-4">
            <input
                type={ type }
                className="form-control form-control-lg mx-3"
                disabled={ disabled }
                value={ amount }
                onChange={ onInput }
            />
            <select
                className="form-control form-control-lg"
                name={ name }
                value={ convertTo }
                onChange={ onSelect }
            >
                {
                    currencies.map(currency => (
                        <option
                            key={ currency }
                            value={ currency }
                        >
                            { currency }
                        </option>
                    ))
                }
            </select>
        </form>
    );
};

const CurrencySwap = ({ onSwap }) => {
    return (
        <div className="col-lg-2 align-self-center">
            <h1
                className="swap"
                onClick={ onSwap }
            >
                &#8595;&#8593;
            </h1>
        </div>
    );
};


export { ConversionDisplay, CurrencySelectionDisplay, CurrencySwap };

export default TopDisplay;
