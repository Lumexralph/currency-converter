import React, { Component } from "react";
import TopDisplay, { ConversionDisplay, CurrencySelectionDisplay } from "./TopDisplay";

class ConverterContainer extends Component {
    state = {
        currencies: ["USD", "EUR", "JPY", "GBP"],
        base: "USD",
        amount: "",
        convertTo: "EUR",
        result: "",
        date: "",
    };

    handleInput = e => {
        this.setState(
            {
                amount: e.target.value,
                result: null,
                date: null,
            },
            this.calculate
        );
    };

    handleSelect = e => {
        this.setState({
            [e.target.name]: e.target.value,
            result: null,
        },
            this.calculate
        );
    };

    calculate = () => {
        const amount = this.state.amount;

        if (Number.isNaN(amount)) {
            return;
        } else {
            fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
                .then(response => response.json())
                .then(data => {
                    const date = data.date;
                    const result = (data.rates[this.state.convertTo] * amount).toFixed(2);
                    this.setState({
                        result,
                        date,
                    });
                })
                .catch(err => {
                    console.log(err);
                });
                //  handle error
        }
    };

    handleSwap = e => {
        const { base, convertTo } = this.state;
        e.preventDefault();
        this.setState(
            {
                convertTo: base,
                base: convertTo,
                result: null,
            },
            this.calculate
        );
    };

    render() {
        const {
            currencies,
            base,
            amount,
            convertTo,
            result,
            date
        } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div>
                        <div>
                            <TopDisplay
                                amount={ amount }
                                base={ base }
                            />
                            <ConversionDisplay
                                amount={ amount }
                                result={ result }
                                convertTo={ convertTo }
                                date={ date }
                            />
                            <div className="row">
                                <div className="col-lg-10">
                                    <CurrencySelectionDisplay
                                        type={ "number" }
                                        amount={ amount }
                                        disabled={ false }
                                        onInput={ this.handleInput }
                                        onSelect={ this.handleSelect }
                                        convertTo={ base }
                                        currencies={ currencies }
                                        name={ "base" }
                                    />
                                    <form className="form-inline mb-4">
                                        <input
                                            className="form-control form-control-lg mx-3"
                                            type="number"
                                            value={amount}
                                            onChange={ this.handleInput }
                                        />
                                        <select
                                            className="form-control form-control-lg"
                                            name="base"
                                            value={ base }
                                            onChange={ this.handleSelect }
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

                                    <form className="form-inline mb-4">
                                        <input
                                            className="form-control form-control-lg mx-3"
                                            disabled={ true }
                                            value={
                                                amount === ""
                                                    ? "0"
                                                    : result === null
                                                    ? "Calculating..."
                                                    : result
                                            }
                                        />
                                        <select
                                            className="form-control form-control-lg"
                                            name="convertTo"
                                            value={ convertTo }
                                            onChange={ this.handleSelect }
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
                                </div>

                                <div className="col-lg-2 align-self-center">
                                    <h1
                                        className="swap"
                                        onClick={ this.handleSwap }
                                    >
                                        &#8595;&#8593;
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ConverterContainer;
