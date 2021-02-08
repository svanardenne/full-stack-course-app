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

// Connect components to Context
const UserSignUpWithContext = withContext(UserSignUp);


const App = () => {

    return(
      
        <Router>
          <div className="App">
            <Header />
            <hr/>
            <Switch>
              <Route exact path="/" component={Courses} />
              <Route path="/courses/create" component={CreateCourse} />
              <Route path="/courses/:id/update" component={UpdateCourse} />
              <Route path="/courses/:id" component={CourseDetail} />
              <Route path="/signin" component={UserSignIn} />
              <Route path="/signup" component={UserSignUpWithContext} />
              <Route path="/signout" component={UserSignOut} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>

    );
}

export default App;
