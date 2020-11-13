import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";
import { Elem } from "./App/constants";

const fixture = async (hasKey = true) => {
  if (hasKey) localStorage.setItem(Elem.key, "someKeyAuth");

  const {
    getByText,
    findByTestId,
    queryByTestId,
    getByPlaceholderText,
  } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return { getByText, findByTestId, queryByTestId, getByPlaceholderText };
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
