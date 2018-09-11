import React, { Component, } from 'react';
import axios from "axios";
import { Container, Form, Header, Input, TextArea, } from "semantic-ui-react";

class ContactForm extends Component {
  state = { name: "", email: "", phone: "", position: "", description: "", };

  componentDidMount() {
    if (this.props.match.params.id) 
      axios.get(`/api/contacts/${this.props.match.params.id}`)
      .then( res => {
        const { name, email, phone, position, description, } = res.data;
        this.setState({ name, email, phone, position, description, });
      })
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, });
  };

  handleSubmit = (e) => {
    const { id, } = this.props.match.params;
    e.preventDefault();
    if (id) {
      axios.put(`/api/contacts/${id}/edit`, { ...this.state })
      .then( res => {
        this.props.history.goBack();
      })
    } else {
      axios.post(`/api/companies/${this.props.match.params.company_id}/contacts`, {...this.state}) 
      .then( res => {
        this.props.history.goBack();
      })
    }
  };

  render() {
    const { id, } = this.props.match.params;
    const { name, email, phone, position, description, } = this.state;

    return (
      <Container>
        <Header as="h2">{id ? "Update Contact" : "New Contact"}</Header>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label="Name"
              name="name"
              onChange={this.handleChange}
              placeholder="Name"
              value={name}
            />
            <Form.Field
              control={Input}
              label="Email"
              name="email"
              onChange={this.handleChange}
              placeholder="Email"
              value={email}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label="Phone"
              name="phone"
              onChange={this.handleChange}
              placeholder="Phone"
              value={phone}
            />
            <Form.Field
              control={Input}
              label="Position"
              name="position"
              onChange={this.handleChange}
              placeholder="Position"
              value={position}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={TextArea} 
              label="Notes" 
              name="description"
              onChange={this.handleChange}
              placeholder="Add some information about this contact here..."
              value={description}
            />
          </Form.Group>
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </Container>
    );
  };
};

export default ContactForm;
