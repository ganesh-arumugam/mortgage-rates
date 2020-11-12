import React from "react";
import "./style.css";

export function RateRow(props) {
  const { row } = props;

  const percentValue = (value) => `${Number(value).toFixed(3)}%`;
  const roundedValue = (value) => `$${Number(value).toFixed()}`;

  return (
    <tr key={row.lenderName + row.loanType} style={{ textAlign: "center" }}>
      <td>{row.lenderName}</td>
      <td>{row.loanType}</td>
      <td>{percentValue(row.interestRate)}</td>
      <td>{roundedValue(row.closingCosts)}</td>
      <td>{roundedValue(row.monthlyPayment)}</td>
      <td>{percentValue(row.apr)}</td>
    </tr>
  );
}
