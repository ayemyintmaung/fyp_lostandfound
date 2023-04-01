import React, {Component, Fragment} from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { registerAPI } from '../../actions/auth'
import RegisterForm from './RegisterForm'

import { Notification } from 'element-react';
import 'element-theme-default';
class Register extends Component {

  handleSubmit = (data) => {
    console.log(data)

    return this.props.register(data)
      .then((res) => {
        console.log(res);
        this.props.history.push('/login');     
        Notification({
          title: 'Success',
          message: 'Register Success, Please Log in now.',
          type: 'success',
          duration: 1500
        });     
      }, (err) => {
        console.log(err.response);
        throw new SubmissionError({
          _error: 'Your email has already been registered.'
        })
      })

  }

  render() {
    const {handleSubmit} = this
    // const {message} = this.props.message

    return (
      <Fragment>
        <Container className="mt-5">
          
          <Row>
            <Col md={6} className="mx-auto">
              
              <h2>Register</h2>
              {/* {message && <div className="alert alert-success">{message}</div>} */}
              <hr/>

              <RegisterForm onSubmit={handleSubmit}/>  

            </Col>
          </Row>
          

        </Container>
      </Fragment>      
    );
  }

}

const reduxState = (state) => ({
  message: state.auth
})

const reduxDispatch = (dispatch) => ({
  register: (data) => dispatch(registerAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);
