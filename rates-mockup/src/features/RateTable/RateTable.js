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

  return (
    <>
      {ratesLoading && <Spinner />}
      {ratesError && <div className="RateTable-error"> {Elem.table_err} </div>}
      {!ratesData ? (
        <div className="RateTable-nodata">{Elem.table_pl}</div>
      ) : ratesData.length > 0 ? (
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
                <RateRow row={rate} />
              ))}
            </tbody>
          </HTMLTable>
        </div>
      ) : (
        <div className="RateTable-nodata">{Elem.no_results}</div>
      )}
    </>
  );
}
