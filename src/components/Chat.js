import React,{useEffect,useContext,useState} from 'react'
import { CoreContext } from "../context/core-context";
import axios from "axios";
import { Widget, addResponseMessage,handleToggle,renderCustomComponent,addUserMessage } from "react-chat-widget-2";
import "react-chat-widget-2/lib/styles.css";
import { io } from "socket.io-client";

import Loader from "react-loader-spinner";
import Moment from "moment";

const signal = require("@microsoft/signalr");

const Any = () => {
    
    const chatHistoryUrl="https://annexappapi.apatternplus.com/api/Chat/MyChat";
    const [chat,setchat]=useState([]);
    const [count,setcount]=useState(0);
    const email = localStorage.getItem("userEmail");
    const coreContext = useContext(CoreContext);
    
  console.log("check email of user", email);
  useEffect(() => {
    coreContext.userDetails(email,"")
   // coreContext.fetchPatientListfromApi("doctor",localStorage.getItem("userId"))
  },[])
  useEffect(() => {
    coreContext.userDetails(email,"")
   // coreContext.fetchPatientListfromApi("doctor",localStorage.getItem("userId"))
  },[])
  useEffect(() => {
    addResponseMessage("Welcome to this awesome chat!");
  }, []);
  
  const [enduser, setenduser] = useState();
  const [enduserName, setenduserName] = useState();
  var usertype;
  var userid;
  var doctorid;
  var doctorname;
  const getenduser=(user)=>{
    setenduser(user.userId)
    setenduserName(user.name)
    alert("please click on chat widget to see History")
    setchat([]);
    setcount(1);
    const token = localStorage.getItem("app_jwt");
    
     coreContext.fetchChatLink(1375,70)
  }

  const handleNewUserMessage=(newMessage)=>{
    console.log(`New message incoming! ${newMessage}`);
    const token = localStorage.getItem("app_jwt");
    var connection = new signal.HubConnectionBuilder().withUrl("https://annexappapi.apatternplus.com/chatHub").build();
    connection.serverTimeoutInMilliseconds = 6000000;
    const chat=()=>{
const sendmessage=()=>{
  var req = 
{   SenderSK: "DOCTOR_70" ,   //// PATIENT_Id from PatientTable  
ReceiverSK: "PATIENT_1375", Message: newMessage, MessageType: "Text", AuthToken:token }

connection.invoke("SendMessages", req).catch(function (err) {
  return console.error(err.toString())

}      )
}
sendmessage();
const ReceiveMessages=()=>{
  connection.on("ReceiveMessage", function (data) {
    console.log(data);      
  }); 
  
}

ReceiveMessages()


}    
connection.start().then(()=>chat())

connection.on("disconnect", function () {
  setTimeout(function () {
     connection.start();
  }, 5000); // Restart connection after 5 seconds.
}); 

  }
  

  
  
 

  
 
  const renderuser = () => {
    // if (coreContext.userinfo.length === 0) {
    //   return (
    //     <div
    //       style={{
    //         height: 680,
    //         width: "100%",
    //         display: "flex",
    //         justifyContent: "center",
    //         marginTop: "10px",
    //         alignItems: "center",
    //       }}>
    //       <Loader type="Circles" color="#00BFFF" height={100} width={100} />

    //     </div>
    //   );
    // }
    if (coreContext.userinfo.length > 0) {
      console.log("userdata from app", coreContext.userinfo);
      usertype = (coreContext.userinfo[0].userType!=="undefined")?coreContext.userinfo[0].userType:""
      if (usertype === "patient") {
        if(coreContext.userinfo[0].DoctorId!==undefined){
          doctorid = coreContext.userinfo[0].DoctorId.s
        }
        if(coreContext.userinfo[0].DoctorName!==undefined){
          doctorname = coreContext.userinfo[0].DoctorName.s
        }
        //doctorname = (coreContext.userinfo[0].DoctorName!=="undefined")?coreContext.userinfo[0].DoctorName.s:"";
      }
     
      userid = (coreContext.userinfo[0].sno!=="undefined")?coreContext.userinfo[0].sno:""
      console.log("checkusertype form pp", usertype, userid);
      
      return (
        <Widget
          title={enduserName}
          handleNewUserMessage={handleNewUserMessage}
          
          //handleToggle={()=>(alert("true"))}
        />
      );
    }
  };
  return (
    <div className="col">
    <div className="page-title-container mb-3">
    <div className="row">
    <div className="col mb-2">
    <h1 className="mb-2 pb-0 display-4" id="title">Chat
    </h1>
    <div>{renderuser()}</div>
    
    <div className="row">
    <div className="col-xl-12">
   
    <div className="card mb-3">	
    
    <div className="card-body">
    <div className="row">
    <div className="col-xl-12">
    <div className="table-responsive-sm mb-0">
    Please select the user whose chat history you want to see!!
    
    </div>
      
    
      
    </div>
      
    
    
    
    </div>
    <div className="row">
    <div className="col-xl-12">
    <div className="table-responsive-sm mb-0">
   {coreContext.patients.map((curr)=>
       <button onClick={()=>getenduser(curr)}> {curr.name}</button>
   )}
    
    </div>
      
    
      
    </div>
      
    
    
    
    </div>
    <div className="row">
    <div className="col-xl-12">
    <div className="table-responsive-sm mb-0">
    
    {(chat.length===0 && count===1)?
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
      </div>:""}
    </div>
      
    
      
    </div>
      
    
    
    
    </div>
    </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    
      </div>
  )
}

export default Any