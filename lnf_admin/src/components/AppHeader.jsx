import React, {Component} from 'react';

import { Navbar,
         Container,
         Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import logo from "../assets/imgs/logo.svg";


class AppHeader extends Component {

	render() {

		return(
	        <Navbar expand="lg" color="while" className='App-Header'>
	          <Container>
	            <Navbar.Brand className = "App-Logo">
					<img src={logo} className="App-logo" alt="logo" />
				</Navbar.Brand>
	            <Navbar.Toggle aria-controls="basic-navbar-nav" />
	            <Navbar.Collapse id="basic-navbar-nav">
	              <Nav className="mr-auto">
	                <LinkContainer to="/admin/dashboard
					">
	                  <div className='App-Nav-Link'>FOUND AND LOST ITEMS (ADMIN PANEL)</div>
	                </LinkContainer>
	              </Nav>
	            </Navbar.Collapse>
	          </Container>
	        </Navbar>
		)
	}
}

const reduxState = (state) => ({
  auth: state.auth
});

export default withRouter(connect(reduxState, null)(AppHeader));

