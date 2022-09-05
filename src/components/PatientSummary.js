import React, { useEffect, useContext, useState, useMemo } from "react";
import axios from "axios";
//import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { CoreContext } from "../context/core-context";
import Loader from "react-loader-spinner";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import swal from "sweetalert";
import { Bar, Line, Scatter, Bubble, Stacked } from "react-chartjs-2";


import {
  GenderMale,
  GenderFemale,
  PencilSquare,
  Trash,
} from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import { ButtonGroup, Button, Form, Modal, TabPane } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import Input from "./common/Input";
import { useStopwatch } from "react-timer-hook";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import IonRangeSlider from "react-ion-slider";

import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
  GridToolbarExport,
} from "@material-ui/data-grid";

import { Weight } from "./Weight";
import { WeightNew } from "./WeightNew";
import { BloodGlucose } from "./BloodGlucose";
import { BloodPressure } from "./BloodPressure";
import { BloodPressureAverage } from "./BloodPressureAverage";
import { BloodGlucoseAverage } from "./BloodGlucoseAverage";
import { WeightAverage } from "./WeightAverage";
import Moment from "moment";
import context from "react-bootstrap/esm/AccordionContext";
import { Thresold } from "./Thresold";
import Alert from "./common/Alert";
import { blue } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnHeaderCheckbox": {
      display: "block",
      pointerEvents: "none",
      disabled: "disabled",
    },
  },
}));


const PatientSummary = (props) => {
  const classes = useStyles();

  const coreContext = useContext(CoreContext);
  const handleModalClose = () => setShowModal(false);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [showNotesTextBox, setShowNotesTextBox] = useState(false);
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [bgMin, setBgMin] = useState(0);
  const [bgMax, setBgMax] = useState(0);
  const [bmiMin, setBmiMin] = useState(0);
  const [bmiMax, setBmiMax] = useState(0);
  const [PatientId, setPatientId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [t1, sett1] = useState("");
  const [tlvalue, setTlValue] = React.useState("00:00:00");
  const [from, setfrom] = useState(new Date());
  const [to, setto] = useState(new Date());
  const [slider, setslider] = useState(30);
  const [Days, setDays] = useState();
  const [tddata, settddata] = useState([]);
  const [pointcolor, setpointcolor] = useState([]);
  const [mainThresold, setMainThresold] = useState();
  const [cptcode, setcptcode] = useState([{ cptcode: "", program: "" }]);
  const [dummycptcode, setDummycptcode] = useState([])
  const [row, setrow] = useState([]);

  const marks = [
    {
      value: 0,
      label: "Today",
    },
    {
      value: 15,
      label: "Yesterday",
    },
    {
      value: 30,
      label: "7 days",
    },
    {
      value: 45,
      label: "30 days",
    },
    {
      value: 60,
      label: "60 days",
    },
    {
      value: 75,
      label: "90 days",
    },
    {
      value: 100,
      label: "custom",
    },
  ];

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
  const [tlvalueseconds, setTlvalueseconds] = React.useState("00:00:00");

  const [diastolicMin, setDiastolicMin] = useState(0);
  const [diastolicMax, setDiastolicMax] = useState(0);

  const [systolicMin, setSystolicMin] = useState(0);
  const [systolicMax, setSystolicMax] = useState(0);
  const myst = {
    backgroundColor: "#34a0ca ",
    marginRight: "20px",
    width: "50px",
  };
  const myst1 = {
    backgroundColor: "#34a0ca ",
    marginRight: "350px",
    marginBottom: "9px",
    width: "130px",
  };
  const myst2 = {
    backgroundColor: "orange",
    marginRight: "350px",
    marginBottom: "9px",
    width: "130px",
  };
  const myst3 = {
    backgroundColor: "orange",

    marginRight: "20px",
    width: "50px",
  };

  const [weightMin, setWeightMin] = useState(0);
  const [weightMax, setWeightMax] = useState(0);

  const [patient, setPatient] = useState("");
  const [patientId, setpatientId] = useState("");
  const [message, setMessage] = useState("");
  const [threadMobile, setThreadMobile] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [adddeviceflag, setdeviceflag] = useState(1);
  const [thData, setThData] = useState([]);
  const [timerLogs, setTimerLog] = useState([]);
  const [taskType, setTaskType] = useState();
  const [performedBy, setPerformedBy] = useState("");
  const [performedOn, setPerformedOn] = useState("");
  const [endDT, setendDT] = useState("");
  const [startDT, setstartDT] = useState(date);
  const [totalLogtime, settotalLogtime] = useState(0);
  const [currTimeLog, setCurrentTimeLog] = useState("");
  const [timevalue, settimevalue] = useState("");
  const [efforts, setEfforts] = useState(0);

  const greeting = "Welcome to React";
  const [Prompt, setDirty, setPristine] = Alert();

  let [provider, setProvider] = useState("");
  let [coach, setCoach] = useState("");
  let [coordinator, setCoordinator] = useState("");
  const fetchbp = () => {
    if (coreContext.patientsForPatient[0]) {
      const patientId = coreContext.patientsForPatient[0].ehrId
      coreContext.fetchBloodPressureForPatient(patientId, "patient");
    }
  };
  const fetchnewbp = () => {
    if (coreContext.patientsForPatient[0]) {
      const patientId = coreContext.patientsForPatient[0].ehrId
      const deviceid = coreContext.deviceDataForPatient.filter((a) => a.DeviceType == 'BP').map((b) => b.deviceID)

      coreContext.fetchnewBloodPressureForPatient(patientId, "patient", deviceid);

    }
  };

  const fetchbg = () => {
    if (coreContext.patientsForPatient[0]) {
      const patientId = coreContext.patientsForPatient[0].ehrId
      coreContext.fetchBloodGlucoseForPatient(patientId, "patient");
    }

  };

  useEffect(() => {
    const convert = (arr) => {
      const res = {};
      arr.forEach((obj) => {
         const key = `${obj.cptcode}${obj["program"]}`;
         if (!res[key]) {
            res[key] = { ...obj, count: 0 };
         };
         res[key].count += 1;
      });
   return Object.values(res);
};
    setDummycptcode(convert(cptcode))
  }, [cptcode])

  useEffect(fetchbp, [coreContext.patientsForPatient.length]);
  useEffect(fetchnewbp, [coreContext.patientsForPatient.length, coreContext.deviceDataForPatient.length]);

  useEffect(fetchbg, [coreContext.patientsForPatient.length]);
  const fetchCareCoordinator = () => {
    const patientId = props.match.params.patient;
    setPatientId(patientId);
    coreContext.fetchCareCoordinator();
  };
  useEffect(fetchCareCoordinator, []);

  const fetchProviders = () => {
    const patientId = props.match.params.patient;
    setPatientId(patientId);
    coreContext.fetchProviders();
  };
  useEffect(fetchProviders, [coreContext.providerData.length]);
  const fetchCoach = () => {
    const patientId = props.match.params.patient;
    setPatientId(patientId);
    coreContext.fetchCoach();
  };

  useEffect(fetchCoach, []);
  useEffect(() => {

    const arr = [];
    if (coreContext.patientsForPatient.length > 0) {
      coreContext.patientsForPatient[0].cptcodeforccm.split(",").map((curr) => {
        if (curr !== "")
          arr.push({ cptcode: curr, program: "CCM" })
      });
      coreContext.patientsForPatient[0].cptcodeforrpm.split(",").map((curr) => {
        if (curr !== "")
          arr.push({ cptcode: curr, program: "RPM" })
      });
    }
    setcptcode(arr)




  }, [coreContext.patientsForPatient.length])
  useEffect(coreContext.setdefault, []);
  useEffect(coreContext.FetchBilligCode, []);
  const convertToadd = (arr) => {
      const res = {};
      arr.forEach((obj) => {
        const key = `${obj.cptcode}${obj["program"]}`;
         if (!res[key]) {
            res[key] = { ...obj };
         }
         else{
             res[key].count = res[key].count+ obj.count
         }
       
      });
      return Object.values(res);
  }

  const handledcptcode = (index, val, prp) => {
    if (prp === "cptcode") {
      const value = [...dummycptcode]
      value[index].cptcode = val 
      setDummycptcode(convertToadd(value));
      
    }

     else {
      const value = [...dummycptcode]
      value[index].program = val 
      setDummycptcode(convertToadd(value));
    }
  
  };


  const tt = [
    ...coreContext.providerData,
    ...coreContext.ccData,
    ...coreContext.coachData,
  ];

  const fetchPatient = () => {
    const patientId = atob(props.match.params.patient);

    const usertype = localStorage.getItem("userType");
    setUserType(localStorage.getItem("userType"));
    setUserId(localStorage.getItem("userId"));
    setUserName(localStorage.getItem("userName"));
    setpatientId(patientId);

    setPerformedBy(userName);

    coreContext.patient.notes != undefined &&
      setNotes(coreContext.patient.notes);
    //setTaskType("Care Coordination")
    //let patientData = JSON.parse(localStorage.getItem('app_patient'));

    //setPatient(patientData);
    coreContext.fetchPatientListfromApiForPatient("patient", patientId);
    fetchbp();
    fetchbg();

    //coreContext.fetchThresold("ADMIN_PATIENT_" + patientId, userType);

    coreContext.fetchTimeLog("PATIENT_" + patientId);

    //coreContext.fetchTaskTimerUser();

    coreContext.fetchDeviceDataForPatient("PATIENT_" + patientId, userName, "patient");

  };
  const onCreateBill = (cptcode) => {

    var cptrpm = "";
    var cptccm = "";
    cptcode.map((curr) => {
      if (curr.program == "CCM") {
        for (let i = 0; i < curr.count; i++) {
          cptccm = cptccm + curr.cptcode + ","
        }
       
      }
      else {
        for (let i = 0; i < curr.count; i++) {
          cptrpm = cptrpm + curr.cptcode + ","
        }
       
      }
    })

    coreContext.UpdateCPT(coreContext.patientsForPatient[0], cptccm, cptrpm);

  }

  const renderBilling = () => {

    return (
      <>
        {dummycptcode.map((curr, index) => {
          return (
            <>
              <div className="row mt-2">
                <div className="col-xl-2">
                  <label>CPT Code</label>
                  {/* <input className="form-control" value={curr.cptcode} onChange={(e)=>{ handledcptcode(index,e.target.value,"cptcode")}}/> */}
                  <select className="form-select" value={curr.cptcode} onChange={(e) => { handledcptcode(index, e.target.value, "cptcode") }}>
                    <option value="">Select Code</option>
                    {(coreContext.BillingCodes.length > 0) ?
                      coreContext.BillingCodes.map((dbcode) =>
                        <option value={dbcode.code}>{dbcode.code}</option>
                      ) :

                      <option value=""></option>

                    }


                  </select>

                </div>
                <div className="col-xl-2">
                  <label>Program</label>
                  <select className="form-select" value={curr.program} onChange={(e) => { handledcptcode(index, e.target.value, "program") }}>
                    <option value="SelectUser">Select a Program</option>
                    <option value="CCM">CCM</option>
                    <option value="RPM">RPM</option>

                  </select>

                </div>
                <div className="col-xl-2">
                  <label>Description</label>
                  <input className="form-control" value={(coreContext.BillingCodes.filter((curr1) => curr1.code == curr.cptcode).length > 0) ? coreContext.BillingCodes.filter((curr1) => curr1.code == curr.cptcode)[0].description : ""} />

                </div>
                <div className="col-xl-2">
                  <label>Cost</label>
                  <input className="form-control" value={(coreContext.BillingCodes.filter((curr1) => curr1.code == curr.cptcode).length > 0) ? "$" + (coreContext.BillingCodes.filter((curr1) => curr1.code == curr.cptcode)[0].cost)*curr.count : ""} />

                </div>
                <div className="col-xl-2">
                  <label>number of multiplier</label>
                  <input className="form-control" value={curr.count} />

                </div>
                <div className="col-xl-1">
                <button className="btn btn-primary mt-4" onClick={() =>{ 
                   if(Object.keys(dummycptcode).length >0){
                    let value = dummycptcode;
                    value.splice(index, 1);
                    if(Object.keys(value).length >0){
                      value[index].count= dummycptcode[index].count + 1;
                      setDummycptcode(value)
                    }
                  
                   }
                  }}> <Trash /></button>
                  </div>
                <div className="col-xl-1">

                  <button className="btn btn-primary mt-4" onClick={() =>{ 
                    if(Object.keys(dummycptcode).length >0){
                    let value = dummycptcode;
                    value[index].count= dummycptcode[index].count + 1;
                    setDummycptcode(value)
                    }
                  }}>x2</button>
                   

                </div>
              </div>
            </>
          )
        })

        }
        <div className="col-xl-3">

          <button style={{ marginTop: "1.5em" }} className="btn btn-primary" onClick={() => setDummycptcode([...dummycptcode, { cptcode: "", program: "", count:1 }])}>Add row</button>
        </div>
        <div className="col-xl-3">

          <button style={{ marginTop: "1.5em" }} className="btn btn-primary" onClick={() => onCreateBill(dummycptcode)}>Create Bill</button>
        </div>
      </>
    )


  }
  const fetchtime = () => {
    coreContext.fetchTimeLog("PATIENT_" + patientId)
  }

  const pateientvalue = useMemo(() => fetchPatient, []);
  useEffect(fetchPatient, []);
  useEffect(fetchPatient, [adddeviceflag]);

  // useEffect(fetchPatient, [coreContext.patient.notes]);
  useEffect(
    () => setNotes(coreContext.patient.notes),
    [coreContext.patient.notes]
  );
  const checkthresoldvalue = () => {

    if (coreContext.thresoldData.filter((curr) => curr.Element_value === "Blood Glucose").length === 0) {
      return "0";
    }
    else {
      let ttt = coreContext.thresoldData.filter((curr) => curr.Element_value === "Blood Glucose")

      return String(ttt[0].bg_high)
    }
  }
  const checkadminthresoldvalue = () => {

    if (coreContext.adminthresold.filter((curr) => curr.Element_value === "Blood Glucose").length === 0) {
      return "150";
    }
    else {
      let ttt = coreContext.adminthresold.filter((curr) => curr.Element_value === "Blood Glucose")

      return String(ttt[0].bg_high)
    }
  }



  const checkthresoldMinvalue = () => {
    if (
      coreContext.thresoldData.filter(
        (curr) => curr.Element_value === "Blood Glucose"
      ).length === 0
    ) {
      return "0";
    } else {

      return String(
        coreContext.thresoldData.filter(
          (curr) => curr.Element_value === "Blood Glucose"
        )[0].bg_low
      );
    }
  };
  const checkadminthresoldMinvalue = () => {
    if (
      coreContext.adminthresold.filter(
        (curr) => curr.Element_value === "Blood Glucose"
      ).length === 0
    ) {
      return "20";
    } else {

      return String(
        coreContext.adminthresold.filter(
          (curr) => curr.Element_value === "Blood Glucose"
        )[0].bg_low
      );
    }
  };
  const checkadmindiastolic = (type) => {
    if (type === "SYSTOLIC") {
      let option = "systolic_high"
    } else {
      let option = "diastolic_high"

    }

    if (
      coreContext.adminthresold.filter(
        (curr) => curr.Element_value === type
      ).length === 0
    ) {
      return "20";
    } else {
      if (type === "SYSTOLIC") {

        return String(
          coreContext.adminthresold.filter(
            (curr) => curr.Element_value === type
          )[0].systolic_high
        );
      }
      if (type === "DIASTOLIC") {
        return String(
          coreContext.adminthresold.filter(
            (curr) => curr.Element_value === type
          )[0].diastolic_high
        );
      }


    }
  };
  const checkdiastolic = (type) => {
    if (type === "SYSTOLIC") {
      let option = "systolic_high"
    } else {
      let option = "diastolic_high"

    }

    if (
      coreContext.thresoldData.filter(
        (curr) => curr.Element_value === type
      ).length === 0
    ) {
      return "20";
    } else {
      if (type === "SYSTOLIC") {

        return String(
          coreContext.thresoldData.filter(
            (curr) => curr.Element_value === type
          )[0].systolic_high
        );
      }
      if (type === "DIASTOLIC") {
        return String(
          coreContext.thresoldData.filter(
            (curr) => curr.Element_value === type
          )[0].diastolic_high
        );
      }


    }
  };

  //const tvalue=checkthresoldvalue();
  const tvalue = useMemo(() => checkthresoldvalue(), [JSON.stringify(coreContext.thresoldData)]);
  const tadminvalue = useMemo(() => checkadminthresoldvalue(), [JSON.stringify(coreContext.adminthresold)])
  const tvaluemin = useMemo(() => checkthresoldMinvalue(), [JSON.stringify(coreContext.thresoldData)]);
  const tadminvaluemin = useMemo(() => checkadminthresoldMinvalue(), [JSON.stringify(coreContext.adminthresold)])
  const tadmindiastolic = useMemo(() => checkadmindiastolic("DIASTOLIC"), [JSON.stringify(coreContext.adminthresold)])
  const tadminsystolic = useMemo(() => checkadmindiastolic("SYSTOLIC"), [JSON.stringify(coreContext.adminthresold)])
  const tsystolic = useMemo(() => checkdiastolic("SYSTOLIC"), [JSON.stringify(coreContext.thresoldData)])
  const tdiastolic = useMemo(() => checkdiastolic("DIASTOLIC"), [JSON.stringify(coreContext.thresoldData)])


  //const tMinvalue=checkthresoldMinvalue();
  const tMinvalue = useMemo(() => checkthresoldMinvalue(), [JSON.stringify(coreContext.thresoldData)]);
  const tadminMinvalue = useMemo(() => checkadminthresoldMinvalue(), [JSON.stringify(coreContext.adminthresold)]);

  //alert(tvalue)
  //alert(alert(checkthresoldvalue()))
  //alert(checkthresoldvalue())

  const renderDates = () => {
    return (
      <>
        <div className="row">
          <div className="col-xl-1">
            <label>From:</label>
          </div>
          <div className="col-xl-4">
            <DatePicker
              selected={from}
              onChange={(e) => {
                setfrom(e);
                setslider(100);
              }}
              value={from}
            // dateFormat="MM/dd/yyyy hh:mm:ss aa"
            />
          </div>
          <div className="col-xl-1">
            <label>To:</label>
          </div>
          <div className="col-xl-4 ">

            <DatePicker
              selected={to}
              onChange={(e) => {
                setto(e);
                setslider(100);
              }}
              value={to}
            />
          </div>
        </div>
      </>
    );
  };

  const fetchTd = () => {
    coreContext.fetchThresold(
      "ADMIN_" + localStorage.getItem("ehrId"),
      "patient"
    );
  };
  const fetchadmintd = () => {
    coreContext.fetchadminThresold("ADMIN_" + localStorage.getItem("userId"), "admin")
  }


  useEffect(fetchTd, [JSON.stringify(coreContext.thresoldData)]);
  useEffect(fetchadmintd, [JSON.stringify(coreContext.adminthresold)]);

  const fetchsliderdays = () => {
    var SliderDays;
    if (slider === 0) {
      SliderDays = 0;
    }
    if (slider === 15) {
      SliderDays = 1;
    }
    if (slider === 30) {
      SliderDays = 7;
    }
    if (slider === 45) {
      SliderDays = 30;
    }
    if (slider === 60) {
      SliderDays = 60;
    }
    if (slider === 75) {
      SliderDays = 90;
    }
    if (slider === 100) {
      SliderDays = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
    }
    return SliderDays;
  };

  const renderslider = () => {
    return (
      <>
        <div className="row">
          <div className="col-xl-12">

            <Slider
              aria-label="Restricted values"
              step={null}
              //valueLabelDisplay="auto"
              marks={marks}
              value={slider}
              onChange={(e) => {
                setslider(e.target.value);
                setfrom(new Date());
                //alert(new Date(new Date().setDate(from.getDate() -slider)));
                //alert(new Date())
                //setto(new Date())
              }}
            />

          </div>
        </div>
      </>
    );
  };
  useEffect(() => {
    setfrom(
      new Date(new Date().setDate(new Date().getDate() - fetchsliderdays()))
    );

  }, [slider]);

  const getbpdata = React.useCallback((index) => {
    if (coreContext.bloodpressureDataForPatient.length == 0) {
      return (
        <>
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
        </>
      );
    }

    if (
      coreContext.bloodpressureDataForPatient.length > 0 &&
      coreContext.bloodpressureDataForPatient[0].UserName !== "undefined"
    ) {
      if (to.getDate() !== from.getDate()) {

        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);

        var finaldata = coreContext.bloodpressureDataForPatient.filter(
          (date) => date.MeasurementDateTime >= from && date.MeasurementDateTime <= to
        );
      } else {
        var SliderDays;
        if (slider === 0) {
          SliderDays = 0;
        }
        if (slider === 15) {
          SliderDays = 1;
        }
        if (slider === 30) {
          SliderDays = 7;
        }
        if (slider === 45) {
          SliderDays = 30;
        }
        if (slider === 60) {
          SliderDays = 60;
        }
        if (slider === 75) {
          SliderDays = 90;
        }
        if (slider === 100) {
          SliderDays = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
        }
        // let today = new Date();
        // var bfr = new Date().setDate(today.getDate() - SliderDays).setHours(0,0,0,0);
        let today = new Date();
        today.setHours(0, 0, 0, 0)
        let bfr = today.setDate(today.getDate() - SliderDays);

        var finaldata = coreContext.bloodpressureDataForPatient.filter(
          (date) => date.MeasurementDateTime >= new Date(bfr)
        );

      }

      let Systolic = [];
      let diastolic = [];
      let labels = [];
      let pulse = [];
      let dates = [];

      finaldata.map((curr) => {
        Systolic.push(Number(curr.systolic));
        diastolic.push(Number(curr.diastolic));
        labels.push(Moment(curr.MeasurementDateTime).format("MM-DD-YYYY hh:mm A"));
        pulse.push(curr.Pulse);

        dates.push(Moment(curr.MeasurementDateTime).format("MM-DD-YYYY"));
      });


      let uniquedates = dates.filter(function (item, pos) {
        return dates.indexOf(item) == pos;
      });
      let sorteddates = uniquedates.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b) - new Date(a);
      });

      let avgsys = Systolic.reduce((a, b) => a + b, 0) / finaldata.length;
      let avgdia = diastolic.reduce((a, b) => a + b, 0) / finaldata.length;

      let daydfrnc;
      if (slider === 100) {
        daydfrnc = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
      } else {
        daydfrnc = SliderDays;
      }

      if (index === 3) {
        return (
          <>
            <div className="row">
              <div className="col-xl-12">
                <div className="table-responsive-sm mb-0">
                  <table className="table table-bordered mb-0" >
                    <thead>
                      <tr className="bg-primary">
                        <th width="30%" className="text-white">Date</th>
                        <th width="30%" className="text-white">Blood Pressure(mmHG)</th>
                        <th width="30%" className="text-white">Pulse(bpm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sorteddates.map((curr) => {
                        return (
                          <>
                            <tr
                              className="text-dark"
                              style={{ backgroundColor: "#a3a3a6" }}
                              scope="row">
                              <td colSpan="3">{curr}</td>
                            </tr>
                            {finaldata
                              .filter(
                                (item) =>
                                  Moment(item.MeasurementDateTime).format("MM-DD-YYYY") ===
                                  curr
                              )
                              .map((curr1) => {
                                return (
                                  <>
                                    <tr scope="row">
                                      <td>
                                        {Moment(curr1.MeasurementDateTime).format("hh:mm A")}
                                      </td>
                                      <td>
                                        {curr1.systolic}/{curr1.diastolic}
                                      </td>
                                      <td>{curr1.Pulse}</td>
                                    </tr>
                                  </>
                                );
                              })}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        );
      }

      if (index === 2) {
        //var labels =[1,2,3,4,5];
        
        let Systolicgrap = [];
        let diastolicgrap = [];
        let labelsgrap = [];
        let pulsegrap = [];
        let thresolddiastolic = [];
        let thresoldsystolic = [];
        // Systolic.push(Number(curr.systolic));
        // diastolic.push(Number(curr.diastolic));
        // labels.push(Moment(curr.MeasurementDateTime).format("MM-DD-YYYY hh:mm A"));
        // pulse.push(curr.Pulse);
        // dates.push(Moment(curr.MeasurementDateTime).format("MM-DD-YYYY"));
        var sortData = finaldata.sort(function (a, b) {
          return (
            new Date(Moment(a.MeasurementDateTime).format("MM-DD-YYYY hh:mm A")) -
            new Date(Moment(b.MeasurementDateTime).format("MM-DD-YYYY hh:mm A"))
          );
        });


        sortData.map((curr) => {
          Systolicgrap.push(Number(curr.systolic));
          diastolicgrap.push(Number(curr.diastolic));
          { (tdiastolic === "0") ? thresolddiastolic.push(tadmindiastolic) : thresolddiastolic.push(tdiastolic) }
          { (tsystolic === "0") ? thresoldsystolic.push(tadminsystolic) : thresoldsystolic.push(tsystolic) }
          labelsgrap.push(
            Moment(curr.MeasurementDateTime).format("MM-DD-YYYY hh:mm A")
          );
          pulsegrap.push(curr.Pulse);
        });

        const data = {
          // labels: labels.sort(function (a, b) {

          //   return new Date(a) - new Date(b);
          labels: labelsgrap,
          datasets: [
            {
              label: "Systolic",
              data: Systolicgrap,
              fill: false,
              backgroundColor: ["Blue"],
              borderColor: ["Blue"],
              pointRadius: 10,
              pointStyle: "triangle",
              pointBackgroundColor: "blue",

              tension: 0,
              //borderColor:["white"],
            },
            {
              label: "Diastolic",
              data: diastolicgrap,
              fill: false,
              backgroundColor: ["green"],
              borderColor: ["green"],
              radius: 10,
              pointBackgroundColor: "green",
              //pointRadius: 8,
              pointStyle: "square",
              tension: 0,
              //borderColor:["white"],
            },
            {
              label: "Pulse",
              data: pulsegrap,
              fill: false,
              backgroundColor: ["orange"],
              borderColor: ["orange"],
              pointStyle: "rectRot",
              pointBackgroundColor: "orange",
              pointRadius: 10,
              tension: 0,

              //borderColor:["white"],
            },
            {
              label: "Max Diastolic",
              data: thresolddiastolic,
              pointRadius: 0,
              //pointBackgroundColor:"white",

              backgroundColor: ["red"],
              borderColor: ["red"],
              fill: false,
              borderWidth: 6,
            },
            {
              label: "Max Systolic",
              data: thresoldsystolic,
              pointRadius: 0,
              //pointBackgroundColor:"white",

              backgroundColor: ["indigo"],
              borderColor: ["indigo"],
              fill: false,
              borderWidth: 6,
            },
          ],
        };

        return (
          <>
            <div className="row mb-4">
              <div className="col-xl-12">
                <div className="card-body bg-dark text-white">Reading By Dates
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-xl-12">
                <Line
                  data={data}
                  options={{
                    tooltips: {
                      mode: "index",
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
            </div>

          </>
        );
      }
      if (index === 1) {
        return (
          <>


            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape-1">Total Reading</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-orange"> {finaldata.length}</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">Average Reading per day</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue">{isNaN(
                  Math.round(
                    Number(
                      Math.round(Number(finaldata.length / daydfrnc) * 10) / 10
                    )
                  )
                )
                  ? "0"
                  : Math.round(
                    Number(
                      Math.round(Number(finaldata.length / daydfrnc) * 10) /
                      10
                    )
                  )}</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">   Average Systolic</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue"> {isNaN(avgsys) ? "0" : Number(Math.round(avgsys))} mm HG</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">  Average Diastolic</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue">{isNaN(avgdia) ? "0 " : Number(Math.round(avgsys))}
                  mm HG</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">  Lowest Systolic</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue">{Systolic.length > 0 ? Math.min(...Systolic) : "0"} mm HG</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">  Highest Diastolic</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue"> {diastolic.length > 0 ? Number(Math.max(...diastolic)) : "0"} mm
                  HG</div>
              </div>
            </div>
          </>
        );
      }
    } else {
      return <h1>no data found</h1>;
    }
  }, [coreContext.bloodpressureDataForPatient, slider, from, to]);
  const getbpdatanew = React.useCallback((index, type) => {

    if (coreContext.newbloodpressureDataForPatient.length == 0) {
      return (
        <>
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
        </>
      );
    }

    if (
      coreContext.newbloodpressureDataForPatient.length > 0 &&
      coreContext.newbloodpressureDataForPatient[0].UserName !== "undefined"
    ) {
      if (to.getDate() !== from.getDate()) {

        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);

        var finaldata = coreContext.newbloodpressureDataForPatient.filter(
          (date) => date.MeasurementDateTime >= from && date.MeasurementDateTime <= to
        );
      } else {
        var SliderDays;
        if (slider === 0) {
          SliderDays = 0;
        }
        if (slider === 15) {
          SliderDays = 1;
        }
        if (slider === 30) {
          SliderDays = 7;
        }
        if (slider === 45) {
          SliderDays = 30;
        }
        if (slider === 60) {
          SliderDays = 60;
        }
        if (slider === 75) {
          SliderDays = 90;
        }
        if (slider === 100) {
          SliderDays = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
        }
        // let today = new Date();
        // var bfr = new Date().setDate(today.getDate() - SliderDays).setHours(0,0,0,0);
        let today = new Date();
        today.setHours(0, 0, 0, 0)
        let bfr = today.setDate(today.getDate() - SliderDays);

        var finaldata = coreContext.newbloodpressureDataForPatient.filter(
          (date) => date.MeasurementDateTime >= new Date(bfr)
        );

      }

      let Systolic = [];
      let diastolic = [];
      let labels = [];
      let pulse = [];
      let dates = [];

      finaldata.map((curr) => {
        Systolic.push(Number(curr.systolic));
        diastolic.push(Number(curr.diastolic));
        labels.push(Moment(curr.MeasurementDateTime).format("MM-DD-YYYY hh:mm A"));
        pulse.push(curr.Pulse);

        dates.push(Moment(curr.MeasurementDateTime).format("MM-DD-YYYY"));
      });


      let uniquedates = dates.filter(function (item, pos) {
        return dates.indexOf(item) == pos;
      });
      let sorteddates = uniquedates.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b) - new Date(a);
      });

      let avgsys = Systolic.reduce((a, b) => a + b, 0) / finaldata.length;
      let avgdia = diastolic.reduce((a, b) => a + b, 0) / finaldata.length;

      let daydfrnc;
      if (slider === 100) {
        daydfrnc = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
      } else {
        daydfrnc = SliderDays;
      }

      if (index === 3) {
        return (
          <>
            <div className="row">
              <div className="col-xl-12">
                <div className="table-responsive-sm mb-0">
                  <table className="table table-bordered mb-0" >
                    <thead>
                      <tr className="bg-primary">
                        <th width="30%" className="text-white">Date</th>
                        <th width="30%" className="text-white">Blood Pressure(mmHG)</th>
                        <th width="30%" className="text-white">Pulse(bpm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sorteddates.map((curr) => {
                        return (
                          <>
                            <tr
                              className="text-dark"
                              style={{ backgroundColor: "#a3a3a6" }}
                              scope="row">
                              <td colSpan="3">{curr}</td>
                            </tr>
                            {finaldata
                              .filter(
                                (item) =>
                                  Moment(item.MeasurementDateTime).format("MM-DD-YYYY") ===
                                  curr
                              )
                              .map((curr1) => {
                                return (
                                  <>
                                    <tr scope="row">
                                      <td>
                                        {Moment(curr1.MeasurementDateTime).format("hh:mm A")}
                                      </td>
                                      <td>
                                        {curr1.systolic}/{curr1.diastolic}
                                      </td>
                                      <td>{curr1.Pulse}</td>
                                    </tr>
                                  </>
                                );
                              })}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        );
      }

      if (index === 2) {
        //var labels =[1,2,3,4,5];
   
        let Systolicgrap = [];
        let diastolicgrap = [];
        let labelsgrap = [];
        let pulsegrap = [];
        let thresolddiastolic = [];
        let thresoldsystolic = [];
        // Systolic.push(Number(curr.systolic));
        // diastolic.push(Number(curr.diastolic));
        // labels.push(Moment(curr.MeasurementDateTime).format("MM-DD-YYYY hh:mm A"));
        // pulse.push(curr.Pulse);
        // dates.push(Moment(curr.MeasurementDateTime).format("MM-DD-YYYY"));
        var sortData = finaldata.sort(function (a, b) {
          return (
            new Date(Moment(a.MeasurementDateTime).format("MM-DD-YYYY hh:mm A")) -
            new Date(Moment(b.MeasurementDateTime).format("MM-DD-YYYY hh:mm A"))
          );
        });


        sortData.map((curr) => {
          Systolicgrap.push(Number(curr.systolic));
          diastolicgrap.push(Number(curr.diastolic));
          { (tdiastolic === "0") ? thresolddiastolic.push(tadmindiastolic) : thresolddiastolic.push(tdiastolic) }
          { (tsystolic === "0") ? thresoldsystolic.push(tadminsystolic) : thresoldsystolic.push(tsystolic) }
          labelsgrap.push(
            Moment(curr.MeasurementDateTime).format("MM-DD-YYYY hh:mm A")
          );
          pulsegrap.push(curr.Pulse);
        });

        const data = {
          // labels: labels.sort(function (a, b) {

          //   return new Date(a) - new Date(b);
          labels: labelsgrap,
          datasets: [
            {
              label: "Systolic",
              data: Systolicgrap,
              fill: false,
              backgroundColor: ["Blue"],
              borderColor: ["Blue"],
              pointRadius: 10,
              pointStyle: "triangle",
              pointBackgroundColor: "blue",

              tension: 0,
              //borderColor:["white"],
            },
            {
              label: "Diastolic",
              data: diastolicgrap,
              fill: false,
              backgroundColor: ["green"],
              borderColor: ["green"],
              radius: 10,
              pointBackgroundColor: "green",
              //pointRadius: 8,
              pointStyle: "square",
              tension: 0,
              //borderColor:["white"],
            },
            {
              label: "Pulse",
              data: pulsegrap,
              fill: false,
              backgroundColor: ["orange"],
              borderColor: ["orange"],
              pointStyle: "rectRot",
              pointBackgroundColor: "orange",
              pointRadius: 10,
              tension: 0,

              //borderColor:["white"],
            },
            {
              label: "Max Diastolic",
              data: thresolddiastolic,
              pointRadius: 0,
              //pointBackgroundColor:"white",

              backgroundColor: ["red"],
              borderColor: ["red"],
              fill: false,
              borderWidth: 6,
            },
            {
              label: "Max Systolic",
              data: thresoldsystolic,
              pointRadius: 0,
              //pointBackgroundColor:"white",

              backgroundColor: ["indigo"],
              borderColor: ["indigo"],
              fill: false,
              borderWidth: 6,
            },
          ],
        };

        return (
          <>
            <div className="row mb-4">
              <div className="col-xl-12">
                <div className="card-body bg-dark text-white">Reading By Dates
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-xl-12">
                <Line
                  data={data}
                  options={{
                    tooltips: {
                      mode: "index",
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
            </div>

          </>
        );
      }
      if (index === 1) {
        return (
          <>


            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape-1">Total Reading</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-orange"> {finaldata.length}</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">Average Reading per day</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue">{isNaN(
                  Math.round(
                    Number(
                      Math.round(Number(finaldata.length / daydfrnc) * 10) / 10
                    )
                  )
                )
                  ? "0"
                  : Math.round(
                    Number(
                      Math.round(Number(finaldata.length / daydfrnc) * 10) /
                      10
                    )
                  )}</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">   Average Systolic</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue"> {isNaN(avgsys) ? "0" : Number(Math.round(avgsys))} mm HG</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">  Average Diastolic</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue">{isNaN(avgdia) ? "0 " : Number(Math.round(avgsys))}
                  mm HG</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">  Lowest Systolic</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue">{Systolic.length > 0 ? Math.min(...Systolic) : "0"} mm HG</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">  Highest Diastolic</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue"> {diastolic.length > 0 ? Number(Math.max(...diastolic)) : "0"} mm
                  HG</div>
              </div>
            </div>
          </>
        );
      }
    } else {
      return <h1>no data found</h1>;
    }
  }, [coreContext.newbloodpressureDataForPatient, slider, from, to]);
  const renderBloodGlucose = (index) => {
    if (coreContext.bloodglucoseDataForPatient.length == 0) {
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
      coreContext.bloodglucoseDataForPatient.length > 0 &&
      coreContext.bloodglucoseDataForPatient[0].UserName !== "undefined"
    ) {
      if (slider === 100) {
        var finalbgdata = coreContext.bloodglucoseDataForPatient.filter(
          (date) => date.MeasurementDateTime >= from && date.MeasurementDateTime <= to
        );
      } else {
        var SliderDays;
        if (slider === 0) {
          SliderDays = 0;
        }
        if (slider === 15) {
          SliderDays = 1;
        }
        if (slider === 30) {
          SliderDays = 7;
        }
        if (slider === 45) {
          SliderDays = 30;
        }
        if (slider === 60) {
          SliderDays = 60;
        }
        if (slider === 75) {
          SliderDays = 90;
        }
        if (slider === 100) {
          SliderDays = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
        }
        let today = new Date();
        today.setHours(0, 0, 0, 0)
        let bfr = today.setDate(today.getDate() - SliderDays);
        var finalbgdata = coreContext.bloodglucoseDataForPatient.filter(
          (date) => date.MeasurementDateTime >= new Date(bfr)
        );
      }
      let bg = [];
      let bgbefore = [];
      let bgafter = [];
      let labels = [];
      let thrshold = [];
      let thresholdmin = [];
      let cdate = [];
      let uniquedates = [];
      let sorteddates = [];
      let pcolorb = [];
      let pradiusBM = [];
      let pradiusAM = [];
      // for graph
      // let labelsgrap = [];
      // let bgbeforegraph = [];
      // let bgaftergrapph = [];
      // let thrsholdgraph = [];
      // let thresholdmingraph = [];

      // finalbgdata.map((curr)=>{

      // })

      var sortData = finalbgdata.sort(function (a, b) {
        return (
          new Date(Moment(a.MeasurementDateTime).format("MM-DD-YYYY hh:mm A")) -
          new Date(Moment(b.MeasurementDateTime).format("MM-DD-YYYY hh:mm A"))
        );
      });

      finalbgdata.map((curr) => {
        bg.push(Number(curr.bloodglucosemgdl));
        labels.push(Moment(curr.MeasurementDateTime).format("MM-DD-YYYY hh:mm A"));
        cdate.push(Moment(curr.MeasurementDateTime).format("MM-DD-YYYY"));
        {
          (tvalue !== "0") ? thrshold.push(tvalue) : thrshold.push(tadminvalue);
          (tMinvalue !== "0") ? thresholdmin.push(tMinvalue) : thresholdmin.push(tadminMinvalue);
        }


        uniquedates = cdate.filter(function (item, pos) {
          return cdate.indexOf(item) == pos;
        });
        sorteddates = uniquedates.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b) - new Date(a);
        });
        if (curr.meal === "Before Meal") {
          bgbefore.push(curr.bloodglucosemgdl);
          bgafter.push("");
          if (
            Number(curr.bloodglucosemgdl) < Number((tvalue !== "0") ? tvalue : tadminvalue) &&
            Number(curr.bloodglucosemgdl) > Number((tMinvalue !== "0") ? tMinvalue : tadminMinvalue)
          ) {
            pcolorb.push("green");
          } else if (Number(curr.bloodglucosemgdl) > Number((tvalue !== "0") ? tvalue : tadminvalue)) {
            pcolorb.push("red");
          } else {
            pcolorb.push("blue");
          }
          pradiusAM.push(0);
          pradiusBM.push(10);
        }

        if (curr.meal === "After Meal") {
          bgafter.push(curr.bloodglucosemgdl);
          bgbefore.push("0");
          pcolorb.push("blue")
          pradiusAM.push(10);
          pradiusBM.push(0);

        }
      });
      let avgbg = bg.reduce((a, b) => a + b, 0) / finalbgdata.length;
      let daydfrnc;
      if (slider === 100) {
        daydfrnc = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24));
      } else {
        daydfrnc = SliderDays;
      }
      if (index === 2) {
        //var labels =[1,2,3,4,5];
        const data = {
          labels: labels,

          datasets: [
            {
              label: "Before Meal",
              data: bgbefore,
              backgroundColor: ["Blue"],
              borderColor: ["Blue"],
              fill: false,
              pointRadius: pradiusBM,
              pointStyle: "triangle",
              pointBackgroundColor: pcolorb,
            },
            {
              label: "After Meal",
              data: bgafter,
              fill: false,
              backgroundColor: ["orange"],
              borderColor: ["orange"],
              pointRadius: pradiusAM,
              pointStyle: "square",
              pointBackgroundColor: "orange",
            },
            {
              label: "Max Value",
              data: thrshold,
              pointRadius: 0,
              //pointBackgroundColor:"white",

              backgroundColor: ["red"],
              borderColor: ["red"],
              fill: false,
              borderWidth: 6,
            },
            {
              label: "Min Value",
              data: thresholdmin,
              pointRadius: 0,
              //pointBackgroundColor:"white",

              backgroundColor: ["#036bfc"],
              borderColor: ["#036bfc"],
              fill: false,
              borderWidth: 3,
            },
            {
              label: "In range Boundaries",
              backgroundColor: ["green"],
            },
            {
              label: "Above range Boundaries",
              backgroundColor: ["red"],
            },
            {
              label: "Below range Boundaries",
              backgroundColor: ["Blue"],
            },
            // {
            //   label: 'Pulse',
            //   data: pulse,
            //   backgroundColor:["orange"],
            //   //borderColor:["white"],
            // }
          ],
        };
        const filterarray = [];

        return (
          <>
            <div className="row mb-4">
              <div className="col-xl-12">
                <div className="card-body bg-dark text-white">Reading By Dates
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-xl-12">
                <Line
                  data={data}
                  options={{
                    tooltips: {
                      mode: "index",
                    },

                    legend: {
                      display: true,
                      position: "bottom",
                    },

                    responsive: true,
                    scales: {
                      xAxes: [
                        {
                          id: "x",
                          //type: 'time',
                          display: true,
                          title: {
                            display: true,
                            text: "Date",
                          },

                          ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                              if (
                                filterarray.includes(
                                  Moment(value).format("YYYY-MM-DD")
                                ) !== true
                              ) {
                                filterarray.push(
                                  Moment(value).format("YYYY-MM-DD")
                                );
                              } else {
                                filterarray.push("0");
                              }
                              return filterarray[index] !== "0"
                                ? Moment(value).format("MM-DD")
                                : "";
                            },
                          },
                        },
                      ],
                    },
                    plugins: {
                      autocolors: false,
                      annotation: {
                        annotations: {
                          line1: {
                            type: "line",
                            yMin: 60,
                            yMax: 60,
                            borderColor: "rgb(255, 99, 132)",
                            borderWidth: 2,
                          },
                        },
                      },
                    },
                  }}
                />
              </div></div>
          </>
        );
      }
      if (index === 3) {
        return (
          <>
            <div className="row">
              <div className="col-xl-12">
                <div className="table-responsive-sm mb-0">
                  <table className="table table-bordered  mb-0">
                    <thead>
                      <tr className="bg-primary">
                        <th width="10%" className="text-white"></th>
                        <th width="20%" className="text-white" colspan="2">
                          Morning<br />12AM to 10AM
                        </th>
                        <th width="20%" className="text-white" colspan="2">
                          Afternoon<br /> 10AM to 3PM
                        </th>
                        <th width="20%" className="text-white" colspan="2">
                          Evening<br /> 3PM to 9PM
                        </th>
                        <th width="20%" className="text-white" colspan="2">
                          Night<br />9PM to 12AM
                        </th>
                      </tr>
                      <tr>
                        <td>Date</td>

                        <td>Before Meal</td>
                        <td>After Meal</td>
                        <td>Before Meal</td>
                        <td>After Meal</td>
                        <td>Before Meal</td>
                        <td>After Meal</td>
                        <td>Before Meal</td>
                        <td>After Meal</td>
                      </tr>
                    </thead>
                    <tbody>
                      {sorteddates.map((curr) => {
                        const filtereddarta = finalbgdata.filter(
                          (item) =>
                            Moment(item.MeasurementDateTime).format("MM-DD-YYYY") === curr
                        );
                        let dataBMAM = {
                          morningbm: [],
                          morningam: [],
                          noonbm: [],
                          noonam: [],
                          eveningbm: [],
                          eveningam: [],
                          nightbm: [],
                          nightam: [],
                          morningbmtime: [],
                          morningamtime: [],
                          noonbmtime: [],
                          noonamtime: [],
                          eveningbmtime: [],
                          eveningamtime: [],
                          nightbmtime: [],
                          nightamtime: [],
                        };
                        filtereddarta.map((curr) => {
                          if (Number(Moment(curr.MeasurementDateTime).format("HH")) < 10) {
                            if (curr.meal === "Before Meal") {
                              dataBMAM.morningbm.push(curr.bloodglucosemgdl);
                              dataBMAM.morningbmtime.push(Moment(curr.MeasurementDateTime).format("hh:mm A"))
                             
                            } else {
                              dataBMAM.morningam.push(curr.bloodglucosemgdl);
                              dataBMAM.morningamtime.push(Moment(curr.MeasurementDateTime).format("hh:mm A"))
                            }
                          }
                          if (
                            Number(Moment(curr.MeasurementDateTime).format("HH")) >= 10 &&
                            Number(Moment(curr.MeasurementDateTime).format("HH")) < 15
                          ) {
                            if (curr.meal === "Before Meal") {
                              dataBMAM.noonbm.push(curr.bloodglucosemgdl);
                              dataBMAM.noonbmtime.push(Moment(curr.MeasurementDateTime).format("hh:mm A"))
                            } else {
                              dataBMAM.noonam.push(curr.bloodglucosemgdl);
                              dataBMAM.noonamtime.push(Moment(curr.MeasurementDateTime).format("hh:mm A"))
                            }
                          }
                          if (
                            Number(Moment(curr.MeasurementDateTime).format("HH")) >= 15 &&
                            Number(Moment(curr.MeasurementDateTime).format("HH")) < 21
                          ) {
                            if (curr.meal === "Before Meal") {
                              dataBMAM.eveningbm.push(curr.bloodglucosemgdl);
                              dataBMAM.eveningbmtime.push(Moment(curr.MeasurementDateTime).format("hh:mm A"))
                            } else {
                              dataBMAM.eveningam.push(curr.bloodglucosemgdl);
                              dataBMAM.eveningamtime.push(Moment(curr.MeasurementDateTime).format("hh:mm A"));
                            }
                          }
                          if (Number(Moment(curr.MeasurementDateTime).format("HH")) >= 21) {
                            if (curr.meal === "Before Meal") {
                              dataBMAM.nightbm.push(curr.bloodglucosemgdl);
                              dataBMAM.nightbmtime.push(Moment(curr.MeasurementDateTime).format("hh:mm A"))
                            } else {
                              dataBMAM.nightam.push(curr.bloodglucosemgdl);
                              dataBMAM.nightamtime.push(Moment(curr.MeasurementDateTime).format("hh:mm A"))
                            }
                          }
                        });
                        let colorset = (tvalue !== "0") ? tvalue : tadminvalue
                        let colorsetmin = (tvalue !== "0") ? tvaluemin : tadminvaluemin
                        return (
                          <>
                            {/* <tr>
                        <td rowspan="2">{curr}</td>
                        <td style={{ backgroundColor: (dataBMAM.morningbm < Number(colorset) && Number(dataBMAM.morningbm !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.morningbm !== "" && Number(dataBMAM.morningbm > Number(colorsetmin) )? "#f6a683" : "rgba(255, 0, 0, 0.2)" }}><p>{dataBMAM.morningbm}<br />{dataBMAM.morningbmtime}</p></td>
                        <td style={{ backgroundColor: (dataBMAM.morningam < Number(colorset) && Number(dataBMAM.morningam !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.morningam !== "" && Number(dataBMAM.morningam > Number(colorsetmin) ) ? "#f6a683" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.morningam}<br />{dataBMAM.noonamtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.noonbm < Number(colorset) && Number(dataBMAM.noonbm !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.noonbm !== "" && Number(dataBMAM.noonbm > Number(colorsetmin)) ? "#f6a683" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.noonbm}<br />{dataBMAM.noonbmtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.noonam < Number(colorset)&& Number(dataBMAM.noonam !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.noonam !== "" && Number(dataBMAM.noonam > Number(colorsetmin)) ? "#f6a683" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.noonam}<br />{dataBMAM.noonamtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.eveningbm < Number(colorset) && Number(dataBMAM.eveningbm !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.eveningbm !== "" && Number(dataBMAM.eveningbm > Number(colorsetmin) ) ? "#f6a683" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.eveningbm}<br />{dataBMAM.eveningbmtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.eveningam < Number(colorset) && Number(dataBMAM.eveningam !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.eveningam !== "" && Number(dataBMAM.eveningam > Number(colorsetmin)) ? "#f6a683" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.eveningam}<br />{dataBMAM.eveningamtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.nightbm < Number(colorset) && Number(dataBMAM.nightbm !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.nightbm !== "" && Number(dataBMAM.nightbm > Number(colorsetmin ))? "#f6a683" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.nightbm}<br />{dataBMAM.nightbmtime}</td>
                        <td style={{ backgroundColor: (dataBMAM.nightam < Number(colorset) && Number(dataBMAM.nightam !== "") ? "rgba(0, 255, 0, 0.15)" : (dataBMAM.nightam !== "" && Number(dataBMAM.nightam > Number(colorsetmin) ) ? "#f6a683" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.nightam}<br />{dataBMAM.nightamtime}</td>
                      </tr> */}

                            <tr>
                              <td rowspan="2">{curr}</td>
                              <td style={{ backgroundColor: "white" }}>
                                <tr>
                                  {
                                    dataBMAM.morningbm.map((data, index) => (
                                      <td style={{ backgroundColor: (Number(dataBMAM.morningbm[index]) < Number(colorset) && Number(dataBMAM.morningbm[index]) > Number(colorsetmin) && Number(dataBMAM.morningbm[index]) !== "") ? "rgba(0, 255, 0, 0.15)" : "rgba(255, 0, 0, 0.2)" }}><p>{dataBMAM.morningbm[index]}<br />{dataBMAM.morningbmtime[index]}</p></td>

                                    ))


                                  }

                                </tr>
                              </td>
                              <td style={{ backgroundColor: "white" }}>
                                <tr >
                                  {
                                    dataBMAM.morningam.map((data, index) => (
                                      <td style={{ backgroundColor: (Number(dataBMAM.morningam[index]) < Number(colorset) && Number(dataBMAM.morningam[index]) > Number(colorsetmin) && Number(dataBMAM.morningam[index]) !== "") ? "rgba(0, 255, 0, 0.15)" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.morningam[index]}<br />{dataBMAM.morningamtime[index]}</td>
                                    ))

                                  }

                                </tr>
                              </td>
                              <td style={{ backgroundColor: "white" }}>
                                <tr>
                                  {
                                    dataBMAM.noonbm.map((data, index) => (
                                      <td style={{ backgroundColor: (Number(dataBMAM.noonbm[index]) < Number(colorset) && Number(dataBMAM.noonbm[index]) > Number(colorsetmin) && Number(dataBMAM.noonbm[index]) !== "") ? "rgba(0, 255, 0, 0.15)" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.noonbm[index]}<br />{dataBMAM.noonbmtime[index]}</td>
                                    ))
                                  }

                                </tr>
                              </td>
                              <td style={{ backgroundColor: "white" }}>
                                <tr>{
                                  dataBMAM.noonam.map((data, index) => (
                                    <td style={{ backgroundColor: (Number(dataBMAM.noonam[index]) < Number(colorset) && Number(dataBMAM.noonam[index]) > Number(colorsetmin) && Number(dataBMAM.noonam[index]) !== "") ? "rgba(0, 255, 0, 0.15)" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.noonam[index]}<br />{dataBMAM.noonamtime[index]}</td>
                                  ))
                                }

                                </tr>
                              </td>
                              <td style={{ backgroundColor: "white" }}>
                                <tr>
                                  {
                                    dataBMAM.eveningbm.map((data, index) => (
                                      <td style={{ backgroundColor: (Number(dataBMAM.eveningbm[index]) < Number(colorset) && Number(dataBMAM.eveningbm[index]) > Number(colorsetmin) && Number(dataBMAM.eveningbm[index]) !== "") ? "rgba(0, 255, 0, 0.15)" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.eveningbm[index]}<br />{dataBMAM.eveningbmtime[index]}</td>
                                    ))
                                  }

                                </tr>
                              </td>
                              <td style={{ backgroundColor: "white" }}>
                                <tr>
                                  {
                                    dataBMAM.eveningam.map((data, index) => (
                                      <td style={{ backgroundColor: (Number(dataBMAM.eveningam[index]) < Number(colorset) && Number(dataBMAM.eveningam[index]) > Number(colorsetmin) && Number(dataBMAM.eveningam[index]) !== "") ? "rgba(0, 255, 0, 0.15)" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.eveningam[index]}<br />{dataBMAM.eveningamtime[index]}</td>
                                    ))
                                  }

                                </tr>
                              </td>
                              <td style={{ backgroundColor: "white" }}>
                                <tr>{
                                  dataBMAM.nightbm.map((data, index) => (
                                    <td style={{ backgroundColor: (Number(dataBMAM.nightbm[index]) < Number(colorset) && Number(dataBMAM.nightbm[index]) > Number(colorsetmin) && Number(dataBMAM.nightbm[index]) !== "") ? "rgba(0, 255, 0, 0.15)" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.nightbm[index]}<br />{dataBMAM.nightbmtime[index]}</td>
                                  ))
                                }

                                </tr>
                              </td>
                              <td style={{ backgroundColor: "white" }}>
                                <tr>
                                  {
                                    dataBMAM.nightam.map((data, index) => (
                                      <td style={{ backgroundColor: (Number(dataBMAM.nightam[index]) < Number(colorset) && Number(dataBMAM.nightam[index]) > Number(colorsetmin) && Number(dataBMAM.nightam[index]) !== "") ? "rgba(0, 255, 0, 0.15)" : "rgba(255, 0, 0, 0.2)" }}>{dataBMAM.nightam[index]}<br />{dataBMAM.nightamtime[index]}</td>
                                    ))

                                  }

                                </tr>
                              </td >



                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </>
                        );
                      })}

                      {/* <tr>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td >sahil</td>
                  <td>sahil</td>
                    </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </>
        );
      }
      if (index === 1) {
        return (
          <>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">  Total Readings</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue">{finalbgdata.length}</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape-1">  Average Reading per day</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-orange">{finalbgdata.length > 0 || daydfrnc == "undefined"
                  ? Math.round(
                    Math.round((finalbgdata.length / daydfrnc) * 10) / 10
                  )
                  : "0"}</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">Average Glucose Level</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue"> {isNaN(avgbg) ? "0" : Number(Math.round(avgbg))} mg/dl</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">Lowest Glucose Level</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue">{bg.length > 0 ? Number(Math.min(...bg)) : "0"} mg/dl</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-8 mb-1">
                <div className="dashboard-shape">Highest Glucose Level</div>
              </div>
              <div className="col-xl-2 col-4 mb-1">
                <div className="dashboard-shape-right-blue"> {bg.length > 0 ? Math.max(...bg) : "0"} mg/dl</div>
              </div>
            </div>

          </>

        );
      }
      //coreContext.bloodpressureDataForPatient  = coreContext.bloodpressureDataForPatient.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
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

  //useEffect(fetchPatient, [coreContext.timeLogData.length]);

  //useEffect(fetchPatient, [coreContext.patient]);

  useEffect(coreContext.checkLocalAuth, []);

  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  const onBGChange = (e) => {
    setBgMin(e.from);
    setBgMax(e.to);
  };

  const onBMIChange = (e) => {
    setBmiMin(e.from);
    setBmiMax(e.to);
  };

  const onDiastolicChange = (e) => {
    setDiastolicMin(e.from);
    setDiastolicMax(e.to);
  };
  const onSystolicChange = (e) => {
    setSystolicMin(e.from);
    setSystolicMax(e.to);
  };
  const onWeightChange = (e) => {
    setWeightMin(e.from);
    setWeightMax(e.to);
  };

  const handleUpdate = () => {
    setPristine();
    setPerformedBy("");
    setTaskType("");
    setDate("");
    sett1("");
    setShowModal(false);
    coreContext.fetchTimeLog("PATIENT_" + patientId);

    setTlValue("00:00:00");
  };
  const columns = [
    {
      field: "taskType",
      headerName: "Task Type",
      width: 190,
      type: "string",
      //headerAlign: 'center'
    },
    {
      field: "performedBy",
      headerName: "Performed By",
      type: "number",
      editable: false,
      width: 190,
      //headerAlign: 'center'
    },
    // {
    //   field: "performedOn",
    //   headerName: "Performed On",
    //   width: 190,
    //   //headerAlign: 'center',
    //   editable: false,

    //   valueFormatter: (params) => {
    //     const valueFormatted = Moment(params.value).format(
    //       "MM-DD-YYYY hh:mm:ss A"
    //     );
    //     return `${valueFormatted}`;
    //   },

    //   //width: 500
    // },
    {
      field: "performedOn",
      headerName: "Performed On",

      width: 190,
      type: "dateTime",
      //headerAlign: 'center',
      editable: false,

      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm:ss A"
        );
        return `${valueFormatted}`;
      },
    },
    {
      field: "timeAmount",
      headerName: "Time Amount",
      editable: false,
      type: Number,
      width: 200,
      valueFormatter: (params) => {
        const valueFormatted = converter(params.value);
        return `${valueFormatted}`;
      },
      //headerAlign: 'center'
    },
    {
      field: "startDT",
      headerName: "Start Date",
      width: 190,
      //headerAlign: 'center',
      editable: false,
      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm:ss A"
        );
        return `${valueFormatted}`;
      },
    },
    {
      field: "endDT",
      headerName: "End Date",
      editable: false,
      //headerAlign: 'center',
      width: 190,
      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm:ss A"
        );
        return `${valueFormatted}`;
      },
    },
    {
      field: "",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        (!localStorage.getItem("userType").includes("test")) ?
          <div style={{ width: "100px" }}>
            <a
              style={{ marginRight: "5px" }}
              href="#"
              onClick={() => setCurrentTL(params.row)}>
              {" "}
              <PencilSquare />
            </a>
            <a
              style={{ marginRight: "5px" }}
              href="#"
              onClick={() => deleteTimeLog(params.row)}>
              {" "}
              <Trash />
            </a>
          </div> : <div>Access Denied</div>

      ),
    },
  ];

  const deleteTimeLog = (tl) => {

    // renderTimelogs();
    // fetchtotaltime();
    swal({
      title: "Are you sure?",

      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          coreContext.DeleteTimeLog(tl);
          coreContext.fetchTimeLog("PATIENT_" + patientId);
        } else {
          swal("Delete Cancelled");
        }
      });
  };


  const setCurrentTL = (tl) => {
    setShowModal(true);
    //alert(tl.taskType);
    setCurrentTimeLog(tl);
    setTaskType(tl.taskType);
    setPerformedBy(tl.performedBy);
    setDate(new Date(tl.performedOn));

    //setTaskType(tl.taskType)
    //alert(converter(3660))
    setTlValue(converter(tl.timeAmount));

    settimevalue(Math.max(0, getSecondsFromHHMMSS(tl.timeAmount)));
  };
  const converter = (sec) => {
    let h = Math.floor(sec / 3600);
    let m = Math.floor((sec % 3600) / 60);
    let s = Math.floor(sec % 60);
    return (
      ("0" + String(h)).slice(-2) +
      ":" +
      ("0" + String(m)).slice(-2) +
      ":" +
      ("0" + String(s)).slice(-2)
    );
  };

  //   const renderTimelogs = () =>{
  //     if (coreContext.timeLogData.length > 0) {
  //       
  //         return coreContext.timeLogData.map((tl, index) => {

  //             return <tr>
  //              
  //                 <td>{tl.taskType} </td>
  //                 <td>{tl.performedBy} </td>
  //                 <td>{tl.performedOn} </td>
  //                 <td>{tl.timeAmount} </td>
  //                 <td>{tl.startDT} </td>
  //                 <td>{tl.endDT} </td>
  //                <td>

  //                                         <a  style={{  marginRight: '5px' }} href="#" onClick={()=>setCurrentTL(tl)} >  <PencilSquare /></a>
  //                                         <a style={{  marginRight: '5px' }} href="#" onClick={() => deleteTimeLog(tl)}>  <Trash /></a>

  //                                </td>

  //             </tr>
  //         });
  //     }
  // }
  const renderthresold = () => {
    return (
      <Thresold></Thresold>
    )
  }
  const thresoldbars = React.useMemo(() => renderthresold(), [JSON.stringify(coreContext.thresoldData)])
  const renderTaskTimer = () => {
    if (coreContext.tasktimerUserData.length > 0) {
      return coreContext.tasktimerUserData.map((tl, index) => {
        return (
          <tr>
            <td>{tl.user_id} </td>
            <td>{tl.user_name} </td>
          </tr>
        );
      });
    }
  };

  const renderTimelogs = () => {
    if (coreContext.timeLogData.length === 0) {
      return (
        <div
          style={{
            height: 500,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          {/* <h6>No data Found</h6> */}
          <Loader type="Circles" color="#00BFFF" height={100} width={100} />
        </div>
      );
    }
    if (coreContext.timeLogData.length > 0) {
      //  timerLogs  = timerLogs.sort((a,b) => new Moment(b.startDT) - new Moment(a.startDT));
      return (
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            className={classes.root}
            rows={coreContext.timeLogData}
            columns={columns}
            pageSize={10}
            sortModel={[{ field: "performedOn", sort: "desc" }]}
            sortingOrder={["desc", "asc"]}
            components={{
              Toolbar: GridToolbarExport,
            }}
          />
        </div>
      );
    }
  };
  const rendertimelog = React.useMemo(() => renderTimelogs(), [JSON.stringify(coreContext.timeLogData), deleteTimeLog])
  //useEffect(renderTimelogs, [JSON.stringify(coreContext.timeLogData)]);
  useEffect(fetchtime, [JSON.stringify(coreContext.timeLogData)]);



  //  }

  const deleteDevice = (deviceData) => {
    swal({
      title: "Are you sure?",

      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          coreContext.DeleteDeviceData(deviceData, patientId, userName);
          setdeviceflag(adddeviceflag + 1)


        } else {
          swal("Delete Cancelled");
        }
      });

  };



  const renderDeviceData = () => {
    if (coreContext.deviceDataForPatient.length === 0) {
      return (
        <div
          style={{
            height: 100,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>

          <Loader type="Circles" color="#00BFFF" height={90} width={90} />
        </div>
      );
    }

    if (coreContext.deviceDataForPatient.length > 0 && coreContext.deviceDataForPatient[0].id !== undefined) {
      return coreContext.deviceDataForPatient.map((deviceData, index) => {
        return (
          <tr>
            <td>{deviceData.DeviceType} </td>
            <td>{deviceData.deviceID} </td>
            {(!localStorage.getItem("userType").includes("test")) ?
              <td>
                {" "}
                {deviceData.Action}{" "}
                <a
                  style={{ marginRight: "5px" }}
                  href="#"
                  onClick={() => {
                    deleteDevice(deviceData)


                  }}>
                  {" "}
                  <Trash />
                </a>
              </td> : <td>Access Denied</td>}
          </tr>
        );
      });
    }
    else {
      return ("No Device Found")
    }
  };
  useEffect(renderDeviceData, [coreContext.deviceDataForPatient.length]);

  const renderThreads = () => {
    if (coreContext.threads.length > 0) {
      return coreContext.threads.map((message) => {
        return (
          <div
            style={{ fontWeight: "bold", lineHeight: 1 }}
            className="card-body">
            <span
              className={
                message.direction === "inbound" ? "float-left" : "float-right"
              }>
              {message.body}
            </span>
            <br />
            <span
              className={
                message.direction === "inbound" ? "float-left" : "float-right"
              }
              style={{ fontSize: 8 }}>
              Time : {message.date}
            </span>
          </div>
        );
      });
    }
  };

  const onSendMessage = () => {
    axios
      .post("send-sms", { mobilePhone: threadMobile, message })
      .then((response) => {
        const status = response.data.status;
        if (status.trim() === "success") {
          //coreContext.fetchMessages();
          //coreContext.fetchThreadMessages('from', threadMobile);
        }
      })
      .catch(() => alert("Message Sending failed"));
  };

  const UpdatePatient = () => {
    if (coreContext.patient.ProviderName === undefined) {
      coreContext.patient.ProviderName = "Select Provider";
      setProvider("");
    } else {
      let result = coreContext.providerOptions.filter((name) =>
        name.name.includes(coreContext.patient.ProviderName)
      );
      if (result.length > 0) setProvider(result[0].value);
      else setProvider("");
    }

    if (coreContext.patient.CareName === undefined) {
      coreContext.patient.CareName = "Select Coordinator";
      setCoordinator("");
    } else {
      let result = coreContext.careCoordinatorOptions.filter((name) =>
        name.name.includes(coreContext.patient.CareName)
      );
      if (result.length > 0) setCoordinator(result[0].value);
      else setCoordinator("");
    }

    if (coreContext.patient.CoachName === undefined) {
      coreContext.patient.CoachName = "Select Coach";
      setCoach("");
    } else {
      let result = coreContext.coachOptions.filter((name) =>
        name.name.includes(coreContext.patient.CoachName)
      );
      if (result.length > 0) setCoach(result[0].value);
      else setCoach("");
    }

    coreContext.UpdatePatient(
      coreContext.patient.firstName,
      coreContext.patient.lastName,
      coreContext.patient.mobile,
      coreContext.patient.dob,
      coreContext.patient.height,
      provider,
      coordinator,
      coach,
      coreContext.patient.userId,
      coreContext.patient.gender,
      coreContext.patient.language,
      coreContext.patient.workPhone,
      coreContext.patient.mobilePhone,
      coreContext.patient.street,
      coreContext.patient.zip,
      coreContext.patient.city,
      coreContext.patient.state,
      notes
    );
  };

  const renderTopDetails = () => {
    if (coreContext.patientsForPatient.length === 0) {
      return (
        <div
          style={{
            height: 50,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <Loader type="Circles" color="#00BFFF" height={50} width={50} />
        </div>
      );
    }
    if (coreContext.patientsForPatient.length > 0)
      return (
        <>

          <div className="col-xl-2 mb-1">
            <p className="mb-0"><strong>Name</strong></p>
            {coreContext.patientsForPatient[0].name}
          </div>
          <div className="col-xl-2 mb-1">
            <p className="mb-0"><strong>Email</strong></p>
            {coreContext.patientsForPatient[0].email}
          </div>
          <div className="col-xl-2 mb-1">
            <p className="mb-0"><strong>Phone</strong></p>
            {coreContext.patientsForPatient[0].mobile}
          </div>
          <div className="col-xl-2 mb-1">
            <p className="mb-0"><strong>Program</strong></p>
            {coreContext.patientsForPatient[0].program}
          </div>
          <div className="col-xl-2 mb-1">
            <p className="mb-0"><strong>DOB</strong></p>
            {coreContext.patientsForPatient[0].dob}
          </div>
          <div className="col-xl-2 mb-1">
            <p className="mb-0"><strong>Gender</strong></p>
            {coreContext.patientsForPatient[0].gender === "Male" ? (
              <GenderMale />
            ) : (
              <GenderFemale />
            )}
            {coreContext.patientsForPatient[0].gender}
          </div>
          <div className="col-xl-2 mb-1">
            <p className="mb-0"><strong>Diagnosis</strong></p>
            {coreContext.patientsForPatient[0].diagnosisId}
          </div>
        </>
      );
  };
  const rendertop = React.useMemo(
    () => renderTopDetails(),
    [coreContext.patientsForPatient.length === 1]
  );

  const renderAddModifyFlags = () => {
    if (coreContext.patientsForPatient.length > 0)
      return (
        <div className="row">
          <div className="col-xl-12 mb-2 mt-2">
            <p className="mb-0">Flags : {(coreContext.patientsForPatient[0].reading == "true") ? <img src="https://i.im.ge/2022/07/25/FLR13r.png" width="25em" /> : ""} </p>

          </div>
        </div>
      );
  };

  const renderAddNotes = () => {
    if (coreContext.patient)
      return (

        <>
          <hr className="mt-0" />
          <div className="row">
            <div className="col-xl-12 mb-1">
              <p className="mb-0">Internal Notes:</p>
              <textarea className="form-control" rows="3" placeholder="Enter notes" value={notes != "undefined" ? notes : ""} onChange={(e) => setNotes(e.target.value)}></textarea>
            </div>
            <div className="col-xl-12 mb-1 text-center">	{
              (!localStorage.getItem("userType").includes("test")) ?
                <button type="button" className="btn btn-danger mt-2" onClick={() => {
                  coreContext.UpdateNotes(coreContext.patientsForPatient[0], notes, "", "");
                }}>Save Note</button>
                : ""
            }

            </div>
          </div>
        </>
      );
  };

  const renderExpandCollapse = () => {
    if (coreContext.patient)
      return (
        <>
          <div className="row">
            <div className="col-xl-12 mb-1">
              <a href="#" onClick={() => setShowNotesTextBox(false)} className="fs-5 me-5">Expand All</a>
              <a href="#" onClick={() => setShowNotesTextBox(false)} className="fs-5">Collapse All</a>
            </div>
          </div>
        </>
      );
  };

  const fetchtotaltime = () => {
    let d = 0;
    coreContext.timeLogData.map((curr) => {
      d = d + Number(curr.timeAmount);
    });
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
 


    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2)
  };
  useEffect(() => {
    fetchtotaltime();
  }, [tlvalueseconds]);
  useEffect(() => {
    fetchtotaltime();
  }, []);

  const renderPatientinformation = () => {
    if (coreContext.patientsForPatient.length > 0) {
      coreContext.patient = coreContext.patientsForPatient[0];
    }
    if (coreContext.patient) {
      localStorage.setItem("ehrId", coreContext.patient.ehrId);
      return (

        <div className="row">
          <div className="col-xl-6">
            <div className="card mb-0 border border-primary">
              <div className="card-body">
                <h4>Patient Information</h4>
                <p className="mb-1"><strong>Height (Inches):</strong> {coreContext.patient.height}</p>
                <p className="mb-1"><strong>Weight (Pounds): </strong>  {coreContext.patient.Weight}</p>
                <p className="mb-1"><strong>BMI:</strong> {coreContext.patient.BMI}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card mb-0 border border-primary">
              <div className="card-body">
                <h4>Care Team</h4>
                <p className="mb-1"><strong>Provider:</strong>  {coreContext.patient.ProviderName}</p>
                <p className="mb-1"><strong>Care Coordinator:</strong>   {coreContext.patient.CareName}</p>
                <p className="mb-1"><strong>Coach:</strong>  {coreContext.patient.CoachName}</p>


              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const [timelogIdCounter, settimelogIdCounter] = useState(1);
  const calctime = () => { };

  const handleSelect = (index) => {
    let _timerLog = {};
    if (index == 7) {

      fetchtotaltime();
      coreContext.fetchTimeLog("PATIENT_" + patientId);
    }
    if (index != 7) {
      fetchtotaltime();

      {
      }
    }

    if (index === 8) {

    }
  };

  const onChange = (event) => {
    setTlValue(event.target.value);
  };

  const onBlur = (event) => {
    const value = event.target.value;
    const seconds = Math.max(0, getSecondsFromHHMMSS(value));

    setTlvalueseconds(seconds);
    const time = toHHMMSS(seconds);
    setTlValue(time);

  };

  const getSecondsFromHHMMSS = (value) => {
    const [str1, str2, str3] = value.split(":");

    const val1 = Number(str1);
    const val2 = Number(str2);
    const val3 = Number(str3);

    if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
      return val1;
    }

    if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
      return val1 * 60 + val2;
    }

    if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
      return val1 * 60 * 60 + val2 * 60 + val3;
    }

    return 0;
  };

  const toHHMMSS = (secs) => {
    const secNum = parseInt(secs.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;

    return [hours, minutes, seconds]
      .map((val) => (val < 10 ? `0${val}` : val))
      .filter((val, index) => val !== "00" || index > 0)
      .join(":")
      .replace(/^0/, "");
  };

  const handleLeaveTab = (index) => {
    if (index == 7) {
    }
  };

  function doSomething(value) {

  }

  const renderTabs = () => {
    if (coreContext.patient)
      return (
        <div className="card mb-5">
          <div className="card-header border-0 pb-0">
            <Tabs
              onSelect={(index) => handleSelect(index)}
              onMouseLeave={(index) => handleLeaveTab(index)}>
              <TabList>

                <Tab >Programs</Tab>

                <Tab >Clinical Data</Tab>
                <Tab >Billing</Tab>

                <Tab >Task Timer</Tab>

                <Tab>Time Logs</Tab>
                <Tab >Devices</Tab>
                <Tab >Portal</Tab>
                <Tab >Claims</Tab>
              </TabList>


              <TabPanel>
                <div className="card">
                  <h4 className="card-header">Programs</h4>
                  <div className="card-body">
                    <ButtonGroup aria-label="Basic example">
                      <Button variant="primary">CCM</Button>
                      <Button variant="secondary">RPM</Button>
                    </ButtonGroup>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="table-responsive-sm mb-0">
                          <table className="table table-bordered table-striped mb-0">
                            <th>Enroll Date</th>
                            <th>Enroll Status</th>
                            <th>Care Plan</th>
                            <th>Manage CCM</th>
                            <th>Mins This Month</th>
                            <th>Provider Mins</th>
                            <th>CCM Care Manager</th>
                            <th>CCM Physician</th>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="card">
                  <h4 className="card-header">Clinical Data</h4>
                  <div className="card-body">
                    <Tabs>
                      <TabList>

                      </TabList>

                      <TabPanel>
                        <Tabs>
                          <TabList>
                            <Tab >Blood Pressure</Tab>

                            <Tab onClick={() => { fetchTd(); fetchadmintd() }}>Blood Glucose</Tab>

                            <Tab>Weight</Tab>

                            <Tab>Threshold</Tab>
                            <Tab>New Device BP</Tab>
                            <Tab>New Weight</Tab>
                          </TabList>
                          <TabPanel>

                            <Tabs>
                              <TabList>
                                <Tab >Dashboard</Tab>
                                <Tab >LogBook</Tab>
                                <Tab >Charts</Tab>
                              </TabList>
                              <TabPanel>
                                {renderDates()}
                                {renderslider()}
                                {getbpdata(1)}
                              </TabPanel>
                              <TabPanel>
                                {renderDates()}
                                {renderslider()}
                                {getbpdata(3)}
                              </TabPanel>
                              <TabPanel>
                                {renderDates()}
                                {renderslider()}
                                {getbpdata(2)}
                              </TabPanel>
                            </Tabs>
                          </TabPanel>
                          <TabPanel>
                            <Tabs>
                              <TabList>
                                <Tab >Dashboard</Tab>
                                <Tab >LogBook</Tab>
                                <Tab >Charts</Tab>
                              </TabList>
                              <TabPanel>
                                {renderDates()}
                                {renderslider()}
                                {renderBloodGlucose(1)}
                              </TabPanel>
                              <TabPanel>
                                {renderDates()}
                                {renderslider()}
                                {renderBloodGlucose(3)}
                              </TabPanel>
                              <TabPanel>
                                {renderDates()}
                                {renderslider()}
                                {renderBloodGlucose(2)}
                              </TabPanel>
                            </Tabs>
                          </TabPanel>

                          <TabPanel>
                            <div className="card-body">
                              <Weight></Weight>
                            </div>
                          </TabPanel>

                          <TabPanel>
                            <div className="card-body">
                              {thresoldbars}
                            </div>

                          </TabPanel>
                          <TabPanel>

                            <Tabs>
                              <TabList>
                                <Tab >Dashboard</Tab>
                                <Tab >LogBook</Tab>
                                <Tab >Charts</Tab>
                              </TabList>
                              <TabPanel>
                                {renderDates()}
                                {renderslider()}
                                {getbpdatanew(1)}
                              </TabPanel>
                              <TabPanel>
                                {renderDates()}
                                {renderslider()}
                                {getbpdatanew(3)}
                              </TabPanel>
                              <TabPanel>
                                {renderDates()}
                                {renderslider()}
                                {getbpdatanew(2)}
                              </TabPanel>
                            </Tabs>
                          </TabPanel>
                          <TabPanel>
                            <div className="card-body">
                              <WeightNew></WeightNew>
                            </div>
                          </TabPanel>
                        </Tabs>
                      </TabPanel>
                    </Tabs>
                    <br /> <br />

                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card">
                  <h4 className="card-header">Billing</h4>
                  <div className="card-body ps-0 pe-0">
                    <div className="row mb-4">

                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="table-responsive-sm mb-0">
                          <table className="table table-bordered table-striped mb-0">
                            <thead className="bg-defualts">
                              <tr>
                                <th>EHR ID</th>
                                <th>Date of Service</th>
                                <th>Type</th>
                                <th>Note</th>
                                <th>Provider</th>
                                <th>Care Manager</th>
                                <th>POS</th>
                                <th>TC Claim</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>


              <TabPanel>
                {/* <div className="card">
              <h4 className="card-header">Task Timer</h4>
              <div className="card-body">
                <div
                  className="mb-2 float-right"
                  style={{ backgroundColor: "transparent" }}>
                  <button
                    className="col-md-8"
                    className="btn btn-sm btn-success"
                    type="button"
                    onClick={() => {
                      reset();
                      coreContext.AddTimeLog(
                        taskType,
                        performedBy,
                        date,
                        tlvalue !== "00:00:00"
                          ? tlvalueseconds
                          : minutes * 60 + seconds,
                        startDT,
                        patientId,
                        userName
                      );
                      coreContext.fetchTimeLog("PATIENT_" + patientId);
                      coreContext.fetchTimeLog("PATIENT_" + patientId);
                      coreContext.fetchTimeLog("PATIENT_" + patientId);
                      setPristine();
                      
                      setPerformedBy("");
                      setTaskType("");
                      setDate(new Date());
                      sett1("");
                      settimevalue("");
                      setTlValue("00:00:00");
                    }}>
                    {" "}
                    Add Time Log
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      Task Type
                      
                      <select
                        value={t1 === "Other" ? t1 : taskType}
                        onChange={(e) => {
                          setTaskType(e.target.value);
                          setDirty();
                          sett1(e.target.value);
                        }}
                        className="form-control mb-2 mr-sm-2">
                        <option value="SelectTask">Select a Task Type</option>
                        <option value="CareCoordination">
                          Care Coordination
                        </option>
                        <option value="CarePlanReconciliation">
                          Care Plan Reconciliation
                        </option>
                        <option value="DataReview">Data Review  & Management</option>
                        <option value="Other">Others...</option>
                      </select>
                      
                      {t1 === "Other" ? (
                        <input
                          type="text"
                          className="form-control mb-2 mr-sm-2"
                          placeholder="Enter other value.."
                          value={taskType}
                          onChange={(e) => setTaskType(e.target.value)}
                        />
                      ) : null}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        Performed By
                        
                        <select
                          value={performedBy}
                          onChange={(e) => {
                            setPerformedBy(e.target.value);
                            setDirty();
                          }}
                          className="form-control mb-2 mr-sm-2">
                          <option value="SelectUser">Select a User</option>
                          {tt.map((curr) => {
                            return (
                              <option
                                value={!curr.name ? curr.provider : curr.name}>
                                {" "}
                                {!curr.name ? curr.provider : curr.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-md-12">
                        Performed On
                        <br />
                        <DatePicker
                          className="form-control mt-2"
                          selected={date}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          
                          onChange={(date) => {
                            setDate(date);
                            setDirty();
                            setstartDT(date);
                          }}
                          placeholderText="Enter a date"
                          dateFormat="MM/dd/yyyy hh:mm:ss aa"
                        />
                      </div>
                      <div className="col-md-6">
                        <label for="appt">Enter Total Time:</label>
                        <input
                          className="form-control mb-2 mr-sm-2"
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={tlvalue}
                        />
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
                <div className="tab-pane" id="Task-Timer" role="tabpanel">
                  <div className="card">
                    <h4 className="card-header">Task Timer</h4>
                    <div className="card-body ps-0 pe-0">
                      <div className="row mb-4">
                        <div className="col-xl-3">
                          {(!localStorage.getItem("userType").includes("test")) ?
                            <button className="btn btn-lg btn-success" type="button" onClick={() => {
                              reset();
                              coreContext.AddTimeLog(
                                taskType,
                                performedBy,
                                date,
                                tlvalue !== "00:00:00"
                                  ? tlvalueseconds
                                  : minutes * 60 + seconds,
                                startDT,
                                patientId,
                                userName
                              );

                              setPristine();

                              setPerformedBy("");
                              setTaskType("");
                              setDate(new Date());
                              sett1("");
                              settimevalue("");
                              setTlValue("00:00:00");

                            }}> Add Time Log</button> : ""}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xl-3">
                          <label>Task Type</label>
                          <select className="form-select" value={t1 === "Other" ? t1 : taskType}
                            onChange={(e) => {
                              setTaskType(e.target.value);
                              setDirty();
                              sett1(e.target.value);
                            }}>
                            <option value="SelectTask">Select a Task Type</option>
                            <option value="CareCoordination">
                              Care Coordination
                            </option>
                            <option value="CarePlanReconciliation">
                              Care Plan Reconciliation
                            </option>
                            <option value="DataReview">Data Review  & Management</option>
                            <option value="Other">Others...</option>
                          </select>

                          {t1 === "Other" ? (
                            <input
                              type="text"
                              className="form-control mb-2 mr-sm-2"
                              placeholder="Enter other value.."
                              value={taskType}
                              onChange={(e) => setTaskType(e.target.value)}
                            />
                          ) : null}

                        </div>
                        <div className="col-xl-3">
                          <label>Performed By</label>
                          <select
                            value={performedBy}
                            onChange={(e) => {
                              setPerformedBy(e.target.value);
                              setDirty();
                            }}
                            className="form-select">
                            <option value="SelectUser">Select a User</option>
                            {tt.map((curr) => {
                              return (
                                <option
                                  value={!curr.name ? curr.provider : curr.name}>
                                  {" "}
                                  {!curr.name ? curr.provider : curr.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-xl-3">
                          <div className="row">
                            <label>Performed On
                            </label>
                          </div>
                          <div className="row">
                            <DatePicker
                              className="form-control"
                              selected={date}
                              showTimeSelect
                              timeFormat="HH:mm"
                              timeIntervals={15}

                              onChange={(date) => {
                                setDate(date);
                                setDirty();
                                setstartDT(date);
                              }}
                              placeholderText="Enter a date"
                              dateFormat="MM/dd/yyyy hh:mm:ss aa"
                            />
                          </div>
                        </div>
                        <div className="col-xl-3">
                          <label>Enter Total Time:</label>
                          <input type="text" className="form-control" onChange={onChange}
                            onBlur={onBlur}
                            value={tlvalue} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </TabPanel>

              <TabPanel>
                <div className="card">
                  <h4 className="card-header">Time Logs</h4>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        Total Time Logs (Hour: Min: Sec): {fetchtotaltime()}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">{rendertimelog}</div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="card">
                  <h4 className="card-header">Devices</h4>
                  <div className="card-body">



                    <div className="row">
                      <div className="col-md-8">
                        <h6>
                          <span className="badge badge-primary">
                            Provider Registered Devices
                          </span>
                        </h6>
                        <table className="table table-bordered table-striped table-hover table-sm">
                          <thead>
                            <tr>
                              <th>Device Name</th>
                              <th>Device ID</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>{renderDeviceData()}</tbody>
                        </table>
                      </div>
                      <div className="col-md-4">
                        <form>
                          <h6>
                            <span className="badge badge-primary">
                              {" "}
                              Add a Device
                            </span>
                          </h6>
                          <select
                            value={deviceType}
                            onChange={(e) => setDeviceType(e.target.value)}
                            className="form-control mb-2 mr-sm-2">
                            <option value="">Select Device</option>
                            <option value="BP">Blood Pressure</option>
                            <option value="BG">Blood Glucose</option>
                            <option value="WS">Weight</option>
                          </select>
                          <input
                            type="text"
                            value={deviceId}
                            onChange={(e) => setDeviceId(e.target.value)}
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Enter device ID "
                          />
                          {(!localStorage.getItem("userType").includes("test")) ?
                            <button
                              type="button"
                              onClick={() => {
                                setdeviceflag(adddeviceflag + 1)
                                coreContext.addDevice(deviceType, deviceId, patientId, userName)
                                setDeviceId("");
                                setDeviceType("");

                              }
                              }
                              className="btn btn-primary mb-2">
                              Add Device
                            </button> : ""}
                        </form>
                      </div>
                    </div>
                    {/* <div className="card" style={{ backgroundColor: "#b8b133" }}>
                  <div
                    className="card-body"
                    onClick={() => setShowNotesTextBox(true)}>
                    {" "}
                    This patient has not any supplied devices to their portal.
                    You will NOT be able to bill for 99453 or 99454.{" "}
                  </div>
                </div> */}

                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card">
                  <h4 className="card-header">Portal</h4>
                  <div className="card-body">
                    Portal Status:{" "}
                    <Button variant="success">Enable Portal Status</Button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card">
                  <h4 className="card-header">Billing</h4>
                  <div className="card-body p-2 pe-0">
                    <div className="row mb-4">
                      {renderBilling()}
                    </div>

                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div></div>
      );
  };
  useEffect(renderTabs, []);
  useEffect(() => {
    return () => {
      coreContext.cleanup()
    }
  }, []);
  return (
    <div className="col">
      <div className="page-title-container mb-3">
        <div className="row">
          <div className="col mb-2">
            <h1 className="mb-2 pb-0 display-4" id="title">Patient Summary
            </h1>

          </div>
        </div>
      </div>
      {/* <div
        className="btn btn-primary mb-2 float-right"
        style={{ backgroundColor: "transparent" }}
        id="stopwatch">
        <span className="min-time" style={{ marginLeft: 550 }}>
          <span className="time-txt">min</span>
          <span className="time-num">{minutes}</span>
        </span>
        <span className="dots">:</span>
        <span className="sec-time">
          <span className="time-txt">sec</span>
          <span className="time-num">{seconds}</span>
        </span>
        <button
          id="startTimer"
          className="btn btn-sm btn-success"
          onClick={start}>
          Start
        </button>
        <button
          id="pauseTimer"
          className="btn btn-sm btn-warning"
          onClick={pause}>
          Pause
        </button>
        <button
          id="resetTimer"
          className="btn btn-sm btn-danger"
          onClick={reset}>
          Reset
        </button> */}
      {/* <button type='button'eventKey={'TimeLog'}  onClick={() => {coreContext.UpdateTimeLog( coreContext.timeLogData, patientId, userName );handleSelect(8);setPristine();setPerformedBy("");setTaskType("");setDate("");sett1("");}} className="btn btn-sm btn-success"> Update Time Log</button>  */}

      {/* <button type='button' onClick={() => {pause();coreContext.AddTimeLog( taskType, performedBy, date,(tlvalue!=="00:00:00")?tlvalueseconds:minutes*60+seconds,startDT, patientId, userName );coreContext.fetchTimeLog("PATIENT_" + patientId);coreContext.fetchTimeLog("PATIENT_" + patientId);coreContext.fetchTimeLog("PATIENT_" + patientId);setPristine();setPerformedBy("");setTaskType("");setDate("");sett1("");settimevalue("");setTlValue("00:00:00");}} className="btn btn-sm btn-success"> Add Time Log</button> */}
      {/* </div> */}
      <div className="row">
        <div className="col-xl-12">
          <div className="card mb-3 border border-primary">
            <div className="card-body">
              <div className="row">

                <div className="col-xl-10 col-xs-10 text-end pt-1">
                  <button className="btn btn-md btn-success" onClick={start}>Start</button>&nbsp;&nbsp;
                  <button className="btn btn-md btn-warning" onClick={pause}>Pause</button>&nbsp;&nbsp;
                  <button className="btn btn-md btn-danger" onClick={reset}>Reset</button>
                </div>
                <div className="col-xl-2 col-xs-2">
                  <span className="fs-2 pt-2">{minutes}</span>
                  <span className="fs-2 pt-2">:</span>
                  <span className="fs-2 pt-2">{seconds}</span>


                </div>

              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body pt-0">
              <div className="row bg-muted p-2">
                {rendertop}
              </div>
              {renderAddModifyFlags()}
              {renderAddNotes()}

            </div>
          </div>


          <div className="card-body">
            {renderExpandCollapse()}
            {renderPatientinformation()}
          </div>


          {Prompt}


          <React.Fragment>
            <Modal show={showModal} onHide={handleModalClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Edit Task Type </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="card">
                  <h4 className="card-header">Task Timer</h4>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">

                        <label>Task Type</label>
                        {/* //  {setTaskType("CarePlanReconciliation")} */}
                        <select
                          value={t1 === "Other" ? t1 : taskType}
                          onChange={(e) => {
                            setTaskType(e.target.value);
                            setDirty();
                            sett1(e.target.value);
                          }}
                          className="form-control mb-2 mr-sm-2">
                          <option value="SelectTask">Select a Task Type</option>
                          <option value="CareCoordination">
                            Care Coordination
                          </option>
                          <option value="CarePlanReconciliation">
                            Care Plan Reconciliation
                          </option>
                          <option value="DataReview">Data Review</option>
                          <option value="Other">Others...</option>
                        </select>
                        {t1 === "Other" ? (
                          <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Enter other value.."
                            value={taskType}
                            onChange={(e) => setTaskType(e.target.value)}
                          />
                        ) : null}

                      </div>
                      <div className="col-md-4">
                        Performed By
                        {/* {renderTaskTimer()} */}
                        <select
                          value={performedBy}
                          onChange={(e) => {
                            setPerformedBy(e.target.value);
                            setDirty();
                          }}
                          className="form-control mb-2 mr-sm-2">
                          <option value="SelectUser">Select a User</option>
                          {tt.map((curr) => {
                            return (
                              <option
                                value={
                                  !curr.name ? curr.provider : curr.name
                                }>
                                {" "}
                                {!curr.name ? curr.provider : curr.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-md-4">
                        Performed On<br />
                        <div className="col-md-12">
                          <DatePicker
                            className="form-control"
                            selected={date}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            label="Performed On"
                            // onChange={(date) => setDate(date)}
                            onChange={(date) => {
                              setDate(date);
                              setDirty();
                              setstartDT(date);
                            }}
                            placeholderText="Enter a date"
                            dateFormat="MM/dd/yyyy hh:mm:ss aa"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label for="appt">Enter Total Time:</label>
                        <input
                          className="form-control mb-2 mr-sm-2"
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={tlvalue}
                        />
                        {/* <input className="form-control mb-2 mr-sm-2" type="time" value={timevalue} onChange={(e)=>{settimevalue(e.target.value);}} step="1"/> */}
                      </div>


                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      coreContext.UpdateTimeLog(
                        currTimeLog,
                        taskType,
                        performedBy,
                        date,
                        tlvalueseconds,
                        patientId,
                        userName
                      );
                      handleUpdate();
                    }}
                    className="btn btn-lg btn-success">
                    {" "}
                    Update Time Log
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          </React.Fragment>


          {renderTabs()}

        </div>
      </div>
    </div>
  );
};

export { PatientSummary };
