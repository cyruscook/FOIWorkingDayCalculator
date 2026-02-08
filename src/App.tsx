import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./pages/Main";
import ProclaimedDates from "./pages/ProclaimedDates";

import classes from "./App.module.css";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />

      <main role="main" className={classes.main}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/proclaimed_dates" element={<ProclaimedDates />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
