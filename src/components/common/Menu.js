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
     
<a className="btn btn-primary d-block rounded-0 text-start mt-1"  onClick={handleOpen} href="#">
<i className="icon bi-bag-fill"></i>
<span className="label">  Chat</span>
</a>)


    }
}

  
    
    
  
  
   

    return (<>
    
    <div className="col-auto d-none d-lg-flex">
    <ul className="sw-25 side-menu mb-0 primary d-none" id="menuSide">	
<li>
<a href="#" data-bs-target="#account">
<i className="icon bi-person-circle"></i>
<span className="label">Care Team</span>
</a>
<ul>
{(userType!=="patient")?

<li>
<a href="/patients">
<i className="icon bi-person"></i>
<span className="label"> Patient Information</span>
</a>
</li>:""}
{(userType==="admin")?<>
<li>
<a href="/provider">
<i className="icon bi-hdd"></i>
<span className="label"> Provider</span>
</a>
</li>
<li>
<a href="/care-coordinator">
<i className="icon bi-person-badge"></i>
<span className="label"> Care Coordinator</span>
</a>
</li>
<li>
<a href="/coach">
<i className="icon bi-person-circle"></i>
<span className="label"> Coach</span>
</a>
</li>
</>:""}
</ul>
</li>
    
<li>
<a href="#" data-bs-target="#device">
<i className="icon bi-tablet-fill"></i>
<span className="label"> Devices</span>
</a>
<ul>
<li>
<a href="/bloodpressure">
<i className="icon bi-heart-half"></i>
<span className="label"> Blood Pressure</span>
</a>
</li>
<li>
<a href="/bloodglucose">
<i className="icon bi-file-medical"></i>
<span className="label"> Blood Glucose</span>
</a>
</li>
<li>
<a href="/weight">
<i className="icon bi-speedometer"></i>
<span className="label"> Weight</span>
</a>
</li>
{(userType === 'admin')?
<li>
<a href="/device-info">
<i className="icon bi-person-circle"></i>
<span className="label"> Device Informaion</span>
</a>
</li>
:""}
</ul>
</li>	

{(userType === 'admin')?
    <li>
<a href="/thresold">
<i className="icon bi-align-bottom"></i>
<span className="label"> Thresold</span>
</a>
</li>:""}
<li>
<a href="#">
<i className="icon bi-bag-fill"></i>
<span className="label">  Orders</span>
</a>
</li>

</ul>
    <div className="d-none d-md-block sw-25">
	<a className="btn btn-primary d-block rounded-0 text-start" data-bs-toggle="collapse" href="#menu-1" role="button" aria-expanded="false" aria-controls="collapseExample">
<i className="icon bi-person-circle"></i>
<span className="label">Care Team</span> <i className="bi-caret-down-fill float-end"></i>
</a>
<div className="collapse show" id="menu-1">
<div className="card-body no-shadow mt-0 p-0 sidemenu-collaspe">
<ul>

    {(userType!=="patient")?
	<li><a href="/patients"><i className="icon bi-person"></i>
<span className="label"> Patient Information</span></a></li>:""}
{(userType==="admin")?<>
	<li><a href="/provider"><i className="icon bi-hdd"></i>
<span className="label"> Provider</span>
</a></li>
	<li className="active"><a href="/care-coordinator"><i className="icon bi-person-badge"></i>
<span className="label"> Care Coordinator</span></a></li>
	<li><a href="/coach"><i className="icon bi-person-circle"></i>
<span className="label"> Coach</span></a></li></>:""}
	
	</ul>
</div>
</div>	

		<a className="btn btn-primary d-block rounded-0 text-start mt-1" data-bs-toggle="collapse" href="#menu-2" role="button" aria-expanded="false" aria-controls="collapseExample">
<i className="icon bi-tablet-fill"></i>
<span className="label"> Devices</span> <i className="bi-caret-down-fill float-end"></i>
</a>
<div className="collapse show" id="menu-2">
<div className="card-body no-shadow mt-0 p-0 sidemenu-collaspe">
<ul>
	<li><a href="/bloodpressure"><i className="icon bi-heart-half"></i>
<span className="label"> Blood Pressure</span></a></li>
	<li><a href="/bloodglucose"><i className="icon bi-file-medical"></i>
<span className="label"> Blood Glucose</span>
</a></li>
	<li><a href="/weight"><i className="icon bi-speedometer"></i>
<span className="label"> Weight</span></a></li>	
{(userType === 'admin')?
<li><a href="/device-info"><i className="icon bi-speedometer"></i>
<span className="label"> Device Information</span></a></li>	:""}
	</ul>
</div>
</div>	{(userType === 'admin')?
		<a className="btn btn-primary d-block rounded-0 text-start mt-1" href="/thresold">
<i className="icon bi-align-bottom"></i>
<span className="label"> Thresold</span>
</a>:""}
{(userType === 'admin' || userType === 'patient')?
		<a className="btn btn-primary d-block rounded-0 text-start mt-1"  href="#">
<i className="icon bi-bag-fill"></i>
<span className="label">  Orders</span>
</a>:""}
{renderChat()}
	</div>
{/* 
<li className="border-bottom">
<a href="/bloodpressure">
<i className="icon bi-heart-half"></i>
<span className="label"> Blood Pressure</span>
</a>
</li>
	<li className="border-bottom">
<a href="/bloodglucose">
<i className="icon bi-file-medical"></i>
<span className="label"> Blood Glucose</span>
</a>
</li>
		<li className="border-bottom">
<a href="/weight">
<i className="icon bi-speedometer"></i>
<span className="label"> Weight</span>
</a>
</li> */}


         {/* {(localStorage.getItem("userType")==="admin")?<>
         		<li className="border-bottom">
<a href="/thresold">
<i className="icon bi-align-bottom"></i>
<span className="label"> Thresold</span>
</a>
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