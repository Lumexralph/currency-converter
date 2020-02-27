import React, { Component } from "react";
import TopDisplay, { ConversionDisplay, CurrencySelectionDisplay, CurrencySwap } from "./TopDisplay";

class ConverterContainer extends Component {
    state = {
        currencies: ["USD", "EUR", "JPY", "GBP"],
        base: "USD",
        amount: "",
        convertTo: "EUR",
        result: "",
        date: "",
        error: false,
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
                    this.setState({
                        error: true
                    })
                });

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
            date,
            error,
        } = this.state;

        return (
            error ?
                <h5>Oops! Problem occurred converting your amount</h5>
            :
                <div className="container">
                    <div className="row">
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
                                            name={ "base" }
                                            amount={ amount }
                                            disabled={ false }
                                            onInput={ this.handleInput }
                                            onSelect={ this.handleSelect }
                                            convertTo={ base }
                                            currencies={ currencies }
                                        />

                                        <CurrencySelectionDisplay
                                            type={ "number" }
                                            name={ "convertTo" }
                                            amount={
                                                    amount === ""
                                                    ? "0"
                                                    : result === null
                                                    ? "Calculating..."
                                                    : result
                                                    }
                                            disabled={ true }
                                            onInput={ null }
                                            onSelect={ this.handleSelect }
                                            convertTo={ convertTo }
                                            currencies={ currencies }
                                        />
                                    </div>

                                    <CurrencySwap
                                        onSwap={ this.handleSwap }
                                    />
                                </div>
                            </div>
                    </div>
                </div>
        );
    }
}


export default ConverterContainer;
