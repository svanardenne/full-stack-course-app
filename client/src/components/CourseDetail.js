import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import config from '../config';

class CourseDetail extends Component {

  state = {
      data: {},
      user: {}
    }

  componentDidMount() {
    // Gets course data for a specifc course and adds it to state
    axios.get(`${config.apiBaseUrl}/courses/${this.props.match.params.id}`)
      .then(data => this.setState({data: data.data, user: data.data.User}));
  }

  render() {
    return(
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {/* Conditionally renders the delete and update buttons based on
              whether the right user is signed in */}
              {
              this.props.context.authenticatedUser 
              && this.props.context.authenticatedUser.id === this.state.user.id
              ? 
              <span><Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
              <a className="button" href="#">Delete Course</a></span>
              :
              null
              }
            <Link className="button button-secondary" to="/">Return to List</Link></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.data.title}</h3>
              <p>{this.state.user.firstName} {this.state.user.lastName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={this.state.data.description} />
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
                  <ReactMarkdown source={this.state.data.materialsNeeded} />
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