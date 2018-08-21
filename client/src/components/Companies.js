import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, } from 'react-router-dom';
import { Button, Container, Header, Icon, Search, } from 'semantic-ui-react';

class Companies extends React.Component {
  state = { searchText: '', };

  displayCompanies = () => {
    if (this.props.companies.length <= 0)
      return <Header as='h3'>You have no companies. Go add some!</Header>

    return this.props.companies.map((c, i) => (
      <StyledCompanyTitle key={i} to={`/companies/${c.id}`}>
        {c.title}
      </StyledCompanyTitle>
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
        <div style={{ display: 'inline-block' }}>
          { this.displayCompanies() }
        </div>
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
