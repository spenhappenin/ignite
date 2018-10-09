import React, { Component, Fragment, } from "react";
import axios from "axios";
import moment from "moment";
import pencilIcon from "../images/pencil.svg"
import styled from "styled-components";
import trashIcon from "../images/trash.svg"
import { Link, } from "react-router-dom";
import { AddButton, UpdateButton, DeleteButton, } from "../styles/shared";
import { Accordion, Container, Header, Icon, Dropdown, Segment, } from "semantic-ui-react";

class Application extends Component {
  state = { application: null, steps: [], activeIndex: null, };

  options = [
    { key: 1, text: 'Edit', value: 1 },
    { key: 2, text: 'Delete', value: 2 },
  ]

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

  handleDelete = () => {
    debugger
  };

  renderSteps = () => {
    const { steps, activeIndex, } = this.state;
    if (steps.length === 0)
      return <p>No Steps</p>;
    return steps.map( (s, i) => {
      // const formattedDate = moment(s.due_date).format("MMMM DD, YYYY @ HH:mm A")
      const formattedDate = moment(s.due_date).format("M/DD/YY @ HH:mm A")
      return (
        <Fragment>
          <AccordionTitle 
            active={activeIndex === i} 
            index={i} 
            onClick={this.handleClick} 
            style={{ display: "flex", justifyContent: "space-between", border: "1px solid #dededf",  background: "white", }}
          >
            <div style={{ display: "flex" }}>
              <Icon name='dropdown' size="big" />
              <h2 style={{ marginTop: 0, }}>{s.title}</h2>
            </div>
            <div style={{ display: "flex" }}>
              {
                s.complete ? 
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon name="calendar check outline" size="big" color="green" />
                    <Header as="h3" style={{ margin: 0, }} color="green">Complete</Header>
                  </div>
                :
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon name="calendar alternate outline" size="big" color="blue" />
                    <Header as="h3" style={{ margin: 0, }}>{formattedDate}</Header>
                  </div>
              }
            </div>
          </AccordionTitle>
          <AccordionContent 
            active={activeIndex === i} 
            style={{ background: "white", marginLeft: "40px", borderLeft: "1px solid #dededf", borderRight: "1px solid #dededf",  }}
          >
            <Link to={`/`}>Edit</Link>
            <p>Delete</p>
            <div style={{ display: "flex", flexDirection: "row", }}>
              <h4>Due Date:</h4>
              { formattedDate }
            </div>
            <h4>Notes:</h4>
            <p>{s.notes}</p>
          </AccordionContent>
        </Fragment>
      )
    });
  };

  render() {
    if (this.state.application !== null) {
      const { 
        application: { 
          id, position, notes, company_title, company_image, company_location, overall_status, reference, sent_date, source, 
        },
      } = this.state;
      return (
        <Container style={{ marginBottom: "100px", }}>
          <br />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
            <div>
              <CompanyLogo alt='company-logo' src={company_image} />
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Title>{`${position} at ${company_title}`}</Title>
                <p>{company_location}</p>
              </div>
            </div>
            <Dropdown text={<Icon name="settings" size="big" />}>
              <Dropdown.Menu style={{ width: "120px", }}>
                <Link to={`/applications/edit/${id}`} style={{ color: "black" }}>
                  <Dropdown.Item>
                    Edit
                  </Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item 
                  onClick={this.handleDelete}
                  style={{ background: "#e44242", color: "white", fontWeight: "bold", }}
                >
                  Delete Application
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
          <br />
          <Accordion fluid style={{ background: "none", }}>
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
