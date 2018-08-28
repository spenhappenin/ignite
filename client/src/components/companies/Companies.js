import React from 'react';
import GenerateHtml from '../GenerateHtml';
import styled from 'styled-components';
import { Link, } from 'react-router-dom';
import { Button, Checkbox, Container, Header, Icon, Image, Table } from 'semantic-ui-react';

class Companies extends React.Component {
  state = { applied: false, search: '', tableView: true, };

  displayTableView = () => {
    let filteredCompanies = this.props.companies.filter( company => {
      return company.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || 
      company.location.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ;
    });

    if (this.props.companies.length <= 0)
      return <Header as='h3'>You have no companies. Go add some!</Header>

    return filteredCompanies.map( c => {
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
    let filteredCompanies = this.props.companies.filter( company => {
      return company.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    });

    return filteredCompanies.map( c => {
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

  updateSearch = (e) => this.setState({ search: e.target.value.substr(0, 20), });

  render() {
    return (
      <Container>
        <br />
        <Header as='h1'>Companies</Header>
        <div style={{ display: 'flex', }}>
          <SearchBar>
            <SearchInput
              type='text' 
              value={this.state.search}
              onChange={this.updateSearch}
            />
            <SearchIconContainer>
              <Icon name='search' size='large' color='grey' style={{ marginLeft: '3.5px', }} />
            </SearchIconContainer>
          </SearchBar>
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

const SearchBar = styled.div`
  border: 1px solid #dededf;
  display: flex;
  align-items: center;
  margin-right: 20px;
  padding: 10px;
`;

const SearchInput = styled.input`
  -webkit-appearance: none;
  border: none;
  outline: none;
`;

const SearchIconContainer = styled.div`
  margin-left: 3.5px;
`;

const StyledCompanyTitle = styled(Link)`
  font-size: 20px;
  font-weight: 400;
  color: black;
  padding: 10px;
  display: flex;
`;

export default Companies;
