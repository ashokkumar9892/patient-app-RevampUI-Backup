/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import * as Pages from './components';
import * as Accounts from './components/restricted';
import Menu from './components/common/Menu';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from './context/auth-context';
import Axios from 'axios';

import { Layout } from 'antd';
import HeaderPage from './components/common/Header';
import InnerHeaderPage from './components/common/InnerHeader';
import FooterPage from './components/common/Footer';
const { Header, Footer } = Layout;

function App() {


  const authContext = useContext(AuthContext);

  Axios.defaults.headers.common.AUTHORIZATION = 'Bearer ' + authContext.jwt;

  console.log('app auth', authContext.isAuth);

  let content = 
  
  
  authContext.isAuth ? (
    <Layout>
      <Header style={{ height: 120 }}>
        <InnerHeaderPage />
      </Header>
      <Menu />
      <Router>
        <Routes>
          <Route exact path='/account/home' component={Accounts.HomePage} />
          <Route exact path='/account/profile' component={Accounts.ProfilePage} />
          <Route exact path='/account/auctions' component={Accounts.AuctionsPage} />
          <Route exact path='/logout' component={Pages.LogOut} />
          {/* <Navigate to='/account/home' from='/home' exact />
          <Navigate to='/account/home' from='/login' exact />
          <Navigate to='/account/home' from='/register' exact /> */}
          <Route exact path='/auction/:auctionId' component={Pages.SingleAuction} />
          <Route component={Pages.NotFoundPage} />
        </Routes>
      </Router>
      <Footer><FooterPage /></Footer>
    </Layout>) : (
      <Layout>
        <Header style={{ height: 120 }}>
          <HeaderPage />
        </Header>
        <Router>
          <Routes>
            <Route exact path='/home' component={Pages.HomePage} />
            <Route exact path='/login' component={Pages.Login} />
            <Route exact path='/reset-password' component={Pages.ResetPasswordPage} />
            <Route exact path='/register' component={Pages.RegisterPage} />
            <Route exact path='/register-as-auctioner' component={Pages.RegisterAsAuctionerPage} />
            <Route exact path='/auction/:auctionId' component={Pages.SingleAuction} />
            <Navigate to='/home' from='/' exact />
            <Route component={Pages.HomePage} />
          </Routes>
        </Router>
        <Footer><FooterPage /></Footer>
      </Layout>
    )



  return (
    content
  );
}

export default App;
