import React from 'react';
import fetch from 'cross-fetch';
import { Form, Button } from 'react-bootstrap';

class Register extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const name = e.target.formGroupName.value;
    const email = e.target.formGroupEmail.value;
    const password = e.target.formGroupPassword.value;
    fetch('http://localhost:3000/users/register', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        email,
        name,
        password
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(response.message));
      });
  };

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Your Name" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default Register;
