import React from "react";
import { RateForm } from "./features/RateForm";
import { Header } from "./features/Header";
import { RateTable } from "./features/RateTable";

function App() {
  return (
    <div className="App">
      <header>
        <Header title={"OwnUp Mortgage Rates"} />
      </header>
      <main>
        <section>
          <RateForm />
        </section>
        <section>
          <RateTable />
        </section>
      </main>
    </div>
  );
}

export default App;
