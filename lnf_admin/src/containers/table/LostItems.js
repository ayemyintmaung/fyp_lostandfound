import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap';
import { Button,Icon, Dialog, Layout, Table, Card } from 'element-react';
import {getLostItemListAPI, deleteLostItemAPI} from '../../actions/itemlist'
import 'element-theme-default';
import { Notification } from 'element-react';

class LostItems extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
        dialogVisible: false,
      columns: [
        {
          label: "Date",
          prop: "date",
          width: 180,
          render: function(data){
            // console.log(data);
            return (
            <span>
              <Icon name="time"/>
              <span style={{marginLeft: '10px'}}>{data.date.substring(0,10)}</span>
            </span>)
          }
        },
        {
          label: "Name",
          prop: "name",
          width: 180
        },
        {
            label: "Category",
            prop: "category",
            width: 180
        },
        {
            label: "Location",
            prop: "region",
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
      
      dlgdata: []
    }
  }

  componentDidMount() {
    this.props.getLostItemList()
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  deleteLostItem(id){
    // console.log(id);
    this.props.deleteLostItem(id)
    .then(response => {
        Notification({
            title: 'Success',
            message: 'Delete Lost Item Successful',
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
    this.deleteLostItem(this.state.data[index]._id);
    const { data } = this.state;
    data.splice(index, 1);
    this.setState({
      data: [...data]
    });
    this.props.onDecreaseLostItemCount();
  }

  
  render() {
    if (!this.props.isHidden) {
      return null
    }
    var file_path=this.state.dlgdata.image;
    var splitted_parts = this.state.dlgdata && file_path && file_path.split('\\');
    const last = splitted_parts&&splitted_parts.length;
    var path=splitted_parts&&splitted_parts[last-1];
        return (
      	<Col className="md-12">
        	<Layout.Col span="22"  offset="1"><div className="grid-content bg-purple-dark my-detail-card" >
       			<Card className="box-card, TABLE_CARD_LOST_ITEM">
          		<h1>LOST ITEMS LIST</h1>
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
                <Dialog className='DIALOG'
                    
                    size="large"
                    visible={ this.state.dialogVisible }
                    onCancel={ () => this.setState({ dialogVisible: false }) }
                    lockScroll={ false }
                  >
                    <Dialog.Body>
                    <Layout.Row>
        	<Layout.Col span="6"  offset="3">
            <div className="grid-content bg-purple-dark DIALOG" >
       			<Card className="box-card, DETAIL_TABLE ">
              <img src = {"http://localhost:8081/"+path} width={200} height={400}></img>
    				</Card></div>
    			</Layout.Col>
          <Layout.Col span="12"  offset="1">
            <div className="grid-content bg-purple-dark" >
       			<Card className="box-card, DETAIL_TABLE">
             <Layout.Row className="DETAIL_CARD_ITEM">
              <Layout.Col span="8">
                Name:
              </Layout.Col>
              <Layout.Col span="16">
              {this.state.dlgdata.name}
              </Layout.Col>
              </Layout.Row>
              <Layout.Row className="DETAIL_CARD_ITEM">
              <Layout.Col span="8">
                Email:
              </Layout.Col>
              <Layout.Col span="16">
              {this.state.dlgdata.email}
              </Layout.Col>
              </Layout.Row>
              <Layout.Row className="DETAIL_CARD_ITEM">
              <Layout.Col span="8">
                Location:
              </Layout.Col>
              <Layout.Col span="16">
              {this.state.dlgdata.region}
              </Layout.Col>
              </Layout.Row>
              <Layout.Row className="DETAIL_CARD_ITEM">
              <Layout.Col span="8">
                Category:
              </Layout.Col>
              <Layout.Col span="16">
              {this.state.dlgdata.category}
              </Layout.Col>
              </Layout.Row>
              <Layout.Row className="DETAIL_CARD_ITEM">
              <Layout.Col span="8">
                Description:
              </Layout.Col>
              <Layout.Col span="16">
              {this.state.dlgdata.description}
              </Layout.Col>
              </Layout.Row>
              <Layout.Row className="DETAIL_CARD_ITEM">
              <Layout.Col span="8">
                Phone:
              </Layout.Col>
              <Layout.Col span="16">
              {this.state.dlgdata.phone}
              </Layout.Col>
              </Layout.Row>
              <Layout.Row>
                <Button className = "my-table-button item-detail" type='info' size='large' icon="share"
                onClick={ () => this.setState({ dialogVisible: false }) }> CONTACT</Button>
              </Layout.Row>
    				</Card></div>
    			</Layout.Col>
      	</Layout.Row>
                    </Dialog.Body>
                </Dialog>
        	</Col>
    )

  }
}
  
const reduxDispatch = (dispatch) => ({
  getLostItemList: () => dispatch(getLostItemListAPI()),
  deleteLostItem:(id)=>dispatch(deleteLostItemAPI(id))
});

export default connect(null, reduxDispatch)(LostItems);
