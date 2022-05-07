import React, { useState, useEffect, useContext } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import Sidebar from "react-sidebar";
import * as Pages from "./components";
import { DPatients } from "./components/DPatients";
import Testing from "./components/common/Testing";
import {BillingPatient} from "./components/BillingPatient";
import { BloodPressureAverage } from "./components/BloodPressureAverage";
import { BloodGlucoseAverage } from "./components/BloodGlucoseAverage";

import Covidform from "./Covidform";
import "./App.css";

import "./dgmaterial.css";

import Menu from "./components/common/Menu";
import Menu2 from "./components/common/Menu2";
import TopMenu from "./components/common/TopMenu";
import { CoreContext } from "./context/core-context";
import { Row, Col } from "react-bootstrap";
import { TablePagination } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Modal from "./components/common/Modal";
import { useForm } from "react-hook-form";
import Thankyou from "./component2/Thankyou";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { WeightAverage } from "./components/WeightAverage";
import Any from "./components/Any"
//import React from 'react';

import { Vdeviceinfo } from "./components/Vdevice";

import Tutorials from "./components/common/Tutorials";
const Moment = require("moment");







function App() {
  const { register, errors } = useForm();
  const [enduser, setenduser] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true);coreContext.fetchPatientListfromApi("doctor",localStorage.getItem("userId"))}
  
  const isAuth = localStorage.getItem("app_isAuth");
  const [sidebar, setSidebar] = useState(true);
  
  const showSidebar = () => setSidebar(!sidebar);
  
  

  
  const coreContext = useContext(CoreContext);
  
  
     useEffect(() => {}, [showSidebar]);
  const [style, setStyle] = useState("col-md-9 col-8 col-sm-8 p-0");
  const [style1, setStyle1] = useState("col-md-2 col-3 col-sm-3 mr-3");

  const changestyle = () => {
    if (sidebar === false) {
      setStyle("col-md-9 col-8 col-sm-8 p-0");
      setStyle1("col-md-2 col-3 col-sm-3 mr-3");
    } else {
      setStyle("col-lg-10 col-md-10 col-9 col-sm-9");
      setStyle1("col-lg-1 col-md-1 col-2 col-sm-2 mr-1");
    }
  };

  let content = (
    <>
   
      {" "}
      {/**/}{" "}
      {isAuth ? (
        <>
          {/* <TopMenu
            isAuth={isAuth}
            changestyle={changestyle}
            showSidebar={showSidebar}
          /> */}
          
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          
          {/* <Widget
            title={localStorage.getItem("userName")}
            handleNewUserMessage={handleNewUserMessage}
          /> */}
        </>
      ) : (
        ""
      )}
      
        {" "}
        {/* <Sidebar
                              sidebar={<b>Sidebar content</b>}
                              open={sidebarOpen}
                              onSetOpen={setSidebarOpen}
                              styles={{ sidebar: { background: "white" } }}
                            >
                              <button onClick={() => setSidebarOpen(true)}>
                                Open sidebar
                              </button> */}
                              
                             
        {isAuth ? (
          <React.Fragment>
          <Router>
          <TopMenu
          isAuth={isAuth}
          changestyle={changestyle}
          showSidebar={showSidebar}
        />
          <main>
            <Row>
          
            
          
                
              {" "}
              {sidebar === true ?<> <Menu />  </>: <Menu2 />}{" "}
              
           
              <Switch>
           
            
                  <Route exact path="/provider" component={Pages.Provider} />{" "}
                  <Route
                    exact
                    path="/care-coordinator"
                    component={Pages.CareCoordinator}
                  />{" "}
                  
                  <Route exact path="/coach" component={Pages.Coach} />{" "}
                  <Route exact path="/inbox" component={Pages.Inbox} />{" "}
                  <Route exact path="/outbox" component={Pages.Outbox} />{" "}
                  <Route exact path="/settings" component={Pages.Settings} />{" "}
                  <Route exact path="/dashboard" component={Pages.Dashboard} />{" "}
                  <Route exact path="/patients" component={Pages.Patients} />{" "}
                  <Route exact path="/dpatients" component={DPatients} />
                  <Route exact path="/billing" component={BillingPatient} />
                  <Route exact path="/any" component={Any} />
                  <Route
                    exact
                    path="/bloodpressure"
                    component={Pages.BloodPressure}
                  />
                  <Route
                    exact
                    path="/bloodpressureaverage"
                    component={BloodPressureAverage}
                  />
                  <Route
                    exact
                    path="/bloodglucose"
                    component={Pages.BloodGlucose}
                  />{" "}
                  <Route
                    exact
                    path="/bloodglucoseaverage"
                    component={BloodGlucoseAverage}
                  />{" "}
                  <Route
                    exact
                    path="/weightaverage"
                    component={WeightAverage}
                  />{" "}
                  <Route exact path="/weight" component={Pages.Weight} />{" "}
                  <Route exact path="/logout" component={Pages.Logout} />{" "}
                  <Route exact path="/profile" component={Pages.MyProfile} />{" "}
                  <Route exact path="/thresold" component={Pages.Thresold} />{" "}
                  <Route exact path="/testing" component={Testing} />
                  <Route
                    exact
                    path="/patient-summary/:patient"
                    component={Pages.PatientSummary}
                  />{" "}
                  <Route
                    exact
                    path="/patient-profile/:patient"
                    component={Pages.PatientProfile}
                  />{" "}
                  <Route
                    exact
                    path="/device-info"
                    component={Testing}
                  />
                  <Route
                    exact
                    path="/tutorial"
                    component={Tutorials}
                  />{" "}
                  <Route exact path="/covid">
                    <Covidform />
                  </Route>{" "}
                  <Route exact path="/verifieddevices">
                    <Vdeviceinfo />
                  </Route>{" "}
                  <Redirect exact from="/login" to="/patients" />
                  <Redirect exact from="/" to="/patients" />
                </Switch>{" "}
            
           
            
          
          </Row>
          </main>
          </Router>{" "}
          </React.Fragment>
        ) : (
          <>
            <Router>
              <Switch>
                <Route path="/login" component={Pages.Login} />{" "}
                <Route path="/sign-up" component={Pages.SignUp} />{" "}
                <Route path="/reset-password" component={Pages.ResetPassword} />{" "}
                <Redirect exact from="/" to="/login" />
              </Switch>{" "}
            </Router>{" "}
          </>
        )}{" "}
      {" "}
      {/* </Sidebar> */}{" "}
    </>
  );

  return (
    <>
      {" "}
      <Router>
        <Switch>
      
      {content}{" "}
      
          <Route exact path="/covid">
            <Covidform />
          </Route>{" "}
          <Route exact path="/thankyou">
            <Thankyou />
          </Route>{" "}
        </Switch>{" "}
      </Router>{" "}
      
      {/* <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
><Box sx={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}}>
  {}
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        {/* </Box>
      </Modal> */} 
    </>
  );
}

export default App;
