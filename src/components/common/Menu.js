/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Modal from '@material-ui/core/Modal';
import { CoreContext } from "../../context/core-context";
import Loader from "react-loader-spinner";
import { GiCook, GiAbstract071, GiAcid, GiWeight, GiAerialSignal, GiOrangeSlice, GiCagedBall } from 'react-icons/gi';
import { PersonFill } from 'react-bootstrap-icons';
import { NavDropdown } from 'react-bootstrap';
import Footer from './Footer'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
const Menu = ({getenduser}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true);}
    const handleClose = () => setOpen(false);
    const coreContext = useContext(CoreContext);
    const userType = localStorage.getItem("userType");
    
    useEffect(() => {
        const userType = localStorage.getItem("userType");
        if(userType==="doctor"){
      coreContext.fetchPatientListfromApi("doctor",localStorage.getItem("userId"))}
    }, []);
   
const renderChat=()=>{
    const userType = localStorage.getItem("userType");
    if(userType==="doctor"){
        return(
     
<Link className="btn btn-primary d-block rounded-0 text-start mt-1"  onClick={handleOpen} to="#">
<i className="icon bi-bag-fill"></i>
<span className="label">  Chat</span>
</Link>)


    }
}

  
    
    
  
  
   

    return (<>
    
    <div className="col-auto d-none d-lg-flex">
    <ul className="sw-25 side-menu mb-0 primary d-none" id="menuSide">	
<li>
<Link to="#" data-bs-target="#account">
<i className="icon bi-person-circle"></i>
<span className="label ml-1"></span>
</Link>
<ul>
{(userType!=="patient")?

<li>
<Link to="/patients">
<i className="icon bi-person"></i>
<span className="label"> Patient Information</span>
</Link>
</li>:""}
{(userType==="admin")?<>
<li>
<Link to="/provider">
<i className="icon bi-hdd"></i>
<span className="label mt-1"> Provider</span>
</Link>
</li>
<li>
<Link to="/care-coordinator">
<i className="icon bi-person-badge"></i>
<span className="label"> Care Coordinator</span>
</Link>
</li>
<li>
<Link to="/coach">
<i className="icon bi-person-circle"></i>
<span className="label"> Coach</span>
</Link>
</li>
</>:""}
</ul>
</li>
    
<li>
<Link to="#" data-bs-target="#device">
<i className="icon bi-tablet-fill"></i>
<span className="label"> Devices</span>
</Link>
<ul>
<li>
<Link to="/bloodpressure">
<i className="icon bi-heart-half"></i>
<span className="label"> Blood Pressure</span>
</Link>
</li>
<li>
<Link to="/bloodglucose">
<i className="icon bi-file-medical"></i>
<span className="label"> Blood Glucose</span>
</Link>
</li>
<li>
<Link to="/weight">
<i className="icon bi-speedometer"></i>
<span className="label"> Weight</span>
</Link>
</li>
{(userType === 'admin')?
<li>
<Link to="/device-info">
<i className="icon bi-person-circle"></i>
<span className="label"> Device Informaion</span>
</Link>
</li>
:""}
</ul>
</li>	

{(userType === 'admin')?
    <li>
<Link to="/thresold">
<i className="icon bi-align-bottom"></i>
<span className="label"> Thresold</span>  
</Link>
</li>:""}
{/* <li>
<Link to="#">
<i className="icon bi-bag-fill"></i>
<span className="label">  Orders</span>
</Link>
</li> */}
<li>
<Link to="/tutorial">
<i className="icon bi-bag-fill"></i>
<span className="label">  Tutorials</span>
</Link>
</li>

</ul>
    <div className="d-none d-md-block sw-25">
	<Link className="btn btn-primary d-block rounded-0 text-start" data-bs-toggle="collapse" to="#menu-1" role="button" aria-expanded="false" aria-controls="collapseExample">
<i className="icon bi-person-circle "></i>
<span className="label" style={{marginLeft:"1em"}}>Care Team</span> <i className="bi-caret-down-fill float-end"></i>
</Link>
<div className="collapse show" id="menu-1">
<div className="card-body no-shadow mt-0 p-0 sidemenu-collaspe">
<ul>

    {(userType!=="patient")?
	<li><Link to="/patients"><i className="icon bi-person"></i>
<span className="label"> Patient Information</span></Link></li>:""}
{(userType==="admin")?<>
	<li><Link to="/provider"><i className="icon bi-hdd"></i>
<span className="label mt-1"> Provider</span>
</Link></li>
	<li className="active"><Link to="/care-coordinator"><i className="icon bi-person-badge"></i>
<span className="label"> Care Coordinator</span></Link></li>
	<li><Link to="/coach"><i className="icon bi-person-circle"></i>
<span className="label"> Coach</span></Link></li></>:""}
	
	</ul>
</div>
</div>	

		<Link className="btn btn-primary d-block rounded-0 text-start mt-1" data-bs-toggle="collapse" to="#menu-2" role="button" aria-expanded="false" aria-controls="collapseExample">
<i className="icon bi-tablet-fill"></i>
<span className="label" style={{marginLeft:"1em"}}> Devices</span> <i className="bi-caret-down-fill float-end"></i>
</Link>
<div className="collapse show" id="menu-2">
<div className="card-body no-shadow mt-0 p-0 sidemenu-collaspe">
<ul>
	<li><Link to="/bloodpressure"><i className="icon bi-heart-half"></i>
<span className="label"> Blood Pressure</span></Link></li>
	<li><Link to="/bloodglucose"><i className="icon bi-file-medical"></i>
<span className="label"> Blood Glucose</span>
</Link></li>
	<li><Link to="/weight"><i className="icon bi-speedometer"></i>
<span className="label"> Weight</span></Link></li>	
{(userType === 'admin')?
<li><Link to="/device-info"><i className="icon bi-speedometer"></i>
<span className="label"> Device Information</span></Link></li>	:""}
	</ul>
</div>
</div>	{(userType === 'admin')?
		<Link className="btn btn-primary d-block rounded-0 text-start mt-1" to="/thresold">
<i className="icon bi-align-bottom"></i>
<span className="label" style={{marginLeft:"1em"}}> Thresold</span>
</Link>:""}
{/* {(userType === 'admin' || userType === 'patient')?
		<Link className="btn btn-primary d-block rounded-0 text-start mt-1"  to="#">
<i className="icon bi-bag-fill"></i>
<span className="label">  Orders</span>
</Link>:""} */}
{renderChat()}
<Link className="btn btn-primary d-block rounded-0 text-start mt-1"  to="/tutorial">
<i className="icon bi-bag-fill"></i>
<span className="label" style={{marginLeft:"1em"}}>  Tutorials</span>
</Link>
{/* {(userType=='doctor' || userType=='testdoctor' )?
<Link className="btn btn-primary d-block rounded-0 text-start mt-1"  to="/chat">
<i className="icon bi-bag-fill"></i>
<span className="label" style={{marginLeft:"1em"}}>  Chat</span>
</Link>	:""} */}
	</div>
{/* 
<li className="border-bottom">
<Link to="/bloodpressure">
<i className="icon bi-heart-half"></i>
<span className="label"> Blood Pressure</span>
</Link>
</li>
	<li className="border-bottom">
<Link to="/bloodglucose">
<i className="icon bi-file-medical"></i>
<span className="label"> Blood Glucose</span>
</Link>
</li>
		<li className="border-bottom">
<Link to="/weight">
<i className="icon bi-speedometer"></i>
<span className="label"> Weight</span>
</Link>
</li> */}


         {/* {(localStorage.getItem("userType")==="admin")?<>
         		<li className="border-bottom">
<Link to="/thresold">
<i className="icon bi-align-bottom"></i>
<span className="label"> Thresold</span>
</Link>
</li> </>:""}
           

{renderOrderInformation()}
{renderDeviceInformation()} */}

</div>
<Modal
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
   <Typography>Whom you want to chat?</Typography>
   {coreContext.patients.map((curr)=>{
       return(<>
     <Button variant="outlined" onClick={()=>{getenduser(curr.userId);handleClose()}}>
       {curr.name}
      
     </Button>
       
       </>)
   })}
         
        </Box>
      </Modal>

    
    </>
    )
}

export default Menu;