import React from 'react';
import axios from 'axios';
import Companies from './Companies';
import Company from './Company';
import CompanyEditForm from './CompanyEditForm';
import CompanyForm from './CompanyForm';
import ProtectedRoute from '../ProtectedRoute';
import { Switch, } from 'react-router-dom';

class FetchCompanies extends React.Component {
  state = { companies: [], loaded: false, };

  componentDidMount() {
    axios.get('/api/companies')
      .then( res => {
        this.setState({ companies: res.data, loaded: true });
      })
      .catch( err => {
        console.log(err.response)
      });
  };

  updateCompanies = (company) => {
    const compare = (a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      let comparison = 0;
      if (titleA > titleB) {
        comparison = 1;
      } else if (titleA < titleB) {
        comparison = -1;
      }
      return comparison;
    };

    let companies = this.state.companies.map( c => {
      if (c.id === company.id) {
        return company;
      } else {
        return c;
      }
    })
    companies = companies.sort(compare);
    this.setState({ companies, });
  };

  handleDelete = (id) => {
    let confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      axios.delete(`/api/companies/${id}`)
        .then( res => {
          this.setState({ companies: this.state.companies.filter(c => c.id !== id) });
          this.props.history.push('/companies');
        })
        .catch( err => {
          console.log(err.response)
        });
    }
  };

  render() {
    if (!this.state.loaded) return null;
    return (
      <Switch>
        <ProtectedRoute
          exact
          path='/companies'
          component={Companies}
          companies={this.state.companies}
        />
        <ProtectedRoute exact path='/companies/new' component={CompanyForm} />
        <ProtectedRoute
          exact
          path='/companies/:id'
          component={Company}
          companies={this.state.companies}
          handleDelete={this.handleDelete}
        />
        <ProtectedRoute
          exact
          path='/companies/:id/edit'
          component={CompanyEditForm}
          updateCompanies={this.updateCompanies.bind(this)}
          companies={this.state.companies}
        />
      </Switch>
    )
  }
}

export default FetchCompanies;
