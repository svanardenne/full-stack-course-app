import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

// Import CSS
import './App.css';

// Import Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';


class App extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  }

  async createUser(user) {
    await axios.post('http://localhost:5000/api/users', user, {headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }});
    this.history.push('/');
  }

  render() {
    return(
      <div className="App">
        <Router>
          <Header />
          <hr/>
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" render={(props) => <UserSignUp {...props} createUser={this.createUser} />} />
            <Route path="/signout" component={UserSignOut} />
          </Switch>
        </Router>
      </div>
    );
  };
}

export default App;
