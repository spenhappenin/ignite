import React, { Component, } from "react";
import axios from "axios";
import styled from "styled-components";
import { connect, } from "react-redux";
import { updateUserProfile, } from "../reducers/user";
import { Form, Input, } from "semantic-ui-react";

class Profile extends Component {
  state = { first_name: "", last_name: "", email: "", image: "", };

  componentDidMount() {
    axios.get("/api/settings/profile")
      .then( res => {
        const { email, first_name, last_name, image, } = res.data;
        this.setState({ email, first_name, last_name, image, });
      })
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(updateUserProfile({ user: {...this.state}, }));
  };

  render() {
    const { email, first_name, last_name, image, } = this.state;

    return (
      <Container>
        <h2>My Profile</h2>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            name="email"
            control={Input}
            label="EMAIL"
            placeholder="Email"
            required
            onChange={this.handleChange}
            value={email}
          />
          <Form.Group widths="equal">
            <Form.Field
              name="first_name"
              control={Input}
              label="FIRST NAME"
              placeholder="First Name"
              required
              onChange={this.handleChange}
              value={first_name}
            />
            <Form.Field
              name="last_name"
              control={Input}
              label="LAST NAME"
              placeholder="Last Name"
              required
              onChange={this.handleChange}
              value={last_name}
            />
          </Form.Group>
            <Form.Field
              name="image"
              control={Input}
              label="IMAGE URL"
              placeholder="Image URL"
              required
              onChange={this.handleChange}
              value={image}
            />
          <br />
          <Button>Update My Details</Button>
        </Form>
      </Container>
    );
  };
};

const Container = styled.div`
  background: white;
  padding: 30px;
  border-radius: 5px;
  -webkit-box-shadow: 3px 3px 3px -3px #999, 3px 3px 3px -3px #999, -3px 3px 3px -3px #999;
  -moz-box-shadow: 3px 3px 3px -3px #999, 3px 3px 3px -3px #999, -3px 3px 3px -3px #999;
  box-shadow: 3px 3px 3px -3px #999, 3px 3px 3px -3px #999, -3px 3px 3px -3px #999;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #22313f;
  color: white;
  padding: 15px;
  letter-spacing: .7px;
  font-weight: 500;
  transition: all .3s;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #17212a;
    transition: all .3s;
  }
`;

export default connect()(Profile);
