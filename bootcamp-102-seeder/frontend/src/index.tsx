import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { App } from "./App";
import "./index.css";
import { theme } from "../src/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN!}
    clientId={process.env.AUTH0_CLIENT_ID!}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
