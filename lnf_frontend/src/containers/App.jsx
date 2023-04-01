import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { PrivateRoute } from '../components/PrivateRoute';
import { GuestRoute } from '../components/GuestRoute';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import PostItem from './Post/PostItem'
import PostLostItem from './Post/PostLostItem'
import PostFoundItem from './Post/PostFoundItem'
import FoundItems from './ItemList/FoundItems'
import LostItems from './ItemList/LostItems'
/* app css */
import '../assets/css/App.css';
import logo_back from '../assets/imgs/news-back.png';
import 'element-theme-default';

const history = createBrowserHistory();

class App extends Component {

  render() {
    const logBackImage = (
      <div id="logo-container" >
      <div id="logo-back" class="full-width centered-content">
        <img src = {logo_back} class = "logo-back img" width="100%" alt='logo'/>
      </div>
    </div>
    );

    return (
      <Router history={history}>
        {logBackImage}
        <AppHeader/>
        <Switch>
          <Route exact path="/" component={Home} /> 
          <GuestRoute path="/login" component={Login} /> 
          <GuestRoute path="/register" component={Register} /> 
          <PrivateRoute path="/homepage" component={PostItem} />
          <PrivateRoute path="/lost" component={PostLostItem} />
          <PrivateRoute path="/found" component={PostFoundItem} />
          <PrivateRoute path="/lostitems" component={LostItems} />
          <PrivateRoute path="/founditems" component={FoundItems} />
        </Switch>
        <AppFooter text="@2023 - 2025 www.ayemyintmaung.com All rights reserved." />
      </Router>
    );
  }

}


export default App;
