import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  @media (max-width: 1250px) {
    margin-right: 15px;
  }
`;
const GreetingDesktop = styled.span`
  display: none;
  @media (min-width: 500px) {
    display: inline-block;
  }
`;
const GreetingMobile = styled.span`
  display: none;
  text-align: center;
  color: #fff;
  @media (max-width: 499px) {
    display: block;
  }
`;

const Header = (props) => {
  const { context } = props;
  const authUser = context.authenticatedUser;

  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <Nav>
          {authUser ? (
            <React.Fragment>
              <GreetingDesktop>Welcome, {authUser.name}!</GreetingDesktop>
              <Link className="signout" to="/signout">
                Sign Out
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavLink className="signup" to="/signup">
                Sign Up
              </NavLink>
              <NavLink className="signin" to="/signin">
                Sign In
              </NavLink>
            </React.Fragment>
          )}
        </Nav>
        {authUser ? (
          <GreetingMobile>Welcome, {authUser.name}!</GreetingMobile>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
