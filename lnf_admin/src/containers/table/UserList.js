import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap';
import { Button,Layout, Table, Card } from 'element-react';
import {getUserListAPI, deleteUserAPI} from '../../actions/user'
import { Notification } from 'element-react';
import 'element-theme-default';

class UserList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          label: "Name",
          prop: "name",
          width: 180
        },
        {
            label: "Email",
            prop: "email"
        },
        {
          label: "...",
          width: 200,
          render: (row, column, index)=>{
            return <span><Button type="danger" size="normal" className='my-table-button' icon="delete"  onClick={this.handleDeleteBtn.bind(this, index)}>Delete</Button></span>
          }
        }
      ],
      data: [],
    
    }
  }

  componentDidMount() {
    this.props.getUserList()
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  deleteUser(id){
    // console.log(id);
    this.props.deleteUser(id)
    .then(response => {
        Notification({
            title: 'Success',
            message: 'Delete User Successful',
            type: 'success',
            duration: 1500
          });
      console.log(response);

    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleDeleteBtn(index) {
    // console.log(this.state.data[index]);
    this.deleteUser(this.state.data[index]._id);
    const { data } = this.state;
    data.splice(index, 1);
    this.setState({
      data: [...data]
    });
    this.props.onDecreaseUserCount();
  }

  
  render() {
    
    if (!this.props.isHidden) {
      return null
    }   
    
    return (
    <Col className="md-12">
        <Layout.Col span="22"  offset="1"><div className="grid-content bg-purple-dark my-detail-card" >
            <Card className="box-card, TABLE_CARD_USER">
            <h1>USER LIST</h1>
            <hr/>
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                    height={400}
                    highlightCurrentRow={true}
                />
                </Card></div>
            </Layout.Col>
        </Col>
    )

  }
}
  
const reduxDispatch = (dispatch) => ({
  getUserList: () => dispatch(getUserListAPI()),
  deleteUser:(id)=>dispatch(deleteUserAPI(id))
});

export default connect(null, reduxDispatch)(UserList);
