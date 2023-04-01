import React, {Component} from 'react';
import { connect } from 'react-redux'
import { postFoundItemAPI } from '../../actions/post'
import UploaderComponent from './UploaderComponent'
import { Button,Form, Input,Select,Layout,DatePicker,Card } from 'element-react';

class PostLostItem extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      form: {
        name: '',
		email: '',
        region: '',
        category: '',
        date: null,
		phone:'',
        description: '',
		image: ''
      },
	  rules: {
		name: [
		  { required: true, message: 'Please enter item name.', trigger: 'blur' }
		],
		email: [
			{ required: true, type:'email', message: 'Please enter email.', trigger: 'blur' }
		  ],
		region: [
		  { required: true, message: 'Please enter location.', trigger: 'blur' }
		],
		phone: [
			{ required: true, message: 'Please enter phone.', trigger: 'blur' }
		  ],
		date: [
		  { type: 'date', required: true, message: 'Please select date.', trigger: 'change' }
		],
		category: [
			{ required: true, message: 'Please select category.', trigger: 'change' }
		  ],
		  description: [
		  { required: true, message: 'Please enter description', trigger: 'blur' }
		]
	  }
    };
  }

  handleCallback = (childData) =>{
	console.log(childData);
	this.state.form.image = childData;
}

  handleSubmit(e) {
	e.preventDefault();
	this.refs.form.validate((valid) => {
	  if (valid) {
		this.props.postFoundItem(this.state.form);		
		this.props.history.push('/homepage');       	
	  } else {
		console.log('error submit!!');
		return false;
	  }
	});
  }

  handleReset(e) {
	e.preventDefault();
	this.refs.form.resetFields();
  }

  handleSearch(e){
	e.preventDefault();
	this.props.history.push('/founditems'); 
  }
  onSubmit(e) {
    e.preventDefault();
  }
  
  onChange(key, value) {
	this.setState({
		form: Object.assign({}, this.state.form, { [key]: value })
	  });
  }
  render() {
		const leftCard = (
			<Layout.Col span="12">
				<Form ref="form" className="en-US" model={this.state.form} rules={this.state.rules} labelWidth="120">
					<Form.Item label="Item name" prop="name" required = {true}>
						<Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
					</Form.Item>
					<Form.Item label="Email" prop="email" required = {true}>
						<Input value={this.state.form.email} onChange={this.onChange.bind(this, 'email')}></Input>
					</Form.Item>
					<Form.Item label="Phone" prop="phone" required = {true}>
						<Input value={this.state.form.phone} onChange={this.onChange.bind(this, 'phone')}></Input>
					</Form.Item>
					<Form.Item label="Category" prop="category" required = {true}>
						<Select value={this.state.form.category} placeholder="Please select your category" onChange={this.onChange.bind(this, 'category')}>
							<Select.Option label="Daily use" value="daily use"></Select.Option>
							<Select.Option label="Accessory" value="accessory"></Select.Option>
							<Select.Option label="Pet" value="pet"></Select.Option>
							<Select.Option label="Big item" value="big item"></Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="Location" prop="region" required = {true}>
						<Input value={this.state.form.region} onChange={this.onChange.bind(this, 'region')}></Input>
					</Form.Item>
					<Form.Item label="Lost Date">
						<Form.Item prop="date" labelWidth="0px" required = {true}>
							<DatePicker className="en-US"
								value={this.state.form.date}
								placeholder="Pick a date"
								onChange={this.onChange.bind(this, 'date')}
							/>
						</Form.Item>
						</Form.Item>
						<Form.Item label="Description" prop="description" required = {true}>
							<Input type="textarea" value={this.state.form.description} onChange={this.onChange.bind(this, 'description')}></Input>
						</Form.Item>
						<Form.Item>
							<Button type="primary" icon ="caret-right" onClick={this.handleSubmit.bind(this)}>SUBMIT</Button>
							<Button icon="search" type="primary" onClick={this.handleSearch.bind(this)}>Search</Button>
						</Form.Item>
					</Form>
				</Layout.Col> );

		const rightCard2 = (
			<Layout.Col span="6" offset="2" >
					<UploaderComponent parentCallback = {this.handleCallback}/>
			</Layout.Col>
		);

    return (
      <div>
        <br/>
        <hr/>
      	<Layout.Row>
        	<Layout.Col span="18"  offset="3"><div className="grid-content bg-purple-dark" >
       			<Card className="box-card, HOME_CARD2">
          		<h2>REPORT FOUND ITEM</h2>
          		<hr/>
							<Layout.Row>
								{ leftCard }  
								{ rightCard2 }
							</Layout.Row>
    				</Card></div>
    			</Layout.Col>
      	</Layout.Row>
    	</div>
    );
  }

  }



const reduxDispatch = (dispatch) => ({
	postFoundItem: (data) => dispatch(postFoundItemAPI(data))
});

export default connect(null, reduxDispatch)(PostLostItem);
