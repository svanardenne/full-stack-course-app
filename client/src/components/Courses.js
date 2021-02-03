import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CourseCards from './CourseCards';

class Courses extends Component {

  constructor() {
    super();
    this.state = {data: []}
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => this.setState({data: data}));

  }

  render() {
    return(
        <div className="bounds">
          {/* Iterates over state data to create a card for each item returned from the database */}
          {this.state.data.map((course, index) => <CourseCards key={index} title={course.title} id={index + 1} />)}
          <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </Link></div>
        </div>
    );
  }
}

export default Courses;