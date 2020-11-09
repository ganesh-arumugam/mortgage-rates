import { HTMLTable } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./style.css";

export function RateTable() {
  return (
    <div className="RateTable-container">
      <HTMLTable bordered={true} interactive={true} striped={true}>
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
        <tbody></tbody>
      </HTMLTable>
    </div>
  );
}
