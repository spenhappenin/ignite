import React, { Component, Fragment, } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, } from "react-router-dom";
import { AddButton, UpdateButton, DeleteButton, } from "../styles/shared";
import { Accordion, Container, Header, Icon, Segment, } from "semantic-ui-react";

class Application extends Component {
  state = { application: null, steps: [], activeIndex: null, };

  componentDidMount() {
    // this.setState({ activeIndex: this.state.steps.length - 1, });
    axios.get(`/api/applications/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ application: res.data, });
      })
    axios.get(`/api/applications/${this.props.match.params.id}/steps`)
      .then( res => {
        this.setState({ steps: res.data, });
      })
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  };

  handleDelete = () => {
    const { id, } = this.state.application;
    axios.delete(`/api/applications/${id}`)
      .then( res => {
        this.props.history.push("/applications")
      })
  };

  renderSteps = () => {
    const { steps, activeIndex, } = this.state;
    if (steps.length === 0)
      return <p>No Steps</p>;
    return steps.map( (s, i) => (
      <Fragment>
        <AccordionTitle active={activeIndex === i} index={i} onClick={this.handleClick}>
          <Icon name='dropdown' />
          <h2 style={{ marginTop: 0, }}>{s.title}</h2>
        </AccordionTitle>
        <AccordionContent active={activeIndex === i}>
          <p>{s.notes}</p>
        </AccordionContent>
      </Fragment>
    ));
  };

  render() {
    if (this.state.application !== null) {
      const { 
        application: { 
          id, position, notes, company_title, company_image, company_location, overall_status, reference, sent_date, source, 
        },
      } = this.state;
      return (
        <Container>
          <br />
          <Link to={`/applications/edit/${id}`}>
            <UpdateButton>Edit Application</UpdateButton>
          </Link>
          <DeleteButton onClick={this.handleDelete}>Delete Application</DeleteButton>
          <div style={{ display: "flex", alignItems: "center", }}>
            <CompanyLogo alt='company-logo' src={company_image} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Title>{`${position} at ${company_title}`}</Title>
              <p>{company_location}</p>
            </div>
          </div>
          <br />
          <div style={{ display: "flex", }}>
            <h4 style={{ marginRight: "20px", }}>Sent Date:</h4>
            { sent_date }
          </div>
          <br />
          <h4>Notes:</h4>
          <Segment>
            { notes }
          </Segment>
          <br />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ marginBottom: 0, }}>Application Progress</h2>
            <Link to={`/applications/${this.props.match.params.id}/steps/new`}>
              <AddButton>Add Step</AddButton>
            </Link>
          </div>
          <hr />
          <Accordion styled fluid>
            { this.renderSteps() }
          </Accordion>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Container>
      );
    } else {
      return <p>Loading...</p>
    }
  };
};

const AccordionTitle = styled(Accordion.Title)`
  display: flex;
  align-items: center;
  padding: 30px !important;
`;

const AccordionContent = styled(Accordion.Content)`
  padding: 30px !important;
  padding: 10px 30px 30px 30px !important;
`;

const CompanyLogo = styled.img`
  height: 65px;
  margin-right: 20px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 0;
`;

export default Application;
