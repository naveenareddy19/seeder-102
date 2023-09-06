import { CssBaseline, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/styled-engine";
import { MemoryRouter } from "react-router";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { theme } from "../src/theme/theme";
import "./preview.css";

const seederViewPort = {
  Seeder: {
    name: "Seeder",
    styles: {
      width: "1366px",
      height: "768px",
    },
    type: "desktop",
    layout: "fullscreen",
    parameters: {
      layout: "fullscreen",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: { ...seederViewPort },
  },
};

export const decorators = [
  (Story) => (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter initialEntries={["/"]}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  ),
];
