import React, { Component, } from "react";
import axios from "axios";
import styled from "styled-components";
import { Checkbox, Container, Form, Header, Input, Select, TextArea, } from "semantic-ui-react";

class StepForm extends Component {
  state = { title: "", notes: "", complete: false, type_of: "", due_date: "", due_time: "", };

  handleChange = (e, { name, value }) => this.setState({ [name]: value, });

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/applications/${this.props.match.params.id}/steps`, { step: { ...this.state, } })
      .then( res => {
        this.props.history.goBack();
      })
  };

  toggleCheckbox = () => this.setState({ complete: !this.state.complete, });

  render() {
    const { title, notes, complete, type_of, due_date, due_time } = this.state;
  
    return (
      <Container>
        <br />
        <FormContainer>
          <Header as="h1">New Step</Header>
          <br />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Field 
                control={Input}
                label="TITLE"
                name="title"
                onChange={this.handleChange}
                placeholder="Title"
                value={title}
              />
              <Form.Field 
                control={Select}
                label="TYPE"
                name="type_of"
                options={typeOptions}
                onChange={this.handleChange}
                placeholder="Type"
                value={type_of}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field 
                control={Input}
                label="DUE DATE"
                name="due_date"
                onChange={this.handleChange}
                placeholder="Due Date"
                type="date"
                value={due_date}
              />
              <Form.Field 
                control={Input}
                label="TIME"
                name="due_time"
                onChange={this.handleChange}
                placeholder="Due Time"
                type="time"
                value={due_time}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field 
                control={TextArea}
                label="NOTES"
                name="notes"
                onChange={this.handleChange}
                placeholder="Notes"
                value={notes}
              />
            </Form.Group>
            <Form.Field 
              control={Checkbox}
              label="Step Complete"
              name="complete"
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

const typeOptions = [
  { key: "interview", text: "Interview", value: "interview", },
  { key: "assessment", text: "Assessment", value: "assessment", }
]

export default StepForm;
