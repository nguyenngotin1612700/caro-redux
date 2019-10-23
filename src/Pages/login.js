import React from 'react';
import { Form, Button } from 'react-bootstrap';

class Login extends React.Component {
  handleSubmit = e => {
    const { login } = this.props;
    e.preventDefault();
    const email = e.target.formGroupEmail.value;
    const password = e.target.formGroupPassword.value;
    login(email, password);
  };

  render = () => {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
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
  };
}

export default Login;
