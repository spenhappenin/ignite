import React, { Fragment, } from 'react';
import GenerateHtml from '../GenerateHtml';
import styled from 'styled-components';
import { Link, } from 'react-router-dom';
import { Button, Container, Header, Icon, Image, Segment, } from 'semantic-ui-react';

class Company extends React.Component {
  state = { company: null, };

  componentDidMount() {
    this.setState({ company: this.props.companies.find( c => c.id === parseInt(this.props.match.params.id, 10)), });
  };

  displayAppliedInfo = (company) => {
    if (company.applied) {
      return (
        <Fragment>
          <Field>
            <Header as='h5' style={{ marginBottom: 0, marginRight: '10px', }}>Position:</Header>
            <p>{company.position}</p>
          </Field>
          <Header as='h5' style={{ marginBottom: 0, marginRight: '10px', }}>Position Details:</Header>
          <Segment>
            {
              company.position_details ?
                <GenerateHtml text={company.position_details} />
                :
                <p>No company details added...</p>
            }
          </Segment>
        </Fragment>
      );
    };
  };

  render() {
    const { company, } = this.state;
    const { handleDelete, } = this.props;

    if (company === null) return null;
    return (
      <Container>
        <br />
        <Header as='h2'>{company.title}</Header>
        <Header as='h5'>Company Logo:</Header>
        {
          company.image ?
            <Image src={company.image} size='small' />
            :
            <p>No company logo added...</p>
        }
        <Header as='h5'>Company Description:</Header>
        <Segment>
          {
            company.description ?
              <GenerateHtml text={company.description} />
              :
              <p>No company description added...</p>
          }
        </Segment>
        <Field>
          <Header as='h5' style={{ marginBottom: 0, marginRight: '10px', }}>Location:</Header>
          <p>{company.location}</p>
        </Field>
        <Header as='h5'>Company Contacts:</Header>
        <Segment>
          {
            company.contacts ?
              <GenerateHtml text={company.contacts} />
              :
              <p>No company contacts added...</p>
          }
        </Segment>
        <br />
        <Field>
          <p>
            <b>Applied?</b> 
            { company.applied ? 
                <Icon name='check' color='green' size='large' /> 
              : 
                <Icon name='delete' color='red' size='large' />
            }
          </p>
        </Field>
        <br />
        { this.displayAppliedInfo(company) }
        <br />
        <Button.Group icon>
          <Link to={`/companies/${company.id}/edit`}>
            <Button color='yellow'>
              <Icon name='pencil' /> Edit
            </Button>
          </Link>
          <Button color='red' onClick={() => handleDelete(company.id)}>
            <Icon name='trash' /> Delete
          </Button>
        </Button.Group>
        <br />
        <br />
        <br />
      </Container>
    );
  };
};

const Field = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default Company;
