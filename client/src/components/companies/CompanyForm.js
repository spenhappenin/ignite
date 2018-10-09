import React from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { connect, } from 'react-redux';
import { Button, Container, Form, Header, Input, } from 'semantic-ui-react';

class CompanyForm extends React.Component {
  state = { applied: '', contacts: '', description: '', image: '', location: '', position: '', positionDetails: '', title: '', };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value, });

  handleQuill = (value, name) => this.setState({ [name]: value, });

  toggleCheckbox = () => this.setState({ applied: !this.state.applied, });

  handleSubmit = (e) => {
    const { applied, contacts, description, image, location, position, positionDetails, title, } = this.state;
    e.preventDefault();
    axios.post('/api/companies/new', { applied, contacts, description, image, location, position, position_details: positionDetails, title, })
      .then( res => {
        this.props.history.push('/companies');
      })
  };

  render() {
    return (
      <Container>
        <br />
        <Header as='h1'>New Company</Header>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            name='title'
            control={Input}
            label='Title'
            placeholder='Cool Company Name'
            required
            onChange={this.handleChange}
          />
          <label>Description</label>
          <ReactQuill
            value={this.state.description}
            name='description'
            label='Description'
            placeholder='The company is all about culture and...'
            required
            onChange={(value) => this.handleQuill(value, 'description')}
          />
          <br />
          <Form.Field
            name='image'
            control={Input}
            label='Company Logo'
            placeholder='http://some-cool-image-url.com'
            required
            onChange={this.handleChange}
          />
          <Form.Field
            name='location'
            control={Input}
            label='Location'
            placeholder='Lehi, UT'
            required
            onChange={this.handleChange}
          />
          <br />
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    );
  };
};

export default connect()(CompanyForm);
