import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

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
import NotFound from './components/NotFound';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// Connect components to Context
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);


const App = () => {
  return(
    <Router>
      <div className="App">
        <HeaderWithContext />
        <hr/>
        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOut} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
