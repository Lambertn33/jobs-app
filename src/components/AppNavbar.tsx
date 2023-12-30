import { Navbar, Dropdown, Button } from "flowbite-react";

import { Link, useHistory } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/store/store";

import { userActions } from "@/store/slices/user.slice";

import { FaUserCircle } from "react-icons/fa";

import logoImg from "../assets/images/job.png";

export const AppNavbar = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(userActions.logout());
    history.replace("/");
  };

  return (
    <Navbar fluid rounded className="bg-gray-100 py-4 shadow-sm ">
      <Navbar.Brand as={Link} to="/">
        <img src={logoImg} loading="lazy" className="mr-3 h-6 sm:h-9" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Jobs Portal
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" data-cy="nav-home-link">
          Home
        </Navbar.Link>

        <Navbar.Link as={Link} to="/jobs" data-cy="nav-jobs-link">
          Jobs
        </Navbar.Link>
        {user ? (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={<FaUserCircle className="text-2xl" />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.names}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Divider />

              <Dropdown.Item>
                <Link to="/applications" data-cy="nav-user-applications-link">My Applications</Link>
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item>
                <div className="w-full">
                  <Button onClick={logoutHandler}>Logout</Button>
                </div>
              </Dropdown.Item>
            </Dropdown>

            <Navbar.Toggle />
          </div>
        ) : (
          <Navbar.Link as={Link} to="/auth" data-cy="nav-auth-link">
            Authentication
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
