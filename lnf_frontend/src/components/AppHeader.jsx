import React, {Component, Fragment} from 'react';

import { Navbar,
         Container,
         Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { logoutAPI } from '../actions/auth';
import { withRouter } from 'react-router-dom';
import logo from "../assets/imgs/logo.svg";


class AppHeader extends Component {

	handleLogout = () => {
		this.props.logout()
		  	.then((res) => {
		    	console.log(res);
		    	this.props.history.push('/login');
				
		  	}, (err) => {
		    	console.log(err.response);
		  	}) 
	}  	

	render() {

	    const {isAuthenticated} = this.props.auth;

	    const GuestNav = (
	      <Fragment>
	        <LinkContainer to="/login">
			<div className='App-Nav-Link-LR'>Login</div>
	        </LinkContainer>
	        <LinkContainer to="/register">
			<div className='App-Nav-Link-LR'>Register</div>
	        </LinkContainer>              
	      </Fragment>
	    )

	    const UserNav = (
			<Fragment>
				<LinkContainer to="/homepage">
					<div className='App-Nav-Link-LR'>POST</div>
				</LinkContainer>  

				<LinkContainer to="/login">
					<div className='App-Nav-Link-LR'  onClick={this.handleLogout}>Logout</div>
				</LinkContainer>  
			</Fragment>
	    )

		return(
	        <Navbar expand="lg" color="while" className='App-Header'>
	          <Container>
	            <Navbar.Brand className = "App-Logo">
					<img src={logo} className="App-logo" alt="logo" />
				</Navbar.Brand>
	            <Navbar.Toggle aria-controls="basic-navbar-nav" />
	            <Navbar.Collapse id="basic-navbar-nav">
	              <Nav className="mr-auto">
	                <LinkContainer to="/">
	                  <div className='App-Nav-Link'>FOUND AND LOST ITEMS</div>
	                </LinkContainer>
	              </Nav>
	              <Nav>
	                {isAuthenticated ? UserNav : GuestNav }
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

const reduxDispatch = (dispatch) => ({
  logout: () => dispatch(logoutAPI())
})

export default withRouter(connect(reduxState, reduxDispatch)(AppHeader));

