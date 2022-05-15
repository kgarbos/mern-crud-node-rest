import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Nav from './Nav';
import { authenticate, getUser } from './helpers';


const Login = (props) => {

  // Create a state
  const [state, setState] = useState({
    name: '',
    password: ''
  });

  const {name, password} = state; // Destructure values from state

  useEffect(() => {
    getUser() && props.history.push('/');
  }, []);

  const handleChange = (name) => (event) => {
    // console.log('name', name, 'event', event, event.target.value);
    setState({...state, [name]: event.target.value});
  };

  const handleSubmit = event => {
    event.preventDefault();
    // console.table({ title, content, user });
    axios
      .post(`${process.env.REACT_APP_API}/login`, { name, password })
      .then(response => {
        console.log(response);
        // Response will contain token and name of user
        authenticate(response, () => props.history.push('/create'));
        // Redirect to create page

      })
      .catch(error => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  return (
    <div className="container pb-5">
      <Nav/>
      <br />
      <h1>LOGIN</h1>
      <br />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input 
            onChange={handleChange('name')} 
            value={name} 
            type="text" 
            className="form-control" 
            placeholder="Your Name" 
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input 
          onChange={handleChange('password')} 
          value={password} type="password" 
          className="form-control" 
          placeholder="Your Password" 
          required
        />
        </div>
        <div>
          <button className="btn btn-primary mt-3">Login</button>
        </div>
      </form>

    </div>
  )

}

export default withRouter(Login);
