import React, { Component, } from 'react';
import styled from "styled-components";
import { connect, } from 'react-redux';
import { handleLogin, } from '../reducers/user';
import { Header, Segment, Form, Button, Container, } from 'semantic-ui-react';

class Login extends Component {
  state = { email: '', password: '' };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email, password } = this.state;
    dispatch(handleLogin({ email, password }, history));
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <LoginContainer>
          <Header as='h1' textAlign='center'>Login</Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label htmlFor='email'>EMAIL</label>
              <input
                required
                id='email'
                value={email}
                placeholder='Email'
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor='password'>PASSWORD</label>
              <input
                required
                id='password'
                value={password}
                placeholder='Password'
                type='password'
                onChange={this.handleChange}
              />
            </Form.Field>
            <Segment textAlign='center' basic>
              <Button primary type='submit'>Submit</Button>
            </Segment>
          </Form>
        </LoginContainer>
      </Container>
    );
  }
}

const LoginContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 5px;
  -webkit-box-shadow: 3px 3px 3px -3px #999, 3px 3px 3px -3px #999, -3px 3px 3px -3px #999;
  -moz-box-shadow: 3px 3px 3px -3px #999, 3px 3px 3px -3px #999, -3px 3px 3px -3px #999;
  box-shadow: 3px 3px 3px -3px #999, 3px 3px 3px -3px #999, -3px 3px 3px -3px #999;
`;

export default connect()(Login);
