import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TopDisplay, { ConversionDisplay, CurrencySelectionDisplay, CurrencySwap } from "./ConverterComponents";


test("TopDisplay Component test", () => {
    const { container } = render(<TopDisplay amount={50} base={"EUR"} />)

    expect(container).toHaveTextContent("50 EUR is equivalent to:")
});

test("ConversionDisplay Component test", () => {
    const { container } = render(<ConversionDisplay
                                    amount={60}
                                    result={1.00}
                                    convertTo={"EUR "}
                                    date={"2020-12-3"}
                                    />)

    expect(container).toHaveTextContent("1 EUR as of 2020-12-3");
})

test("CurrencySelectionDisplay Component test", () => {
    const { container } = render(<CurrencySelectionDisplay
                                    amount={60}
                                    convertTo={"GBP"}
                                    onInput={(e) => null}
                                    onSelect={(e) => null}
                                    currencies={["EUR ", "GBP"]}
                                    type={"number"}
                                    name={"base"}
                                 />)
    expect(container).toHaveTextContent("EUR GBP");
})

test("CurrencySwap Component test", () => {
    const { container } = render(<CurrencySwap
                                    onClick={(e) => null}
                                 />)
    expect(container).toHaveTextContent("↓↑");
})
