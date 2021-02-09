import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

class UpdateCourse extends Component {

  state = {
    data: {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: ''
    },
    user: {},
    errors: []
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
        this.props.history.push('/error'); // push error to history stack
      });
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  }

  submit = (event) => {
    event.preventDefault();
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const encodedCredentials = btoa(`${authUser.email}:${authUser.password}`);
    const url = config.apiBaseUrl + `/courses/${this.props.match.params.id}`;
    const options = {
      body: JSON.stringify(this.state.data),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${encodedCredentials}`
      }
    };
    fetch(url, options)
      .then(data => {
        if (data.status === 204) {
          this.props.history.push(`/courses/${this.props.match.params.id}`);
        } else if (data.status === 400) {
          return data.json().then(data => {
            this.setState({errors: data.errors});
          });
          // If user not the author of course data,
          // return errors and redirect to "/forbidden" with location state prop
        } else if (data.status === 403 || data.status === 401) {
          return data.json().then(data => {
            this.props.history.push({pathname: '/forbidden', state: {message: data.error}})
          });
        }
      })
      .catch(err => { // Handle rejected promises
        console.log(err);
        this.props.history.push('/error'); // push error to history stack
      });
  }

  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  }

  // Displays validation errors
  ErrorsDisplay = ({ errors }) => {
    let errorsDisplay = null;
    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        </div>
      )
    }
    return errorsDisplay;
  }

  render() {
    return(
      <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
      {<this.ErrorsDisplay errors={this.state.errors} />}
        <form onSubmit={this.submit}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                  value={this.state.data.title} onChange={this.handleChange} /></div>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              <div><textarea id="description" name="description" className="" placeholder="Course description..." 
                value={this.state.data.description} onChange={this.handleChange}></textarea></div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                      placeholder="Hours" value={this.state.data.estimatedTime} onChange={this.handleChange} /></div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." 
                    value={this.state.data.materialsNeeded} onChange={this.handleChange}></textarea></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">Update Course</button>
            <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
    );
  };
}

export default UpdateCourse;