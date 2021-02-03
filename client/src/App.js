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


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <hr/>
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/create" component={CreateCourse} />
          <Route path="/courses/:id" component={CourseDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
