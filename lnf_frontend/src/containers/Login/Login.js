import React, {Component, Fragment} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form';
import { loginAPI } from '../../actions/auth'
import LoginForm from './LoginForm';

import { Notification } from 'element-react';
import 'element-theme-default';
class Login extends Component {

  handleSubmit = (data) => {
    return this.props.login(data)
      .then((res) => {
        
        Notification({
          title: 'Success',
          message: 'Login Success',
          type: 'success',
          duration: 1500
        });
        this.props.history.push('/homepage');        
      }, (err) => {
        throw new SubmissionError({
          _error: 'Login failed! Email Or Password not correct'
        })
      });
  }

  render() {
    const {handleSubmit} = this;

    return (
      <Fragment>
        <Container className="mt-5">
          <Row>
            <Col md={6} className="mx-auto">
              <h2>Login</h2>
              <hr/>
              <LoginForm onSubmit={handleSubmit} />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const reduxDispatch = (dispatch) => ({
  login: (data) => dispatch(loginAPI(data))
});

export default connect(null, reduxDispatch)(Login);
