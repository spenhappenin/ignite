import React from 'react';
import GenerateHtml from './GenerateHtml';
import styled from 'styled-components';
import { Link, } from 'react-router-dom';
import { Button, Container, Header, Icon, Search, Table } from 'semantic-ui-react';

class Companies extends React.Component {
  state = { searchText: '', };

  displayCompanies = () => {
    if (this.props.companies.length <= 0)
      return <Header as='h3'>You have no companies. Go add some!</Header>

    return this.props.companies.map( (c, i) => (
        <Table.Row>
          <Table.Cell width={5}>
            <StyledCompanyTitle key={i} to={`/companies/${c.id}`}>
              {c.title}
            </StyledCompanyTitle>
          </Table.Cell>
          <Table.Cell>{c.location}</Table.Cell>
          <Table.Cell width={8}>
            <GenerateHtml text={c.description} />
          </Table.Cell>
        </Table.Row>
    ));
  };

  render() {
    return (
      <Container>
        <br />
        <Header as='h1'>Companies</Header>
        <div style={{ display: 'flex', }}>
          <Search style={{ marginRight: '20px', }} />
          <Link to='/companies/new'>
            <Button color='blue'>
              <Icon name='add' />
              Add Company
            </Button>
          </Link>
        </div>
        <br />
        <br />
        <Table celled padded striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.displayCompanies() }
          </Table.Body>
        </Table>
        <br />
        <br />
        <br />
        <br />
      </Container>
    );
  };
};

const StyledCompanyTitle = styled(Link)`
  font-size: 20px;
  font-weight: 400;
  color: black;
  padding: 10px;
  display: block;
`;

export default Companies;
