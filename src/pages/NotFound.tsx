import React from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.BASE_URL;

const NotFound: React.FC = () => {
  return (
    <section>
      <h1>404: Page not found</h1>
      <Link to={`${BASE_URL}/`}>Return to home</Link>
    </section>
  );
};

export default NotFound;
