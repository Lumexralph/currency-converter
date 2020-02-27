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
            <p>as of {amount === "" ? "" : date === null ? "" : date}</p>
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


export { ConversionDisplay, CurrencySelectionDisplay };
export default TopDisplay;
