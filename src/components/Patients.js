import { useEffect, useContext, useState } from "react";
import { CoreContext } from "../context/core-context";
import { Table, Pagination, Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { PencilSquare, Trash, Person } from "react-bootstrap-icons";
import { IconName } from "react-icons/bs";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import DataGridComponent from "./common/DataGridComponent";
import {
  BrowserRouter as Router,
  Route,
  
  Redirect,
  Link
} from "react-router-dom";

import Input from "./common/Input";
import * as React from "react";
import { MultiSelect } from "react-multi-select-component";
import Switch from "@material-ui/core/Switch";
import moment from 'moment';

import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
} from "@material-ui/data-grid";

import Loader from "react-loader-spinner";
const Moment = require("moment");
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnHeaderCheckbox": {
      display: "block",
      pointerEvents: "none",
      disabled: "disabled",
    },
  },
}));

const Patients = (props) => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [cptcodeforrpm, setcptcodeforrpm] = useState([]);
  const [cptcodeforccm, setcptcodeforccm] = useState([]);
  //const [select, setSelection] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [height, setHeight] = useState("");
  const [provider, setProvider] = useState("");
  const [coach, setCoach] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [actionPatients, setActionPatients] = useState([]);
  const [checked, setChecked] = useState(true);
  const [dcount, setdcount] = useState([""]);
  const [complex, setComplex] = useState();

  const handleModalClose = () => {setShowModal(false);setdcount([""])};
  const handleModalShow = () => setShowModal(true);

  const handleAssignDrModalClose = () => setAssignDrShowModal(false);
  const handleAssignDrModalShow = () => setAssignDrShowModal(true);
  const [showAssignDrModal, setAssignDrShowModal] = useState(false);
  const [usertype, setuserType] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [updateId, setUpdateId] = useState();
  const [workPhone, setWorkPhone] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const diagonislist=[,"Select Diagnosis Id","D45- Polycythemia vera",
  "G47.33- Obstructive sleep apnea (adult) (pediatric)",
  "I10- Essential (primary) hypertension","K219",
  "I13.10- Hypertensive heart and chronic kidney disease without heart",
  "failure ",
  "I509- Heart failure, unspecified",
  "E03.9- Hypothyroidism, unspecified",
  "E11.65- Type 2 diabetes mellitus with hyperglycemia",
  "E11.9- Type 2 diabetes mellitus without complications",
  "E61.1- Iron deficiency",
  "E66.3- Overweight",
  "E66.01- Morbid (severe) obesity due to excess calories",
  "E66.9- Obesity, unspecified",
  "E78.5- Hyperlipidemia, unspecified",
  "F33.2- Major depressive disorder, recurrent severe without psychotic",
  "features",
  "F41.1- Generalized anxiety disorder",
  "H10.9- Unspecified conjunctivitis",
  "J32.4- Chronic pansinusitis",
  "J45.40- Moderate persistent asthma, uncomplicated",
  "J45.41- Moderate persistent asthma with (acute) exacerbation",
  "K58.2- Mixed irritable bowel syndrome",
  "M25.562- Pain in left knee",
  "M54.50- Low back pain, unspecified",
  "M79.7- Fibromyalgia",
  "N92.5- Other specified irregular menstruation",
  "R03.0- Elevated blood-pressure reading, without diagnosis of",
  "hypertension",
  "R53.83- Other fatigue",
  "R73.03- Prediabetes",
  "Z68.41- Body mass index [BMI] 40.0-44.9, adult",
  "Z68.44- Body mass index [BMI] 60.0-69.9, adult",
  "K580- unspecified","I639","E10.9","L67","L67.1","L82.1","N182","J449","E1140","E1151","E1132999","I739","I2510","E663","G4709","N925","H109"
  ]

  const editPatient = () => {};
  const coreContext = useContext(CoreContext);

  const fetchPatients = () => {
    const email = localStorage.getItem("app_userEmail");
    coreContext.userDetails(email);
    const userType = localStorage.getItem("userType");
    setuserType(userType);
    const userId = localStorage.getItem("userId");
    if (checked) {
      coreContext.fetchPatientListfromApi(userType, userId, !checked);
    } else {
      coreContext.fetchPatientListfromApi(userType, userId,!checked);
    }
  };

  const fetchProviders = () => {
    coreContext.fetchProviders();
  };
  const handledcount = (index,val) => {
    const value=[...dcount]
    value[index]=val
    setdcount(value);
    
    
  };
  const handlefinalsubmit=()=>{
    var newId= ""
    dcount.map((curr)=>{
      newId=newId+","+curr
    })
    coreContext.UpdatePatient(
      fname,
      lname,
      phone,
      birthDate,
      height,
      provider,
      coordinator,
      coach,
      patientId,
      gender,
      language,
      workPhone,
      mobilePhone,
      street,
      zip,
      city,
      state,
      newId.substring(1),
      updateId,
      program,
      cptcodeforrpm,
      cptcodeforccm

    );
    coreContext.cleanup1();
  }

  useEffect(fetchProviders, []);

  const fetchCareCoordinator = () => {
    coreContext.fetchCareCoordinator();
  };
  const handlecptcode=(value)=>{
    console.log("cpt",value)
  }

  useEffect(fetchCareCoordinator, []);

  const fetchCoach = () => {
    coreContext.fetchCoach();
  };

  useEffect(fetchCoach, []);

  useEffect(coreContext.checkLocalAuth, []);
  useEffect(fetchPatients, []);

  function formatAMPM(date) {
    var d = new Date(date);
    //alert(d);

    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = d.getFullYear();
    //alert(yy);
    var strTime = mm + "-" + dd + "-" + yy;
    //alert(strTime);
    //console.log(strTime);
    return strTime;
  }
  const showEditForm = (patient) => {
    {
      console.log("checking", patient);
    }
    setUpdateId(patient)
    if (patient.name !== undefined) {
      patient.lastName = patient.name.split(",")[0].trim();
      patient.firstName = patient.name.split(",")[1].trim();
    }
    if (patient.diagnosisId ) {
      setdcount(patient.diagnosisId.split(","))
    }
    setFName(patient.firstName);
    setLName(patient.lastName);
    setBirthDate(moment(patient.dob).format('YYYY-MM-DD'));
    console.log(moment(patient.dob).format('YYYY-MM-DD'),"format")
    setPhone(patient.mobile);
    setPatientId(patient.userId);
    setHeight(patient.height);
    if(patient.program=="CCM\RPM"){
      setProgram("CCM\RPM")
    }else if(patient.program=="RPM"){
      setProgram("RPM")
    }else{
      setProgram("CCM")
    }
    console.log(patient.gender,"patient.gender")
    // patient.gender == "Female" ? setGender(1) : setGender(0);
    patient.gender == "Female" ? setGender(1) : setGender(0);
    // setGender(patient.gender);
    // setLanguage(patient.language);
    patient.language == "English"? setLanguage(0) : setLanguage(1);
    setWorkPhone(patient.workPhone);
    setMobilePhone(patient.mobilePhone);
    setStreet(patient.street);
    setZip(patient.zip);
    setCity(patient.city);
    setState(patient.state);
    setcptcodeforrpm(JSON.parse(patient.cptcodeforrpm))
    setcptcodeforccm(JSON.parse(patient.cptcodeforccm))

    if (patient.ProviderName === undefined) {
      patient.ProviderName = "Select Provider";
      setProvider("");
    } else {
      //console.log(coreContext.providerOptions,"coreContext.providerOptions")
      

      // coreContext.providerOptions.filter((name)=>{
      //   console.log(name.name , "namefilter")
      //   if(name.name.includes(patient.ProviderName)){
      //     setProvider(patient.ProviderName)
      //   }
      //   else{
      //     setProvider("");
      //   }
        
      // })
      setProvider(
        coreContext.providerOptions.filter((name) =>
          name.name.includes(patient.ProviderName)
        )[0].value !== undefined ?  coreContext.providerOptions.filter((name) =>
        name.name.includes(patient.ProviderName)
      )[0].value : ""
      );
    

      // setProvider(
      //   coreContext.providerOptions.filter((name) =>
      //     name.name.includes(patient.ProviderName)
      //   )[0].value
      // );
    }

    if (patient.CareName === undefined) {
      patient.CareName = "Select Coordinator";
      setCoordinator("");
    } else {
      setCoordinator(
        coreContext.careCoordinatorOptions.filter((name) =>
          name.name.includes(patient.CareName)
        )[0].value
      );
    }

    if (patient.CoachName === undefined) {
      patient.CoachName = "Select Coach";
      setCoach("");
    } else {
      setCoach(
        coreContext.coachOptions.filter((name) =>
          name.name.includes(patient.CoachName)
        )[0].value
      );
    }

    handleModalShow();
  };

  const showAssignDoctor = (patient) => {
    setFName(patient.firstName);
    setLName(patient.lastName);
    setBirthDate(patient.dob);
    setPhone(patient.mobile);
    setPatientId(patient);
    if (patient.ProviderName === undefined) {
      patient.ProviderName = "Select Provider";
      setProvider("");
    } else {
      let _provider = coreContext.providerOptions.filter(
        (name) => name.name === patient.ProviderName
      );
      if (_provider.length > 0) setProvider(_provider[0].value);
    }

    if (patient.CareName === undefined) {
      patient.CareName = "Select Coordinator";
      setCoordinator("");
    } else {
      let _coordinator = coreContext.careCoordinatorOptions.filter(
        (name) => name.name === patient.CareName
      );
      if (_coordinator.length > 0) setCoordinator(_coordinator[0].value);
    }

    if (patient.CoachName === undefined) {
      patient.CoachName = "Select Coach";
      setCoach("");
    } else {
      let _coach = coreContext.coachOptions.filter(
        (name) => name.name === patient.CoachName
      );
      if (_coach.length > 0) setCoach(_coach[0].value);
    }
    handleAssignDrModalShow();
  };

  const onToggleChangeActiveUsers = (event) => {
    setChecked(event.target.checked);
    let isactiveusrs = event.target.checked;
    let userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    if (isactiveusrs)
      coreContext.fetchPatientListfromApi(userType, userId, !isactiveusrs);
  };

  useEffect(fetchPatients, [coreContext.patients.length]);
  useEffect(fetchPatients, [checked]);
  useEffect(() => {
   
    return () => {
      coreContext.cleanup();
    };
  },[]);
  const deletePatient = (patient) => {

    swal({
      title: "Are you sure?",
      
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        coreContext.DeletePatient(patient);
        coreContext.cleanup1();
        fetchPatients();

      } else {
        swal("Delete Cancelled");
      }
    });
    
  };

  const admincolumns = [
    {
      field: "name",
      flex:1,
      headerName: "Patient Name",
      width: 150,
      
      renderCell: (params) => (
        <div style={{marginLeft:"1em",paddingBottom:"1em"}}>
        <Link to={`/patient-summary/${btoa(params.row.userId)}`}>
          {" "}
          {params.value
          
          }{" "}
          {console.log(params,"edit")}
        </Link>
        </div>
      ),
    },
    {
      field: "ProviderName",
      headerName: "Provider",
      flex:1,
      
      width: 150,
    },
    {
      field: "CareName",
      headerName: "Care Coordinator",
      width: 150,
      flex:1,
      
    },
    {
      field: "CoachName",
      headerName: "Coach",
      flex:1,
      editable: false,
      width: 150,
    },
    // {
    //   field: "height",
    //   headerName: "Height",
    //   editable: false,
    //   type: "number",
    //   width: 150,
    // },
    // {
    //   field: "bg_reading",
    //   headerName: "Glucose",
    //   editable: false,
    //   type: "number",
    //   width: 150,
    // },
    {
      field: "program",
      headerName: "Program",
      
      editable: false,
      
      flex:1
      
    },
    {
      field: "ActiveStatus",
      headerName: "ActiveStatus",
      
      editable: false,
      type: "string",
      flex:1,
      renderCell: (params) => (
        (params.value==="Deactive")?<div style={{marginLeft:"3em",paddingBottom:"1em"}}>Inactive </div>:<div style={{marginLeft:"3em" ,paddingBottom:"1em"}}>Active </div>
        
          
        
      ),
    
    },
    
    {
      field: "",
      headerName: "Action",
      width: 150,
      flex:1,
      renderCell: (params) => (
        (!localStorage.getItem("userType").includes("test"))?        (params.row.ActiveStatus==="Active")?
        <div style={{ width: "100px" ,paddingBottom:"1em"}}>
          <Link
            style={{ marginRight: "5px" }}
            to="#"
            onClick={() => showEditForm(params.row)}>
            {" "}
            <PencilSquare />
          </Link>
         
          <Link
            style={{ marginRight: "5px" }}
            to="#"
            onClick={() => {
              deletePatient(params.row);
              fetchPatients();
            }}>
            {" "}
            <Trash />
          </Link>
          <Link
            style={{ marginRight: "5px" }}
            to="#"
            onClick={() => showAssignDoctor(params.row)}>
            {" "}
            <Person />
          </Link>
        </div>:<div style={{ width: "100px" }}>
          <Link
            style={{ marginRight: "5px" }}
            to="#"
            onClick={() => {coreContext.ActivatePatient(params.row);coreContext.cleanup1();setChecked(false)}}>
            {" "}
             Activate
          </Link>
         
          
        
        </div>:<div>Access Denied</div>

      ),
    },
    {
      field: "reading",
      headerName: "Inconsistent",
      
      editable: false,
      flex:1,
      renderCell: (params) => (
        
        <>
      
        <div style={{marginLeft:"2em"}}>
  <input type="checkbox" checked={params.row.reading==='true'} onChange={(e)=>{coreContext.UpdateNotes(coreContext.patients.filter((curr)=>curr.userId===params.row.userId)[0],"","",e.target.checked);setComplex(e.target.checked);coreContext.fetchPatientListfromApi(localStorage.getItem("userType"),localStorage.getItem("userId"));coreContext.cleanup1();}} />
  
</div>
        </>
      ),
    },
    
  ];

  const columns = [
    {
      field: "name",
      headerName: "Patient Name",
      width: 220,
      flex:1,
      renderCell: (params) => (
        <Link to={`/patient-summary/${btoa(params.row.userId)}`}>
          {" "}
          {params.value}{" "}
        </Link>
      ),
    },
    {
      field: "ProviderName",
      headerName: "Provider",
      editable: false,
      width: 200,
      flex:1,
    },
    {
      field: "CareName",
      headerName: "Care Coordinator",
      width: 150,
      editable: false,
      flex:1,
    },
    {
      field: "CoachName",
      headerName: "Coach",
      editable: false,
      flex:1,
      width: 150,
    },
    {
      field: "height",
      headerName: "Height",
      editable: false,
      type: "number",
      width: 100,
    },
    {
      field: "bg_reading",
      headerName: "Glucose",
      editable: false,
      type: "number",
      width: 100,
    },
    {
      field: "ActiveStatus",
      headerName: "ActiveStatus",
      editable: false,
      type: "string",
      width: 130,
    },
    // {
    //   field: 'Weight',
    //   headerName: 'Weight',
    //   type: "number",
    //   width: 125,
    //   editable: false,
    // },
    // {
    //   field: 'diastolic',
    //   headerName: 'Diastolic',
    //   type: "number",
    //   width: 140,
    //   editable: false,
    // },
    // {
    //   field: 'systolic',
    //   headerName: 'Systolic',
    //   type: "number",
    //   width: 140,
    //   editable: false,
    // },
    {
      field: "BMI",
      headerName: "BMI",
      width: 175,
      editable: false,
    },
    {
      field: "",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        (!localStorage.getItem("userType").includes("test"))?
        <div style={{ width: "100px" }}>
          <Link
            style={{ marginRight: "5px" }}
            to="#"
            onClick={() => showEditForm(params.row)}>
            {" "}
            <PencilSquare />
          </Link>
          <Link
            style={{ marginRight: "5px" }}
            to="#"
            onClick={() => {
              deletePatient(params.row);
              fetchPatients();
            }}>
            {" "}
            <Trash />
          </Link>
          {/* <Link  style={{  marginRight: '5px' }} to="#" onClick={() => showAssignDoctor(params.row)}>  <Person /></Link> */}
        </div>:
        <div>Access Denied</div>
      ),
    },
  ];

  // const useStyles = makeStyles((theme) => (
  //     {
  //         colCell: {
  //         color: "Red"
  //     }
  //   }));

  // const classes = useStyles();

  const renderPatients = () => {
    if (coreContext.patients.length === 0) {
      return (
        <div
          style={{
            height: 680,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <Loader type="Circles" color="#00BFFF" height={100} width={100} />
        </div>
      );
    }
    if (
      coreContext.patients.length > 0 &&
      usertype === "admin" &&
      coreContext.patients[0].name !== undefined
      && coreContext.providerOptions.length>0 && coreContext.coachOptions.length>0 && coreContext.careCoordinatorOptions.length>0
    ) 
    console.log("uttkarsh patients",coreContext.patients)
    {
      return (
        <>
          {/* <div style={{ height: 680, width: "100%" }}>
            <DataGrid
              className={classes.root}
              rows={coreContext.patients}
              columns={admincolumns}
              pageSize={10}
              sortModel={[{ field: "name", sort: "asc" }]}
              //             checkboxSelection

              // onSelectionModelChange={(selection) => {
              //   const newSelectionModel = selection.selectionModel;

              //   if (newSelectionModel.length > 1) {
              //     const selectionSet = new Set(selectionModel);
              //     const result = newSelectionModel.filter(
              //       (s) => !selectionSet.has(s)
              //     );

              //     setSelectionModel(result);
              //   } else {
              //     setSelectionModel(newSelectionModel);
              //   }
              // }}
              // selectionModel={selectionModel}
            />
            {console.log(coreContext.patients[selectionModel])} */}
          {/* </div> */}
          <DataGridComponent rows={coreContext.patients} columns={admincolumns} sortModal={[{ field: "name", sort: "asc" }]}/>
          {/* <center>{select}sa</center> */}
        </>
      );
    }
    if (
      coreContext.patients.length > 0 &&
      usertype !== "admin" &&
      coreContext.patients[0].name !== undefined
    ) {
      return (
        
<DataGridComponent rows={coreContext.patients} columns={columns} sortModal={[{ field: "name", sort: "asc" }]}/>
        );
    } else {
      return (
        <div
          style={{
            height: 60,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <h1>No data Found</h1>
        </div>
      );
    }
  };
  useEffect(renderPatients, [JSON.stringify(coreContext.patients)]);
  useEffect(renderPatients, [coreContext.patients.length]);


  return (
    <React.Fragment>
      
      <div className="col">
<div className="page-title-container mb-3">
<div className="row">
<div className="col mb-2">
<h1 className="mb-2 pb-0 display-4" id="title">Patient Information
</h1>
</div>
<div className="col-sm-1 col-2" style={{width:"70px"}}>
                                                <div className="form-group"><label for="inputName" className="text-14 mts text-black"><strong>Active</strong></label>
                                                    
                                           </div>
                                            </div>
						<div className="col-sm-3 col-5"><label className="switch">
                                 <input type="checkbox" checked={checked} onChange={onToggleChangeActiveUsers}/>
                             <span className="slider round"></span>
                                 </label></div>


</div>
</div>

<div className="row">
<div className="col-xl-12">
{/* <div className="card mb-3">
<div className="card-body">
<div className="row mtm">
				    <div className="col-sm-2 col-2" style={{width:"70px"}}>
                                                <div className="form-group"><label for="inputName" className="text-14 mts text-black"><strong>Active</strong></label>
                                                    
                                           </div>
                                            </div>
						<div className="col-sm-5 col-5"><label className="switch">
                                 <input type="checkbox" checked={checked} onChange={onToggleChangeActiveUsers}/>
                             <span className="slider round"></span>
                                 </label></div>
						 </div>
</div>
</div> */}
<div className="card mb-3">	

<div className="card-body">
<div className="row">
<div className="col-xl-12">
<div className="table-responsive-sm mb-0">
  {renderPatients()}

</div>
	

	
</div>
	



</div>

</div>
	</div>
</div>
</div>
	</div>
	
      

      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            autoComplete="off"
            onSubmit={handleSubmit(editPatient)}
            noValidate>
            <div className="row">
              <div className="col-md-6">
              <label className="mt-2 mb-0">First Name</label>

                 <input type="text" className="form-control"   onChange={(e) => setFName(e.target.value)}
                          
                          value={fname}/>
			
<label className="mt-2 mb-0">Phone*</label>
                
                  <input type="text" className="form-control"   onChange={(e) => setPhone(e.target.value)}
                          
                          value={phone}/>
<label className="mt-2 mb-0">Date of Birth</label>
                <input
                type="date"
                  placeholder="Enter dob"
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="form-control"
                  maxLength={50}
                  register={register}
                  errors={errors}
                  name="dob"
                  value={birthDate}
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                />
               {/* <DatePicker
                          className="form-control mt-2"
                          selected={birthDate}
                          required={true}
                  register={register}
                  errors={errors}
                          
                          
                          
                          onChange={(birthDate) => {
                            setBirthDate()
                          }}
                          placeholderText="Enter a date"
                          dateFormat="MM/dd/yyyy"
                        /> */}
                {console.log(birthDate)}
                {/* <input type="date"/> */}
                <label className="mt-2 mb-0">Height *</label>
                <input
                  label="Height (Inch)*"
                  className="form-control"
                  minLength={1}
                  maxLength={55}
                  placeholder="Enter height"
                  onChange={(e) => setHeight(e.target.value)}
                  name="height"
                  value={height}
                  required={true}
                  register={register}
                  errors={errors}
                />
                <label className="mt-2 mb-0">Gender *</label>

                
                
      <select className="form-select" value={gender} onChange={(e)=>{setGender(e.target.value)}} >
      <option value="0">Male</option>
      <option value="1">Female</option>
      
      
    
      
      </select>
      
<label className="mt-2 mb-0">Mobile Phone*</label>
                <input
                  className="form-control"
                  name="mobilePhone"
                  required={true}
                  register={register}
                  errors={errors}
                  elementType="text"
                  value={mobilePhone}
                  maxLength={50}
                  onChange={(e) => setMobilePhone(e.target.value)}
                />
<label className="mt-2 mb-0">Mailing Address</label>
                <input
                  className="form-control"
                  name="street"
                  required={false}
                  register={register}
                  errors={errors}
                  elementType="text"
                  maxLength={50}
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
<label className="mt-2 mb-0">City</label>
                <input
                  className="form-control"
                  name="city"
                  required={false}
                  register={register}
                  errors={errors}
                  elementType="text"
                  value={city}
                  maxLength={50}
                  onChange={(e) => setCity(e.target.value)}
                />  
                <div className="row">
                <div className="col-md-10">

{
                  dcount.map((curr,index)=>{
                    return(
                      <>
                     
                  <label className="mt-2 mb-0">Diagnosis</label>
                
                  {(curr!=="")?<>  
                  
                  
                  <select className="form-select" value={dcount[index]} onChange={(e)=>{handledcount(index,e.target.value)}} >
                  <option value=""></option>
                    {   diagonislist.map((curr)=><option value={curr.split("-")[0]}>{curr}</option>)}
    
      
      </select>
      
                  
                   </>:""}             
         
                 
                 
                  </>
                    )
                  })}
                    <Form.Group>
                  {/* <label className="mt-2">Diagnosis</label>
                  {
                  dcount.map((curr,index)=>{
                    return(
                      <>
               
                  </>
                    )
                  })} */}
                   <Button className="mt-1 mb-1" onClick={()=>setdcount([...dcount,"Select Diagnosis Id"])}>+</Button>
                  
                </Form.Group>
               
                  
                     </div>
                  
                  </div>
              </div>
              <div className="col-md-6">
                {console.log("sssss", provider)}
                {/* <Input label='Height (Inch)' placeholder='Enter height' onChange={e => setHeight(e.target.value)} name='height' value={provider} required={true} register={register} errors={errors} /> */}
                <label className="mt-2 mb-0">Last Name</label>
                <input
                  className="form-control"
                  elementType="text"
                  placeholder="Enter Last Name"
                  onChange={(e) => setLName(e.target.value)}
                  name="name"
                  value={lname}
                  required={true}
                  register={register}
                  maxLength={50}
                  errors={errors}
                />
<label className="mt-2 mb-0">Provider</label>
                
                 <select className="form-select" value={provider} onChange={(e)=>{setProvider(e.target.value)}} >
      
      {coreContext.providerOptions.map((curr,index)=>{
        return(<option value={curr.value}>{curr.name}</option>)
        
 })}
      
      </select>
      
                {/* {console.log(coreContext.careCoordinatorOptions,coreContext.coachOptions)} */}
                <label className="mt-2 mb-0">Care Coordinator</label>
                
                 <select className="form-select" value={coordinator} onChange={(e)=>{setCoordinator(e.target.value)}} >
      
      {coreContext.careCoordinatorOptions.map((curr,index)=>{
        return(<option value={curr.value}>{curr.name}</option>)
        
 })}
      
      </select>
      
<label className="mt-2 mb-0">Coach Name</label>
                {/* <Input
                  label="Coach Name"
                  name="coach"
                  required={false}
                  register={register}
                  maxLength={50}
                  errors={errors}
                  elementType="select"
                  value={coach}
                  options={coreContext.coachOptions}
                  onChange={(e) => setCoach(e.target.value)}
                /> */}
                <select className="form-select" value={coach} onChange={(e)=>{setCoach(e.target.value)}} >
      
      {coreContext.coachOptions.map((curr,index)=>{
        return(<option value={curr.value}>{curr.name}</option>)
        
 })}
      
      </select>
                
<label className="mt-2 mb-0">Language</label>
                <input
                  className="form-control"
                  name="language"
                  required={true}
                  register={register}
                  errors={errors}
                  elementType="select"
                  value={language}
                  maxLength={50}
                  options={coreContext.languageOptions}
                  onChange={(e) => setLanguage(e.target.value)}
                />
<label className="mt-2 mb-0">Work Phone</label>
                <input
                  className="form-control"
                  name="workPhone"
                  required={false}
                  register={register}
                  errors={errors}
                  elementType="text"
                  value={workPhone}
                  maxLength={50}
                  onChange={(e) => setWorkPhone(e.target.value)}
                />
<label className="mt-2 mb-0">Zip Code</label>
                <input
                  className="form-control"
                  name="zip"
                  required={false}
                  register={register}
                  errors={errors}
                  maxLength={50}
                  elementType="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
<label className="mt-2 mb-0">State</label>
                <input
                  className="form-control"
                  name="State"
                  required={false}
                  register={register}
                  errors={errors}
                  maxLength={50}
                  elementType="text"
                  value={state}
                 
                  onChange={(e) => setState(e.target.value)}
                />
                <label className="mt-2 mb-0">Program</label>
                
                
      <select className="form-select" value={program} onChange={(e)=>{setProgram(e.target.value)}} >
      <option value="CCM/RPM">CCM and RPM</option>
      <option value="CCM">CCM Only</option>
      <option value="RPM">RPM Only</option>
      
    
      
      </select>
      <label className="mt-2 mb-0">CPT Code For RPM</label>
      <MultiSelect
      
        options={[
          { label: "99457", value: "99457" },
          { label: "99458", value: "99458" },
          { label: "99490", value: "99490"},
          { label: "99439", value: "99439" },
          { label: "99487", value: "99487" },
          { label: "99489", value: "99489"},
        ]}
        value={cptcodeforrpm}
        onChange={setcptcodeforrpm}
        labelledBy="Select"
      />
      
      <label className="mt-2 mb-0">CPT Code For CCM</label>
      <MultiSelect
      
        options={[
          { label: "99457", value: "99457" },
          { label: "99458", value: "99458" },
          { label: "99490", value: "99490"},
          { label: "99439", value: "99439" },
          { label: "99487", value: "99487" },
          { label: "99489", value: "99489"},
        ]}
        value={cptcodeforccm}
        onChange={setcptcodeforccm}
        labelledBy="Select"
      />
      
      
              </div>
            </div>
            <Input
              blockButton={true}
              value="Submit"
              onClick={() => {
                handlefinalsubmit();
                fetchPatients();
                setShowModal(false);
                setdcount([""])
                fetchPatients();
                fetchPatients();
                

                //alert("updated");
              }}
              elementType="button"
              variant="primary"
            />
            <br />
            <center> {coreContext.renderLoader()}</center>
            <center>
              {" "}
              <Input variant="danger" label={message} elementType="label" />
            </center>
          </Form>
        </Modal.Body>
      </Modal>

      <div >
        <Modal show={showAssignDrModal} onHide={handleAssignDrModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Care Team </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              autoComplete="off"
              onSubmit={handleSubmit(editPatient)}
              noValidate>
              <div>
                <div>
                <label className="mt-2 mb-0">Provider Name</label>
                           <select className="form-select" value={provider} onChange={(e)=>{setProvider(e.target.value)}} >
      
      {coreContext.providerOptions.map((curr,index)=>{
        return(<option value={curr.value}>{curr.name}</option>)
        
 })}
      
      </select>
      <label className="mt-2 mb-0">Care Coordinator Name</label>
          <select className="form-select" value={coordinator} onChange={(e)=>{setCoordinator(e.target.value)}} >
      
      {coreContext.careCoordinatorOptions.map((curr,index)=>{
        return(<option value={curr.value}>{curr.name}</option>)
        
 })}
      
      </select>
      <label className="mt-2 mb-0">Coach Name</label>
                  {/* <Input
                    label="Coach Name"
                    name="coach"
                    required={false}
                    register={register}
                    errors={errors}
                    elementType="select"
                    value={coach}
                    options={coreContext.coachOptions}
                    onChange={(e) => setCoach(e.target.value)}
                  /> */}
                  
          <select className="form-select" value={coach} onChange={(e)=>{setCoach(e.target.value)}} >
      
      {coreContext.coachOptions.map((curr,index)=>{
        return(<option value={curr.value}>{curr.name}</option>)
        
 })}
      
      </select>
                </div>
              </div>
              <input
                
                value="Submit"
                className="btn btn-sm btn-primary mt-2"
                onClick={() => {
                  coreContext.AssignCareTeam(
                    provider,
                    coordinator,
                    coach,
                    patientId
                  );
                  setAssignDrShowModal(false);
                  coreContext.cleanup1();
                  fetchPatients();
                }}
                elementType="button"
                variant="primary"
                
              />
              <br />
              <center> {coreContext.renderLoader()}</center>
              <center>
                {" "}
                <Input variant="danger" label={message} elementType="label" />
              </center>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export { Patients };
