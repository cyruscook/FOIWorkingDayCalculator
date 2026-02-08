import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <section>
      <h1>404: Page not found</h1>
      <Link to="/">Return to home</Link>
    </section>
  );
};

export default NotFound;
