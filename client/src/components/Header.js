import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return(
    <div class="header">
      <div class="bounds">
        <h1 class="header--logo">Courses</h1>
        <nav><Link className="signup" to="/signup">Sign Up</Link><Link className="signin" to="/signin">Sign In</Link></nav>
      </div>
    </div>
  );
}

export default Header;