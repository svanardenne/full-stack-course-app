import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FormWrapper = styled.div`
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

class UserSignIn extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: "",
      password: "",
      errors: [],
    };
  }

  // Handles value change in input fields
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  // Submit Handler
  submit = (event) => {
    event.preventDefault();
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { emailAddress, password } = this.state;
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          this.props.history.push(from);
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        }
      })
      .catch((err) => {
        // Handle rejected promises
        console.log(err);
        this.props.history.push("/error"); // push error to history stack
      });
  };

  // Cancel button handler
  cancel = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };

  // Displays validation errors
  ErrorsDisplay = ({ errors }) => {
    let errorsDisplay = null;
    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return errorsDisplay;
  };

  render() {
    return (
      <div className="bounds">
        <FormWrapper className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={this.submit}>
              <this.ErrorsDisplay errors={this.state.errors} />
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  value={this.state.emailAddress}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign In
                </button>
                <button
                  className="button button-secondary"
                  onClick={this.cancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
          </p>
        </FormWrapper>
      </div>
    );
  }
}

export default UserSignIn;
