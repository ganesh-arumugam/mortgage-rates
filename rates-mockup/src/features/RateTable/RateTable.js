import { Spinner, HTMLTable } from "@blueprintjs/core";
import { useSelector, shallowEqual } from "react-redux";
import { RateRow } from "../RateRow";
import { Elem } from "../../app/constants";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./style.css";

export function RateTable() {
  const { ratesLoading, ratesError, ratesData } = useSelector((state) => {
    return {
      ratesLoading: state.rates.loading,
      ratesError: state.rates.error,
      ratesData: state.rates.data,
    };
  }, shallowEqual);

  const showError = !!ratesError;
  const hasResults = !showError && ratesData && ratesData.length > 0;
  const noResults = !showError && ratesData && ratesData.length === 0;
  const placeholder = !showError && !ratesData && !ratesLoading;

  return (
    <>
      {placeholder && <div className="RateTable-nodata">{Elem.table_pl}</div>}
      {ratesLoading && <Spinner/>}
      {showError && <div className="RateTable-error"> {`${Elem.table_err}More information - ${ratesError}`} </div>}
      {noResults && <div className="RateTable-nodata">{Elem.no_results}</div>}

      {hasResults && (
        <div className="RateTable-container">
          <HTMLTable striped={true}>
            <thead>
              <tr data-testid={Elem.table_header}>
                <th>Lender</th>
                <th>Product</th>
                <th>Rate</th>
                <th>Closing Costs</th>
                <th>Monthly Payment</th>
                <th>APR</th>
              </tr>
            </thead>
            <tbody>
              {ratesData.map((rate) => (
                <RateRow key={rate.lenderName + rate.loanType} row={rate} />
              ))}
            </tbody>
          </HTMLTable>
        </div>
      )}
    </>
  );
}
