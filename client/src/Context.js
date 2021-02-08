import React, { Component } from 'react';
import UserData from './UserData';

const Context = React.createContext();

export class Provider extends Component {
  
  constructor() {
    super();
    this.userData = new UserData();
  }

  render() {
    const value = {
      userData: this.userData
    }

    return(
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
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