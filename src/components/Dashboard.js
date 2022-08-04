/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { CoreContext } from "../context/core-context";
import { Bezier, Bezier2, Cash, GraphUp } from "react-bootstrap-icons";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "react-loader-spinner";
import Moment from "moment";
import "../css/dasboard.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";

import { Widget } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

const Dashboard = (props) => {
  const [date, setDate] = useState();
  const [userType, setUserType] = useState("");
  const d=new Date();
  const e=new Date();
  let Currmonth = d.getMonth();
  let lastDate=new Date(e.setFullYear(d.getFullYear()-1));
  const [month,setMonth]=useState(String(Currmonth));
  const coreContext = useContext(CoreContext);
  let zero = [];
  const nine = [];
  const nineteen = [];
  const thirtynine = [];
  const fiftynine = [];
  const sixty = [];
  const inactive = [];
  let zero1 = [];
  const nine1 = [];
  const nineteen1 = [];
  const thirtynine1 = [];
  const fiftynine1 = [];
  const sixty1 = [];
  const BillingRPM=[];
  const BillingCCM=[];
  const ccm=[];
  const rpm=[];
  const RPM16=[];
  const RPM11=[];
  const RPM6=[];
  const RPM1=[];
  const RPM0=[];
  const CCMPatient=[];
  const RPMPatient=[];
  const today=new Date();
  today.setDate(today.getDate() - 7);
  
  
  
  const months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
  let patientwdevice = [];

  useEffect(coreContext.checkLocalAuth, []);
  const handlecptcode=(cpt)=>{
    
    var str=""
    if(cpt.includes("label")){
    var obj=JSON.parse(cpt)
    for(var i=0;i<obj.length;i++){
      str=str+[...new Set(Object.values(obj[i]))]+","
    }
    return str
  }else return cpt
    
    

  }
  

  const fetchPatients = () => {
    const email = localStorage.getItem("app_userEmail");
  
    coreContext.userDetails(email);

    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("userId");
    coreContext.fetchAllTimeLog();

    if (userType === "admin") {
      coreContext.fetchPatientListfromApi("admin");
    } else {
      coreContext.fetchPatientListfromApi(userType, userId);
    }
    
    coreContext.fetchPatientWithDevice();
  };
  useEffect(fetchPatients, []);

  const fetchWeight = () => {
    let userType = localStorage.getItem("userType");
    let patientId = localStorage.getItem("userId");
    const today=new Date();
  
  
    var to=Moment(new Date()).format('YYYY-MM-DD')
    var from=Moment(today).format('YYYY-MM-DD')
      if(month===String(Currmonth)){
        to=Moment(new Date()).format('YYYY-MM-DD');
        today.setDate(today.getDate()-today.getDate()+1)
  
        from=Moment(today).format('YYYY-MM-DD')
  
      }else{
        today.setMonth(month)
        const Days30=[3,5,8,10]
        const Days31=[0,2,4,6,7,9,12]
        const Days28=[1]
        if(Days31.includes(Number(month))){
          today.setDate(31)
        }else 
        if(Days30.includes(Number(month))){
          today.setDate(30)
        }else 
        if(Days28.includes(Number(month))){
          today.setDate(28)
        }
        to=Moment(today).format('YYYY-MM-DD');
        today.setDate(1)
        from=Moment(today).format("YYYY-MM-DD")
        console.log(from,to,"form")
      }
    // check page if left side menu.
    if (window.location.href.substring("weight") > 0) {
    }
    if (window.location.href.indexOf("patient-summary") > 0) {
      patientId = localStorage.getItem("ehrId");
      userType = "patient";
      // clear this otherwise will be problem
      localStorage.removeItem("ehrId");
    }
    setUserType(userType);
    coreContext.fetchWSData(patientId, userType);
    coreContext.fetchBloodGlucoseForDashboard(patientId, userType,from,to);
    coreContext.fetchBloodPressureForDashboard(patientId, userType,from,to);
  };

  useEffect(fetchWeight, [coreContext.weightData.length,month]);
  const renderSelect=()=>{
    return(<>
     
      <div className="col-xl-3 col-6">
      <select className="form-select" value={month} onChange={(e)=>{setMonth(e.target.value);}} >
      <option selected="selected">Select the Month</option>
      {months.map((curr,index)=>{
        return(<option value={index}>{curr}</option>)
        
 })}
      
      </select>
      
      </div>
      </>
      
      )

    
  }
  const selectmonth=React.useMemo(()=>renderSelect(),[month])
  

  
  const wd = coreContext.weightData
    .map((curr) => curr.userId)
    .filter((item, i, ar) => ar.indexOf(item) === i);
  const bp = coreContext.bloodpressureData
    .map((curr) => curr.userId)
    .filter((item, i, ar) => ar.indexOf(item) === i);
  const bg = coreContext.bloodglucoseDataForDashboard
    .map((curr) => curr.userId)
    .filter((item, i, ar) => ar.indexOf(item) === i);
  const reading = [...wd, ...bp, ...bg];

  
  
  // useEffect(fetchdpatient, []);
  const setPatient = (p,description) => {
    console.log("sahil", p);
    
    let k=[];
    p.map((curr)=>{
      if(curr.includes(",")){
        k.push(curr.substring(0,curr.indexOf(",")))
      }
      else{
        k.push(curr)
      }

    })


    //   coreContext.setPatient(p);
    localStorage.setItem("d_patient", JSON.stringify(k));
    localStorage.setItem("d_days", JSON.stringify(p));
    localStorage.setItem("month", month);
    localStorage.setItem("DInformaion", description);
  };
  const setBPatient = (p) => {
    console.log("sahil", p);
    //   coreContext.setPatient(p);
    localStorage.setItem("B_patient", JSON.stringify(p));
  };



  const renderTimeLogs = () => {
    if (coreContext.patients.length == 0) {
      return (
        <div
          style={{
            height: 80,
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
    if (coreContext.patients.length > 0) {
      localStorage.setItem("patient_list",JSON.stringify(coreContext.patients))
      
      coreContext.patients.map((curr) => {
        console.log("sahilg",coreContext.AlltimeLogData)
        
        
        
        let patientTimelog = coreContext.AlltimeLogData.filter(
          (app) => app.UserId == curr.userId && Number(app.performedOn.substring(5,7))==Number(month)+1 && Number(app.performedOn.substring(0,4))==2022
        );
        let BP = coreContext.bloodpressureDataForDashboard.filter(
          (app) => app.UserId == curr.userId && Number(app.sortDateColumn.substring(5,7))==Number(month)+1 && Number(app.sortDateColumn.substring(0,4))==2022
        );
        let BG = coreContext.bloodglucoseDataForDashboard.filter(
          (app) => app.userId == curr.userId && Number(app.sortDateColumn.substring(5,7))==Number(month)+1 && Number(app.sortDateColumn.substring(0,4))==2022
        );
        let WS = coreContext.weightData.filter(
          (app) => app.userId == curr.userId && Number(app.sortDateColumn.substring(5,7))==Number(month)+1 && Number(app.sortDateColumn.substring(0,4))==2022
        );
        // let patientTimelog = patientTimelogAll.filter(
        //   (app) => Number(app.performedOn.substring(5,7))==Number(month)+1       );
        console.log(patientTimelog,BP,BG,WS,"patienttimelog")
        let bpdates=[];

        BP.map((bpcurr)=>{
          if(!bpdates.includes(Moment(bpcurr.CreatedDate).format("YYYY-MM-DD"))){
            bpdates.push(Moment(bpcurr.CreatedDate).format("YYYY-MM-DD"))
          }


        })
        BG.map((bgcurr)=>{
          if(!bpdates.includes(Moment(bgcurr.CreatedDate).format("YYYY-MM-DD"))){
            bpdates.push(Moment(bgcurr.CreatedDate).format("YYYY-MM-DD"))
          }


        })
        WS.map((wscurr)=>{
          if(!bpdates.includes(Moment(wscurr.CreatedDate).format("YYYY-MM-DD"))){
            bpdates.push(Moment(wscurr.CreatedDate).format("YYYY-MM-DD"))
          }


        })
        console.log("check days",bpdates)
        if(curr.program.includes("CCM")){
          CCMPatient.push(curr.userId+","+bpdates.length)
        }
        if(curr.program.includes("RPM")){
          RPMPatient.push(curr.userId+","+bpdates.length)
        }
        if(bpdates.length>=16 && curr.program.includes("RPM")){
          RPM16.push(curr.userId+","+bpdates.length)
        }
        if(bpdates.length>=11 && bpdates.length<=15 && curr.program.includes("RPM")){
          RPM11.push(curr.userId+","+bpdates.length)
        }
        if(bpdates.length>=6 && bpdates.length<=10 && curr.program.includes("RPM")){
          RPM6.push(curr.userId+","+bpdates.length)
        }
        if(bpdates.length>=0 && bpdates.length<=5 && curr.program.includes("RPM")){
          RPM1.push(curr.userId+","+bpdates.length)
        }
        if(bpdates.length==0 && curr.program.includes("RPM")==false){
          RPM0.push(curr.userId+","+bpdates.length)
        }
        
        if (patientTimelog.length > 0) {
          let totalTimeLog = 0;
          let totalTimeLogForDataReview = 0;

          patientTimelog.map((timelog) => {
            if(timelog.taskType==="CareCoordination"){
              totalTimeLog = Number(timelog.timeAmount) + totalTimeLog;
            }
            else if(timelog.taskType==="DataReview")
            totalTimeLogForDataReview = Number(timelog.timeAmount) + totalTimeLogForDataReview;
          });
         
          console.log("checking timelog", totalTimeLogForDataReview,curr,totalTimeLog);
          if (totalTimeLog >= 0 && totalTimeLog <= 60 && curr.program.includes("CCM")) {
            zero.push(curr.userId);
          } else if (totalTimeLog > 60 && totalTimeLog <= 600 && curr.program.includes("CCM")) {
            // setOnetonine(onetonine+1)
            nine.push(curr.userId);
            //nine=nine+1;
          } else if (totalTimeLog > 600 && totalTimeLog <= 1200 && curr.program.includes("CCM")) {
            // setOnetonine(onetonine+1)
            nineteen.push(curr.userId);
            //nine=nine+1;
          } else if (totalTimeLog > 1200 && totalTimeLog <= 2400 && curr.program.includes("CCM")) {
            // setOnetonine(onetonine+1)
            thirtynine.push(curr.userId);
            if(BillingCCM.length<1){
              BillingCCM.push({"id":BillingCCM.length+1+90,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLog,"rpmbills":0,"cptcode":curr.cptcodeforccm.slice(0,-1),"ccmbills":(Math.floor(totalTimeLog/1200)>3)?3:Math.floor(totalTimeLog/1200),"timeLeft":Math.floor((totalTimeLog/60).toFixed(3))%20,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
            }
            else{
              let count=0
              BillingCCM.map((obj)=>{
                
                if(Object.values(obj).includes(curr.userId)==true){
                  count=count+1
                }
              })
              if (count===0){
                BillingCCM.push({"id":BillingCCM.length+1+90,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLog,"rpmbills":0,"cptcode":curr.cptcodeforccm.slice(0,-1),"ccmbills":(Math.floor(totalTimeLog/1200)>3)?3:Math.floor(totalTimeLog/1200),"timeLeft":Math.floor((totalTimeLog/60).toFixed(3))%20,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
                console.log(bpdates)
              }
            }
            //nine=nine+1;
          } else if (totalTimeLog > 2400 && totalTimeLog <= 3600 && curr.program.includes("CCM")) {
            // setOnetonine(onetonine+1)
            fiftynine.push(curr.userId);
            if(BillingCCM.length<1){
              BillingCCM.push({"id":BillingCCM.length+1+90,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLog,"rpmbills":0,"cptcode":curr.cptcodeforccm.slice(0,-1),"ccmbills":(Math.floor(totalTimeLog/1200)>3)?3:Math.floor(totalTimeLog/1200),"timeLeft":Math.floor((totalTimeLog/60).toFixed(3))%20,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
              console.log(bpdates)
            }
            else{
              let count=0
              BillingCCM.map((obj)=>{
                
                if(Object.values(obj).includes(curr.userId)==true){
                  count=count+1
                }
              })
              if (count===0){
                BillingCCM.push({"id":BillingCCM.length+1+90,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLog,"rpmbills":0,"cptcode":curr.cptcodeforccm.slice(0,-1),"ccmbills":(Math.floor(totalTimeLog/1200)>3)?3:Math.floor(totalTimeLog/1200),"timeLeft":Math.floor((totalTimeLog/60).toFixed(3))%20,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
                
              }
            }
           
            //nine=nine+1;
          } else if (totalTimeLog > 3600 && curr.program.includes("CCM")) {
            // setOnetonine(onetonine+1)
            sixty.push(curr.userId);
            if(BillingCCM.length<1){
              BillingCCM.push({"id":BillingCCM.length+1+90,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLog,"rpmbills":0,"cptcode":curr.cptcodeforccm.slice(0,-1),"ccmbills":(Math.floor(totalTimeLog/1200)>3)?3:Math.floor(totalTimeLog/1200),"timeLeft":0,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
            console.log("ridlley 5764",Math.floor((totalTimeLog/60).toFixed(3))%20,Math.floor((totalTimeLog/60).toFixed(3)),totalTimeLog,(totalTimeLog/60).toFixed(3))
            }
            else{
              let count=0
              BillingCCM.map((obj)=>{
                
                if(Object.values(obj).includes(curr.userId)==true){
                  count=count+1
                }
              })
              if (count===0){
                BillingCCM.push({"id":BillingCCM.length+1+90,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLog,"rpmbills":0,"cptcode":curr.cptcodeforccm.slice(0,-1),"ccmbills":(Math.floor(totalTimeLog/1200)>3)?3:Math.floor(totalTimeLog/1200),"timeLeft":0,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
                
              }
            }
            //nine=nine+1;
          }
          if (totalTimeLogForDataReview >= 0 && totalTimeLogForDataReview <= 60 && curr.program.includes("RPM")) {
            zero1.push(curr.userId);
          } else if (totalTimeLogForDataReview > 60 && totalTimeLogForDataReview <= 600 && curr.program.includes("RPM")) {
            // setOnetonine(onetonine+1)
            nine1.push(curr.userId);
            //nine=nine+1;
          } else if (totalTimeLogForDataReview > 600 && totalTimeLogForDataReview <= 1200 && curr.program.includes("RPM")) {
            // setOnetonine(onetonine+1)
            nineteen1.push(curr.userId);
            //nine=nine+1;
          } else if (totalTimeLogForDataReview >= 1200 && totalTimeLogForDataReview <2400 && curr.program.includes("RPM")) {
            // setOnetonine(onetonine+1)
            thirtynine1.push(curr.userId);
            if(BillingRPM.length<1){
              BillingRPM.push({"id":BillingRPM.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"ccmbills":0,"cptcode":curr.cptcodeforrpm.slice(0,-1),"rpmbills":(Math.floor(totalTimeLogForDataReview/1200)>3)?3:Math.floor(totalTimeLogForDataReview/1200),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
            }
            else{
              let count=0
              BillingRPM.map((obj)=>{
                
                if(Object.values(obj).includes(curr.userId)==true){
                  count=count+1
                }
              })
              if (count===0){
                BillingRPM.push({"id":BillingRPM.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"ccmbills":0,"cptcode":curr.cptcodeforrpm.slice(0,-1),"rpmbills":(Math.floor(totalTimeLogForDataReview/1200)>3)?3:Math.floor(totalTimeLogForDataReview/1200),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
                console.log(bpdates)
              }
            }
          } else if (totalTimeLogForDataReview >= 2400 && totalTimeLogForDataReview <= 3600 && curr.program.includes("RPM")) {
            // setOnetonine(onetonine+1)
            fiftynine1.push(curr.userId);
            if(BillingRPM.length<1){
              BillingRPM.push({"id":BillingRPM.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"ccmbills":0,"cptcode":curr.cptcodeforrpm.slice(0,-1),"rpmbills":(Math.floor(totalTimeLogForDataReview/1200)>3)?3:Math.floor(totalTimeLogForDataReview/1200),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
              console.log(bpdates)
            }
            else{
              let count=0
              BillingRPM.map((obj)=>{
                
                if(Object.values(obj).includes(curr.userId)==true){
                  count=count+1
                }
              })
              if (count===0){
                BillingRPM.push({"id":BillingRPM.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"ccmbills":0,"cptcode":curr.cptcodeforrpm.slice(0,-1),"rpmbills":(Math.floor(totalTimeLogForDataReview/1200)>3)?3:Math.floor(totalTimeLogForDataReview/1200),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
                
              }
            }
            //billing.push({"id":BillingRPM.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"ccmbills":0,"rpmbills":(Math.floor(totalTimeLogForDataReview/1200)>3)?3:Math.floor(totalTimeLogForDataReview/1200),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20})            
            
            //nine=nine+1;
          } else if (totalTimeLogForDataReview > 3600 && curr.program.includes("RPM")) {
            // setOnetonine(onetonine+1)
            console.log("sixty1",curr)
            sixty1.push(curr.userId);
            if(BillingRPM.length<1){
              BillingRPM.push({"id":BillingRPM.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"ccmbills":0,"cptcode":curr.cptcodeforrpm.slice(0,-1),"rpmbills":(Math.floor(totalTimeLogForDataReview/1200)>3)?3:Math.floor(totalTimeLogForDataReview/1200),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
            console.log("ridlley 5764",Math.floor(totalTimeLogForDataReview/60)%20,Math.floor(totalTimeLogForDataReview/60),totalTimeLogForDataReview,totalTimeLogForDataReview/60)
            }
            else{
              let count=0
              BillingRPM.map((obj)=>{
                
                if(Object.values(obj).includes(curr.userId)==true){
                  count=count+1
                }
              })
              if (count===0){
                BillingRPM.push({"id":BillingRPM.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"ccmbills":0,"cptcode":curr.cptcodeforrpm.slice(0,-1),"rpmbills":(Math.floor(totalTimeLogForDataReview/1200)>3)?3:Math.floor(totalTimeLogForDataReview/1200),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20,"RPM Mins":Math.floor(totalTimeLogForDataReview/60)+":"+totalTimeLogForDataReview%60,"CCM Mins":Math.floor(totalTimeLog/60)+":"+totalTimeLog%60,"Days Reading": [...new Set(bpdates)].length,"diagnosisId":curr.diagnosisId,"otp":curr.otp})
                console.log("ridlley 5764",Math.floor(totalTimeLogForDataReview/60)%20,Math.floor(totalTimeLogForDataReview/60),totalTimeLogForDataReview,totalTimeLogForDataReview/60,[...new Set(bpdates)].length,bpdates)
              }
            }
            //billing.push({"id":BillingRPM.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"ccmbills":0,"rpmbills":(Math.floor(totalTimeLogForDataReview/1200)>3)?3:Math.floor(totalTimeLogForDataReview/1200),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20})
          }
         
        } else {
          inactive.push(curr.userId);
        }
        
      
      
      
      
        console.log(BillingRPM,"BillingRPM")
      });
    }
  };
  const checkBills=(BillingRPM,BillingCCM)=>{
    let Bills=0
    BillingRPM.map((curr)=>{
      Bills=Bills+curr.rpmbills
    })
    BillingCCM.map((curr)=>{
      Bills=Bills+curr.ccmbills
    })
    return Bills
  

    
  }
  

  const renderRemotePatientMonitor = () => {
    if (
      coreContext.patientWDevice.length > 0 &&
      coreContext.patients.length > 0
    ) {
      coreContext.patientWDevice.map((patientData) => {
        let patient = coreContext.patients.filter(
          (p) => p.ehrId === patientData.patientId
        );
        if (patient.length > 0) {
          console.log("dshhsdffdfdhfdfd", patient);
          patientwdevice.push(patient[0].ehrId);
        }
      });
    }
    console.log("patientwdevice", patientwdevice);
  };

  const fetchDevice = () => {
    const patient = JSON.parse(localStorage.getItem("app_patient"));
    let patientId = localStorage.getItem("userId");
    let userType = localStorage.getItem("userType");
    let userName = localStorage.getItem("userName");
    if (patient != undefined) {
      if (patient.ehrId !== undefined) {
        patientId = patient.ehrId;
        userType = "patient";
        userName = patient.name;
      }
    }

    if (patientId !== undefined) {
      if (userType == "admin") {
        coreContext.fetchPatientListfromApi("admin", null);
        if (coreContext.patients.length > 0) {
          coreContext.fetchDeviceData(
            patientId,
            userName,
            userType,
            "",
            coreContext.patients
          );
        }
      }
    }
  };

  useEffect(fetchDevice, [coreContext.patients.length]);
  if (coreContext.deviceData.length > 0) {
    var v_devices = coreContext.deviceData.filter((s) =>
      s.deviceID !== undefined ? s.deviceID.length > 7 : null
    );
  }

  console.log("vdevide", v_devices);

  return (

<div className="col">
<div className="page-title-container mb-3">
<div className="row">
<div className="col mb-2">
<h1 className="mb-2 pb-0 display-4" id="title">A Pattern Medical Clinic Dashboard
</h1>

</div>
</div>
</div>
<div className="row">
<div className="col-xl-12">
<div className="card mb-3">
<div className="card-body">
<div className="row g-0 align-items-center">
<div className="col-lg-3 col-6">
<div className="form-check">
{/* <input className="form-check-input" type="checkbox"/>
<label className="form-check-label" for="gridCheck">Check me out</label> */}

</div>
</div>
<div className="col-lg-1">
<label  for="gridCheck">Select Month: </label>

</div>

	<div className="col-lg-8">{selectmonth}</div>

</div>
</div>
</div>
<div className="card mb-3">
	<div className="card-header bg-primary pt-2 pb-2"> <h3 className="text-white mb-0">Chronic Care Management</h3>
</div>
<div className="card-body">
<div className="row g-0 align-items-center">
<div className="col-xl-12">
<div className="table-responsive-sm mb-0">
<table className="table table-bordered table-striped mb-0">
<thead className="bg-defualts">
<tr>
<th  width="10%">Active	</th>
<th width="10%">60+ Mins</th>
<th width="10%">40-60 Mins	</th>
<th width="10%">20-40 Mins	</th>
<th width="10%">10-20 Mins	</th>
<th  width="10%">1-10 Mins	</th>
<th width="10%">0 Mins	</th>
<th  width="10%">Inactive</th>
<th width="10%">Not Enrolled
</th>
</tr>
</thead>
<tbody>
  {renderTimeLogs()}
<tr>
<td> <Link to="/dpatients" onClick={() => setPatient([... new Set(CCMPatient)],`${months[month]} 2022 Logs(CCM)`)}>{[... new Set(CCMPatient)].length}</Link>{" "}</td>
<td>   <Link to="/dpatients" onClick={() => setPatient(sixty,`${months[month]} 2022 60+ Mins Logs(CCM)`)}>
                {sixty.length}
              </Link>
               </td>
<td>
<Link to="/dpatients" onClick={() => setPatient(fiftynine,`${months[month]} 2022 40-60 Mins Logs(CCM)`)}>
                {fiftynine.length}
              </Link>
</td>
<td><Link to="/dpatients" onClick={() => setPatient(thirtynine,`${months[month]} 2022 20-40 Mins Logs(CCM)`)}>
                {thirtynine.length}
              </Link></td>
<td><Link to="/dpatients" onClick={() => setPatient(nineteen,`${months[month]} 2022 10-20 Mins Logs(CCM)`)}>
                {nineteen.length}
              </Link></td>
<td> <Link to="/dpatients" onClick={() => setPatient(nine,`${months[month]} 2022 1-10 Mins Logs(CCM)`)}>
                {nine.length}
              </Link></td>
<td> <Link to="/dpatients" onClick={() => setPatient(zero,`${months[month]} 2022 0-1 Mins Logs(CCM)`)}>
                {zero.length}
              </Link></td>
<td><Link to="/dpatients" onClick={() => setPatient(inactive,`${months[month]} 2022 0 Mins Logs(CCM)`)}>
                {inactive.length}
              </Link></td>
<td>0</td>
</tr>

</tbody>
</table>
</div>
	

	
</div>
	

</div>
</div>
</div>
	<div className="card mb-3">
	<div className="card-header bg-primary pt-2 pb-2"> <h3 className="text-white mb-0"> Data Review & Management
</h3>
</div>
<div className="card-body">
<div className="row g-0 align-items-center">
<div className="col-xl-12">
<div className="table-responsive-sm mb-0">
<table className="table table-bordered table-striped mb-0">
<thead className="bg-defualts">
<tr>
<th  width="10%">Active	</th>
<th width="10%">60+ Mins</th>
<th width="10%">40-60 Mins	</th>
<th width="10%">20-40 Mins	</th>
<th width="10%">10-20 Mins	</th>
<th  width="10%">1-10 Mins	</th>
<th width="10%">0 Mins	</th>
<th  width="10%">Inactive</th>
<th width="10%">Not Enrolled
</th>
</tr>
</thead>
<tbody>
  {renderTimeLogs()}
<tr>
<td> <Link to="/dpatients" onClick={() => setPatient([... new Set(RPMPatient)],`${months[month]} 2022 Logs(RPM)`)}>{[... new Set(RPMPatient)].length}</Link>{" "}</td>
<td>             <Link to="/dpatients" onClick={() => setPatient([...new Set(sixty1)],`Patients Information with time log between 60+ Mins of RPM of ${months[month]} month`)}>
                {[...new Set(sixty1)].length}
               </Link></td>
<td>
<Link to="/dpatients" onClick={() => setPatient([...new Set(fiftynine1)],`${months[month]} 2022 40-60 Mins Logs(RPM)`)}>
                {[...new Set(fiftynine1)].length}
              </Link></td>
<td> <Link to="/dpatients" onClick={() => setPatient([...new Set(thirtynine1)],`${months[month]} 2022 20-40 Mins Logs(RPM)`)}>
                {[...new Set(thirtynine1)].length}
              </Link></td>
<td><Link to="/dpatients" onClick={() => setPatient([...new Set(nineteen1)],`${months[month]} 2022 10-20 Mins Logs(RPM)`)}>
                {[...new Set(nineteen1)].length}
              </Link></td>
<td> <Link to="/dpatients" onClick={() => setPatient([...new Set(nine1)],`${months[month]} 2022 1-10 Mins Logs(RPM)`)}>
                {[...new Set(nine1)].length}
              </Link></td>
<td><Link to="/dpatients" onClick={() => setPatient([...new Set(zero1)],`${months[month]} 2022 0-1 Mins Logs(RPM)`)}>
                {[...new Set(zero1)].length}
              </Link></td>
<td> <Link to="/dpatients" onClick={() => setPatient([...new Set(inactive)],`${months[month]} 2022 0 Mins Logs(RPM)`)}>
                {[...new Set(inactive)].length}
              </Link></td>
<td>0</td>
</tr>

</tbody>
</table>
</div>
	

	
</div>
	

</div>
</div>
</div>
	<div className="card mb-3">
	<div className="card-header bg-primary pt-2 pb-2"> <h3 className="text-white mb-0">  Remote Patient Monitoring
</h3>
</div>
<div className="card-body">
<div className="row g-0 align-items-center">
<div className="col-xl-12">
<div className="table-responsive-sm mb-0">
<table className="table table-bordered table-striped mb-0">
<thead className="bg-defualts">
<tr>
<th  width="8%">Active</th>
<th width="20%">Patients with Devices	</th>
<th width="20%">Patients Taking Readings</th>

<th width="8%">16+ Days</th>
<th  width="8%">11-15 Days</th>
<th width="8%">6-10 Days</th>
<th  width="8%">0-5 Days</th>
<th width="8%">Inactive
</th>
</tr>
</thead>
<tbody>
  {renderRemotePatientMonitor()}
<tr>
<td><Link to="/dpatients" onClick={()=>setPatient([...new Set(RPMPatient)],"Remote Patient Monitoring")}>{[... new Set(RPMPatient)].length}</Link></td>
<td><Link to="/device-info" onClick={() => setPatient(inactive)}>
                 {[...new Set(patientwdevice)].length}
               </Link></td>
<td><Link to="/dpatients" onClick={()=>setPatient([...new Set([...RPM16,...RPM11,...RPM6,...RPM1])],"Days Information")}>{[...new Set([...RPM16,...RPM11,...RPM6,...RPM1])].length}</Link></td>

<td> <Link to="/dpatients" onClick={()=>setPatient([...new Set(RPM16)],"Days Information")}>{[...new Set(RPM16)].length}</Link></td>
<td> <Link to="/dpatients" onClick={()=>setPatient([...new Set(RPM11)],"Days Information")}>{[...new Set(RPM11)].length}</Link></td>
<td> <Link to="/dpatients" onClick={()=>setPatient([...new Set(RPM6)],"Days Information")}>{[...new Set(RPM6)].length}</Link></td>
<td> <Link to="/dpatients" onClick={()=>setPatient([...new Set(RPM1)],"Days Information")}>{[...new Set(RPM1)].length}</Link></td>
<td> <Link to="/dpatients" onClick={()=>setPatient([...new Set(RPM0)],"Days Information")}>{[...new Set(RPM0)].length}</Link></td>
</tr>

</tbody>
</table>
</div>
	

	
</div>
	

</div>
</div>
</div>
	<div className="card mb-3">
	<div className="card-header bg-primary pt-2 pb-2"> <h3 className="text-white mb-0">BillingRPM & Claims
</h3>
</div>
<div className="card-body">
<div className="row g-0 align-items-center">
<div className="col-xl-12">
<div className="table-responsive-sm mb-0">
<table className="table table-bordered table-striped mb-0">
<thead className="bg-defualts">
<tr>
<th  width="25%">Ready to Bill	</th>
<th width="25%">Missing Info	</th>
<th width="25%">Submitted</th>
<th width="25%">On hold</th>

</tr>
</thead>
<tbody>
<tr>
<td><Link to="/billing" onClick={()=>setBPatient([...BillingRPM,...BillingCCM])}>{checkBills(BillingRPM,BillingCCM)}
              {console.log(BillingRPM,"BillingRPM")}
               </Link></td>
<td><Link to="/billing">2</Link></td>
<td> <Link to="/Patients">2</Link></td>
<td><Link to="/Patients">2</Link></td>
</tr>

</tbody>
</table>
</div>
	

	
</div>
	

</div>
</div>
</div>
</div>
</div>
</div>

  );
};

export { Dashboard };
