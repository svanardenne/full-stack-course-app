import React, { Component } from 'react';
import UserData from './UserData';

const Context = React.createContext();

export class Provider extends Component {
  
  // Sets context data to UserData class imported from UserData.js
  constructor() {
    super();
    this.userData = new UserData();
  }

  // Passes UserData object to Children of Provider
  render() {
    const value = {
      userData: this.userData,
      actions: { // Adds handler methods from UserData.js to Context
        signIn: this.signIn
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
    return user;
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