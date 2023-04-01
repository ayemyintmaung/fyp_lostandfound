import React, {Component} from 'react';
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form';
import { Button,Icon, Dialog, Layout, Table, Card } from 'element-react';
import {getLostItemListAPI} from '../../actions/itemlist'
import 'element-theme-default';

class LostItems extends Component {

  handleSubmit = (data) => {
    console.log(data);  

    return this.props.login(data)
      .then((res) => {
        console.log(res);
        this.props.history.push('/admin');        
      }, (err) => {
        console.log(err.response);
        throw new SubmissionError({
          _error: 'Login failed! Email Or Password not correct'
        })
      });
  }

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
            return <span><Button type="primary" size="normal" className='my-table-button' icon="star-on"  onClick={this.handleDetailBtn.bind(this, index)}>Detail</Button></span>
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

  handleDetailBtn(index) {
    this.setState({ dlgdata: this.state.data[index] })
    this.setState({ dialogVisible: true })
  }
  
  render() {
    var file_path=this.state.dlgdata.image;
    var splitted_parts = this.state.dlgdata && file_path && file_path.split('\\');
    const last = splitted_parts&&splitted_parts.length;
    var path=splitted_parts&&splitted_parts[last-1];
        return (
      	<Layout.Row>
        	<Layout.Col span="16"  offset="4"><div className="grid-content bg-purple-dark" >
       			<Card className="box-card, TABLE_CARD">
          		<h1>LOST ITEMS LIST</h1>
          		<hr/>
                  <Table
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        data={this.state.data}
                        border={true}
                        height={500}
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
                      {/* {(contentDlg)} */}
                      {/* <span>This is a message</span> */}
                    </Dialog.Body>
                </Dialog>
        	</Layout.Row>
    )

  }
}
  
const reduxDispatch = (dispatch) => ({
  getLostItemList: () => dispatch(getLostItemListAPI())
});

export default connect(null, reduxDispatch)(LostItems);
