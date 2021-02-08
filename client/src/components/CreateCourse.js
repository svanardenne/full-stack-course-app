import React, { Component } from 'react';
import config from '../config';

class CreateCourse extends Component {

  state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: ''
    }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  submit = (event) => {
    event.preventDefault();
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const encodedCredentials = btoa(`${authUser.email}:${authUser.password}`);
    const url = config.apiBaseUrl + '/courses';
    const options = {
      body: JSON.stringify(this.state),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${encodedCredentials}`
      }
    };
    fetch(url, options);
  }

  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return(
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>
          <form onSubmit={this.submit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={this.state.title} onChange={this.handleChange} />
                </div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" className="" placeholder="Course description..." 
                    value={this.state.description} onChange={this.handleChange}></textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={this.state.estimatedTime} onChange={this.handleChange} /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." 
                        value={this.state.materialsNeeded} onChange={this.handleChange}></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Create Course</button>
              <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default CreateCourse;