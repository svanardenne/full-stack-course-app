import React, { Component } from 'react';
import axios from 'axios';

class CourseDetail extends Component {

  constructor() {
    super();
    this.state = {data: {
      title: '',
      description: [],
      estimatedTime: '',
      materialsNeeded: [],
      user: ''
    }}
  }

  componentDidMount() {
    // Gets course data for a specifc course and adds it to state
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(data => this.setState({data: {
        title: data.data.title,
        description: data.data.description.split('\n'),
        // Checks to see if there is a time given and sets either the data or a placeholder in state
        estimatedTime: data.data.estimatedTime ? data.data.estimatedTime : 'Not Stated',
        // Checks to see if there are materials listed and sets either the data or a placeholder in state
        materialsNeeded: data.data.materialsNeeded ? data.data.materialsNeeded.replace(/[*]/g, '').split('\n') : 'None Listed',
        user: `${data.data.User.firstName} ${data.data.User.lastName}`
      }}));
  }

  render() {
    return(
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                className="button button-secondary" href="index.html">Return to List</a></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.data.title}</h3>
              <p>{this.state.data.user}</p>
            </div>
            <div className="course--description">
              {this.state.data.description.map((p, index) => <p key={index}>{p}</p>)}
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.data.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                  {/* Checks to see if placeholder is being used and uses a ternary operator to either display the placeholder or data */}
                  {this.state.data.materialsNeeded !== 'None Listed' ? this.state.data.materialsNeeded.map((item, index) => <li key={index}>{item}</li>) : <li>{this.state.data.materialsNeeded}</li>}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;