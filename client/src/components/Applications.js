import React, { Component, } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, } from "react-router-dom";
import { AddButton, } from "../styles/shared";
import { Container, Grid, Header, Icon, } from "semantic-ui-react";

class Applications extends Component {
  state = { applications: [], };

  componentDidMount() {
    axios.get("/api/applications")
      .then( res => {
        this.setState({ applications: res.data, });
      })
  };

  renderApplications = () => {
    return this.state.applications.map( a => (
      <Link to={`/applications/${a.id}`}>
        <Card>
          <LogoWrapper>
            <CompanyLogo src={a.company_image} />
          </LogoWrapper>
          <ContentWrapper>
            <div>
              <MainText>{a.position}</MainText>
              <SubText>{a.company_title}</SubText>
              <SubText location>{a.company_location}</SubText>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              { this.renderIcon(a.overall_status) }
            </div>
          </ContentWrapper>
        </Card>
      </Link>
    ));
  };

  renderIcon = (status) => {
    switch(status) {
      case "action":
        return <Icon name="building" color="blue" size="big" />
      case "denied":
        return <Icon name="ban" color="red" size="big" />
      case "approved":
        return <Icon name="check circle" color="green" size="big" />
      default:
        return <Icon name="clock outline" color="orange" size="big" />
    }
  };

  render() {
    return (
      <Container>
        <br />
        <Header as="h1">Applications</Header>
        <br />
        <Link to="/applications/new">
          <AddButton>Add Application</AddButton>
        </Link>
        <br />
        <br />
        <br />
        <Grid>
          <Grid.Column width={7}>
            { this.renderApplications() }
          </Grid.Column>
          <Grid.Column width={9}>
            Something else goes here
          </Grid.Column>
        </Grid>
      </Container>
    );
  };
};

const Card = styled.div`
  cursor: pointer;
  display: flex;
  border-bottom: 1px solid #dedede;
  background: white;
  transition: background 0.2s ease

  &:hover {
    background: #f3f3f3;
    transition: background 0.2s ease;
  }
`;
  const LogoWrapper = styled.div`
    display: flex;
    width: 79px;
  `;
    const CompanyLogo = styled.div`
      background: ${ props => `url(${props.src})` };
      height: 79px;
      width: 79px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    `;
  const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px 12px 20px;
  `;

const MainText = styled.p`
  font-size: 15px;
  margin-bottom: 0;
  font-weight: 600;
  color: #297bc7;
`;

const SubText = styled.p`
  font-size: ${ props => props.location ? "12px" : "14px" };
  font-weight: ${ props => props.location ? 100 : 400};
  color: #777777;
  margin-bottom: 0;
`;


export default Applications;
