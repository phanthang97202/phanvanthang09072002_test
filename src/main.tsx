import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { reduxStore } from "./redux-store/store.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // </StrictMode>
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
