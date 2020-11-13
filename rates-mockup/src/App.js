import React from "react";
import { RateForm } from "./features/RateForm";
import { Header } from "./features/Header";
import { RateTable } from "./features/RateTable";
import { Elem } from "./app/constants";

function App() {
  // lazy-load state to gather API key from local storage
  const [apiKey, setApiKey] = React.useState(
    () => localStorage.getItem(Elem.key) || ""
  );

  // Update the key if changed
  React.useEffect(() => localStorage.setItem(Elem.key, apiKey), [apiKey]);

  return (
    <div className="App">
      <header>
        <Header title={"OwnUp Mortgage Rates"} />
      </header>
      <main>
        {!apiKey ? (
          <div
            style={{
              display: "flex",
              fontSize: "1em",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "20px",
              gap: "10px",
            }}
            data-testid={Elem.noKey}
          >
            <span>{Elem.noKey_pl}</span>
            <input
              type="password"
              onBlur={(event) => setApiKey(event.target.value)}
              onKeyDown={(event) =>
                event.key === "Enter" && setApiKey(event.target.value)
              }
            />
          </div>
        ) : (
          <>
            <section>
              <RateForm apiKey={apiKey} />
            </section>
            <section>
              <RateTable />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
