import React from 'react';
import GenerateHtml from '../GenerateHtml';
import styled from 'styled-components';
import { Link, } from 'react-router-dom';
import { Button, Checkbox, Container, Header, Icon, Image, Search, Table } from 'semantic-ui-react';

class Companies extends React.Component {
  state = { applied: false, searchText: '', tableView: true, };

  displayTableView = () => {
    if (this.props.companies.length <= 0)
      return <Header as='h3'>You have no companies. Go add some!</Header>

    return this.props.companies.map( c => {
      if (this.state.applied) {
        return c.applied ? 
          this.renderTableRow(c)
        :
          null
      };
      return (
        this.renderTableRow(c)
      );
    });
  };

  displayListView = () => {
    return this.props.companies.map( c => {
      if (this.state.applied) {
        return c.applied ?
          <StyledCompanyTitle key={c.id} to={`/companies/${c.id}`}>
            { c.title }
          </StyledCompanyTitle>
        :
          null
      };
      return (
        <StyledCompanyTitle key={c.id} to={`/companies/${c.id}`}>
          { c.title }
        </StyledCompanyTitle>
      );
    });
  };

  renderTableRow = (c) => (
    <Table.Row key={c.id}>
      <Table.Cell width={5}>
        <StyledCompanyTitle to={`/companies/${c.id}`}>
          { c.title }
        </StyledCompanyTitle>
      </Table.Cell>
      <Table.Cell>
        <Image
          src={c.image}
          size='tiny'
          style={{ marginRight: '12px', }}
        />
      </Table.Cell>
      <Table.Cell>{c.location}</Table.Cell>
      <Table.Cell width={8}>
        <GenerateHtml text={c.description} />
      </Table.Cell>
    </Table.Row>
  );

  toggleCheckbox = () => this.setState({ applied: !this.state.applied, });

  toggleView = () => this.setState({ tableView: !this.state.tableView, });

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
        <button onClick={this.toggleView} style={{ display: 'inline-block', padding: '10px', cursor: 'pointer', marginRight: '20px' }}>
          { this.state.tableView ? "List View" : "Table View" }
        </button>
        <Checkbox onChange={this.toggleCheckbox} label='Show Applied' />
        <br />
        {
          this.state.tableView ? 
            <Table celled padded striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Logo</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                { this.displayTableView() }
              </Table.Body>
            </Table>
          :
            <div>
              { this.displayListView() }
            </div>
        }
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
  display: flex;
`;

export default Companies;
