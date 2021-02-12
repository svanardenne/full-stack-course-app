import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

import CourseCards from './CourseCards';

class Courses extends Component {

  state = {data: []}

  componentDidMount() {
    // Grabs course data to display
    axios.get(`${config.apiBaseUrl}/courses`)
      .then(data => this.setState({data: data.data}))
      .catch(err => { // Handle rejected promises
        console.log(err);
        this.props.history.push('/error'); // push error to history stack
      });

  }

  render() {
    return(
        <div className="bounds">
          {/* Iterates over state data to create a card for each item returned from the database */}
          {this.state.data.map((course, index) => <CourseCards key={index} title={course.title} id={course.id} />)}
          <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </Link></div>
        </div>sdads
    );
  }
}

export default Courses;