import axios from "axios";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Autocomplete } from '@material-ui/lab';

import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Modal,
  Form,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import Moment from "moment";
import { MultiSelect } from "react-multi-select-component";
import './TopMenu.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import {
  Envelope,
  ChatLeftText,
  BoxArrowLeft,
  FileMedicalFill,
  FileMedical,
  PencilSquare,
  Bell,
  Gear,
  People,
  PersonLinesFill,
  Speedometer,
  Speedometer2,
  PersonPlusFill,
  BoxArrowRight,
  Telephone,
  PersonFill,
  SuitHeartFill,
  ThermometerHigh,
  Weight,
} from "react-bootstrap-icons";
import {
  GiCook,
  GiAbstract071,
  GiAcid,
  GiWeight,
  GiAerialSignal,
  GiOrangeSlice,
  GiCagedBall,
} from "react-icons/gi";
//import Profile from 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094041-stock-illustration-medical-doctor-profile.jpg';
import { CoreContext } from "../../context/core-context";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ImMenu } from "react-icons/im";
import Input from "./Input";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const TopMenu = ({ changestyle, showSidebar }) => {
  const coreContext = useContext(CoreContext);

  const [show, setShow] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMessageModalClose = () => setShowMessageModal(false);
  const handleMessageModalShow = () => setShowMessageModal(true);

  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [pwdtype, setpwdtype] = useState("password");
  const [pwdtype1, setpwdtype1] = useState("password");
  const [showSearch, setShowSearch] = useState(false);
  const [pwd, setpwd] = useState("");
  const [cnfpwd, setcnfpwd] = useState("");
  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [cptcodeforrpm, setcptcodeforrpm] = useState([]);
  const [cptcodeforccm, setcptcodeforccm] = useState([]);
  const [ehrId, setEhrId] = useState("");
  const [dcount, setdcount] = useState([""]);
  const [diagnosisId, setDiagnosisId] = useState("");
  const [isccm, setIsccm] = useState(false);
  const [ispcm, setIspcm] = useState(false);
  const [isrpm, setIsrpm] = useState(false);
  const [isregular, setIsregular] = useState(true);
  const [istest, setIstest] = useState(false);
  const [pcm, setPcm] = useState("");
  const [pp, setPp] = useState("");
  const [ppname, setPpname] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [patientid, setPatientid] = useState("");
  const [ispatient, setIsPatient] = useState("");
  const [workPhone, setWorkPhone] = useState("");
  const [preferred, setPreferred] = useState("");
  const [phoneNotes, setPhoneNotes] = useState("");
  const [email, setEmail] = useState("");
  const [hasMobile, setHasMobile] = useState(false);
  const [sendSms, setSendSms] = useState(false);
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pos, setPos] = useState("");
  const [raf, setRaf] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([coreContext.patients]);
  const [patientName, setPatientName] = useState("");
  const [notificationValue, setNotificationValue] = useState([]);
  const [open, setOpen] = React.useState(false);
  const today = new Date();
  today.setDate(today.getDate() - 7);
  const diagonislist = [, "Select Diagnosis Id", "D45- Polycythemia vera",
    "G47.33- Obstructive sleep apnea (adult) (pediatric)",
    "I10- Essential (primary) hypertension", "K219",
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
    "K580- unspecified", "I639", "E10.9", "L67", "L67.1", "L82.1", "N182", "J449", "E1140", "E1151", "E1132999", "I739", "I2510", "E663", "G4709", "N925", "H109"
  ]

  const to = Moment(new Date()).format('YYYY-MM-DD')
  const from = Moment(today).format('YYYY-MM-DD')
  console.log(to, from, "tofrom")

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSearchOpen = () => {
    setShowSearch(true);
  };
  const handleSearchClose = () => {
    setShowSearch(false);
  };
  const handleClose1 = () => {
    setOpen(false);
  };
  const handledcount = (index, val) => {
    const value = [...dcount]
    value[index] = val
    setdcount(value);

  };

  const fetchtd = () => {
    let userType = localStorage.getItem("userType");
    let patientId = localStorage.getItem("userId");
    coreContext.fetchThresold(
      "ADMIN_PATIENT",
      "patient"
    );
    coreContext.fetchBloodPressureForNotification(patientId, userType, from, to);
    coreContext.fetchBloodGlucoseForNotification(patientId, userType, from, to);
    coreContext.fetchWSData(patientId, userType);
    coreContext.fetchPatientListfromApi(userType, patientId);
  }
  const fetchadmintd = () => {
    coreContext.fetchadminThresold("ADMIN_ADMIN_", "admin")
  }
  const fetchdbnotification = () => {
    coreContext.FetchNotification(localStorage.getItem("userId"))
  }
  useEffect(() => {
    if (window.location.href.indexOf("patient-summary") <= 0) {
      fetchadmintd(); fetchtd(); fetchdbnotification();
    }

  }, []);

  const pushNotificationdata=(obj)=>{
    if(notificationValue.find((item, index)=> JSON.stringify(item) === JSON.stringify(obj))== undefined){
      notificationValue.push(obj)
    }
  }

  const markasread = () => {
    notificationValue.sort(function (a, b) {

      return new Date(b.date) - new Date(a.date);
    }).map((curr) => {
      coreContext.AddNotification(curr.value, "admin", localStorage.getItem("userId"))
    })
    setNotificationValue([]);

  }

  const FetchNotificationForBP = () => {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    date.setHours(0, 0, 0, 0)

    coreContext.patients.map((patient) => {
      coreContext.bloodpressureDataForNotification.filter((data) => data.MeasurementDateTime > date).map((bp) => {
        if (patient.userId === bp.UserId) {
          coreContext.thresoldData.map((td) => {
            if (td.UserId.includes(patient.userId)) {
              if (Number(bp.diastolic) > Number(td.diastolic_high) || Number(bp.diastolic) < Number(td.diastolic_low)) {
                if (notificationValue.includes(patient.name + "~" + patient.userId + "~" + bp.diastolic + "~" + Moment(bp.MeasurementDateTime).format(
                  "MM-DD-YYYY hh:mm A"
                ) + "~Diastolic") === false) {
                  if (coreContext.notifications.includes(patient.name + "~" + patient.userId + "~" + bp.diastolic + "~" + Moment(bp.MeasurementDateTime).format(
                    "MM-DD-YYYY hh:mm A"
                  ) + "~Diastolic") === false) {
                    if (Object.values(notificationValue).indexOf(patient.name + "~" + patient.userId + "~" + bp.diastolic + "~" + Moment(bp.MeasurementDateTime).format(
                      "MM-DD-YYYY hh:mm A"
                    ) + "~Diastolic") > -1) {

                    } else {
                      pushNotificationdata({
                        "value": patient.name + "~" + patient.userId + "~" + bp.diastolic + "~" + Moment(bp.MeasurementDateTime).format(
                          "MM-DD-YYYY hh:mm A"
                        ) + "~Diastolic", "date": bp.MeasurementDateTime
                      })

                    }

                  }

                }

              }
              if (Number(bp.systolic) > Number(td.systolic_high) || Number(bp.systolic) < Number(td.systolic_low)) {
                if (notificationValue.includes(patient.name + "~" + patient.userId + "~" + bp.systolic + "~" + Moment(bp.MeasurementDateTime).format(
                  "MM-DD-YYYY hh:mm A"
                ) + "~Systolic") === false) {
                  if (coreContext.notifications.includes(patient.name + "~" + patient.userId + "~" + bp.systolic + "~" + Moment(bp.MeasurementDateTime).format(
                    "MM-DD-YYYY hh:mm A"
                  ) + "~Systolic") === false) {
                    if (Object.values(notificationValue
                    ).indexOf(patient.name + "~" + patient.userId + "~" + bp.systolic + "~" + Moment(bp.MeasurementDateTime).format(
                      "MM-DD-YYYY hh:mm A"
                    ) + "~Systolic") > -1) { }
                    else {
                      pushNotificationdata({
                        "value": patient.name + "~" + patient.userId + "~" + bp.systolic + "~" + Moment(bp.MeasurementDateTime).format(
                          "MM-DD-YYYY hh:mm A"
                        ) + "~Systolic", "date": bp.MeasurementDateTime
                      })
                    }


                  }

                }

              }
            }


          })

        }

      }


      )

    })


  }
  const FetchNotificationForBG = () => {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    date.setHours(0, 0, 0, 0)
    coreContext.patients.map((patient) => {
      coreContext.bloodglucoseDataForNotification.filter((data) => data.MeasurementDateTime > date).map((bg) => {
        if (patient.userId === bg.userId) {
          coreContext.thresoldData.map((td) => {
            if (td.UserId.includes(patient.userId)) {

              if (Number(bg.bloodglucosemgdl) > Number(td.bg_high) || Number(bg.bloodglucosemgdl) < Number(td.bg_low)) {
                if (notificationValue.includes(patient.name + "~" + patient.userId + "~" + bg.bloodglucosemgdl + "~" + Moment(bg.MeasurementDateTime).format(
                  "MM-DD-YYYY hh:mm A"
                ) + "~Blood Glucose") === false) {
                  if (coreContext.notifications.includes(patient.name + "~" + patient.userId + "~" + bg.bloodglucosemgdl + "~" + Moment(bg.MeasurementDateTime).format(
                    "MM-DD-YYYY hh:mm A"
                  ) + "~Blood Glucose") === false) {
                    pushNotificationdata({
                      "value": patient.name + "~" + patient.userId + "~" + bg.bloodglucosemgdl + "~" + Moment(bg.MeasurementDateTime).format(
                        "MM-DD-YYYY hh:mm A"
                      ) + "~Blood Glucose", "date": bg.MeasurementDateTime
                    })
                  }

                }

              }
            }


          })

        }

      }


      )

    })
  }
  useEffect(() => {
    // console.log(coreContext.thresoldData,coreContext.patients,coreContext.bloodglucoseDataForNotification,"checking threshold from top menu")
    if (coreContext.thresoldData.length > 0 && coreContext.patients.length > 0 && coreContext.bloodglucoseDataForNotification.length > 0 && window.location.href.indexOf("patient-summary") < 0 && coreContext.notifications.length > 0) {

      FetchNotificationForBG();

    }
  }, [coreContext.thresoldData.length, coreContext.patients.length, coreContext.bloodglucoseDataForNotification.length, notificationValue, coreContext.notifications.length])


  useEffect(() => {
    // console.log(coreContext.thresoldData,coreContext.patients,coreContext.bloodglucoseDataForNotification,"checking threshold from top menu")
    if (coreContext.thresoldData.length > 0 && coreContext.patients.length > 0 && coreContext.bloodpressureDataForNotification.length > 0 && window.location.href.indexOf("patient-summary") <= 0 && coreContext.notifications.length > 0) {
      FetchNotificationForBP();


    }
  }, [coreContext.thresoldData.length, coreContext.patients.length, coreContext.bloodpressureDataForNotification.length, notificationValue, coreContext.notifications.length])

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onChange = (event, { newValue }) => {
    setValue(newValue.name);
    setMobilePhone(newValue.mobile_phone);
  };

  const fetchProviders = () => {
    coreContext.fetchProviders();
  };

  const fetchCareCoordinator = () => {
    coreContext.fetchCareCoordinator();
  };

  const onEmailChangedHandler = (e) => {
    setEmail(e.target.value);
    setUserName(e.target.value);
    if (coreContext.patients.filter((curr) => curr.email == e.target.value).length > 0) {
      alert('Email already registered with ' + coreContext.patients.filter((curr) => curr.email == e.target.value)[0].name)
      setEmail('')
      setUserName('')
    }
  };

  useEffect(fetchProviders, []);
  // useEffect(console.log(pp), [pp]);
  useEffect(() => {
    console.log(pp);
    console.log(ppname)
  }, [pp])

  useEffect(fetchCareCoordinator, []);
  const handlechangeprovider = (p) => {
    setPp(p)
    let c;
    coreContext.providerOptions.map((curr) => {
      if (curr.value === p) {
        c = curr.name
      }

    })
    console.log(c)
    setPpname(c)
  }
  // const fetchPatients = () => {
  //     coreContext.fetchPatients();

  // }

  // useEffect(fetchPatients, [coreContext.patients.length]);
  const toggleIsccm = (a) => {
    if (!a) setIsccm(false);
    else setIsccm(true);
  };
  const toggleIsregular = (a) => {
    setIstest(false)
    setIsregular(true);
  };
  const toggleIstest = (a) => {
    setIstest(true)
    setIsregular(false);
  };
  const toggleIspcm = (a) => {
    if (!a) setIspcm(false);
    else setIspcm(true);
  };
  const toggleIsrpm = (a) => {
    if (!a) setIsrpm(false);
    else setIsrpm(true);
  };
  const toggleHasMobile = (a) => {
    if (a) setHasMobile(false);
    else setHasMobile(true);
  };
  const toggleSendSms = (a) => {
    if (a) setSendSms(false);
    else setSendSms(true);
  };

  const onCreatePatientSubmit = () => {

    if (!userName) {
      alert("Enter user name...");
      return;
    }
    if (pwd !== cnfpwd) {
      alert("Password and confirm password");
      return;
    }
    if (!pwd) {
      alert("Enter password...");
      return;
    }
    var program = ""
    if (isccm) {
      program = program + "CCM"
    }
    if (isrpm) {
      program = program + "RPM"
    }
    if (pwd.length < 8) {
      alert("Your password needs a minimum of 8 characters")
      return;
    } else if (pwd.search(/[a-z]/) < 0) {
      alert("Your password needs a lower case letter")
      return;
    } else if (pwd.search(/[A-Z]/) < 0) {
      alert("Your password needs an uppser case letter")
      return;
    } else if (pwd.search(/[0-9]/) < 0) {
      alert("Your password needs a number")
      return;
    } else if (pwd.search(/[!@#$%^&()~":<>?]/) < 0) {
      alert("Your password needs a Speacial Character")
      return;
    }
    if (!birthDate) {
      alert("Enter date of birth...");
      return;
    }
    if (!gender) {
      alert("Choose gender...");
      return;
    }
    if (!firstName) {
      alert("Enter First Name .");
      return;
    }
    if (!lastName) {
      alert("Enter Last Name .");
      return;
    }
    if (!email) {
      alert("Enter email...");
      return;
    }
    var newId = ""
    dcount.map((curr) => {
      newId = newId + "," + curr
    })
    setDiagnosisId(newId)
    coreContext.Registration(
      userName,
      firstName,
      middleName,
      lastName,
      email,
      mobilePhone,
      pwd,
      birthDate,
      gender,
      language,
      workPhone,
      mobilePhone,
      street,
      zip,
      city,
      state,
      pcm,
      pp,
      ppname,
      newId.substring(1),
      program,
      istest, cptcodeforccm, cptcodeforrpm
    );
    handleClose();
  };

  const onSendMessage = () => {
    axios
      .post("send-sms", { mobilePhone, message })
      .then((response) => {
        const status = response.data.status;
        if (status.trim() === "success") {
          coreContext.fetchMessages();
          coreContext.fetchThreadMessages("to", mobilePhone);
          setShowMessageModal(false);

          const url = "patient-summary/" + patientid;

          if (!window.location.href.includes("/patient-summary/")) {
            window.location.href = url;
          }

          //Call dashboard
          // alert('Message Sent successfully....');
        } else alert("Message Sending failed");
      })
      .catch(() => alert("Message Sending failed"));
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    setMobilePhone(result.mobile_phone);
    setPatientid(result.id);
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // setMobilePhone(item.mobile_phone);
    setPatientid(item.id);

    if (item.name != "") {
      const url = "/patient-summary/" + btoa(item.userId);

      if (!window.location.href.includes("/patient-summary/")) {
        window.location.href = url;
      } else {
        alert("This is already patient summary page.");
      }
    }
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleAddPatient = () => {
    setShowMessageModal(false);
    handleShow();
  };

  const onSearch = () => {
    //alert('Enter clicked!!!' + userName);
    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("userId");
    if (patientName == "") return;
    if (coreContext.patients.length == 0) {
      //coreContext.fetchPatientListfromApi(userType, userId);
      alert("Please open patient information page and search.");
      return;
    }
    let userName = patientName.target.value;
    if (userName != "") {
      let patient = coreContext.patients.filter((app) =>
        app.name.toLowerCase().includes(userName)
      )[0];
      const url = "/patient-summary/" + btoa(patient.userId);

      if (!window.location.href.includes("/patient-summary/")) {
        window.location.href = url;
      } else {
        alert("This is already patient summary page.");
      }
    }
  };

  const renderPatientMenu = () => {
    const userType = localStorage.getItem("userType");
    if (userType !== "patient")
      return (
        // <NavDropdown
        //   title={
        //     <div style={{ display: "inline-block" }}>
        //       <People /> Patients{" "}
        //     </div>
        //   }
        //   id="collasible-nav-dropdown">
        //   <NavDropdown.Item to="/patients">
        //     <PersonLinesFill /> List
        //   </NavDropdown.Item>
        //   <NavDropdown.Item to="#" onClick={handleShow}>
        //     <PencilSquare /> Add
        //   </NavDropdown.Item>
        // </NavDropdown>
        <li className="list-inline-item mr-10">
          <div className="btn-group">
            <div className="dropdown pt-4">
              <Link className="dropdown-toggle dropdown-toggle-1 mb-1 text-white" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="icon text-white bi-person-circle"></i> Patients
              </Link>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item" to="/patients"><i className="icon bi-list-ul"></i> List</Link>
                <Link className="dropdown-item" to="#" onClick={handleShow}><i className="icon bi-file-plus-fill"></i> Add</Link>
              </div>
            </div>
          </div>
        </li>
      );
  };

  const renderClinicalDataMenu = () => {
    const userType = localStorage.getItem("userType");
    if (userType === "patient")
      return (
        <li className="list-inline-item mr-10">
          <div className="btn-group">
            <div className="dropdown pt-4">
              <Link className="dropdown-toggle dropdown-toggle-1 mb-1 text-white" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="icon text-white bi-envelope-open"></i> Clinical Data
              </Link>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item" to="#"><i className="icon bi-chat-left-dots"></i> Allergies</Link>
                <Link className="dropdown-item" to="#"><i className="icon bi-envelope-open"></i> Lab Results</Link>
                <Link className="dropdown-item" to="#"><i className="icon bi-envelope-open"></i> Medications</Link>
              </div>
            </div>
          </div>
        </li>
      );
  };

  const renderVitalMenu = () => {
    const userType = localStorage.getItem("userType");
    if (userType === "patient")
      return (
        <li className="list-inline-item mr-10">
          <div className="btn-group">
            <div className="dropdown pt-4">
              <Link className="dropdown-toggle dropdown-toggle-1 mb-1 text-white" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="icon text-white bi-envelope-open"></i> Vitals
              </Link>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item" to="/bloodpressure"><i className="icon bi-chat-left-dots"></i> Blood Pressure</Link>
                <Link className="dropdown-item" to="/bloodglucose"><i className="icon bi-envelope-open"></i> Blood Glucose</Link>
                <Link className="dropdown-item" to="weight"><i className="icon bi-envelope-open"></i> Weight</Link>
              </div>
            </div>
          </div>
        </li>
      );
  };

  const renderpatientSearch = () => {
    const userType = localStorage.getItem("userType");
    if (userType !== "patient")
      return (
        <Form inline>
          <div className="col-sm-4">
            {/* <input
                name="name"
                type="text"
                style={{  height: '38px', width: '200px' }}
                onKeyPress={event => {
                    setPatientName(event);
                   }}
                placeholder="Search patients..."
              /> */}
            {renderPatients()}
            <div className="col-sm-4">
              <header>
                <div style={{ width: 420 }}>
                  <ReactSearchAutocomplete
                    items={coreContext.patients}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                  />
                </div>
              </header>
            </div>
            {/* <input
                name="name"
                type="button"
                width="380" value="Search" style={{ marginLeft: '5px',  height: '38px', width: '200px' }}
                onClick={onSearch}
              /> */}
          </div>

          {/* <FormControl 
            placeholder="Search patients..."
            aria-label="Search patients..."
            aria-describedby="basic-addon1" onKeyPress={event => {
                if (event.key === "Enter") {
                  search(event);
                }}}
          
        /> */}
        </Form>
      );
  };
  const renderPatients = () => {
    if (coreContext.patients.length > 0) {
    }
  };
  const rendernotificationlength = () => {
    return (

      <Nav.Link to="#" >
        <span className="badge badge-danger" onClick={handleClickOpen}>
          {[...new Set(notificationValue)].length}


        </span>
        <Bell onClick={handleClickOpen} />
      </Nav.Link>



    )

  }
  const rendernotifications = useCallback(() => {
    return (<>

      <div className="dropdown-menu dropdown-menu-end wide notification-dropdown scroll-out" id="notifications">
        <div className="scroll-default">
          <button type="button" className="btn btn-primary mb-3" onClick={() => { markasread() }}>Mark all read</button>
          <ul className="list-unstyled border-last-none">
            {

              [...new Set(notificationValue)].sort(function (a, b) {

                return new Date(b.date) - new Date(a.date);
              }).map((curr) => {
                return (
                  <>


                    <li className="mb-2 pb-2 border-bottom border-separator-light d-flex">
                      <div className="align-self-left">
                        <p className="mb-0">{curr.value.split("~")[0]} has crossed the  threshold with {curr.value.split("~")[4]} reading {curr.value.split("~")[2]} on {curr.value.split("~")[3]}</p>
                        <Link to="#" onClick={() => { coreContext.AddNotification(curr.value, "admin", localStorage.getItem("userId")); notificationValue.splice(notificationValue.findIndex(a => a.value === curr.value), 1); handleClose1() }}>Mark as read</Link>
                      </div>
                    </li>



                  </>
                )
              })}
          </ul>
        </div>
      </div>
    </>)
  }, [])
  //const count=React.useMemo({notificationValue.length,[notificationValue.length])
  const count = React.useCallback(() => rendernotificationlength(), [])
  const count1 = React.useCallback(() => rendernotifications(), [])
  useEffect(() => {

    return () => {
      coreContext.cleanup();
    };
  }, [window.location.href.indexOf("patient-summary") > 0]);
  return (
    <>
      <React.Fragment>
        <div id="nav" className="nav-container d-flex">
          <div className="nav-content d-flex">
            <div class="logo position-relative">
              <Link to="/dashboard">
                <div><img src="https://www.linkpicture.com/q/WhatsApp_Image_2022-04-12_at_10.41.03_AM-removebg-preview.png" style={{ width: "70px" }} /></div>
              </Link>
            </div>

            <div className="user-container d-flex">
              <Link to="#" className="d-flex user position-relative" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img className="profile" alt="profile" src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094041-stock-illustration-medical-doctor-profile.jpg" />
                <div className="name">{
                  localStorage.getItem("userName")
                    ? localStorage.getItem("userName")
                    : "Guest"
                }</div>
              </Link>
              <div className="dropdown-menu dropdown-menu-end user-menu wide">

                <div className="row mb-1 ms-0 me-0">

                  <div className="col-12 ps-1 pe-1">
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/profile">
                          <i className="icon bi-person-circle"></i>
                          <span className="align-middle">My Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={handleShow}>
                          <i className="icon bi-person-fill"></i>
                          <span className="align-middle">Create Patient</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 pe-1 ps-1">
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/settings">
                          <i className="icon bi-gear-fill"></i>
                          <span className="align-middle">Settings</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/logout">
                          <i className="icon bi-box-arrow-right"></i>
                          <span className="align-middle">Logout</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <ul className="list-unstyled list-inline text-center menu-icons">
              <li className="list-inline-item mr-10">
                <div className="btn-group">
                  <div className="dropdown pt-4">
                    <Link className="dropdown-toggle dropdown-toggle-1 mb-1 text-white" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="icon text-white bi-envelope"></i> Mailbox
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <Link className="dropdown-item" to="/inbox"><i className="icon bi-inbox"></i>  Inbox</Link>
                      <Link className="dropdown-item" to="/outbox"><i className="icon bi-envelope-open"></i> Outbox</Link>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-inline-item mr-10">
                <div className="btn-group">
                  <div className="dropdown pt-4">
                    <Link className="dropdown-toggle dropdown-toggle-1 mb-1 text-white" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="icon text-white bi-envelope-open"></i> Messages
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <Link className="dropdown-item" to="/telephone"><i className="icon bi-chat-left-dots"></i> Call</Link>
                      <Link className="dropdown-item" to="#" onClick={handleMessageModalShow}><i className="icon bi-envelope-open"></i> SMS</Link>
                    </div>
                  </div>
                </div>
              </li>
              {renderPatientMenu()}
              {renderClinicalDataMenu()}
              {renderVitalMenu()}

              <li className="list-inline-item">
                <Link to="#" data-bs-toggle="modal" data-bs-target="#searchPagesModal" onClick={() => handleSearchOpen()}>
                  <i className="icon text-white bi-search"></i>
                </Link>
              </li>
              {/* <li className="list-inline-item">{renderpatientSearch()}</li> */}

              {(window.location.href.indexOf("patient-summary") <= 0) ?
                <li className="list-inline-item">
                  <Link to="#" data-bs-toggle="dropdown" data-bs-target="#notifications" aria-haspopup="true" aria-expanded="false" className="notification-button">
                    <div className="position-relative d-inline-flex">
                      <i className="icon text-white bi-bell"></i>
                      <span className="notificaion-show badge bg-danger">{notificationValue.length}</span>
                    </div>
                  </Link>
                  {rendernotifications()}
                </li> : null}


            </ul>
            <div className="menu-container flex-grow-1">
              <ul id="menu" className="menu">


              </ul>
            </div>
            <div className="mobile-buttons-container">
              <Link to="#" id="scrollSpyButton" className="spy-button" data-bs-toggle="dropdown">
                <i className="icon bi-list text-white display-3"></i>

              </Link>
              <div className="dropdown-menu dropdown-menu-end" id="scrollSpyDropdown"></div>
              <Link to="#" id="mobileMenuButton" className="menu-button">
                <i className="icon bi-list text-white display-3"></i>
              </Link>
            </div>
          </div>
          <div className="nav-shadow"></div>
        </div>

        <Modal
          show={coreContext.showPatientConfirmationModal}
          onHide={coreContext.handlePatientConfirmationModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Verification Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Enter the verification code sent on your Email ID {userName}</p>
            <input
              type="text"
              className="form-control"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() =>
                coreContext.verifyProviderVerificationCode(
                  verificationCode,
                  userName
                )
              }>
              Submit
            </Button>
            <Button
              variant="secondary"
              onClick={coreContext.handleProviderModalClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showSearch}
          onHide={handleSearchClose}>
          <Modal.Header closeButton>
            <Modal.Title>Search Patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              (localStorage.getItem("userType") !== "patient") ?

                <Form inline>
                  <div className="col-sm-12">
                    {/* <input
                name="name"
                type="text"
                style={{  height: '38px', width: '200px' }}
                onKeyPress={event => {
                    setPatientName(event);
                   }}
                placeholder="Search patients..."
              /> */}
                    {renderPatients()}
                    <div className="col-sm-12">
                      <header>
                        <div style={{ width: "100%" }}>
                          <ReactSearchAutocomplete
                            items={coreContext.patients}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            autoFocus
                          />
                        </div>
                      </header>
                    </div>
                    {/* <input
                name="name"
                type="button"
                width="380" value="Search" style={{ marginLeft: '5px',  height: '38px', width: '200px' }}
                onClick={onSearch}
              /> */}
                  </div>

                  {/* <FormControl 
            placeholder="Search patients..."
            aria-label="Search patients..."
            aria-describedby="basic-addon1" onKeyPress={event => {
                if (event.key === "Enter") {
                  search(event);
                }}}
          
        /> */}
                </Form>
                : null
            }
          </Modal.Body>

        </Modal>

        <Modal show={showMessageModal} onHide={handleMessageModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send SMS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <label className="mt-2">Mobile Number*</label>
              {/* <Form.Control
maxLength="50" size="sm" type="text" onChange={e => setMobilePhone(e.target.value)} value={mobilePhone} placeholder="Enter mobile number" /> */}

              {renderPatients()}
              <div className="rowC">
                <header>
                  <div style={{ width: 420 }}>
                    <ReactSearchAutocomplete
                      items={coreContext.patients}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={handleOnSelect}
                      onFocus={handleOnFocus}
                      fuseOptions={{ keys: ["name", "mobile_phone"] }}
                      autoFocus
                    />
                  </div>
                </header>
                <div>
                  <Nav.Link to="#" onClick={handleAddPatient}>
                    <PersonPlusFill />
                  </Nav.Link>
                </div>
              </div>

              {/* <Linkutosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    /> */}
            </Form.Group>
            <Form.Group>
              <label className="mt-2">Description*</label>
              <Form.Control
                maxLength="50"
                type="reset"
                size="sm"
                as="textarea"
                rows={3}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Enter message"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSendMessage}>
              Send SMS
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group>
                  <label className="mt-2">Email*</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="email"
                    placeholder="Email"
                    onChange={onEmailChangedHandler}
                    value={email}
                  />

                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label className="mt-2">Password*</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type={pwdtype}
                    onChange={(e) => setcnfpwd(e.target.value)}
                    value={cnfpwd}
                    placeholder="Enter Password"
                  />
                  <i class="bi bi-eye" onClick={() => setpwdtype((pwdtype === "password") ? "text" : "password")} id="togglePassword" style={{ position: "absolute", top: "7%", right: "38%" }}></i>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label className="mt-2" >Confirm Password*</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type={pwdtype1}
                    onChange={(e) => setpwd(e.target.value)}
                    value={pwd}
                    placeholder="Enter Password"

                  />
                  <i class="bi bi-eye" onClick={() => setpwdtype1((pwdtype1 === "password") ? "text" : "password")} id="togglePassword" style={{ position: "absolute", top: "7%", right: "5%" }}></i>
                </Form.Group>
              </Col>

            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <label className="mt-2">User Name</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    readOnly={true}
                    type="text"
                    value={userName}
                    placeholder="Enter user name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label className="mt-2">First Name*</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="text"
                    onChange={(e) => setfirstName(e.target.value)}
                    value={firstName}
                    placeholder="Enter First name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label className="mt-2">Middle Name</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="text"
                    onChange={(e) => setmiddleName(e.target.value)}
                    value={middleName}
                    placeholder="Enter Middle name"
                  />
                </Form.Group>
              </Col>

            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <label className="mt-2">Last Name*</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="text"
                    onChange={(e) => setlastName(e.target.value)}
                    value={lastName}
                    placeholder="Enter Last Name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label className="mt-2">Date of Birth*</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="date"
                    placeholder="Enter date"
                    onChange={(e) => setBirthDate(e.target.value)}
                    value={birthDate}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label className="mt-2">Gender*</label>
                  <select className="form-select" value={gender} onChange={(e) => { setGender(e.target.value) }} >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </Form.Group>
              </Col>

            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <label className="mt-2">Language</label>

                  <select className="form-select" value={language} onChange={(e) => { setLanguage(e.target.value) }} >
                    <option value="">Select Language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>



                  </select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label className="mt-2">CPT Code For CCM</label>

                  <MultiSelect

                    options={[
                      { label: "99457", value: "99457" },
                      { label: "99458", value: "99458" },
                      { label: "99490", value: "99490" },
                      { label: "99439", value: "99439" },
                      { label: "99487", value: "99487" },
                      { label: "99489", value: "99489" },
                    ]}
                    value={cptcodeforccm}
                    onChange={setcptcodeforccm}
                    labelledBy="Select"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label className="mt-2">CPT Code For RPM</label>

                  <MultiSelect

                    options={[
                      { label: "99457", value: "99457" },
                      { label: "99458", value: "99458" },
                      { label: "99490", value: "99490" },
                      { label: "99439", value: "99439" },
                      { label: "99487", value: "99487" },
                      { label: "99489", value: "99489" },
                    ]}
                    value={cptcodeforrpm}
                    onChange={setcptcodeforrpm}
                    labelledBy="Select"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <label className="mt-2">Diagnosis</label>
                  {
                    dcount.map((curr, index) => {
                      return (
                        <>

                          <select className="form-select mt-1" value={dcount[index]} onChange={(e) => { handledcount(index, e.target.value) }} >



                            <option value=""></option>
                            {diagonislist.map((curr) => <option value={curr.split("-")[0]}>{curr}</option>)}


                          </select>



                        </>
                      )
                    })}
                  <Button className="mt-1 mb-1" onClick={() => setdcount([...dcount, ""])}>+</Button>

                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>Enrolled in Program</Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="CCM"
                  onChange={(e) => toggleIsccm(e.target.checked)}
                  value={isccm}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="PCM"
                  onChange={(e) => toggleIspcm(e.target.checked)}
                  value={ispcm}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="RPM"
                  onChange={(e) => toggleIsrpm(e.target.checked)}
                  value={isrpm}
                />
              </Col>
            </Row>
            <Row className="mt-1">
              <Col >User Type</Col>
              <Col>
                <Form.Check
                  type="radio"
                  label="Regular"
                  onChange={(e) => toggleIsregular(e.target.checked)}
                  checked={isregular}
                />
              </Col>
              <Col>
                <Form.Check
                  type="radio"
                  label="Test"
                  onChange={(e) => toggleIstest(e.target.checked)}
                  checked={istest}
                />
              </Col>
              <Col></Col>

            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <h6>Care Team</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <form>
                  <label className="mt-2">Care Coordinator</label>
                  {/* <Input
                    name="coordinator"
                    required={false}
                    register={register}
                    value={pcm}
                    elementType="select"
                    options={coreContext.careCoordinatorOptions}
                    onChange={(e) => setPcm(e.target.value)}
                  /> */}
                  <select className="form-select" value={pcm} onChange={(e) => { setPcm(e.target.value) }} >

                    {coreContext.careCoordinatorOptions.map((curr, index) => {
                      return (<option value={curr.value}>{curr.name}</option>)

                    })}

                  </select>

                </form>
                {/* <Form.Group>
                            <label className="mt-2">Care Coordinator</label>
                            <Form.Control
maxLength="50" size="sm" as="select" onChange={e => setPcm(e.target.value)} value={pcm}>
                                <option value=""></option>
                                <option value="Dykes, Kami">Dykes, Kami</option>
                                <option value="Ortiz, Lisa">Ortiz, Lisa</option>
                                <option value="Ortiz, Lisa">Ortiz, Lisa</option>

                            </Form.Control>
                        </Form.Group> */}
              </Col>
              <Col>
                <form>
                  <label className="mt-2">Provider</label>
                  {/* <Input
                    name="provider"
                    required={false}
                    register={register}
                    value={pp}
                    elementType="select"
                    options={coreContext.providerOptions}
                    onChange={(e) => {handlechangeprovider(e.target.value)}}
                    
                  /> */}
                  <select className="form-select" value={pp} onChange={(e) => { handlechangeprovider(e.target.value) }} >

                    {coreContext.providerOptions.map((curr, index) => {
                      return (<option value={curr.value}>{curr.name}</option>)

                    })}

                  </select>

                </form>
                {/* <Form.Group>
                            <label className="mt-2">Providers</label>
                            <Form.Control
maxLength="50" size="sm" as="select" onChange={e => setPp(e.target.value)} value={pp} options={coreContext.providerOptions} >
                            
                            </Form.Control>
                        </Form.Group> */}
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <h6>Contact Information</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <label className="mt-2">Home Phone</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter home phone"
                    onChange={(e) => setHomePhone(e.target.value)}
                    value={homePhone}
                  />
                </Form.Group>
              </Col>{" "}
              <Col>
                <Form.Group>
                  <label className="mt-2">Mobile Phone</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter mobile phone"
                    onChange={(e) => setMobilePhone(e.target.value)}
                    value={mobilePhone}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label className="mt-2">Work Phone</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="212-333-1234-123"
                    onChange={(e) => setWorkPhone(e.target.value)}
                    value={workPhone}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>

              <Col>

                <Form.Group>
                  <label className="mt-2">Preferred Phone</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    as="select"
                    onChange={(e) => setPreferred(e.target.value)}
                    value={preferred}>
                    <option value=""></option>
                    <option value="Home">Home</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Work">Work</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <label className="mt-2">Phone Notes</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Phone Notes"
                    onChange={(e) => setPhoneNotes(e.target.value)}
                    value={phoneNotes}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* <Col md='2'>
                        <Form.Check
                            type='checkbox'
                            label='Has Mobile'
                            onChange={toggleHasMobile}
                            value={hasMobile}
                        />

                    </Col> */}
              <Col md="2">
                <Form.Check
                  type="checkbox"
                  label="Send SMS"
                  onChange={toggleSendSms}
                  value={sendSms}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <label className="mt-2">Mailing address</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter Street Location"
                    onChange={(e) => setStreet(e.target.value)}
                    value={street}

                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label className="mt-2">Zip Code</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter ZIP"
                    onChange={(e) => setZip(e.target.value)}
                    value={zip}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <label className="mt-2">City</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter City"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label className="mt-2">State</label>
                  <Form.Control
                    maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter State"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* <Row style={{ marginTop: 20 }}>
                    <Col>
                        <h6>Additional</h6>
                    </Col>
                </Row> */}
            {/* <Row>
                    <Col>
                        <Form.Group>
                            <label className="mt-2">POS</label>
                            <Form.Control
maxLength="50" size="sm" as="select" onChange={e => setPos(e.target.value)} value={pos}>
                                <option value=""></option>
                                <option value="Home">Home</option>
                                <option value="Office">Office</option>
                                <option value="Public Health Clinic">Public Health Clinic</option>
                                <option value="Rural Health Clinic">Rural Health Clinic</option>
                                <option value="Assisted Living Facility">Assisted Living Facility</option>
                                <option value="Walk In Retail Health Clinic">Walk In Retail Health Clinic</option>
                                <option value="Urgent Care Facility">Urgent Care Facility</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <label className="mt-2">Risk Scope</label>
                            <Form.Control
maxLength="50" size="sm" type="text" placeholder="Enter RAF" onChange={e => setRaf(e.target.value)} value={raf} />
                        </Form.Group>
                    </Col>
                </Row> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onCreatePatientSubmit}>
              Create Patient
            </Button>
          </Modal.Footer>
        </Modal>
        <div><BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          style={{ marginLeft: "70%" }}
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
            Notifications
          </BootstrapDialogTitle>
          <BootstrapDialogTitle>

            <div className="row" style={{ float: "right" }}>
              <Button style={{ float: "right", fontSize: "14px" }} onClick={() => { markasread(); handleClose1() }}>

                Mark All as Read

              </Button>
            </div>
          </BootstrapDialogTitle>
          <DialogContent dividers>


            {count1}
          </DialogContent>

        </BootstrapDialog>
        </div>    </React.Fragment>
    </>
  );
};

export default TopMenu;
