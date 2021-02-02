import React, { Component } from 'react';

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
          {this.state.data.map(course => <CourseCards title={course.title} />)}
          <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a></div>
        </div>
    );
  }
}

export default Courses;