import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./pages/Main";
import ProclaimedDates from "./pages/ProclaimedDates";

import classes from "./App.module.css";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const BASE_URL = import.meta.env.BASE_URL;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />

      <main role="main" className={classes.main}>
        <Routes>
          <Route path={`${BASE_URL}/`} element={<Main />} />
          <Route
            path={`${BASE_URL}/proclaimed_dates`}
            element={<ProclaimedDates />}
          />
          <Route path={`${BASE_URL}/calendar`} element={<Calendar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
