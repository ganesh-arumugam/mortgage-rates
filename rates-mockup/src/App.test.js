import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Elem } from "./App/constants";
import userEvent from "@testing-library/user-event";
import { server } from "../src/mocks/handlers";
import { rest } from "msw";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";

const fixture = async (hasKey = true) => {
  if (hasKey)
    localStorage.setItem(
      Elem.key,
      "OU-AUTH 68028256-2296-47a0-b107-25128e99f648"
    );

  const {
    getByText,
    findByTestId,
    queryByTestId,
    getByPlaceholderText,
    debug,
  } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return {
    getByText,
    findByTestId,
    queryByTestId,
    getByPlaceholderText,
    debug,
  };
};

describe("Smoke Test for the application", () => {
  it("shows authentication failure if no key is set", async () => {
    const { queryByTestId } = await fixture(false);

    expect(queryByTestId(Elem.noKey)).toBeInTheDocument();
  });

  it("renders mortgage mockup app", async () => {
    const { getByText } = await fixture();

    expect(getByText(/quote/i)).toBeInTheDocument();
  });

  it("check if the input fields appear with placeholders", async () => {
    const { queryByTestId, getByPlaceholderText } = await fixture();

    // Loan Size field
    expect(queryByTestId(Elem.loanSize)).toBeInTheDocument();
    expect(getByPlaceholderText(Elem.loanSize_pl)).toBeVisible();

    // Credit Score
    expect(queryByTestId(Elem.creditScore)).toBeInTheDocument();
    expect(getByPlaceholderText(Elem.creditScore_pl)).toBeVisible();
  });

  it("displays placeholder message for rates", async () => {
    const { getByText } = await fixture();

    expect(getByText(Elem.table_pl)).toBeVisible();
  });
});

describe("Validation Test for the application", () => {
  it("form cannot be submitted without entering input fields", async () => {
    const { queryByTestId, getByPlaceholderText } = await fixture();

    fireEvent.click(queryByTestId(Elem.submit));
    expect(getByPlaceholderText(Elem.loanSize_pl)).toBeVisible();
  });
});

describe("Verification test for rate quotes", () => {
  it("displays sample rates for given input", async () => {
    const { queryByTestId } = await fixture();

    userEvent.type(queryByTestId(Elem.loanSize), "300000");
    userEvent.type(queryByTestId(Elem.creditScore), "705");

    userEvent.click(queryByTestId(Elem.submit));

    const tableElement = await screen.findByTestId(Elem.table_header);

    expect(tableElement).toBeInTheDocument();
  });

  it("handles web service exceptions", async () => {
    const url =
      "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?loanSize=-3000&creditScore=400&propertyType=Condo&occupancy=Secondary";
    server.use(
      rest.get(url, (_, res, ctx) => {
        // Respond with "500 Internal Server Error" status for this test.
        return res(
          ctx.status(500),
          ctx.json({ message: "Internal Server Error" })
        );
      })
    );

    const { queryByTestId } = await fixture();

    userEvent.type(queryByTestId(Elem.loanSize), "-3000");
    userEvent.type(queryByTestId(Elem.creditScore), "400");

    userEvent.click(queryByTestId(Elem.submit));

    const tableElementErr = await screen.findByText(Elem.table_err, {
      exact: false,
    });

    expect(tableElementErr).toBeInTheDocument();
  });

  it("handles no results from web service for given criteria", async () => {
    const url =
      "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?loanSize=1000&creditScore=400&propertyType=Condo&occupancy=Secondary";
    server.use(
      rest.get(url, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ rateQuotes: [] }))
      )
    );

    const { queryByTestId } = await fixture();

    userEvent.type(queryByTestId(Elem.loanSize), "1000");
    userEvent.type(queryByTestId(Elem.creditScore), "400");

    userEvent.click(queryByTestId(Elem.submit));

    const noResultTableElm = await screen.findByText(Elem.no_results, {
      exact: false,
    });

    expect(noResultTableElm).toBeInTheDocument();
  });
});
