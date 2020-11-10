import { Spinner, HTMLTable } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { useSelector, shallowEqual } from "react-redux";
import { RateRow } from "../RateRow";
import "./style.css";

export function RateTable() {
  const { ratesLoading, ratesError, ratesData } = useSelector((state) => {
    return {
      ratesLoading: state.rates.loading,
      ratesError: state.rates.error,
      ratesData: state.rates.data,
    };
  }, shallowEqual);

  return (
    <>
      {ratesLoading && <Spinner />}
      {ratesError && (
        <div className="RateTable-error"> Oops. Something went wrong. </div>
      )}
      {!ratesData ? (
        <div className="RateTable-nodata">
          Fill in the required fields to see your great rates!!!
        </div>
      ) : ratesData.length > 0 ? (
        <div className="RateTable-container">
          <HTMLTable striped={true}>
            <thead>
              <tr>
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
                <RateRow row={rate} />
              ))}
            </tbody>
          </HTMLTable>
        </div>
      ) : (
        <div className="RateTable-nodata">
          No results found. Try different criteria for getting rates.
        </div>
      )}
    </>
  );
}
