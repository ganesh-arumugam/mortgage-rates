import React from "react";
import { Button, FormGroup, HTMLSelect, InputGroup } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { fetchData } from "../../features/rates/ratesSlice";
import { useDispatch } from "react-redux";
import "./style.css";

const property_types = ["SingleFamily", "Condo", "Townhouse", "MultiFamily"];
const occupancy_types = ["Primary", "Secondary", "Investment"];

export function RateForm() {
  const [loanSize, setLoanSize] = React.useState(0);
  const [creditScore, setCreditScore] = React.useState(0);
  const [propType, setPropType] = React.useState(property_types[0]);
  const [occupancyType, setOccupancyType] = React.useState(occupancy_types[0]);

  // Fetch related data
  const [url, setUrl] = React.useState();

  const dispatch = useDispatch();

  // Handle Input event updates
  const handleChange = (event) => {
    const { id, value } = event.target;
    let stateValue, setState;

    switch (id) {
      case "loanSize": {
        stateValue = loanSize;
        setState = setLoanSize;
        break;
      }
      case "creditScore": {
        stateValue = creditScore;
        setState = setCreditScore;
        break;
      }
      case "propType": {
        stateValue = propType;
        setState = setPropType;
        break;
      }
      case "occupancyType": {
        stateValue = occupancyType;
        setState = setOccupancyType;
        break;
      }
      default:
        break;
    }

    // Update only if state value changed
    if (stateValue !== value) {
      setState(value);
    }
  };

  // Handle Form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const getUrl = `https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?loanSize=${loanSize}&creditScore=${creditScore}&propertyType=${propType}&occupancy=${occupancyType}`;
    setUrl(getUrl);
  };

  // Handle side effects logic
  React.useEffect(() => {
    if (url) {
      dispatch(fetchData(url));
    }
  }, [url, dispatch]);

  return (
    <>
      <form className="RateForm-container" onSubmit={handleSubmit}>
        <FormGroup label="Loan Size" labelFor="loan-size" labelInfo="*">
          <InputGroup
            id="loanSize"
            type="number"
            required={true}
            min="1000"
            step="100"
            placeholder="$ 450,000"
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Property Type" labelFor="property-type" labelInfo="*">
          <HTMLSelect
            id="propType"
            options={property_types}
            fill={true}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Credit Score" labelFor="credit-score" labelInfo="*">
          <InputGroup
            id="creditScore"
            type="number"
            required={true}
            min="300"
            max="850"
            step="10"
            placeholder="680"
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Occupancy" labelFor="occupancy" labelInfo="*">
          <HTMLSelect
            id="occupancyType"
            options={occupancy_types}
            fill={true}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup labelFor="get-quote" fill={true}>
          <Button type="submit" text="Quote Rates" fill={true} />
        </FormGroup>
      </form>
    </>
  );
}
