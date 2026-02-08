import React from "react";
import { Link, NavLink } from "react-router-dom";

import classes from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.title}>
        <Link to="/">FOI Working Day Calculator</Link>
      </h1>

      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/calendar">Calendar</NavLink>
          </li>
          <li>
            <NavLink to="/proclaimed_dates">Proclaimed dates</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
