import React, { Component, } from "react";
import Profile from "./Profile";
import { Container, Grid, } from "semantic-ui-react";

class Settings extends Component {
  state = { activeItem: "profile", };

  handleClick = (e) => {
    this.setState({ activeItem: e.target.id, });
  };

  renderSettingsContent = () => {
    const { activeItem, } = this.state;
    switch(activeItem) {
      case "profile":
        return <Profile />
      default:
        return <Profile />
    }
  };

  render() {
    return (
      <Container>
        <h2>Settings</h2>
        <br />
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <h3 id="profile" onClick={this.handleClick} style={{ cursor: "pointer" }}>Profile</h3>
            </Grid.Column>
            <Grid.Column width={12}>
              { this.renderSettingsContent() }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  };
};

export default Settings;
