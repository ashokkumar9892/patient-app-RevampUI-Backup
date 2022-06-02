import React, { useState, useEffect } from "react";
import axios from "axios";
import loader from "../assets/images/835.gif";
import Moment from "moment";
import swal from "sweetalert";

export const CoreContext = React.createContext({});

export const CoreContextProvider = (props) => {
  const [userinfo, setuserinfo] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientsForPatient, setPatientsForPatient] = useState([]);
  const [bgData, setbgData] = useState([]);
  const [bpData, setbpData] = useState([]);
  const [wsData, setwsData] = useState([]);
  const [adminthresold, setadminthresold] = useState([]);
  const [notifications,setNotifications]=useState([]);

  const [weightData, setweightData] = useState([]);
  const [weightDataForPatient, setweightDataForPatient] = useState([]);
  const [weightApiData, setweightdeviceApiData] = useState([]);

  const [thresoldData, setThresoldData] = useState([]);
  const [timeLogData, setTimeLogData] = useState([]);
  const [AlltimeLogData, setAllTimeLogData] = useState([]);
  const [bloodpressureData, setbloodpressureData] = useState([]);
  const [bloodglucoseData, setbloodglucoseData] = useState([]);
  const [bloodglucoseDataForNotification, setbloodglucoseDataForNotification] = useState([]);
  const [bloodglucoseDataForDashboard, setbloodglucoseDataForDashboard] = useState([]);
  const [bloodglucoseDataForPatient, setbloodglucoseDataForPatient] = useState([]);
  
  const [bloodpressureDataForNotification, setbloodpressureDataForNotification] = useState([]);
  const [bloodpressureDataForDashboard, setbloodpressureDataForDashboard] = useState([]);
  const [bloodpressureDataForPatient, setbloodpressureDataForPatient] = useState([]);

  const [deviceData, setdeviceData] = useState([]);
  const [deviceDataForPatient, setdeviceDataForPatient] = useState([]);
  const [patientWDevice, setPatientWDevice] = useState([]);

  const [providerData, setdoctorData] = useState([]);
  const [providerOptions, setProviderOptions] = useState([]);
  const [coachOptions, setCoachOptions] = useState([]);
  const [careCoordinatorOptions, setCoordinatorOptions] = useState([]);
  const [ccData, setccData] = useState([]);
  const [coachData, setcoachData] = useState([]);
  const [resetForm, setResetForm] = useState(0);
  const [tasktimerUserData, settasktimerUserData] = useState([]);

  const [patient, setPatient] = useState({});
  const [threads, setThreads] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [genderOptions, setgenderOptions] = useState([
    { name: "Male", value: 0 },
    { name: "Female", value: 1 },
  ]);
  const [languageOptions, setLanguage] = useState([
    { name: "English", value: 0 },
    { name: "Spanish", value: 1 },
  ]);

  const [outbox, setOutbox] = useState([]);

  const [showProviderModal, setShowProviderModal] = useState(false);

  const handleProviderModalClose = () => setShowProviderModal(false);
  const handleProviderModalShow = () => setShowProviderModal(true);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleForgotModalClose = () => setShowForgotModal(false);
  const handleForgotModalShow = () => setShowForgotModal(true);

  const [showPatientConfirmationModal, setShowPatientConfirmationModal] =
    useState(false);

  const handlePatientConfirmationModalClose = () =>
    setShowPatientConfirmationModal(false);
  const handlePatientConfirmationModalShow = () =>
    setShowPatientConfirmationModal(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [jwt, setJwt] = useState("");
  const [userId, setUserId] = useState("");
  const [dpatient, setDpatient] = useState([]);

  const [result, setResult] = useState([]);

  const [apiUrl, setApiUrl] = useState(
    "https://appapi.apatternplus.com/api"
  );
  const [apiUrl2, setApiUrl2] = useState(
    "https://patientapisqlmigration.azurewebsites.net/"
  );
  const [userTable, setuserTable] = useState("UserDetailsDemo");

  // const [apiUrl, setApiUrl] = useState('https://rpmcrudapis20210725100004.azurewebsites.net/api');
  // const [userTable, setuserTable] = useState('UserDetail');

  ///Chart Data

  const [bgChartData, setbgChartData] = useState([]);
  const [bpChartData, setbpChartData] = useState([]);
  const [wsChartData, setwsChartData] = useState([]);
  const [Tab1data, setTab1data] = useState({
    CurrentDate: "",
    FirstName: "",
    LastName: "",
    sex: "",
    DateOfBirth: "",
    PhoneNumber: "",
    EmailAddress: "",
    Address1: "",
    Address2: "",
    city: "",
    state: "",
    zip: "",
    CurrentMedicineStatus: "",
    listofMedicine: "",
  });
  //let result;

  const relogin = () => {
    setIsAuthenticated(false);
    setJwt("");
    setUserId("");
    localStorage.setItem("app_isAuth", "");
    localStorage.setItem("app_jwt", "");
    localStorage.setItem("app_userId", "");
    localStorage.setItem("app_userEmail", "");
    localStorage.setItem("userName", "");
    localStorage.setItem("userType", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("userEmail", "");
    localStorage.setItem("app_email", "");
    localStorage.setItem("app_userName", "");
    localStorage.setItem("patientName", "");
    localStorage.setItem("app_patient", "");

    window.location.assign("/login");
  };
  const cleanup=()=>{
    // setPatients([]);
    setbloodglucoseDataForPatient([]);
    setbloodpressureDataForPatient([]);
  }
  const cleanup1=()=>{
   setPatients([]);
 
  }

  const checkLocalAuth = () => {
    const isAuth = localStorage.getItem("app_isAuth");
    const token = localStorage.getItem("app_jwt");
    const userId = localStorage.getItem("app_userId");

    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }
  };

  // useEffect(checkLocalAuth, []); // because not required on all the pages.

  // capture from login page.  'yasser.sheikh@laitkor.com'  'M2n1shlko@1'
  const login = (email, password, url) => {
    setShowLoader(true);
    axios
      .post(apiUrl + "/signin", { Username: email, Password: password })
      .then((response) => {
        if (response.data === "Incorrect username or password.") {
          alert("Incorrect username or password.");
          setShowLoader(false);
        } else {
          setJwt(response.data.idToken);
          setIsAuthenticated(true);
          setMessage("");
          setUserId(email);
          localStorage.setItem("app_isAuth", "yes");
          localStorage.setItem("app_jwt", response.data.idToken);
          localStorage.setItem("app_userId", email);
          localStorage.setItem("app_userEmail", email);
          // localStorage.setItem("userType", response[0].UserType.s);

          //  window.location.assign();

          userDetails(email, url);
        }
      });
  };
  const ForgotPassword = (email) => {
    setShowLoader(true);
    axios
      .post(apiUrl + "/forgotpassword", { Username: email})
      .then((response) => {
        if (response.data.includes("Password reset code sent to")) {
          handleForgotModalShow();
          setShowLoader(false)
        } else {
          alert("some error")
          setShowLoader(false);
          // localStorage.setItem("userType", response[0].UserType.s);

          //  window.location.assign();

          
        }
      });
  };
  const verifyForgotPassword = (email,code,newpassword) => {
    setShowLoader(true);
    axios
      .post(apiUrl + "/confirmforgotpassword", { Username: email,newpassword:newpassword,ConfirmationCode:code})
      .then((response) => {
        if (response.data.includes("successfully")) {
          handleForgotModalClose();
          swal("success","password changes successfully");
          relogin();
        } else {
          alert("there is some error")
          // localStorage.setItem("userType", response[0].UserType.s);

          //  window.location.assign();

          
        }
      });
  };

  const userDetails = async(useremail, url = "") => {
    const token = localStorage.getItem("app_jwt");
    if(token){await axios
      .get(
        apiUrl2+"usertable",
          
          {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'text/plain'
           }
          },
          
           
      )
        .then((response) => {
           // setJwt(response.data);
          const userData = response.data.filter((curr)=>curr.email===useremail);
          setuserinfo(userData);
         
  
          userData.filter((curr)=>curr.email===useremail).forEach((p) => {
            localStorage.setItem("userName", p.userName);
            localStorage.setItem("userType", p.userType);
            localStorage.setItem("userId", p.userId);
            localStorage.setItem("userEmail", p.email);
  
            const pat = {
              userName: p.userName ? p.userName : "",
              userType: p.userTpye ? p.userType : "",
              userId: p.userId ? p.userId : "",
              userEmail: p.email ? p.email : "",
              
            };
  
            localStorage.setItem("app_patient", JSON.stringify(pat));
  
            if (p.userType === "patient" && url) {
              if (pat.userName.includes("||0")) url = "profile";
              else url = "patient-profile/" + p.userId.split("_").pop();
            }
            if (p.userType === "admin" && url) {
              if (pat.userName.includes("||0")) url = "profile";
              else url = "dashboard";
            }
          });
  
          const patientId = localStorage.getItem("userId");
          const username = localStorage.getItem("userName");
  
          setShowLoader(false);
  
          if (userData.length === 0) window.location.assign("profile");
          else if (url) window.location.assign(url);
  
          // if (userType === 'patient')
          // {
          //     window.location.assign(url);
          // }
          // else
          //     {
          //         window.location.assign('/dashboard');
          //     }
        })}
    //let url ='';
    
  };
  const setdefault=()=>{
    setTimeLogData([])
  }

  const getdp = (d) => {
    const token = localStorage.getItem("app_jwt");

    setDpatient(...dpatient, d);
    console.log(dpatient);
  };
  console.log(dpatient);
  // capture from patient List page.
  const fetchPatientListfromApi = async (usertype, userId, AllActive) => {
    const token = localStorage.getItem("app_jwt");

    let data = "";

    if (usertype === "admin"){
      if (AllActive) {
        data={ DoctorId: "ADMIN",ActiveStatus:"Deactive" }
        
      } else {
        data={ DoctorId: "ADMIN",ActiveStatus:"Active" }
      }
    }

    if (usertype === "doctor") {
      if (AllActive) {
        data={ DoctorId: "DOCTOR_"+userId ,ActiveStatus:"Deactive" }
        }
       else {
        data={ DoctorId: "DOCTOR_"+userId ,ActiveStatus:"Active" }
        }
  };
    

    if (usertype === "carecoordinator") {
      data={ DoctorId: "DOCTOR_"+userId ,ActiveStatus:"Deactive" }
    }
    if (usertype === "coach") {
      data={ DoctorId: "DOCTOR_"+userId ,ActiveStatus:"Deactive" }
    }
    // if (usertype === "patient" && userName !==undefined) {
    //     data = {
    //         "TableName":userTable,
    //         "KeyConditionExpression":"PK = :v_PK AND begins_with(UserName, :v_UserName)",
    //         "FilterExpression":"ActiveStatus = :v_status",
    //         "ExpressionAttributeValues":{":v_PK":{"S":"patient"},":v_SK":{"S":userName},":v_status":{"S":"Active"}}
    //     }
    // }
    if (usertype === "patient") {
      data={ DoctorId: "PATIENT_"+userId ,ActiveStatus:"Active" }
    }

    await axios
    .get(
      apiUrl2 +
        "patient",
        { params: data },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        // setJwt(response.data);
        //  console.log(response.data);
        const patients = response.data;
        console.log("i need to check the patient",patients)
        const ps = [];
        if (patients.length === 0) {
          ps.push("No data found");
        }
        

        patients.forEach((p, index) => {
          let patient = {};

          patient.id = p.id;
          patient.sk=p.sk;


          patient.mobilePhone = p.mobilePhone;
          patient.workPhone = p.workPhone;
          patient.userId = p.userId;
          patient.name = p.lastName+" , "+p.firstName;
          patient.userName=p.userName;
          patient.createdDate=p.createdDate;
          patient.connectionId=p.connectionId;
          patient.st=p.st;
         
          
            patient.email = p.email;
            patient.coachId=p.coachId;
            patient.careId=p.carecoordinatorId;
          
          
            if(p.diagnosisId[0]==","){
              patient.diagnosisId = p.diagnosisId.substring(1);  
            }else{
              patient.diagnosisId = p.diagnosisId;
            }
            
          
          
            patient.mobile = p.contactNo;
          
          
            patient.dob = Moment(p.dob).format("MM-DD-YYYY");
          
          
            patient.ProviderName = p.doctorName;
            patient.ProviderId = p.doctorId;
          
          
            patient.CareName = p.carecoordinatorName;
          
          
            patient.CoachName = p.coach;
          
          
            patient.ehrId = p.sk;
          
          patient.pid = window.btoa(p.sk);
          
          (p.height.s!=="undefined")?patient.height = p.height:patient.height = ""
          
            patient.bg_reading = p.reading;
          
          

          if (p.weight !== undefined) {
            let num = p.weight;
            if (num === "") num = 0;
            patient.Weight = parseFloat(num).toFixed(2);
          }
          
          
            patient.ActiveStatus = p.activeStatus;
          

          
            patient.firstName = p.firstName;
            patient.lastName = p.lastName;
            patient.gender = p.gender;
          
          if (p.lang !== undefined) {
            patient.language = p.lang;
          } else {
            patient.language = "";
          }

          if (p.street !== undefined) {
            patient.street = p.street;
          } else {
            patient.street = "";
          }

          if (p.city !== undefined) {
            patient.city = p.city;
          } else {
            patient.city = "";
          }

          if (p.zip !== undefined) {
            patient.zip = p.zip;
          } else {
            patient.zip = "";
          }

          if (p.workPhone !== undefined) {
            patient.workPhone = p.workPhone;
          } else {
            patient.workPhone = "";
          }

          
          if (p.notes !== undefined) {
            patient.notes = p.notes;
           
          } else {
            patient.notes = "";
          }
          patient.diastolic=p.diastolic
          patient.gsI1PK=p.gsI1PK
          patient.gsI1SK=p.gsI1SK
          patient.middleName=p.middleName
          patient.BMI=p.reading
          patient.userTimeZone=p.userTimeZone
          patient.userType=p.userType
          // if (patient.userId !== undefined && patient.name) {
          //     fetchDeviceData("PATIENT_"+patient.userId,patient.name, 'patient','', patient);
          // }
                
          ps.push(patient);
        });
          
        setPatients(ps);
      })
      .catch((error) => {
        console.log(error,"errorlogin")
      });
  };
  const fetchPatientListfromApiForPatient = async (usertype, userId, AllActive) => {
    setPatientsForPatient([])
    const token = localStorage.getItem("app_jwt");
    var data={};

    if (usertype === "patient") {
      data={ DoctorId: "PATIENT_"+userId ,ActiveStatus:"Active" }
    }

    await axios
    .get(
      apiUrl2 +
        "patient",
        { params: data },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        // setJwt(response.data);
        //  console.log(response.data);
        const patients = response.data;
        console.log("i need to check the patient",patients)
        const ps = [];
        if (patients.length === 0) {
          ps.push("No data found");
        }
        

        patients.forEach((p, index) => {
          let patient = {};

          patient.id = p.id;
          patient.sk=p.sk;


          patient.mobilePhone = p.mobilePhone;
          patient.workPhone = p.workPhone;
          patient.userId = p.userId;
          patient.name = p.lastName+" , "+p.firstName;
          patient.userName=p.userName;
          patient.createdDate=p.createdDate;
          patient.connectionId=p.connectionId;
          patient.st=p.st;
         
          
            patient.email = p.email;
            patient.coachId=p.coachId;
            patient.careId=p.carecoordinatorId;
          
          
            if(p.diagnosisId[0]==","){
              patient.diagnosisId = p.diagnosisId.substring(1);  
            }else{
              patient.diagnosisId = p.diagnosisId;
            }
            
          
          
            patient.mobile = p.contactNo;
          
          
            patient.dob = Moment(p.dob).format("MM-DD-YYYY");
          
          
            patient.ProviderName = p.doctorName;
            patient.ProviderId = p.doctorId;
          
          
            patient.CareName = p.carecoordinatorName;
          
          
            patient.CoachName = p.coach;
          
          
            patient.ehrId = p.sk;
          
          patient.pid = window.btoa(p.sk);
          
          (p.height.s!=="undefined")?patient.height = p.height:patient.height = ""
          
            patient.bg_reading = p.reading;
          
          

          if (p.weight !== undefined) {
            let num = p.weight;
            if (num === "") num = 0;
            patient.Weight = parseFloat(num).toFixed(2);
          }
          
          
            patient.ActiveStatus = p.activeStatus;
          

          
            patient.firstName = p.firstName;
            patient.lastName = p.lastName;
            patient.gender = p.gender;
          
          if (p.lang !== undefined) {
            patient.language = p.lang;
          } else {
            patient.language = "";
          }

          if (p.street !== undefined) {
            patient.street = p.street;
          } else {
            patient.street = "";
          }

          if (p.city !== undefined) {
            patient.city = p.city;
          } else {
            patient.city = "";
          }

          if (p.zip !== undefined) {
            patient.zip = p.zip;
          } else {
            patient.zip = "";
          }

          if (p.workPhone !== undefined) {
            patient.workPhone = p.workPhone;
          } else {
            patient.workPhone = "";
          }

          
          if (p.notes !== undefined) {
            patient.notes = p.notes;
           
          } else {
            patient.notes = "";
          }
          patient.diastolic=p.diastolic
          patient.gsI1PK=p.gsI1PK
          patient.gsI1SK=p.gsI1SK
          patient.middleName=p.middleName
          patient.BMI=p.reading
          patient.userTimeZone=p.userTimeZone
          patient.userType=p.userType
          // if (patient.userId !== undefined && patient.name) {
          //     fetchDeviceData("PATIENT_"+patient.userId,patient.name, 'patient','', patient);
          // }
          ps.push(patient);
        });
         
        setPatientsForPatient(ps);
      })
      .catch(() => {
        relogin();
      });
  };

  const renderLoader = () => {
    if (showLoader)
      return (
        <span>
          <img src={loader} alt="" />
        </span>
      );
    else return <span></span>;
  };

  
  // const fetchBgData = (userid, usertype) => {
  //   const token = localStorage.getItem("app_jwt");
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };

  //   let data = "";
  //   if (usertype === "patient") {
  //     data = {
  //       TableName: userTable,
  //       IndexName: "Patient-Doctor-Device-Index",
  //       FilterExpression: "ActiveStatus <> :v_ActiveStatus",
  //       KeyConditionExpression: "GSI1PK = :v_PK",
  //       ExpressionAttributeValues: {
  //         ":v_PK": { S: "DEVICE_BG_" + userid },
  //         ":v_ActiveStatus": { S: "Deactive" },
  //       },
  //     };
  //   }

  //   if (usertype === "doctor") {
  //     data = {
  //       TableName: userTable,
  //       KeyConditionExpression: "PK = :v_PK",
  //       FilterExpression:
  //         "GSI1SK = :v_GSI1SK AND ActiveStatus <> :v_ActiveStatus",
  //       ExpressionAttributeValues: {
  //         ":v_PK": { S: "DEVICE_BG_READING" },
  //         ":v_GSI1SK": { S: "DEVICE_BG_" + userid },
  //         ":v_ActiveStatus": { S: "Deactive" },
  //       },
  //     };
  //   }

  //   if (usertype === "admin") {
  //     data = {
  //       TableName: userTable,
  //       KeyConditionExpression: "PK = :v_PK",
  //       FilterExpression: "ActiveStatus <> :v_ActiveStatus",
  //       ExpressionAttributeValues: {
  //         ":v_PK": { S: "DEVICE_BG_READING" },
  //         ":v_ActiveStatus": { S: "Deactive" },
  //       },
  //     };
  //   }

  //   axios
  //     .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         // "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((response) => {
  //       // setJwt(response.data);
      
  //       const bgData = response.data;
  //       const dataSetbg = [];

  //       bgData.forEach((p) => {
  //         let bgdata = {};
  //         let meal = "";
  //         bgdata.TimeSlots = p.TimeSlots.s;
  //         bgdata.daterecorded = p.date_recorded.s;
  //         if (p.before_meal.bool === true) {
  //           meal = "Before Meal";
  //         } else {
  //           meal = "After Meal";
  //         }
  //         bgdata.meal = meal;

  //         dataSetbg.push(bgdata);
  //       });

  //       setbgData(dataSetbg);
  //     });
  // };

  const fetchWSData = async (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = "DEVICE_WS_" + userid;
    }

   else{
    data="DEVICE_WS_";
   }
    await axios
    .get(
      apiUrl2 +
        "weight",
        { params: { GSI1PK: data } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {    const weightData = response.data;
        const dataSetwt = [];
        if (weightData.length === 0) {
          dataSetwt.push("no data found");
        }

        weightData.forEach((wt, index) => {
          //   console.log('p' + index, bg);
          let wtdata = {};
          wtdata.id = wt.id;
          if (wt.gsI1PK !== undefined) {
            wtdata.gSI1PK = wt.gsI1PK;
            wtdata.userId = wt.gsI1PK.split("_").pop();
          }
          if (wt.userName !== undefined) {
            wtdata.UserName = wt.userName;
          }

          if (wt.sk !== undefined) {
            wtdata.readingId = wt.sk.split("_").pop();
          }
          if (wt.deviceId !== undefined) {
            wtdata.DeviceId = wt.deviceId;
          }
          if (wt.weight !== undefined) {
            wtdata.weight = wt.weight;
          }
          if (wt.timeSlots !== undefined) {
            wtdata.timeSlots = wt.timeSlots;
          }
          if (wt.measurementDateTime !== undefined) {
            wtdata.MeasurementDateTime = wt.measurementDateTime;
            wtdata.MeasurementDateTime = new Date(wtdata.MeasurementDateTime);
            wtdata.sortDateColumn = wt.measurementDateTime;
            // wtdata.MeasurementDateTime =Moment(wtdata.MeasurementDateTime).format('MMM-DD-YYYY hh:mm:ss A');
          }
          if (wt.createdDate !== undefined) {
            wtdata.CreatedDate = wt.createdDate.s;
            wtdata.CreatedDate = new Date(wtdata.CreatedDate);
            //wtdata.CreatedDate =Moment(wtdata.CreatedDate).format('MMM-DD-YYYY hh:mm:ss A');
          }

          // bpdata.date_recorded = bp.date_recorded.s;

          if (wt.reading_id !== undefined) {
            wtdata.reading_id = wt.reading_id;
          }
          wtdata.actionTaken = wt.actionTaken;

          dataSetwt.push(wtdata);
        });

        setweightData(dataSetwt);
      });
  };
  const fetchWSDataForPatient = async (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = "DEVICE_WS_" + userid;
    }

  
    await axios
    .get(
      apiUrl2 +
        "weight",
        { params: { GSI1PK: data } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {    const weightData = response.data;
        const dataSetwt = [];
        if (weightData.length === 0) {
          dataSetwt.push("no data found");
        }

        weightData.forEach((wt, index) => {
          //   console.log('p' + index, bg);
          let wtdata = {};
          wtdata.id = wt.id;
          if (wt.gsI1PK !== undefined) {
            wtdata.gSI1PK = wt.gsI1PK;
            wtdata.userId = wt.gsI1PK.split("_").pop();
          }
          if (wt.userName !== undefined) {
            wtdata.UserName = wt.userName;
          }

          if (wt.sk !== undefined) {
            wtdata.readingId = wt.sk.split("_").pop();
          }
          if (wt.deviceId !== undefined) {
            wtdata.DeviceId = wt.deviceId;
          }
          if (wt.weight !== undefined) {
            wtdata.weight = wt.weight;
          }
          if (wt.timeSlots !== undefined) {
            wtdata.timeSlots = wt.timeSlots;
          }
          if (wt.measurementDateTime !== undefined) {
            wtdata.MeasurementDateTime = wt.measurementDateTime;
            wtdata.MeasurementDateTime = new Date(wtdata.MeasurementDateTime);
            wtdata.sortDateColumn = wt.measurementDateTime;
            // wtdata.MeasurementDateTime =Moment(wtdata.MeasurementDateTime).format('MMM-DD-YYYY hh:mm:ss A');
          }
          if (wt.createdDate !== undefined) {
            wtdata.CreatedDate = wt.createdDate.s;
            wtdata.CreatedDate = new Date(wtdata.CreatedDate);
            //wtdata.CreatedDate =Moment(wtdata.CreatedDate).format('MMM-DD-YYYY hh:mm:ss A');
          }

          // bpdata.date_recorded = bp.date_recorded.s;

          if (wt.reading_id !== undefined) {
            wtdata.reading_id = wt.reading_id;
          }
          wtdata.actionTaken = wt.actionTaken;

          dataSetwt.push(wtdata);
        });

        setweightDataForPatient(dataSetwt);
      });
  };

  const fetchThresold = async (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    await axios
    .get(
      apiUrl2 +
        "threshold",
        
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )  .then((response) => {
        const thresholdData = response.data;
        console.log(response.data,userid,"thesolf")

        const dataSetthresold = [];
        {
          thresholdData.forEach((th, index) => {
            // console.log("p" + index, th);
            let thdata = {};
              thdata.id=th.id
            if (th.tElements) {
              thdata.Element_value = th.tElements;
            }
            if (th.low) {
              th.Low_value = th.low;
            }
            if (th.high) {
              th.High_value = th.high;
            }
            if (th.sk) {
              thdata.UserId = th.sk;
            }
          
            if (thdata.Element_value === "Blood Glucose") {
              thdata.bg_low = th.Low_value;
              thdata.bg_high = th.High_value;
            } else if (thdata.Element_value === "SYSTOLIC" ||thdata.Element_value === "Systolic") {
              thdata.systolic_low = th.Low_value;
              thdata.systolic_high = th.High_value;
            } else if (thdata.Element_value === "DIASTOLIC" ||thdata.Element_value === "Diastolic") {
              thdata.diastolic_low = th.Low_value;
              thdata.diastolic_high = th.High_value;
            } else if (thdata.Element_value === "BMI") {
              thdata.bmi_low = th.Low_value;
              thdata.bmi_high = th.High_value;
            } else if (thdata.Element_value === "Weight") {
              thdata.weight_low = th.Low_value;
              thdata.weight_high = th.High_value;
            }

            dataSetthresold.push(thdata);
          });
        }
        
        if (usertype === "admin") {
          if(dataSetthresold.length>1){
            setadminthresold(dataSetthresold.filter((curr)=>curr.UserId.includes(userid)));
                   
          }
        }
        if(dataSetthresold.length>1){
          setThresoldData(dataSetthresold.filter((curr)=>curr.UserId.includes(userid)));
        }
      });
  };
  const fetchadminThresold = async (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");

    await axios
    .get(
      apiUrl2 +
        "threshold",
        
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )  .then((response) => {
        const thresholdData = response.data;
        console.log(response.data,userid,"thesolf")

        const dataSetthresold = [];
        {
          thresholdData.forEach((th, index) => {
            // console.log("p" + index, th);
            let thdata = {};
            thdata.id=th.id

            if (th.tElements) {
              thdata.Element_value = th.tElements;
            }
            if (th.low) {
              th.Low_value = th.low;
            }
            if (th.high) {
              th.High_value = th.high;
            }
            if (th.sk) {
              thdata.UserId = th.sk;
            }
          
            if (thdata.Element_value === "Blood Glucose") {
              thdata.bg_low = th.Low_value;
              thdata.bg_high = th.High_value;
            } else if (thdata.Element_value === "SYSTOLIC"||thdata.Element_value === "Systolic") {
              thdata.systolic_low = th.Low_value;
              thdata.systolic_high = th.High_value;
            } else if (thdata.Element_value === "DIASTOLIC" ||thdata.Element_value === "Diastolic") {
              thdata.diastolic_low = th.Low_value;
              thdata.diastolic_high = th.High_value;
            } else if (thdata.Element_value === "BMI") {
              thdata.bmi_low = th.Low_value;
              thdata.bmi_high = th.High_value;
            } else if (thdata.Element_value === "Weight") {
              thdata.weight_low = th.Low_value;
              thdata.weight_high = th.High_value;
            }

            dataSetthresold.push(thdata);
          });
        }
if(dataSetthresold.length>1){
  setadminthresold(dataSetthresold.filter((curr)=>curr.UserId.includes("ADMIN_1631483185423")));
  console.log(dataSetthresold.filter((curr)=>curr.UserId.includes("ADMIN_1631483185423")),"dataSetthresold.filter((curr)=>curr.userId.includes(userid))")

}
      });
  };

  const fetchTimeLog = async (userid) => {
    await axios
    .get(
      apiUrl2 +
        "timelog",
        { params: { GSI1PK: "TIMELOG_READING_" + userid } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        const timelogData = response.data;
        console.log(timelogData,"tilogdata")
       
        const dataSettimeLog = [];

        timelogData.forEach((tl, index) => {
          
          let tldata = {};
          if (tl.id) {
            tldata.id = tl.id;
          }
          if (tl.sk) {
            tldata.SK = tl.sk;
          }

          if (tl.taskType) {
            tldata.taskType = tl.taskType;
          }
          if (tl.performedBy) {
            tldata.performedBy = tl.performedBy;
          }
          if (tl.performedOn) {
            tldata.performedOn = Moment(tl.performedOn).format('YYYY-MM-DD hh:mm:ss A').toString();
          }
          if (tl.startDT) {
            tldata.startDT = tl.startDT;
          }
          if (tl.endDT) {
            tldata.endDT = tl.endDT;
          }
          if (tl.timeAmount) {
            tldata.timeAmount = tl.timeAmount;
          }
          if (tl.userName) {
            tldata.UserName = tl.userName;
          }

          dataSettimeLog.push(tldata);
        });

        setTimeLogData(dataSettimeLog);

       
      });
  };

  const fetchAllTimeLog = async () => {
    const token = localStorage.getItem("app_jwt");
   
   await axios
    .get(
      apiUrl2 +
        "timelog",{ params: { GSI1PK: "TIMELOG_READING_" } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
         
    )  .then((response) => {
        const timelogData = response.data;
       
        const dataSettimeLog = [];

        timelogData.forEach((tl, index) => {
         
          let tldata = {};

          if (tl.taskType) {
            tldata.taskType = tl.taskType;
          }
          if (tl.performedBy) {
            tldata.performedBy = tl.performedBy;
          }
          if (tl.performedOn) {
            tldata.performedOn = Moment(tl.performedOn).format('YYYY-MM-DD hh:mm:ss A').toString();
          }
          if (tl.startDT) {
            tldata.startDT = tl.startDT;
          }
          if (tl.endDT) {
            tldata.endDT = tl.endDT;
          }
          if (tl.timeAmount) {
            tldata.timeAmount = tl.timeAmount;
          }
          if (tl.userName) {
            tldata.UserName = tl.userName;
          }
          if (tl.gsI1SK) {
            tldata.UserId = tl.gsI1SK;
          }
          dataSettimeLog.push(tldata);
        });

        setAllTimeLogData(dataSettimeLog);

       
      });
  };

  const addDevice = async (deviceType, deviceId, patientId,userName) => {
  setdeviceDataForPatient([]);
    const token = localStorage.getItem("app_jwt");
    const date = new Date();
    const doctorId = "";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const SK = "DEVICE_" + deviceType + "_" + deviceId;

    if (deviceType == "" || deviceType == null) {
      alert("please select device");
      return;
    }

    if (deviceId == "" || deviceId == null) {
      alert("please enter device id");
      return;
    }

    const data = ({
      sk: SK,
      gsI1PK:"PATIENT_"+patientId,
      deviceId:deviceId,
      deviceType:deviceType
      
    });

    await axios
    .post(
      apiUrl2 +
        "device",data,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
         
        },
         
    )   .then((response) => {
        if (response.status === 200) {
          
          swal("success", "Device Inserted Successfully.", "success");
          fetchDeviceDataForPatient("PATIENT_" + patientId, userName, "patient");
          
        }
      });
  };

  const UpdateThreshold = async (patient, type, high, low, userType,time) => {
    // fetch Threshold.
    const token = localStorage.getItem("app_jwt");
    const data={
      id: time[0].id,
      sk: patient.toString(),
      high: high.toString(),
      low: low.toString(),
      tElements: type
    }

    await axios
    .put(
      apiUrl2 +
        "threshold",data,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
         
        },
         
    ).then((response) => {
      if (response.status === 200) {
        swal("success", "Threshold Update Successfully.", "success");
        //alert("Threshold Update Successfully.");
      } else {
        swal("error", "Threshold did not Update.", "error");
        // alert("");
      }
      });
    //Update
  };

  

  

  const UpdateProfie = async(userName, email, phone, dob, height, weight, bmi) => {
    console.log(patients)
    const patient=patients.filter((curr)=>curr.email===email);
    const userid = localStorage.getItem("userId");
    const token = localStorage.getItem("app_jwt");
    let userType = localStorage.getItem("userType");
    if (userType === "") userType = "patient";
    const data={
      id:patient.id,
sk:patient.sk,
activeStatus:"Active",
carecoordinatorId:patient.careId,
carecoordinatorName:patient.CareName,
city:patient.city,
coach:patient.CoachName,
coachId:patient.coachId,
connectionId:"",
contactNo:phone,
createdDate:patient.createdDate,
diagnosisId:patient.diagnosisId,
diastolic:patient.diastolic,
dob:dob,
doctorId:patient.ProviderId,
doctorName:patient.ProviderName,
email:patient.email,
firstName:patient.firstName,
gender:patient.gender,
gsI1PK:"patient",
gsI1SK:patient.ProviderId,
height:height,
lang:patient.language,
lastName:patient.lastName,
middleName:patient.middleName,
mobilePhone:phone,
notes:patient.notes,
otp:patient.otp,
profileImage:patient.profileImage,
reading:bmi,
st:patient.st,
street:patient.street,
systolic:patient.systolic,
userId:patient.userId,
userName:patient.userName,
userTimeZone:patient.userTimeZone,
userType:patient.userType,
weight:weight,
workPhone:patient.workPhone,
zip:patient.zip,
deviceId:patient.deviceId,
deviceStatus:patient.deviceStatus,
deviceType:patient.deviceType,
 }

 await axios
 .put(
   apiUrl2 +
     "patient",data,{
     headers: {
       'Content-Type': 'application/json',
       'accept': 'text/plain'
      }
      
     },
      
 )
      .then((response) => {
        if (response.status === 200) {
          swal("success", "Patient Deleted Successfully.", "success");
        }
      });
  };
 
  const fetchNameFromId = (id, array) => {
    const ent = array.filter((a) => a.value === id);
    return ent[0];
  };

  const UpdatePatient = async(
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
    diagnosisId,
    patient
  ) => {
    let providername = fetchNameFromId(provider, providerOptions);
    
    const token = localStorage.getItem("app_jwt");
    if(!phone||!mobilePhone||!birthDate){
      swal("error","Please fill all necessary details","error")
    } else{

    var providervalue = providerOptions.filter(
      (p) => p.name == "Select Provider"
    )[0];
    providervalue.value = "";
    var ccvalue = careCoordinatorOptions.filter(
      (p) => p.name == "Select Coordinator"
    )[0];
    ccvalue.value = "";
    var coachvalue = coachOptions.filter((p) => p.name == "Select Coach")[0];
    coachvalue.value = "";

    if (coordinator == "") coordinator = ccvalue.value;
    if (provider == "") provider = providervalue.value;
    if (coach == "") coach = coachvalue.value;

    let providername = fetchNameFromId(provider, providerOptions);
    let carecoordinatorname = fetchNameFromId(
      coordinator,
      careCoordinatorOptions
    );
    let coachname = fetchNameFromId(coach, coachOptions);

    let gendervalue = "";
   
    if (gender == 1) {
    
      gendervalue = "Female";
    }
    if (gender == 0) {
     
      gendervalue = "Male";
    }
    

    let languagevalue = "";
    if (language == 0) {
      languagevalue = "English";
     
    }
    if (language == 1) {
      languagevalue = "Spanish";
     
    }
    if (fname === undefined) fname = "";
    if (lname === undefined) lname = "";

    
    const data={
      id: patient.id,
      activeStatus: "Active",
carecoordinatorId: carecoordinatorname.value,
carecoordinatorName: carecoordinatorname.name,
city: city,
coach: coachname.name,
coachId: coachname.value,
connectionId: "",
contactNo: phone ,
createdDate: "",
deviceId: "",
deviceStatus: "",
deviceType: "",
diagnosisId: diagnosisId,
diastolic: "71.255",
dob: birthDate ,
doctorId: providername.value,
doctorName: providername.name,
email: patient.email,
firstName: fname ,
gender: gendervalue ,
gsI1PK: "patient",
gsI1SK: providername.value,
height: height ,
st: state,
lang: languagevalue,
lastName: lname ,
middleName: "",
mobilePhone: phone ,
notes: patient.notes,
otp: "",
profileImage: "",
reading: patient.BMI,
sk: patient.sk,
st: "undefined",
street: street,
systolic: patient.systolic,
userId: patient.userId,
userName:patient.userName,
userTimeZone: patient.userTimeZone,
userType: patient.userType,
weight: patient.Weight,
workPhone: workPhone,
zip: zip,
    }
    
    await axios
    .put(
      apiUrl2 +
        "patient",data,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
         
        },
         
    )
      .then((response) => {
        if (response.status === 200) {
          // alert("");
          swal("success", "Patient data Update Successfully.", "success");
      
        } else {
          //alert("Patient data did not Update  Successfully.");
          swal("error", "Patient data did not Update  Successfully.", "error");
        }
      });
    }
  };

  const AssignCareTeam =async (provider, coordinator, coach, patient) => {
    const token = localStorage.getItem("app_jwt");
    let providername = fetchNameFromId(provider, providerOptions);
    let carecoordinatorname = fetchNameFromId(
      coordinator,
      careCoordinatorOptions
    );
    let coachname = fetchNameFromId(coach, coachOptions);
    
    const data1={
      id:patient.id,
sk:patient.sk,
activeStatus:"Active",
carecoordinatorId:carecoordinatorname.value,
carecoordinatorName:carecoordinatorname.name,
city:patient.city,
coach:coachname.name,
coachId:coachname.value,
connectionId:"",
contactNo:patient.mobile,
createdDate:patient.createdDate,
diagnosisId:patient.diagnosisId,
diastolic:patient.diastolic,
dob:patient.dob,
doctorId:providername.value,
doctorName:providername.name,
email:patient.email,
firstName:patient.firstName,
gender:patient.gender,
gsI1PK:"patient",
gsI1SK:providername.value,
height:patient.height,
lang:patient.language,
lastName:patient.lastName,
middleName:patient.middleName,
mobilePhone:patient.mobile,
notes:patient.notes,
otp:patient.otp,
profileImage:patient.profileImage,
reading:patient.BMI,
st:patient.st,
street:patient.street,
systolic:patient.systolic,
userId:patient.userId,
userName:patient.userName,
userTimeZone:patient.userTimeZone,
userType:patient.userType,
weight:patient.weight,
workPhone:patient.workPhone,
zip:patient.zip,
deviceId:patient.deviceId,
deviceStatus:patient.deviceStatus,
deviceType:patient.deviceType,
 }
    if (providername.value === "") {
      alert("Please select provider.");
      return;
    }
    await axios
    .put(
      apiUrl2 +
        "patient",data1,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
         
        },
         
    )
    
      .then((response) => {
        if (response.status === 200) {
          //alert("");
          swal("success", "Data update Successfully.", "success");
        } else {
         
          // alert("");
          swal("error", "Data did did not Update  Successfully.", "error");
        }
      });
  };

  const UpdateProvider = async(username, mobile, email, patientId,doctor) => {
    const token = localStorage.getItem("app_jwt");

    const data ={
      id: doctor.id,
      sk: patientId,
      activeStatus: "Active",
      contactNo: mobile,
      createdDate: doctor.CreatedDate,
      email: email,
      gsI1PK: "string",
      gsI1SK: patientId,
      userId: "string",
      userName: username,
      userType: "doctor"
    }

    await axios
    .put(
      apiUrl2 +
        "doctor",data,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
         
        },
         
    )
      .then((response) => {
        console.log("updated responsee",response);
        if (response.status === 200) {
          alert("Provider has been updated");
        }
        else{
          alert("data not updated")
        }
      });
  };

  const UpdateCareCoordinator = async(username, mobile, email, patientId,doctor) => {
    const token = localStorage.getItem("app_jwt");

    const data ={
      id: doctor.id,
      sk: patientId,
      activeStatus: "Active",
      contactNo: mobile,
      createdDate: doctor.createdDate,
      email: email,
      gsI1PK: "string",
      gsI1SK: patientId,
      userId: "string",
      userName: username,
      userType: "Care Coordinator"
    }

    await axios
    .put(
      apiUrl2 +
        "carecoordinator",data,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
         
        },
         
    )
      .then((response) => {
        console.log("updated responsee",response);
        if (response.status === 200) {
          alert("care coordinator has been updated");
        }
        else{
          alert("data not updated")
        }
      });
  };

  const UpdateCoach =async(username, mobile, email, patientId,doctor) => {
  
    const token = localStorage.getItem("app_jwt");

    const data ={
      id: doctor.id,
      sk: patientId,
      activeStatus: "Active",
      contactNo: mobile,
      createdDate: doctor.createdDate,
      email: email,
      gsI1PK: "string",
      gsI1SK: patientId,
      userId: "string",
      userName: username,
      userType: "coach"
    }

    await axios
    .put(
      apiUrl2 +
        "coach",data,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
         
        },
         
    )  .then((response) => {
        if (response.status === 200) {
          alert("Coach Update Successfully.");
          fetchCoach();
        } else {
          alert("Patient data did not Update  Successfully.");
        }
      });
  };

  const DeletePatient = async(patient) => {
    const token = localStorage.getItem("app_jwt");
    const data={
      id:patient.id,
sk:patient.sk,
activeStatus:"Deactive",
carecoordinatorId:patient.careId,
carecoordinatorName:patient.CareName,
city:patient.city,
coach:patient.CoachName,
coachId:patient.coachId,
connectionId:"",
contactNo:patient.mobile,
createdDate:patient.createdDate,
diagnosisId:patient.diagnosisId,
diastolic:patient.diastolic,
dob:patient.dob,
doctorId:patient.ProviderId,
doctorName:patient.ProviderName,
email:patient.email,
firstName:patient.firstName,
gender:patient.gender,
gsI1PK:"patient",
gsI1SK:patient.ProviderId,
height:patient.height,
lang:patient.language,
lastName:patient.lastName,
middleName:patient.middleName,
mobilePhone:patient.mobile,
notes:patient.notes,
otp:patient.otp,
profileImage:patient.profileImage,
reading:patient.BMI,
st:patient.st,
street:patient.street,
systolic:patient.systolic,
userId:patient.userId,
userName:patient.userName,
userTimeZone:patient.userTimeZone,
userType:patient.userType,
weight:patient.weight,
workPhone:patient.workPhone,
zip:patient.zip,
deviceId:patient.deviceId,
deviceStatus:patient.deviceStatus,
deviceType:patient.deviceType,
 }

 await axios
 .put(
   apiUrl2 +
     "patient",data,{
     headers: {
       'Content-Type': 'application/json',
       'accept': 'text/plain'
      }
      
     },
      
 )
      .then((response) => {
        if (response.status === 200) {
          swal("success", "Patient Deleted Successfully.", "success");
        }
      });
  };
  const DeleteDoctor = async(doctor) => {
  
   const data1 ={
    id: doctor.id,
    sk: doctor.doctor_id,
    activeStatus: "Deactive",
    contactNo: doctor.phone,
    createdDate: doctor.CreatedDate,
    email: doctor.email,
    "gsI1PK": "string",
    "gsI1SK": doctor.doctor_id,
    "userId": "string",
    "userName": doctor.provider,
    "userType": "doctor"
  }

 await axios
 .put(
   apiUrl2 +
     "doctor",data1,{
     headers: {
       'Content-Type': 'application/json',
       'accept': 'text/plain'
      }
      
     },
      
 )
      .then((response) => {
        if (response.status === 200) {
          swal("success", "Patient Deleted Successfully.", "success");
        }
      });
  };
  const DeleteCareCoordinator = async(doctor) => {
  
    const data1 ={
     id: doctor.id,
     sk: doctor.doctor_id,
     activeStatus: "Deactive",
     contactNo: doctor.phone,
     createdDate: doctor.CreatedDate,
     email: doctor.email,
     "gsI1PK": "string",
     "gsI1SK": doctor.doctor_id,
     "userId": "string",
     "userName": doctor.provider,
     "userType": "Care Coordinator"
   }
 
  await axios
  .put(
    apiUrl2 +
      "carecoordinator",data1,{
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain'
       }
       
      },
       
  )
       .then((response) => {
         if (response.status === 200) {
           swal("success", "Care Coordinator Deleted Successfully.", "success");
         }
       });
   };
   const DeleteCoach = async(doctor) => {
  
    const data1 ={
     id: doctor.id,
     sk: doctor.doctor_id,
     activeStatus: "Deactive",
     contactNo: doctor.phone,
     createdDate: doctor.CreatedDate,
     email: doctor.email,
     "gsI1PK": "string",
     "gsI1SK": doctor.doctor_id,
     "userId": "string",
     "userName": doctor.name,
     "userType": "coach"
   }
 
  await axios
  .put(
    apiUrl2 +
      "coach",data1,{
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain'
       }
       
      },
       
  )
       .then((response) => {
         if (response.status === 200) {
           swal("success", "Coach Deleted Successfully.", "success");
           fetchCoach();
         }
       });
   };
  const ActivatePatient = async(patient) => {
    const token = localStorage.getItem("app_jwt");

    const data={
      id:patient.id,
sk:patient.sk,
activeStatus:"Active",
carecoordinatorId:patient.careId,
carecoordinatorName:patient.CareName,
city:patient.city,
coach:patient.CoachName,
coachId:patient.coachId,
connectionId:"",
contactNo:patient.mobile,
createdDate:patient.createdDate,
diagnosisId:patient.diagnosisId,
diastolic:patient.diastolic,
dob:patient.dob,
doctorId:patient.ProviderId,
doctorName:patient.ProviderName,
email:patient.email,
firstName:patient.firstName,
gender:patient.gender,
gsI1PK:"patient",
gsI1SK:patient.ProviderId,
height:patient.height,
lang:patient.language,
lastName:patient.lastName,
middleName:patient.middleName,
mobilePhone:patient.mobile,
notes:patient.notes,
otp:patient.otp,
profileImage:patient.profileImage,
reading:patient.BMI,
st:patient.st,
street:patient.street,
systolic:patient.systolic,
userId:patient.userId,
userName:patient.userName,
userTimeZone:patient.userTimeZone,
userType:patient.userType,
weight:patient.weight,
workPhone:patient.workPhone,
zip:patient.zip,
deviceId:patient.deviceId,
deviceStatus:patient.deviceStatus,
deviceType:patient.deviceType,
 }

 await axios
 .put(
   apiUrl2 +
     "patient",data,{
     headers: {
       'Content-Type': 'application/json',
       'accept': 'text/plain'
      }
      
     },
      
 )
      .then((response) => {
        if (response.status === 200) {
        swal("success", "Patient Activated Successfully.", "success");
        }
      });
  };

  const DeleteTimeLog = (timelog) => {
    setTimeLogData([]);
    

    axios.delete(apiUrl2+"timelog", { params: { id: timelog.id } })  .then((response) => {
      console.log(response,"delete response")
        if (response.status === 200) {
          // alert("1 Entry of TimeLog Deleted Successfully.");
          swal(
            "success",
            "One Entry of TimeLog Deleted Successfully.",
            "success"
          );
        }
      });
  };

  const DeleteCareTeam = (patientId, careTeamType, careTeamTypeMsg) => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      TableName: userTable,
      Key: {
        SK: { S: "" + patientId + "" },
        PK: { S: careTeamType },
      },
      UpdateExpression: "SET ActiveStatus = :v_ActiveStatus",
      ExpressionAttributeValues: { ":v_ActiveStatus": { S: "Deactive" } },
    };

    axios
      .post(apiUrl + "/DynamoDbAPIs/updateitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Updated") {
          alert(careTeamTypeMsg + " Deleted Successfully.");
        }
      });
  };
  const DeleteDeviceData = (id,patientId,userName) => {
    setdeviceDataForPatient([]);
    const token = localStorage.getItem("app_jwt");

    axios.delete(apiUrl2+"device", { params: { id: id.id } })  
      .then((response) => {
        if (response.status ===200) {
          // alert("");
          swal("success", "Device Deleted Successfully.", "success");
 fetchDeviceDataForPatient("PATIENT_" + patientId, userName, "patient");
        } else {
          swal("error", "Server Error", "error");
        }
      });
  };

  const verifyProviderVerificationCode = (
    code,
    userName,
    careTeamType,
    url = ""
  ) => {
    const token = localStorage.getItem("app_jwt");
    console.log(code, userName);
    const data = {
      Username: userName,
      code: code,
    };

    axios
      .post(apiUrl + "/confirmsignup", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "User Confirmed") {
          alert("Record added successfully...");
          handleProviderModalClose();
          handlePatientConfirmationModalClose();
          let rf = resetForm + 1;
          setResetForm(rf);

          if (url) window.location.assign(url);
        }
      });
  };

  const addProvider = (name, email, phone, password) => {
    const token = localStorage.getItem("app_jwt");
    const date = new Date();
    const id = date.getTime();
    const data = {
      UserName: email,
      Email: email,
      Password: password,
    };

    axios
      .post(apiUrl + "/register", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then( (response) => {
        console.log(response)
        if (response.data === "Registered") {
          const data = 
          {
            
            "sk": "DOCTOR_" + id,
            "activeStatus": "Active",
            "contactNo": phone,
            "createdDate": Moment(date).format('MM-DD-YYYY hh:mm A').toString(),
            "email": email,
            "gsI1PK": "string",
            "gsI1SK": "DOCTOR_" + id,
            "userId": id.toString(),
            "userName": name,
            "userType": "doctor"
          }
        add2(data,"Doctor")
      } else {
        alert(response.data);
      }
    });
  };
  const add2=async(data,type)=>{
    await axios
    .post(
      apiUrl2 +
        type,data,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
         
        },
         
    ) .then((putresponse) => {
      console.log(putresponse,"putrre")
            
              if (putresponse) {
                alert("Verification code sent to your email " + data.email);
                handleProviderModalShow();
                if(type==="coach"){
                  fetchCoach();
                }
                //window.location.replace('confirm-user-screen.html?username='+useremail);
              } else {
                
              }
            })
            .catch((error)=>console.log(error,"api error"));
      
  }

  const Registration = (
    username,
    firstname,
    middleName,
    lastname,
    email,
    phone,
    password,
    dob,
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
    diagnosisId
  ) => {
    const token = localStorage.getItem("app_jwt");
    const date = new Date();
    const id = date.getTime();
    const data = {
      Username: username,
      Email: email,
      Password: password,
    };

    axios
      .post(apiUrl + "/register", data, {
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Registered") {
          const data = ({
            
            sk: "PATIENT_" + id, //"doctor",
            userId: id.toString(),
            userName: username,
            email: email,
            contactNo: phone,
            dob: dob,
            userType: "patient",
            createdDate: Moment(date).format('MM-DD-YYYY hh:mm A').toString(),
            firstName: firstname,
            middleName: middleName,
            lastName: lastname,
            activeStatus: "Active",
            gender: gender,
            doctorName: ppname,
            doctorId: pp,
            gsI1SK: pp,
            lang: language,
            workPhone: workPhone,
            mobilePhone: mobilePhone,
            street: street,
            zip: zip,
            city: city,
            st: state,
            diagnosisId: diagnosisId
          });

          
          
     axios
    .post(
      apiUrl2 +
        "patient",data,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
         
        },
         
    )  .then((putresponse) => {
              
              if (putresponse.status === 200) {
                alert("Verification code sent to your email " + email);
                handlePatientConfirmationModalShow();
                

                //window.location.replace('confirm-user-screen.html?username='+useremail);
              } else {
               
              }
            });
        } else {
          if (response.data == "User already exists")
            response.data = "Email already exists";
          alert(response.data);

        }
      });
  };

  const addCareCoordinator = (name, email, phone, password) => {
    const token = localStorage.getItem("app_jwt");
    const date = new Date();
    const id = date.getTime();
    const data = {
      Username: email,
      Email: email,
      Password: password,
    };

    axios
      .post(apiUrl + "/register", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Registered") {
          const data = 
          {
            
            "sk": "CARECOORDINATOR_" + id,
            "activeStatus": "Active",
            "contactNo": phone,
            "createdDate": Moment(date).format('MM-DD-YYYY hh:mm A').toString(),
            "email": email,
            "gsI1PK": "string",
            "gsI1SK": "CARECOORDINATOR_" + id,
            "userId": id.toString(),
            "userName": name,
            "userType": "Care Coordinator"
          }
        add2(data,"carecoordinator")
        } else {
          alert(response.data);
        }
      });
  };

  const addCoach = (name, email, phone, password) => {
    const token = localStorage.getItem("app_jwt");
    const date = new Date();
    const id = date.getTime();
    const data = {
      Username: email,
      Email: email,
      Password: password,
    };

    axios
      .post(apiUrl + "/register", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data === "Registered") {
          const data = 
          {
            
            "sk": "COACH_" + id,
            "activeStatus": "Active",
            "contactNo": phone,
            "createdDate": "string",
            "email": email,
            "gsI1PK": "string",
            "gsI1SK": "COACH_" + id,
            "userId": id.toString(),
            "userName": name,
            "userType": "coach"
          }
        add2(data,"coach")
        } else {
          alert(response.data);
        }
      });
        
  };

  const fetchDeviceData = async (patientId, username, usertype, type, patient) => {
    const token = localStorage.getItem("app_jwt");
    await axios
    .get(
      apiUrl2 +
        "device",
       
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        const deviceData = response.data;
        const dataSetdevice = [];
        console.log(response.data,"devicedata")
        let deviceType = "";
        if (deviceData.length === 0) {
          dataSetdevice.push("no device found");
        }

        //    console.log('deviceData', deviceData);
        deviceData.forEach((p, index) => {
          let devicedata = {};
          devicedata.id = p.id;

          
            devicedata.deviceID = p.deviceId;
          
          
            devicedata.DeviceType = p.deviceType;
          
          
            devicedata.patientId = p.gsI1PK;
          
          
            devicedata.sk = p.sk;

            if (patients.length > 0) {
              let patient = patients.filter(
                (p) => p.ehrId === devicedata.patientId
              );
              if (patient.length > 0) devicedata.username = patient[0].name;
            } else {
              devicedata.username = username;
            }
          
            
          if (devicedata.username !== undefined) dataSetdevice.push(devicedata);
          
        });

        if (dataSetdevice[0] !== "no device found") {
          setdeviceData(dataSetdevice);
        }

        if (type == "Weight") {
          fetchWSData(patientId, username, usertype, dataSetdevice);
        }
        if (type == "Blood Pressure") {
          fetchBloodPressure(patientId, username, usertype, dataSetdevice);
        }
        if (type == "Blood Glucose") {
        }
      });
  };
  const fetchDeviceDataForPatient = async (patientId, username, usertype, type, patient) => {
    const token = localStorage.getItem("app_jwt");
    await axios
    .get(
      apiUrl2 +
        "device",
       
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        const deviceData = response.data;
        const dataSetdevice = [];
        console.log(response.data,"devicedata")
        let deviceType = "";
        if (deviceData.length === 0) {
          dataSetdevice.push("no device found");
        }

        //    console.log('deviceData', deviceData);
        deviceData.forEach((p, index) => {
          let devicedata = {};
          devicedata.id = p.id;

          
            devicedata.deviceID = p.deviceId;
          
          
            devicedata.DeviceType = p.deviceType;
          
          
            devicedata.patientId = p.gsI1PK;
          
          
            devicedata.sk = p.sk;

            if (patients.length > 0) {
              let patient = patients.filter(
                (p) => p.ehrId === devicedata.patientId
              );
              if (patient.length > 0) devicedata.username = patient[0].name;
            } else {
              devicedata.username = username;
            }
          
            
          if (devicedata.username !== undefined && p.gsI1PK===patientId) dataSetdevice.push(devicedata);
        });

        
          setdeviceDataForPatient(dataSetdevice);
        

        if (type == "Weight") {
          fetchWSData(patientId, username, usertype, dataSetdevice);
        }
        if (type == "Blood Pressure") {
          fetchBloodPressure(patientId, username, usertype, dataSetdevice);
        }
        if (type == "Blood Glucose") {
        }
      });
  };

  const fetchProviders = async (isactive) => {
    const token = localStorage.getItem("app_jwt");
    
    let data = "";
    if (isactive) {
      data = {
       ActiveStatus: "Deactive"
      };
    } else {
      data = {
        ActiveStatus: "Active"
       };
    
      };
    

    await axios.get(
      apiUrl2 +
        "doctor",
        { params: data },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        const providerData = response.data;
       
        const dataSetdoctor = [];
        const pOptions = [{ value: "", name: "Select Provider" }];

        providerData.forEach((p, index) => {
         
          let providerdata = {};
          providerdata.id = p.id;
          providerdata.provider = p.userName;
          providerdata.email = p.email;
          providerdata.phone = p.contactNo;
          if (p.activeStatus !== undefined) {
            providerdata.ActiveStatus = p.activeStatus;
          }
          if (p.createdDate !== undefined) {
            providerdata.CreatedDate = p.createdDate;
          }

          if (p.sk !== undefined) {
            providerdata.doctor_id = p.sk;
          }
          
          dataSetdoctor.push(providerdata);
          pOptions.push({ value: p.sk, name: p.userName });
          
          
        });
        
        setdoctorData(dataSetdoctor);
        setProviderOptions(pOptions);
      })
      .catch((error) => {
       console.log(error,"error")
      });
  };

  const fetchCareCoordinator = async () => {
    const token = localStorage.getItem("app_jwt");
     const data = {
        ActiveStatus: "Active"
       };
    await axios.get(
      apiUrl2 +
        "carecoordinator",
        { params: data },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
       const careCoordinatorData = response.data;
        const dataSetcareCoordinator = [];
        const ccOptions = [{ value: "", name: "Select Coordinator" }];

        careCoordinatorData.forEach((p, index) => {
          console.log("p" + index, p);
          let ccdata = {};

          ccdata.id = p.id;
          ccdata.name = p.userName;
          ccdata.email = p.email;
          ccdata.phone = p.contactNo;

          if (p.sk !== undefined) {
            ccdata.doctor_id = p.sk;
          }
          if (p.createdDate !== undefined) {
            ccdata.createdDate = p.createdDate;
          }
          
          dataSetcareCoordinator.push(ccdata);
          ccOptions.push({ value: p.sk, name: p.userName });
        });
       
        setccData(dataSetcareCoordinator);
        setCoordinatorOptions(ccOptions);
      })
      .catch((error) => {
        console.log(error,"sadhil")
      });
  };

  const fetchCoach =async () => {
    const token = localStorage.getItem("app_jwt");

    const data = {
      ActiveStatus: "Active"
     };
  await axios.get(
    apiUrl2 +
      "coach",
      { params: data },
      {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain'
       }
      },
      
       
  )
    .then((response) => {
      const coachData = response.data;
        const dataSetcoach = [];
        const cOptions = [{ value: "", name: "Select Coach" }];

        coachData.forEach((p, index) => {
        

          let coachdata = {};
          coachdata.id = p.id;
          coachdata.name = p.userName;
          coachdata.email = p.email;
          coachdata.phone = p.contactNo;

          if (p.sk !== undefined) {
            coachdata.doctor_id = p.sk;
          }

          dataSetcoach.push(coachdata);
          cOptions.push({ value: p.sk, name: p.userName });
        });

        setcoachData(dataSetcoach);
        setCoachOptions(cOptions);
      })
      .catch(() => {
        relogin();
      });
  };

  // const fetchTaskTimerUser = () => {
  //   const token = localStorage.getItem("app_jwt");

  //   const data = {
  //     TableName: userTable,
  //     ProjectionExpression: "PK,SK,UserId",
  //     KeyConditionExpression: " UserId > :v_user_id ",
  //     FilterExpression: "  ActiveStatus = :v_status AND PK <> :v_PK",
  //     ExpressionAttributeValues: {
  //       ":v_PK": { S: "patient" },
  //       ":v_status": { S: "Active" },
  //       ":v_user_id": { S: 2 },
  //     },
  //   };

  //   axios
  //     .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         // "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((response) => {
  //       const taskTimerUserData = response.data;
  //       const dataSettaskTimerUserData = [];

  //       taskTimerUserData.forEach((p, index) => {
         

  //         let taskTimerUserdata = {};
  //         taskTimerUserdata.id = index;

  //         if (p.PK !== undefined) {
  //           taskTimerUserdata.user_id = p.SK.s;
  //         }

  //         if (p.UserName !== undefined) {
  //           taskTimerUserdata.user_name = p.UserName.s;
  //         }

  //         dataSettaskTimerUserData.push(taskTimerUserdata);
  //       });

  //       settasktimerUserData(dataSettaskTimerUserData);
  //     })
  //     .catch(() => {
  //       relogin();
  //     });
  // };

  function formatAMPM(date) {
    var d = new Date(date);
    //alert(d);
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = d.getFullYear();
    //alert(yy);
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime =
      mm + "-" + dd + "-" + yy + " " + hours + ":" + minutes + " " + ampm;
    //alert(strTime);
    //console.log(strTime);
    return strTime;
  }

  const fetchBloodPressureForNotification = async(userid, usertype,from,to) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = "DEVICE_BP_" + userid;
    }

   else{
    data="DEVICE_BP_";
   }
    await axios
    .get(
      apiUrl2 +
        "bp",
        { params: { GSI1PK: data } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        const bloodpressureData = response.data;
        console.log(bloodpressureData,"bloodpressureData")
        
        const dataSetbp = [];
        if (bloodpressureData.length === 0) {
          dataSetbp.push("No Data Found");
        }

        bloodpressureData.forEach((bp, index) => {
          //   console.log('p' + index, bg);
          let bpdata = {};
          bpdata.id = bp.id;
          if (bp.gsI1PK !== undefined) {
            bpdata.gSI1PK = bp.gsI1PK;
            bpdata.UserId = bp.gsI1PK.split("_").pop();
           
          }
         
          if (bp.userName !== undefined) {
            bpdata.UserName = bp.userName;
          }

          if (bp.irregular !== undefined) {
            bpdata.irregular = bp.irregular;
          }
          if (bp.systolic !== undefined) {
            bpdata.systolic = parseFloat(bp.systolic).toFixed(0);
          }
          if (bp.diastolic !== undefined) {
            bpdata.diastolic = parseFloat(bp.diastolic).toFixed(0);
          }
          if (bp.pulse !== undefined) {
            bpdata.Pulse = bp.pulse;
          }
          if (bp.timeSlots !== undefined) {
            bpdata.timeSlots = bp.timeSlots;
          }
          if (bp.measurementDateTime !== undefined) {
            bpdata.MeasurementDateTime = bp.measurementDateTime;
            bpdata.MeasurementDateTime = new Date(bpdata.MeasurementDateTime);
            bpdata.sortDateColumn = bp.measurementDateTime;
            //  bpdata.MeasurementDateTime =Moment(bpdata.MeasurementDateTime).format('MM-DD-YYYY hh:mm A');
          }

          if (bp.createdDate !== undefined) {
            bpdata.CreatedDate = bp.createdDate;
            bpdata.CreatedDate = new Date(bpdata.CreatedDate);
            //bpdata.CreatedDate =Moment(bpdata.CreatedDate).format('MM-DD-YYYY hh:mm A');
          }

          // bpdata.date_recorded = bp.date_recorded.s;

          if (bp.deviceId !== undefined) {
            bpdata.DeviceId = bp.deviceId;
          }

          if (bp.IMEI !== undefined) {
            bpdata.DeviceId = bp.IMEI;
          }

          if (bp.sk !== undefined) {
            bpdata.readingId = bp.sk.split("_").pop();
          }

          if (bp.actionTaken !== undefined) {
            bpdata.actionTaken = bp.actionTaken;
          }

          dataSetbp.push(bpdata);
        });

        

        setbloodpressureDataForNotification(dataSetbp.filter((curr)=>curr.CreatedDate>new Date(from) && curr.CreatedDate<new Date(to)));
      });
  };
  const fetchBloodPressureForDashboard = async (userid, usertype,from,to) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = "DEVICE_BP_" + userid;
    }

   else{
    data="DEVICE_BP_";
   }
    await axios
    .get(
      apiUrl2 +
        "bp",
        { params: { GSI1PK: data } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        const bloodpressureData = response.data;
        console.log(bloodpressureData,"bloodpressureData")
        
        const dataSetbp = [];
        if (bloodpressureData.length === 0) {
          dataSetbp.push("No Data Found");
        }

        bloodpressureData.forEach((bp, index) => {
          //   console.log('p' + index, bg);
          let bpdata = {};
          bpdata.id = bp.id;
          if (bp.gsI1PK !== undefined) {
            bpdata.gSI1PK = bp.gsI1PK;
            bpdata.UserId = bp.gsI1PK.split("_").pop();
           
          }
         
          if (bp.userName !== undefined) {
            bpdata.UserName = bp.userName;
          }

          if (bp.irregular !== undefined) {
            bpdata.irregular = bp.irregular;
          }
          if (bp.systolic !== undefined) {
            bpdata.systolic = parseFloat(bp.systolic).toFixed(0);
          }
          if (bp.diastolic !== undefined) {
            bpdata.diastolic = parseFloat(bp.diastolic).toFixed(0);
          }
          if (bp.pulse !== undefined) {
            bpdata.Pulse = bp.pulse;
          }
          if (bp.timeSlots !== undefined) {
            bpdata.timeSlots = bp.timeSlots;
          }
          if (bp.measurementDateTime !== undefined) {
            bpdata.MeasurementDateTime = bp.measurementDateTime;
            bpdata.MeasurementDateTime = new Date(bpdata.MeasurementDateTime);
            bpdata.sortDateColumn = bp.measurementDateTime;
            //  bpdata.MeasurementDateTime =Moment(bpdata.MeasurementDateTime).format('MM-DD-YYYY hh:mm A');
          }

          if (bp.createdDate !== undefined) {
            bpdata.CreatedDate = bp.createdDate;
            bpdata.CreatedDate = new Date(bpdata.CreatedDate);
            //bpdata.CreatedDate =Moment(bpdata.CreatedDate).format('MM-DD-YYYY hh:mm A');
          }

          // bpdata.date_recorded = bp.date_recorded.s;

          if (bp.deviceId !== undefined) {
            bpdata.DeviceId = bp.deviceId;
          }

          if (bp.IMEI !== undefined) {
            bpdata.DeviceId = bp.IMEI;
          }

          if (bp.sk !== undefined) {
            bpdata.readingId = bp.sk.split("_").pop();
          }

          if (bp.actionTaken !== undefined) {
            bpdata.actionTaken = bp.actionTaken;
          }

          dataSetbp.push(bpdata);
        });

        setbloodpressureDataForDashboard(dataSetbp.filter((curr)=>curr.CreatedDate>new Date(from) && curr.CreatedDate<new Date(to)));
      });
  };
  const fetchBloodPressureForPatient = async (userid, usertype) => {
    
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = "DEVICE_BP_" + userid;
    }

   else{
    data="DEVICE_BP_";
   }
    await axios
    .get(
      apiUrl2 +
        "bp",
        { params: { GSI1PK: data } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )      .then((response) => {
        const bloodpressureData = response.data;
        
        const dataSetbp = [];
        if (bloodpressureData.length === 0) {
          dataSetbp.push("No Data Found");
        }

        bloodpressureData.forEach((bp, index) => {
          //   console.log('p' + index, bg);
          let bpdata = {};
          bpdata.id = index;
          if (bp.GSI1PK !== undefined) {
            bpdata.gSI1PK = bp.GSI1PK.s;
            bpdata.UserId = bp.GSI1PK.s.split("_").pop();
           
          }
         
          if (bp.UserName !== undefined) {
            bpdata.UserName = bp.UserName.s;
          }

          if (bp.irregular !== undefined) {
            bpdata.irregular = bp.irregular.n;
          }
          if (bp.systolic !== undefined) {
            bpdata.systolic = parseFloat(bp.systolic.n).toFixed(0);
          }
          if (bp.diastolic !== undefined) {
            bpdata.diastolic = parseFloat(bp.diastolic.n).toFixed(0);
          }
          if (bp.pulse !== undefined) {
            bpdata.Pulse = bp.pulse.n;
          }
          if (bp.TimeSlots !== undefined) {
            bpdata.timeSlots = bp.TimeSlots.s;
          }
          if (bp.MeasurementDateTime !== undefined) {
            bpdata.MeasurementDateTime = bp.MeasurementDateTime.s;
            bpdata.MeasurementDateTime = new Date(bpdata.MeasurementDateTime);
            bpdata.sortDateColumn = bp.MeasurementDateTime.s;
            //  bpdata.MeasurementDateTime =Moment(bpdata.MeasurementDateTime).format('MM-DD-YYYY hh:mm A');
          }

          if (bp.CreatedDate !== undefined) {
            bpdata.CreatedDate = bp.CreatedDate.s;
            bpdata.CreatedDate = new Date(bpdata.CreatedDate);
            //bpdata.CreatedDate =Moment(bpdata.CreatedDate).format('MM-DD-YYYY hh:mm A');
          }

          // bpdata.date_recorded = bp.date_recorded.s;

          if (bp.DeviceId !== undefined) {
            bpdata.DeviceId = bp.DeviceId.s;
          }

          if (bp.IMEI !== undefined) {
            bpdata.DeviceId = bp.IMEI.s;
          }

          if (bp.SK !== undefined) {
            bpdata.readingId = bp.SK.s.split("_").pop();
          }

          if (bp.ActionTaken !== undefined) {
            bpdata.actionTaken = bp.ActionTaken.s;
          }

          dataSetbp.push(bpdata);
        });

        setbloodpressureDataForPatient(dataSetbp);
      });
  };
  const fetchBloodPressure = async (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = "DEVICE_BP_" + userid;
    }

   else{
    data="DEVICE_BP_";
   }
    await axios
    .get(
      apiUrl2 +
        "bp",
        { params: { GSI1PK: data } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        const bloodpressureData = response.data;
        console.log(bloodpressureData,"bloodpressureData")
        
        const dataSetbp = [];
        if (bloodpressureData.length === 0) {
          dataSetbp.push("No Data Found");
        }

        bloodpressureData.forEach((bp, index) => {
          //   console.log('p' + index, bg);
          let bpdata = {};
          bpdata.id = bp.id;
          if (bp.gsI1PK !== undefined) {
            bpdata.gSI1PK = bp.gsI1PK;
            bpdata.UserId = bp.gsI1PK.split("_").pop();
           
          }
         
          if (bp.userName !== undefined) {
            bpdata.UserName = bp.userName;
          }

          if (bp.irregular !== undefined) {
            bpdata.irregular = bp.irregular;
          }
          if (bp.systolic !== undefined) {
            bpdata.systolic = parseFloat(bp.systolic).toFixed(0);
          }
          if (bp.diastolic !== undefined) {
            bpdata.diastolic = parseFloat(bp.diastolic).toFixed(0);
          }
          if (bp.pulse !== undefined) {
            bpdata.Pulse = bp.pulse;
          }
          if (bp.timeSlots !== undefined) {
            bpdata.timeSlots = bp.timeSlots;
          }
          if (bp.measurementDateTime !== undefined) {
            bpdata.MeasurementDateTime = bp.measurementDateTime;
            bpdata.MeasurementDateTime = new Date(bpdata.MeasurementDateTime);
            bpdata.sortDateColumn = bp.measurementDateTime;
            //  bpdata.MeasurementDateTime =Moment(bpdata.MeasurementDateTime).format('MM-DD-YYYY hh:mm A');
          }

          if (bp.createdDate !== undefined) {
            bpdata.CreatedDate = bp.createdDate;
            bpdata.CreatedDate = new Date(bpdata.CreatedDate);
            //bpdata.CreatedDate =Moment(bpdata.CreatedDate).format('MM-DD-YYYY hh:mm A');
          }

          // bpdata.date_recorded = bp.date_recorded.s;

          if (bp.deviceId !== undefined) {
            bpdata.DeviceId = bp.deviceId;
          }

          if (bp.IMEI !== undefined) {
            bpdata.DeviceId = bp.IMEI;
          }

          if (bp.sk !== undefined) {
            bpdata.readingId = bp.sk.split("_").pop();
          }

          if (bp.actionTaken !== undefined) {
            bpdata.actionTaken = bp.actionTaken;
          }

          dataSetbp.push(bpdata);
        });

        setbloodpressureData(dataSetbp);
      });
  };

  const fetchBloodGlucose = async (userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = "DEVICE_BG_" + userid;
    }

   else{
    data="DEVICE_BG_";
   }
    await axios
    .get(
      apiUrl2 +
        "bg",
        { params: { GSI1PK: data } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        const bloodglucoseData = response.data;
        console.log(response.data,"response.data")
        
        const dataSetbg = [];
        if (bloodglucoseData.length === 0) {
          dataSetbg.push("No Data Found");
        }
        
        bloodglucoseData.forEach((bg, index) => {
          //   console.log('p' + index, bg);
        
          let bgdata = {};
          bgdata.id = index;
          if (bg.gsI1PK !== undefined) {
            bgdata.gSI1PK = bg.gsI1PK;
            bgdata.userId = bg.gsI1PK.split("_").pop();
          }
          if (bg.userName !== undefined) {
            bgdata.UserName = bg.userName;
            if (bgdata.UserName == "Dale Cadwallader") {
              let test = "";
            }
          }

          if (bg.bloodGlucosemmol !== undefined) {
            bgdata.bloodglucosemmol = bg.bloodGlucosemmol
          }

          if (bg.bloodGlucosemgdl !== undefined) {
            bgdata.bloodglucosemgdl = bg.bloodGlucosemgdl
          }

          if (bg.before_Meal !== undefined) {
            if (bg.before_Meal.bool) bgdata.meal = "Before Meal";
            if (!bg.before_Meal.bool) bgdata.meal = "After Meal";
          }

          if (bg.battery !== undefined) {
            bgdata.battery = bg.battery;
          }
          if (bg.timeSlots !== undefined) {
            bgdata.timeSlots = bg.timeSlots;
          }
          if (bg.measurementDateTime !== undefined) {
            bgdata.MeasurementDateTime = bg.measurementDateTime;
            bgdata.MeasurementDateTime = new Date(bgdata.MeasurementDateTime);
            bgdata.sortDateColumn = bg.measurementDateTime;
            //bgdata.MeasurementDateTime =Moment(bgdata.MeasurementDateTime).format('MMM-DD-YYYY hh:mm A');
          }
          
          if (bg.createdDate !== undefined) {
            bgdata.CreatedDate = bg.createdDate;
            bgdata.CreatedDate = new Date(bgdata.CreatedDate);
            bgdata.sortDateColumn = Moment(bg.createdDate).format('YYYY-MM-DD hh:mm');
            // bgdata.CreatedDate =Moment(bgdata.CreatedDate);
          }

          if (bg.sk !== undefined) {
            bgdata.readingId = bg.sk.split("_").pop();
          }

          if (bg.deviceId !== undefined) {
            bgdata.DeviceId = bg.deviceId;
          }

          dataSetbg.push(bgdata);
        });

        setbloodglucoseData(dataSetbg);
      });
  };
  const fetchBloodGlucoseForPatient = (userid, usertype) => {
    
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";

    if (usertype === "patient") {
      data = {
        TableName: userTable,
        IndexName: "Patient-Doctor-Device-Index",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        KeyConditionExpression: "GSI1PK = :v_PK",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_BG_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }


    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const bloodglucoseData = response.data;
        console.log(response.data,"response.data")
        const dataSetbg = [];
        if (bloodglucoseData.length === 0) {
          dataSetbg.push("No Data Found");
        }
    

        bloodglucoseData.forEach((bg, index) => {
          //   console.log('p' + index, bg);
          let bgdata = {};
          bgdata.id = index;
          if (bg.GSI1PK !== undefined) {
            bgdata.gSI1PK = bg.GSI1PK.s;
            bgdata.userId = bg.GSI1PK.s.split("_").pop();
          }
          if (bg.UserName !== undefined) {
            bgdata.UserName = bg.UserName.s;
            if (bgdata.UserName == "Dale Cadwallader") {
              let test = "";
            }
          }

          if (bg.bloodglucosemmol !== undefined) {
            bgdata.bloodglucosemmol = parseFloat(bg.bloodglucosemmol.n).toFixed(
              0
            );
          }

          if (bg.bloodglucosemgdl !== undefined) {
            bgdata.bloodglucosemgdl = parseFloat(bg.bloodglucosemgdl.n).toFixed(
              0
            );
          }

          if (bg.before_meal !== undefined) {
            if (bg.before_meal.bool) bgdata.meal = "Before Meal";
            if (!bg.before_meal.bool) bgdata.meal = "After Meal";
          }

          if (bg.battery !== undefined) {
            bgdata.battery = bg.battery.n;
          }
          if (bg.TimeSlots !== undefined) {
            bgdata.timeSlots = bg.TimeSlots.s;
          }
          if (bg.MeasurementDateTime !== undefined) {
            bgdata.MeasurementDateTime = bg.MeasurementDateTime.s;
            bgdata.MeasurementDateTime = new Date(bgdata.MeasurementDateTime);
            bgdata.sortDateColumn = bg.MeasurementDateTime.s;
            //bgdata.MeasurementDateTime =Moment(bgdata.MeasurementDateTime).format('MMM-DD-YYYY hh:mm A');
          }
          
          if (bg.CreatedDate !== undefined) {
            bgdata.CreatedDate = bg.CreatedDate.s;
            bgdata.CreatedDate = new Date(bgdata.CreatedDate);
            bgdata.sortDateColumn = Moment(bg.CreatedDate.s).format('YYYY-MM-DD hh:mm');
            // bgdata.CreatedDate =Moment(bgdata.CreatedDate);
          }

          if (bg.SK !== undefined) {
            bgdata.readingId = bg.SK.s.split("_").pop();
          }

          if (bg.DeviceId !== undefined) {
            bgdata.DeviceId = bg.DeviceId.s;
          }

          dataSetbg.push(bgdata);
        });

        setbloodglucoseDataForPatient(dataSetbg);
      });
  };
  const fetchBloodGlucoseForNotification = async (userid, usertype,from,to) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = "DEVICE_BG_" + userid;
    }

   else{
    data="DEVICE_BG_";
   }
    await axios
    .get(
      apiUrl2 +
        "bg",
        { params: { GSI1PK: data } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        const bloodglucoseData = response.data;
        console.log(response.data,"response.data")
        
        const dataSetbg = [];
        if (bloodglucoseData.length === 0) {
          dataSetbg.push("No Data Found");
        }
        
        bloodglucoseData.forEach((bg, index) => {
          //   console.log('p' + index, bg);
        
          let bgdata = {};
          bgdata.id = index;
          if (bg.gsI1PK !== undefined) {
            bgdata.gSI1PK = bg.gsI1PK;
            bgdata.userId = bg.gsI1PK.split("_").pop();
          }
          if (bg.userName !== undefined) {
            bgdata.UserName = bg.userName;
            if (bgdata.UserName == "Dale Cadwallader") {
              let test = "";
            }
          }

          if (bg.bloodGlucosemmol !== undefined) {
            bgdata.bloodglucosemmol = bg.bloodGlucosemmol
          }

          if (bg.bloodGlucosemgdl !== undefined) {
            bgdata.bloodglucosemgdl = bg.bloodGlucosemgdl
          }

          if (bg.before_Meal !== undefined) {
            if (bg.before_Meal.bool) bgdata.meal = "Before Meal";
            if (!bg.before_Meal.bool) bgdata.meal = "After Meal";
          }

          if (bg.battery !== undefined) {
            bgdata.battery = bg.battery;
          }
          if (bg.timeSlots !== undefined) {
            bgdata.timeSlots = bg.timeSlots;
          }
          if (bg.measurementDateTime !== undefined) {
            bgdata.MeasurementDateTime = bg.measurementDateTime;
            bgdata.MeasurementDateTime = new Date(bgdata.MeasurementDateTime);
            bgdata.sortDateColumn = bg.measurementDateTime;
            //bgdata.MeasurementDateTime =Moment(bgdata.MeasurementDateTime).format('MMM-DD-YYYY hh:mm A');
          }
          
          if (bg.createdDate !== undefined) {
            bgdata.CreatedDate = bg.createdDate;
            bgdata.CreatedDate = new Date(bgdata.CreatedDate);
            bgdata.sortDateColumn = Moment(bg.createdDate).format('YYYY-MM-DD hh:mm');
            // bgdata.CreatedDate =Moment(bgdata.CreatedDate);
          }

          if (bg.sk !== undefined) {
            bgdata.readingId = bg.sk.split("_").pop();
          }

          if (bg.deviceId !== undefined) {
            bgdata.DeviceId = bg.deviceId;
          }

          dataSetbg.push(bgdata);
        });

        setbloodglucoseDataForNotification(dataSetbg.filter((curr)=>curr.CreatedDate>new Date(from) && curr.CreatedDate<new Date(to)));
      });
  };
  const fetchBloodGlucoseForDashboard =async (userid, usertype,from,to) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = "DEVICE_BG_" + userid;
    }

   else{
    data="DEVICE_BG_";
   }
    await axios
    .get(
      apiUrl2 +
        "bg",
        { params: { GSI1PK: data } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        const bloodglucoseData = response.data;
        console.log(response.data,"response.data")
        
        const dataSetbg = [];
        if (bloodglucoseData.length === 0) {
          dataSetbg.push("No Data Found");
        }
        
        bloodglucoseData.forEach((bg, index) => {
          //   console.log('p' + index, bg);
        
          let bgdata = {};
          bgdata.id = index;
          if (bg.gsI1PK !== undefined) {
            bgdata.gSI1PK = bg.gsI1PK;
            bgdata.userId = bg.gsI1PK.split("_").pop();
          }
          if (bg.userName !== undefined) {
            bgdata.UserName = bg.userName;
            if (bgdata.UserName == "Dale Cadwallader") {
              let test = "";
            }
          }

          if (bg.bloodGlucosemmol !== undefined) {
            bgdata.bloodglucosemmol = bg.bloodGlucosemmol
          }

          if (bg.bloodGlucosemgdl !== undefined) {
            bgdata.bloodglucosemgdl = bg.bloodGlucosemgdl
          }

          if (bg.before_Meal !== undefined) {
            if (bg.before_Meal.bool) bgdata.meal = "Before Meal";
            if (!bg.before_Meal.bool) bgdata.meal = "After Meal";
          }

          if (bg.battery !== undefined) {
            bgdata.battery = bg.battery;
          }
          if (bg.timeSlots !== undefined) {
            bgdata.timeSlots = bg.timeSlots;
          }
          if (bg.measurementDateTime !== undefined) {
            bgdata.MeasurementDateTime = bg.measurementDateTime;
            bgdata.MeasurementDateTime = new Date(bgdata.MeasurementDateTime);
            bgdata.sortDateColumn = bg.measurementDateTime;
            //bgdata.MeasurementDateTime =Moment(bgdata.MeasurementDateTime).format('MMM-DD-YYYY hh:mm A');
          }
          
          if (bg.createdDate !== undefined) {
            bgdata.CreatedDate = bg.createdDate;
            bgdata.CreatedDate = new Date(bgdata.CreatedDate);
            bgdata.sortDateColumn = Moment(bg.createdDate).format('YYYY-MM-DD hh:mm');
            // bgdata.CreatedDate =Moment(bgdata.CreatedDate);
          }

          if (bg.sk !== undefined) {
            bgdata.readingId = bg.sk.split("_").pop();
          }

          if (bg.deviceId !== undefined) {
            bgdata.DeviceId = bg.deviceId;
          }

          dataSetbg.push(bgdata);
        });

        setbloodglucoseDataForDashboard(dataSetbg.filter((curr)=>curr.CreatedDate>new Date(from) && curr.CreatedDate<new Date(to)));
      });
  };

  const backUpMessages = () => {
    axios.get("/backup-messages").then((response) => {
      const messages = response.data.messages;
      // console.log(response.data);
      const inb = messages.filter((message) => message.direction === "inbound");
      let inbs = [];
      let outbs = [];
      let iset = new Set();
      inb.forEach((imessage) => {
        //     alert(iset.has(imessage.from));
        if (!iset.has(imessage.from)) {
          iset.add(imessage.from);
          inbs.push(imessage);
        }
      });
      setInbox(inbs);
      const out = messages.filter(
        (message) => message.direction === "outbound-api"
      );

      let oset = new Set();
      out.forEach((omessage) => {
        if (!oset.has(omessage.to)) {
          oset.add(omessage.to);
          outbs.push(omessage);
        }
      });
      setOutbox(outbs);
    });
  };

  const fetchMessages = () => {
    axios.get("/messages").then((response) => {
      const messages = response.data.messages;
      //  console.log(response.data);
      const inb = messages.filter((message) => message.direction === "inbound");
      let inbs = [];
      let outbs = [];
      let iset = new Set();
      inb.forEach((imessage) => {
        //     alert(iset.has(imessage.from));
        if (!iset.has(imessage.from)) {
          iset.add(imessage.from);
          inbs.push(imessage);
        }
      });
      setInbox(inbs);
      const out = messages.filter(
        (message) => message.direction === "outbound-api"
      );

      let oset = new Set();
      out.forEach((omessage) => {
        if (!oset.has(omessage.to)) {
          oset.add(omessage.to);
          outbs.push(omessage);
        }
      });
      setOutbox(outbs);
    });
  };

  //chart Data
  const fetchBgChartData = async(userid, usertype) => {
  

    let data = "";
    if (usertype === "patient") {
      data = "DEVICE_BG_" + userid;
    }

   else{
    data="DEVICE_BG_";
   }
    await axios
    .get(
      apiUrl2 +
        "bg",
        { params: { GSI1PK: data } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
       // setJwt(response.data);
        console.log("bgData", response.data);
        const bgData = response.data;
        const dataSetbg = [];

        bgData.forEach((p) => {
          let bgdata = {};
          let meal = "";
          bgdata.TimeSlots = p.timeSlots;
          bgdata.daterecorded = p.date_Recorded;
          if (p.before_Meal.bool === true) {
            meal = "Before Meal";
          } else {
            meal = "After Meal";
          }
          bgdata.meal = meal;

          dataSetbg.push(bgdata);
        });

        setbgChartData(dataSetbg);
      });
  };

  const fetchBpChartData = async(userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    const isAuth = localStorage.getItem("app_isAuth");
    if (isAuth === "yes") {
      setIsAuthenticated(true);
      setJwt(token);
      setUserId(userId);
    } else {
      relogin();
    }

    let data = "";
    if (usertype === "patient") {
      data = "DEVICE_BP_" + userid;
    }

   else{
    data="DEVICE_BP_";
   }
    await axios
    .get(
      apiUrl2 +
        "bp",
        { params: { GSI1PK: data } },
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
         const bpData = response.data;
        const dataSetbp = [];

        bpData.forEach((p) => {
          let bpdata = {};
          bpdata.UserName = p.userName;
          bpdata.systolic = p.systolic;
          bpdata.diastolic = p.diastolic;
          bpdata.pulse = p.pulse;
          if (p.timeSlots !== undefined) {
            bpdata.timeSlots = p.timeSlots;
          }
          bpdata.measurementDateTime = p.measurementDateTime;

          bpdata.diastolic = p.diastolic;

          dataSetbp.push(bpdata);
        });

        setbpChartData(dataSetbp);
      });
  };

  const fetchWSChartData = async(userid, usertype) => {
    const token = localStorage.getItem("app_jwt");
    console.log("fetchWSData : userId" + userId);

    
    let data = "";
    if (usertype === "patient") {
      data = {
        TableName: userTable,
        IndexName: "Patient-Doctor-Device-Index",
        KeyConditionExpression: "GSI1PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_WS_" + userid },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    if (usertype === "doctor") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression:
          "ActiveStatus <> :v_ActiveStatus AND GSI1PK IN (:v_GSI1PK1, :v_GSI1PK2)",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_WS_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
          ":v_GSI1PK1": { S: "DEVICE_WS_PATIENT_121524123727622" },
          ":v_GSI1PK2": { S: "DEVICE_WS_PATIENT_1627230254837" },
        },
      };
    }

    if (usertype === "admin") {
      data = {
        TableName: userTable,
        KeyConditionExpression: "PK = :v_PK",
        FilterExpression: "ActiveStatus <> :v_ActiveStatus",
        ExpressionAttributeValues: {
          ":v_PK": { S: "DEVICE_WS_READING" },
          ":v_ActiveStatus": { S: "Deactive" },
        },
      };
    }

    axios
      .post(apiUrl + "/DynamoDbAPIs/getitem", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
    const weightData = response.data;
        const dataSetweight = [];

        weightData.forEach((wt, index) => {
          console.log("p" + index, wt);
          let wtdata = {};
          wtdata.id = index;
          // if (wt.BMI !== undefined) {
          //     wtdata.bmi = wt.BMI.n;
          // }
          wtdata.gSI1PK = wt.GSI1PK.s;
          wtdata.deviceid = wt.DeviceId.n;
          wtdata.actionTaken = wt.ActionTaken.s;
          wtdata.weight = Math.round(wt.weight.n);
          if (wt.timeSlots !== undefined) {
            wtdata.timeSlots = wt.TimeSlots.s;
          }

          if (wt.MeasurementDateTime !== undefined) {
            wtdata.measurementDateTime = wt.MeasurementDateTime.s;
          }
          if (wt.MeasurementTimestamp !== undefined) {
            wtdata.measurementDateTimeStamp = wt.MeasurementTimestamp.n;
          }

          wtdata.username = wt.UserName.s;
          wtdata.batteryVoltage = wt.batteryVoltage.n;
          wtdata.signalStrength = wt.signalStrength.n;

          dataSetweight.push(wtdata);
          // console.log('pos', wtdata);
        });

        setwsChartData(dataSetweight);
      });
  };

  const AddTimeLog = async (
    taskType,
    performedBy,
    performedOn,
    timeAmount,
    startdate,
    patientId,
    userName
  ) => {
    setTimeLogData([]);
    const token = localStorage.getItem("app_jwt");
    console.log("dhhgdfsghfsfs", startdate);
    const date = new Date(startdate);
    const end = new Date(startdate);
    end.setSeconds(end.getSeconds() + timeAmount);

    if (performedOn == "" || performedOn == null) {
      alert("please enter performedOn");
      return;
    }

    if (taskType == null || taskType == "") {
      alert("please enter taskType");
      return;
    }

    if (performedBy == null || performedBy == "") {
      alert("please enter performedBy");
      return;
    }

    const data =  {
     
      
      SK:
        "TIMELOG_READING_" +
        taskType +
        
        "_" +
        timeAmount,
      GSI1PK: "TIMELOG_READING_PATIENT_" + patientId,
      GSI1SK: patientId,
      CreatedDate:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      UserName: userName,
      TaskType: taskType,
      PerformedBy: performedBy,
      PerformedOn: Moment(performedOn).format('MMM-DD-YYYY hh:mm:ss A'),
      TimeAmount: timeAmount.toString(),
      StartDT: Moment(date).format('MMM-DD-YYYY hh:mm:ss A'),
      EndDT: Moment(end).format('MMM-DD-YYYY hh:mm:ss A'),
      ActiveStatus: "Active",
    }
    await axios
    .post(
      apiUrl2 +
        "timelog",data,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
         
        },
         
    )
      .then((response) => {
        console.log(response,"check response of timelog")
        if (response.status) {
          console.log(response.data);
          swal("success", "TimeLog has been added successfully", "success");
          fetchTimeLog("PATIENT_" + patientId);
        }
      });
  };
  const AddNotification = async(Notification,usertype,userid) => {
    const token = localStorage.getItem("app_jwt");
    const data={
      sk:Notification,
      gsI1PK:"Notification_ADMIN_"+userid
    }
axios
.post(
apiUrl2 +
  "notification",data,{
  headers: {
    'Content-Type': 'application/json',
    'accept': 'text/plain'
   }
   
  },
   
)
.then((response) => {
    if (response.status === 200) {
          console.log(response.data);
          swal("success", "Notification has been marked as read.", "success");
        }
      });
  };
  const FetchNotification = async (userid) => {
    const token = localStorage.getItem("app_jwt");
    await axios
    .get(
      apiUrl2 +
        "notification",
        
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
            const notificationData = response.data;
        const notificationarray=[];
        if(notificationData.length===0){
          notificationarray.push("no data found")
        }

        notificationData.map((curr)=>{
          notificationarray.push(curr.sk)
          

         

        })
        setNotifications(notificationarray)
        console.log(notificationarray,"notificationarray")
        
      });
  };


  const UpdateTimeLog = async(
    timelog,
    taskType,
    performedBy,
    performeddate,
    time,
    patientId,
    userName
  ) => {
    const token = localStorage.getItem("app_jwt");
    setTimeLogData([]);
    

    const data =  ({
     
      id: timelog.id,
      SK:timelog.SK,
      GSI1PK: "TIMELOG_READING_PATIENT_" + patientId,
      GSI1SK: patientId,
      CreatedDate: timelog.createdDate,
      UserName: timelog.UserName,
      TaskType: taskType,
      PerformedBy: performedBy.toString(),
      PerformedOn: performeddate.toString(),
      TimeAmount: time.toString(),
      StartDT: timelog.startDT,
      EndDT: timelog.endDT,
      ActiveStatus: "Active",
    });
    await axios
    .put(
      apiUrl2 +
        "timelog",data,{
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
         
        },
         
    )
      .then((response) => {
        console.log("updated responsee",response);
        if (response.status === 200) {
          alert("TimeLog has been updated");
        }
      });
  };

  const fetchPatientWithDevice =async () => {
    const token = localStorage.getItem("app_jwt");

    await axios
    .get(
      apiUrl2 +
        "device",
       
        {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
         }
        },
        
         
    )
      .then((response) => {
        
         const deviceData = response.data;
        const dataSetdevice = [];

        //    console.log('deviceData', deviceData);
        deviceData.forEach((p, index) => {
          console.log("p" + index, p);
          let devicedata = {};
          devicedata.id = p.id;

          if (p.deviceId != undefined) {
            devicedata.deviceID = p.deviceId;
          }
          if (p.deviceType != undefined) {
            devicedata.DeviceType = p.deviceType;
          }

          if (p.gsI1PK != undefined) {
            devicedata.patientId = p.gsI1PK;
            if (patients.length > 0) {
              let patient = patients.filter(
                (p) => p.ehrId === devicedata.patientId
              );
              if (patient.length > 0) devicedata.username = patient[0].name;
            }
            // else{
            //     devicedata.username=username;
            // }
          }
          dataSetdevice.push(devicedata);
        });

        setPatientWDevice(dataSetdevice);
      });
  };

  const getTab1data = (data) => {
    setTab1data(data);
  };
  console.log("22:27", Tab1data.FirstName);
  // if (!Tab1data){
  //     return null
  // }else{
  //
  // }

  // Submit intake
  // const SubmitIntakeRequest = () => {
  //   const data = {
  //     firstname: Tab1data.FirstName,
  //     lastname: Tab1data.LastName,
  //     email: Tab1data.EmailAddress,
  //     guarantoremail: Tab1data.EmailAddress,
  //     dob: Tab1data.DateOfBirth,
  //     ssn: "123456789",
  //     practiceId: "24451",
  //     deptId: "1",
  //   };
  //   axios
  //     .post(apiUrl + "/athenanet", data, {
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //       },
  //     })
  //     .then((deptResponse) => {
  //       let result = deptResponse;

  //       const dataSetdevice = [];
  //       dataSetdevice.push("finalid", result);
  //       setResult(dataSetdevice);
  //       console.log("finldaa", result.data);
  //       if (result.data.error !== undefined) {
  //         alert(result.data.error);
  //       } else {
  //         alert(result.data);
  //       }
  //     });
  // };

  return (
    <CoreContext.Provider
      value={{
        patients,
        bgData,
        bpData,
        wsData,
        bgChartData,
        bpChartData,
        wsChartData,
        deviceData,
        providerData,
        ccData,
        coachData,
        thresoldData,
        timeLogData,
        AlltimeLogData,
        bloodglucoseData,
        bloodpressureData,
        weightData,
        weightApiData,
        fetchDeviceData,
        patientWDevice,
        getdp,
        dpatient,
        login,
        fetchPatientListfromApi,
        inbox,
        fetchMessages,
        outbox,
    
        threads,
        patient,
        setPatient,
        jwt,
      
        fetchWSData,
        fetchBgChartData,
        fetchWSChartData,
        fetchBpChartData,
        fetchPatientWithDevice,
        tasktimerUserData,
        fetchThresold,
        fetchTimeLog,
        fetchAllTimeLog,
        backUpMessages,
        renderLoader,
        checkLocalAuth,
        addDevice,
        UpdateProfie,
        DeletePatient,
        DeleteTimeLog,
        DeleteCareTeam,
        DeleteDeviceData,
        userDetails,
        fetchProviders,
        addProvider,
        UpdateThreshold,
        fetchCareCoordinator,
        fetchCoach,
        
        addCareCoordinator,
        addCoach,
        AddTimeLog,
        UpdateTimeLog,
        UpdatePatient,
        AssignCareTeam,
        UpdateProvider,
        UpdateCareCoordinator,
        UpdateCoach,
        showProviderModal,
        handleProviderModalClose,
        verifyProviderVerificationCode,
        showPatientConfirmationModal,
        handlePatientConfirmationModalClose,
        fetchBloodPressure,
        fetchBloodGlucose,
        relogin,
        Registration,
        resetForm,
        providerOptions,
        coachOptions,
        careCoordinatorOptions,
        
        getTab1data,
        result,
        showForgotModal,
        handleForgotModalClose,
        handleForgotModalShow,
        genderOptions,
        languageOptions,
        adminthresold,
        fetchadminThresold,
        userinfo,
        AddNotification,
        FetchNotification,
        ForgotPassword,
        verifyForgotPassword,
        notifications,
        cleanup,setdefault,
        fetchBloodGlucoseForNotification,bloodglucoseDataForNotification,
        bloodpressureDataForNotification,fetchBloodPressureForNotification,
        fetchBloodGlucoseForDashboard,
        bloodglucoseDataForDashboard,
        bloodpressureDataForDashboard,
        fetchBloodPressureForDashboard,
        fetchBloodGlucoseForPatient,
        bloodglucoseDataForPatient,
        fetchBloodPressureForPatient,
        bloodpressureDataForPatient,
        fetchWSDataForPatient,
        weightDataForPatient,
        fetchPatientListfromApiForPatient,
        patientsForPatient,
        setccData,
        setcoachData,
      fetchDeviceDataForPatient,
      deviceDataForPatient,
      ActivatePatient,
      DeleteDoctor,
      cleanup1,
      setdoctorData,
      DeleteCareCoordinator,
      DeleteCoach
      }}>
      {props.children}
    </CoreContext.Provider>
  );
};

export default CoreContextProvider;

