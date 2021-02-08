import React, { Component } from 'react';
import Cookies from 'js-cookie';
import UserData from './UserData';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };
  
  // Sets context data to UserData class imported from UserData.js
  constructor() {
    super();
    this.userData = new UserData();
  }

  // Passes UserData object to Children of Provider
  render() {
    const { authenticatedUser } = this.state;

    const value = {  // Contructs value object passed to Provider
      authenticatedUser, // Sets user status on value obkect
      userData: this.userData, // Sets user data on value object
      actions: { // Adds handler methods from UserData.js to Context
        signIn: this.signIn,
        signOut: this.signOut
      }
    }

    return(
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  // Sign-in method
  signIn = async (emailAddress, password) => {
    const user = await this.userData.getUser(emailAddress, password);
    if (user !== null) {
      console.log(user)
      this.setState(() => {
        return {
          authenticatedUser: user
        };
      });
      // Set Cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  // Sign-out method
  signOut = async (emailAddress, password) => {
    this.setState(() => {
      return {
        authenticatedUser: null
      }
    });
    Cookies.remove('authenticatedUser');
}
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return(
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}