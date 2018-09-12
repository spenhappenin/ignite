import React from 'react';
import styled from 'styled-components';
import { AddButton, } from "../../styles/shared";
import listIcon from "../../images/list.svg";
import listIconHover from "../../images/list-hover.svg";
import tableIcon from "../../images/table.svg";
import tableIconHover from "../../images/table-hover.svg";
import { Link, } from 'react-router-dom';
import { Button, Checkbox, Container, Header, Icon, Image, Table } from 'semantic-ui-react';

class Companies extends React.Component {
  state = { applied: false, search: '', tableView: true, tableView: true, listView: false, };

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
      <Table.Cell>
        
      </Table.Cell>
    </Table.Row>
  );

  toggleCheckbox = () => this.setState({ applied: !this.state.applied, });

  toggleView = (viewType) => {
    if (viewType === "table") {
      this.setState({ tableView: true, listView: false, });
    } else {
      this.setState({ tableView: false, listView: true, });
    };
  };

  updateSearch = (e) => this.setState({ search: e.target.value.substr(0, 20), });

  render() {
    return (
      <Container>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
          <Header as='h1'>Companies</Header>
          <div style={{ display: "flex", borderRadius: "3px", cursor: "pointer", }}>
            <ListViewIconContainer darker={this.state.tableView} onClick={() => this.toggleView("table")}>
              <img
                src={this.state.tableView ? tableIcon : tableIconHover}
                style={{ height: "25px", width: "25px", marginRight: "10px", }}
              />
            </ListViewIconContainer>
            <ListViewIconContainer darker={this.state.listView} onClick={() => this.toggleView("list")}>
              <img
                src={this.state.tableView ? listIconHover : listIcon}
                style={{ height: "25px", width: "25px", }}
              />
            </ListViewIconContainer>
          </div>
        </div>
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: "space-between", }}>
          <div style={{ display: "flex", alignItems: "center", }}>
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
            <Checkbox onChange={this.toggleCheckbox} label='Show Applied' />
          </div>
          <div>
            <Link to='/companies/new'>
              <AddButton>Add Company</AddButton>
            </Link>
          </div>
        </div>
        {
          this.state.tableView ? 
            <Table celled padded striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Logo</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
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

const ListViewIconContainer = styled.div`
  background: ${ props => props.darker ? "#aec0d1" : "#e7f0f7"};
  width: 80px;
  padding: 10px;
  display: flex;
  justify-content: center;
  transition: background 0.2s ease, border 0.2s ease;

  &:hover {
    background: #aec0d1;
    transition: background 0.2s ease, border 0.2s ease;
  }
`;

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
