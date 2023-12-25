import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

import logoImg from "../assets/images/job.png";

export const AppNavbar = () => {
  return (
    <Navbar fluid rounded className="bg-gray-100 py-4 shadow-sm">
      <Navbar.Brand as={Link} to="/">
        <img
          src={logoImg}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Jobs Portal
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/">
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/jobs">
          Jobs
        </Navbar.Link>
        <Navbar.Link as={Link} to="/auth">Authentication</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
