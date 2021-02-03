import React, { Component } from 'react';

class CourseDetail extends Component {

  constructor() {
    super();
    this.state = {data: {
      title: '',
      description: [],
      estimatedTime: '',
      materialsNeeded: []
    }}
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => this.setState({data: {
        title: data.title,
        description: data.description.split('\n'),
        estimatedTime: data.estimatedTime,
        materialsNeeded: data.materialsNeeded.split('\n')
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
              <p>By Joe Smith</p>
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
                  {this.state.data.materialsNeeded.map((item, index) => <li key={index}>{item}</li>)}
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