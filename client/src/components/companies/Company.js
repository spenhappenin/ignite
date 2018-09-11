import React, { Fragment, } from 'react';
import axios from 'axios';
import GenerateHtml from '../GenerateHtml';
import styled from 'styled-components';
import PencilIcon from "../../images/pencil.svg"
import TrashIcon from "../../images/trash.svg"
import { Link, } from 'react-router-dom';
import { Button, Container, Header, Icon, Image, Segment, Table, } from 'semantic-ui-react';

class Company extends React.Component {
  state = { company: null, contacts: [], };

  componentDidMount() {
    this.setState({ company: this.props.companies.find( c => c.id === parseInt(this.props.match.params.id, 10)), });
    axios.get(`/api/company/${this.props.match.params.id}/contacts`)
      .then( res => {
        this.setState({ contacts: res.data, });
      })
      .catch( err => {
        console.log(err)
      })
  };

  handleDelete = (id) => {
    let confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) 
      axios.delete(`/api/contacts/${id}`)
        .then( res => {
          let newContacts = this.state.contacts.filter( c => c.id !== res.data.id );
          this.setState({ contacts: newContacts });
        })
  };

  renderContacts = () => {
    if (this.state.contacts.length === 0)
      return <h5>No Contacts Added</h5>;
    return this.state.contacts.map( c => {
      return (
        <Table.Row key={c.id}>
          <Table.Cell>{c.name}</Table.Cell>
          <Table.Cell>{c.email}</Table.Cell>
          <Table.Cell>{c.phone}</Table.Cell>
          <Table.Cell>{c.position}</Table.Cell>
          <Table.Cell>{c.description}</Table.Cell>
          <Table.Cell 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "center", 
              alignItems: "center", 
              padding: "10px 14px 10px 14px" 
            }}
          >
            <Link to={`/companies/${this.state.company.id}/contacts/${c.id}`} style={{ marginBottom: "10px" }}>
              <img src={PencilIcon} style={{ height: "25px", width: "25px", }} />
            </Link>
            <img 
              onClick={() => this.handleDelete(c.id)} 
              src={TrashIcon} 
              style={{ height: "25px", width: "25px", cursor: "pointer", }} 
            />
          </Table.Cell>
        </Table.Row>
      );
    });
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
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
          <Header as='h3' style={{ marginTop: "12px", }}>Company Contacts:</Header>
          <Link to={`/companies/${company.id}/contacts/new`}>
            <NewButton>Add Contact</NewButton>
          </Link>
        </div>
        <Table celled padded striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Position</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
              <Table.HeaderCell>Config</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.renderContacts() }
          </Table.Body>
        </Table>
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

const NewButton = styled.button`
  color: #fff !important;
  background: #2ecc71;
  border-color: transparent;
  letter-spacing: .7px;
  padding: 15px;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease, border 0.2s ease;

  &:hover {
    background: #29b765;
    transition: background 0.2s ease, border 0.2s ease;
  }
`;

export default Company;
