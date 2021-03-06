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
      .then(data => {
        // Checks to see if data was returned;
        // If true, sets data in state
        // If not, pushes to "/notfound" route
        if (data.data) {
          this.setState({data: data.data, user: data.data.User})
        } else {
          this.props.history.push('/notfound');
        }
      })
      .catch(err => { // Handle rejected promises
        console.log(err);
        this.props.history.push('/notfound'); // push error to history stack
      });
  }

  // Deletes the current course
  delete = () => {
    const result = window.confirm("Are you sure you want to delete this course?");
    if (result) {
      const { context } = this.props;
      const authUser = context.authenticatedUser;
      const encodedCredentials = btoa(`${authUser.email}:${authUser.password}`);
      const url = config.apiBaseUrl + `/courses/${this.props.match.params.id}`;
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`
        }
      };
      fetch(url, options)
        .then(data => {
          if (data.status === 204) {
            alert('Course deleted');
            this.props.history.push('/');
            // If user not the author of course data,
            // return errors and redirect to "/forbidden" with location state prop
          } else if (data.status === 403 || data.status === 401) {
            return data.json().then(data => {
              this.props.history.push({pathname: '/forbidden', state: {message: data.error}})
            });
            // Redirects to "/error" on status of 500
          } else if (data.status === 500) {
            this.props.history.push('/error');
          }
        })
        .catch(err => { // Handle rejected promises
          console.log(err);
          this.props.history.push('/error'); // push error to history stack
        });
    }
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
              <button className="button" onClick={this.delete}>Delete Course</button></span>
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