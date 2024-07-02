import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import {
  ReactPlugin,
  withAITracking,
} from "@microsoft/applicationinsights-react-js";
import { createBrowserHistory } from "history";
import { useState } from "react";
import Button from "./button";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";

const browserHistory = createBrowserHistory();
const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    connectionString:
      "InstrumentationKey=283bef42-56fc-45e3-96c1-642f3bc609f4;IngestionEndpoint=https://switzerlandnorth-0.in.applicationinsights.azure.com/;LiveEndpoint=https://switzerlandnorth.livediagnostics.monitor.azure.com/;ApplicationId=8dde1286-fe6a-43fb-b748-2ac689b88296",
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory },
    },
  },
});
appInsights.loadAppInsights();

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          Vite
        </a>
        <a href="https://react.dev" target="_blank">
          React
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          onClick={() => setCount((count) => count + 1)}
          text={`count is ${count}`}
        />

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </AppInsightsContext.Provider>
  );
}

const TrackedApp = withAITracking(reactPlugin, App);
export default TrackedApp;
