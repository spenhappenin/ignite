import React, { Component, } from "react";
import axios from "axios";
import styled from "styled-components";
import { Checkbox, Container, Form, Header, Input, Select, TextArea, } from "semantic-ui-react";

class ApplicationForm extends Component {
  state = { 
    companies: [], 
    position: "", 
    company_id: "", 
    sent_date: "", 
    reference: false, 
    source: "", 
    notes: "", 
  };

  componentDidMount() {
    const { match: { params: { id, }, }, } = this.props;
    if (id)
      axios.get(`/api/applications/${id}`)
        .then( res => {
          const { position, sent_date, reference, source, notes, company_id, } = res.data;
          this.setState({ position, sent_date, reference, source, notes, company_id, });
        })

    axios.get('/api/companies')
      .then( res => {
        let options = res.data.map( c => {
          return { key: c.id, text: c.title, value: c.id }
        });
        this.setState({ companies: options, });
      })
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value, });

  handleSubmit = (e) => {
    const { id, } = this.props.match.params;
    e.preventDefault();
    if (id) {
      axios.put(`/api/applications/${id}`, { ...this.state })
        .then( res => {
          this.props.history.goBack();
        })
    } else {
      axios.post("/api/applications", { application: { ...this.state, } })
        .then( res => {
          this.props.history.push("/applications");
        })
    }
  };

  toggleCheckbox = () => this.setState({ reference: !this.state.reference, });

  render() {
    const { position, company_id, sent_date, source, notes, } = this.state;
    const { match: { params: { id, }, }, } = this.props;
    return (
      <Container>
        <br />
        <FormContainer>
          <Header as="h1">{ id ? "Edit Application" : "New Application" }</Header>
          <br />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Field 
                control={Input}
                label="POSITION"
                name="position"
                onChange={this.handleChange}
                placeholder="Position"
                value={position}
              />
              <Form.Field 
                disabled={id}
                control={Select}
                label="COMPANY"
                name="company_id"
                options={this.state.companies}
                onChange={this.handleChange}
                placeholder="Company"
                value={company_id}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field 
                control={Input}
                label="SUBMISSION DATE"
                name="sent_date"
                onChange={this.handleChange}
                placeholder="Sent Date"
                type='date'
                value={sent_date}
              />
              <Form.Field 
                control={Input}
                label="SOURCE"
                name="source"
                onChange={this.handleChange}
                placeholder="Online"
                value={source}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field 
                control={TextArea}
                label="NOTES"
                name="notes"
                onChange={this.handleChange}
                value={notes}
              />
            </Form.Group>
            <Form.Field 
              control={Checkbox}
              label="Reference Submitted"
              name="reference"
              onChange={this.toggleCheckbox}
            />
            <SubmitButton type="submit">
              Add Application
            </SubmitButton>
          </Form>
        </FormContainer>
      </Container>
    );
  };
};

const FormContainer = styled.div`
  background: white;
  padding: 50px 100px 50px 100px;
  border-radius: 5px;
  -webkit-box-shadow: 3px 3px 3px -3px #999, 3px 3px 3px -3px #999, -3px 3px 3px -3px #999;
  -moz-box-shadow: 3px 3px 3px -3px #999, 3px 3px 3px -3px #999, -3px 3px 3px -3px #999;
  box-shadow: 3px 3px 3px -3px #999, 3px 3px 3px -3px #999, -3px 3px 3px -3px #999;
`;

const SubmitButton = styled.button`
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
  margin-top: 20px;

  &:hover {
    background: #17212a;
    transition: all .3s;
  }
`;

export default ApplicationForm;
