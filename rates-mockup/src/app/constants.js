// Constants used for testing
const form = {
  loanSize: "loanSize",
  loanSize_pl: "$ 450,000",
  creditScore: "creditScore",
  creditScore_pl: "680",
  propType: "propType",
  submit: "submit",
};

const table = {
  no_results: "No results found. Try different criteria for getting rates.",
  table_pl: "Fill in the required fields to see your great rates!!!",
  table_err: "Oops. Something went wrong.",
  table_header: "tableHeader",
};

const app = {
  noKey: "noKey",
  noKey_pl:
    "Not Authenticated. Kindly provide your API key like 'OU-AUTH 68028256-2296'.",
  key: "dev-auth",
};

export const Elem = {
  ...app,
  ...form,
  ...table,
};
