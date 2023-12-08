import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Layout from "./pages/Layout";
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#d1c2b6",
      dark: "#9d6854 ",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Notes />} />
            <Route path="create" element={<Create />} />
            <Route path="edit/:id" element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
