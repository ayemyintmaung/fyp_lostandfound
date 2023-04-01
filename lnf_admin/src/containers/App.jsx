import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import AdminDashboard from './admin/AdminDash'
/* app css */
import '../assets/css/App.css';
import logo_back from '../assets/imgs/admin-back.png';
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
          <Route path="/admin/dashboard" component={AdminDashboard} />
        </Switch>
        <AppFooter text="@2023 - 2025 www.ayemyintmaung.com All rights reserved." />
      </Router>
    );
  }

}


export default App;
