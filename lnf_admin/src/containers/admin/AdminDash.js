import React, {Component, Fragment} from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux'
import LostItems from '../table/LostItems'
import FoundItems from '../table/FoundItems'
import UserList from '../table/UserList'
import {getUserListAPI} from '../../actions/user'
import {getLostItemListAPI, getFoundItemListAPI} from '../../actions/itemlist'

class PostItem extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
        visibleUserTable: true,
        visibleFoundTable: false,
        visibleLostTable: false,
        userData:[],
        lostItems:[],
        foundItems:[]
    }
  }

  componentDidMount() {
    this.props.getUserList()
      .then(response => {
        this.setState({ userData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    this.props.getFoundItems()
    .then(response => {
      this.setState({ foundItems: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });    
    this.props.getLostItems()
    .then(response => {
      this.setState({ lostItems: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  decreaseUserCount= ()=>{
    var data  = this.state.userData;
    console.log(data);
    data.pop();
    this.setState({
      data: [...data]
    })
  }

  decreaseLostItemCount= ()=>{
    var data  = this.state.lostItems;
    console.log(data);
    data.pop();
    this.setState({
      data: [...data]
    })
  }

  decreaseFoundItemCount= ()=>{
    var data  = this.state.foundItems;
    console.log(data);
    data.pop();
    this.setState({
      data: [...data]
    })
  }
  render() {
    
    const TotalUserItem = (
    <Card className="HOME_CARD1">
        <div class="card-body">
            <h2 class="card-title">Total USERS(S)</h2>
            <h4 class="card-text">{this.state.userData.length}</h4>
            <button onClick={ () => this.setState({ visibleFoundTable: false, visibleLostTable:false, visibleUserTable:true }) } class="btn btn-dark my-post-button" >VIEW</button>
        </div>
    </Card>);

const TotalFoundItem = (
  <Card className="HOME_CARD1">
      <div class="card-body">
          <h2 class="card-title">Total FOUND(S)</h2>
          <h4 class="card-text">{this.state.foundItems.length}</h4>
          <button  onClick={ () => {this.setState({ visibleFoundTable: true, visibleLostTable:false, visibleUserTable:false });console.log(this.state.visibleTable);} } class="btn btn-dark my-post-button" >VIEW</button>
      </div>
  </Card>);

const TotalLostItem = (
  <Card className="HOME_CARD1">
      <div class="card-body">
          <h2 class="card-title">Total LOST(S)</h2>
          <h4 class="card-text">{this.state.lostItems.length}</h4>
          <button  onClick={ () => this.setState({ visibleFoundTable: false, visibleLostTable:true, visibleUserTable:false }) } class="btn btn-dark my-post-button" >VIEW</button>
      </div>
  </Card>);

    return (
      <Fragment>
        <div className="container-fluid">
          <Row className="my-card-row">
            <Col className="mx-auto col-md-3">
              {TotalUserItem}
            </Col>
            <Col  className="mx-auto col-md-3">
              {TotalFoundItem}
            </Col>
            <Col className="mx-auto col-md-3">
              {TotalLostItem}
            </Col>
          </Row>
          <Row>
          <FoundItems isHidden={this.state.visibleFoundTable} onDecreaseFoundItemCount={this.decreaseFoundItemCount}/>
          <LostItems isHidden={this.state.visibleLostTable} onDecreaseLostItemCount={this.decreaseLostItemCount}/>
          <UserList isHidden={this.state.visibleUserTable} onDecreaseUserCount={this.decreaseUserCount} />
          </Row>
        </div>
      </Fragment>
    );
  }
}

const reduxDispatch = (dispatch) => ({
  getUserList: () => dispatch(getUserListAPI()),
  getFoundItems: () => dispatch(getFoundItemListAPI()),
  getLostItems: () => dispatch(getLostItemListAPI()),
});

export default connect(null, reduxDispatch)(PostItem);
