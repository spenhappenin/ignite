import React from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { Button, Checkbox, Container, Form, Header, Input, } from 'semantic-ui-react';

class CompanyEditForm extends React.Component {
  state = { 
    applied: false, 
    contacts: '', 
    description: '', 
    image: '',
    location: '', 
    position: '', 
    position_details: '', 
    setFormData: false, 
    title: '', 
  };

  componentDidMount() {
    this.setState({ company: this.props.companies.find(c => c.id === parseInt(this.props.match.params.id, 10)), });
  };

  componentDidUpdate() {
    const { company: { applied, contacts, description, image, location, position, position_details, title, }, } = this.state;

    if (this.state.setFormData !== true) {
      this.setState({ applied, contacts, description, image, location, position, position_details, title, setFormData: true, });
    }
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value, });

  toggleCheckbox = () => this.setState({ applied: !this.state.applied, });

  handleSubmit = (e) => {
    const { history, updateCompanies, } = this.props;
    const { applied, contacts, description, image, location, position, position_details, title, company: { id, }, } = this.state;
    const company = { applied, contacts, description, id, image, location, position, position_details: position_details, title, };

    e.preventDefault();
    axios.put(`/api/companies/${id}/edit`, company)
      .then( res => {
        updateCompanies(company);
        history.push('/companies');
      })
      .catch( err => {
      })
  };

  handleQuill = (value, name) => {
    this.setState({ [name]: value });
  };

  render() {
    const { applied, contacts, description, image, location, position, position_details, title, } = this.state;

    return (
      <Container>
        <br />
        <Header as='h1'>Edit Company</Header>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            name='title'
            control={Input}
            label='Title'
            placeholder='Cool Company Name'
            required
            value={title}
            onChange={this.handleChange}
          />
          <label>Description</label>
          <ReactQuill
            value={description}
            name='description'
            label='Description'
            placeholder='The company is all about culture and...'
            required
            onChange={(value) => this.handleQuill(value, 'description')}
          />
          <Form.Field
            name='image'
            control={Input}
            label='company logo'
            placeholder='https://some-image-url.com'
            required
            value={image}
            onChange={this.handleChange}
          />
          <Form.Field
            name='location'
            control={Input}
            label='Location'
            placeholder='Lehi, UT'
            required
            value={location}
            onChange={this.handleChange}
          />
          <label>Company Contacts</label>
          <ReactQuill
            value={contacts}
            name='contacts'
            placeholder='Company contact information...'
            onChange={(value) => this.handleQuill(value, 'contacts')}
          />
          <br />
          <Form.Field
            name='position'
            control={Input}
            label='Position'
            placeholder='Front End Developer'
            value={position}
            onChange={this.handleChange}
          />
          <label>Position Details</label>
          <ReactQuill
            value={position_details}
            name='positionDetails'
            label='Description'
            placeholder='Ruby on Rails job that...'
            required
            onChange={(value) => this.handleQuill(value, 'position_details')}
          />
          <br />
          <Form.Field>
            <Checkbox
              name='applied'
              onChange={this.toggleCheckbox}
              label='Applied'
              checked={applied}
            />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
        <br />
        <br />
        <br />
      </Container>
    );
  };
};

export default connect()(CompanyEditForm);
