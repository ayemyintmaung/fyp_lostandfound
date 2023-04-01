import React, {Component, Fragment} from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux'

class PostItem extends Component {

  render() {
    // const {handleSubmit} = this;
    const PostLostItem = (
    <Card className="HOME_CARD1">
        <div class="card-body">
            <h1 class="card-title">REPORT LOST ITEM</h1>
            <p class="card-text">Welcome here! You can report your lost item.</p>
            <a href="/lost" class="btn btn-dark my-post-button" >CLICK HERE</a>
        </div>
    </Card>);
    const PostFoundItem = (
    <Card className="HOME_CARD2">
        <div class="card-body">
            <h1 class="card-title">REPORT FOUND ITEM</h1>
            <p class="card-text">Welcome here! You can report your found item.</p>
            <a href="/found" class="btn btn-dark my-post-button">CLICK HERE</a>
        </div>
    </Card>);
    return (
      <Fragment>
        <Container className="mt-8">
          <Row>
            <Col md={6} className="mx-auto col-md-8">
              <hr/>
              {PostFoundItem}
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mx-auto col-md-8">
              <hr/>
              {PostLostItem}
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }

}

const reduxDispatch = (dispatch) => ({
});

export default connect(null, reduxDispatch)(PostItem);
