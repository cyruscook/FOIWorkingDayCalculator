import React from "react";
import { Link, NavLink } from "react-router-dom";

import classes from "./Header.module.css";

const BASE_URL = import.meta.env.BASE_URL;

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.title}>
        <Link to={`${BASE_URL}/`}>FOI Working Day Calculator</Link>
      </h1>

      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to={`${BASE_URL}/`}>Home</NavLink>
          </li>
          <li>
            <NavLink to={`${BASE_URL}/calendar/`}>Calendar</NavLink>
          </li>
          <li>
            <NavLink to={`${BASE_URL}/proclaimed_dates/`}>
              Proclaimed dates
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
