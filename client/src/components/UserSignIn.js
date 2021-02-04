import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {

  constructor() {
    super();
    this.state = {
      emailAddress: '',
      password: ''
    }
  }

  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" 
                  value={this.state.emailAddress} onChange={this.handleChange} />
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    );
  };
}

export default UserSignIn;