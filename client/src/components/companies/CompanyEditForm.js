import React from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { Button, Checkbox, Container, Form, Header, Input, } from 'semantic-ui-react';

class CompanyEditForm extends React.Component {
  state = { 
    applied: false, 
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
    const { company: { applied, description, image, location, position, position_details, title, }, } = this.state;

    if (this.state.setFormData !== true) {
      this.setState({ applied, description, image, location, position, position_details, title, setFormData: true, });
    }
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value, });

  toggleCheckbox = () => this.setState({ applied: !this.state.applied, });

  handleSubmit = (e) => {
    const { history, updateCompanies, } = this.props;
    const { applied, description, image, location, position, position_details, title, company: { id, }, } = this.state;
    const company = { applied, description, id, image, location, position, position_details: position_details, title, };

    e.preventDefault();
    axios.put(`/api/companies/${id}/edit`, company)
      .then( res => {
        updateCompanies(company);
        history.push('/companies');
      })
      .catch( err => {
        console.log(err);
      })
  };

  handleQuill = (value, name) => {
    this.setState({ [name]: value });
  };

  render() {
    const { applied, description, image, location, position, position_details, title, } = this.state;

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
          <br />
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
