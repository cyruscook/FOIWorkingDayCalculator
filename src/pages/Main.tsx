import React from "react";
import ResponseDateCalc from "../components/ResponseDateCalc";
import { Link } from "react-router-dom";

import classes from "./Main.module.css";

const Main: React.FC = () => {
  return (
    <div className={classes.main}>
      <p>
        Use this tool to calculate the response date for a request under the
        Freedom of Information Act 2000.
      </p>

      <ResponseDateCalc />

      <h3>How many working days should a response be given by?</h3>
      <p>
        The usual time limit is 20 working days, however there are a few
        variations to this, for example where the information is held overseas
        or by an archival authority.
      </p>
      <p>
        The time limit starts on the day following the day the organisation
        received the request. The organisation must then respond by midnight on
        the 20th working day. If you are asked to clarify your request, the 20
        working day period would restart the day after the organisation receives
        the clarification.
      </p>

      <h3>What are working days?</h3>
      <p>Days which do not count as working days are:</p>
      <ul>
        <li>Saturdays</li>
        <li>Sundays</li>
        <li>New Year's Day</li>
        <li>2 January (1973 and onwards)</li>
        <li>
          3 January, if New Year's Day fell on a Saturday or Sunday that year
          (1973 and onwards)
        </li>
        <li>Saint Patrick's Day (17 March)</li>
        <li>18 March, if Saint Patrick's Day fell on a Sunday</li>
        <li>Good Friday (the last Friday before Easter Sunday)</li>
        <li>Easter Monday (the day after Easter Sunday)</li>
        <li>The first Monday in May</li>
        <li>The last Monday in May</li>
        <li>The first Monday in August</li>
        <li>The last Monday in August</li>
        <li>Saint Andrew's Day (30 November)</li>
        <li>
          The first Monday after 30 November, if Saint Andrew's Day fell on a
          Saturday or Sunday that year
        </li>
        <li>Christmas Day (25 December)</li>
        <li>Boxing Day (26 December)</li>
        <li>
          27 December, if Christmas Day fell on a Saturday or Sunday that year
        </li>
        <li>
          Any day which, by{" "}
          <a href="https://en.wikipedia.org/wiki/Proclamation#United_Kingdom">
            royal proclamation
          </a>
          , or as ordered by the Secretary of State for Northern Ireland, is a
          bank holiday in either England, Wales, Scotland or Northern Ireland.
          Such proclamations are published in the relevant Gazette. You can{" "}
          <Link to="/proclaimed_dates">
            view a list of proclaimed bank holidays
          </Link>
          .
        </li>
      </ul>
    </div>
  );
};

export default Main;
