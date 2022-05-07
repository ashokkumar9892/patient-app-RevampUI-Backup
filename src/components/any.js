import React,{useEffect,useContext,useState} from 'react'
import { CoreContext } from "../context/core-context";
import axios from "axios";
import { Widget, addResponseMessage,handleToggle } from "react-chat-widget-2";
import "react-chat-widget-2/lib/styles.css";
import { io } from "socket.io-client";

import Loader from "react-loader-spinner";
import Moment from "moment";
const signal = require("@microsoft/signalr");
const socket = io("https://demoapi.apatternplus.com/", {
  transports: ["websocket"],
});






const Any = () => {
    
    const chatHistoryUrl="https://patternclinicapis.harishparas.com/api/Chat/MyChat";
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
    
      const data = {
        AuthToken: localStorage.getItem("app_jwt"),
        SenderSK: "DOCTOR_120527155321379",
        ReceiverSK: "PATIENT_1650619112058",

    };
  
      axios
        .post(chatHistoryUrl, data, {
          headers: {
            Accept: "application/json, text/plain, */*",
            // "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
            console.log(response.data.chatlist)
            setchat(response.data.chatlist)
            if(response.data){
                response.data.chatlist.map((curr)=>
                addResponseMessage(curr.message)
                )
            }
            setcount(0);
         
        });
   
  }
  
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    const token = localStorage.getItem("app_jwt");
  
    var connection = new signal.HubConnectionBuilder().withUrl("https://patternclinicapis.harishparas.com/chatHub").build();
    var req = 
{SendersK: "DOCTOR_120527155321379", ReceiversK: "PATIENT_1650619112058", Message: newMessage, MessageType: "Text", AuthToken:token }

    connection.start()
    .then(() => connection.invoke("SendMessages", req)).catch(function (err) {
return console.error(err.toString());
});
connection.on("ReceiveMessage", function (data) {
    console.log(data,"older"); });

  };
 
  var oldmessage = null;
  var oldTimeInMilliseconds = null;
  var oldType = null;

  function validateMessage(message, date, type) {
    // check here msg and time... if time different is less than 10 second its same msg

    if (oldType == null) oldType = type;

    // check if this new is 1st time msg
    if (oldmessage == null && oldTimeInMilliseconds == null) {
      oldmessage = message;
      oldTimeInMilliseconds = date;
      return true;
    }

    if (oldmessage != null && oldTimeInMilliseconds != null) {
      // check if this new msg is same but diff is more than 10 sec, than add
      let seconds = date.diff(oldTimeInMilliseconds, "seconds");
      console.log("seconds" + seconds);
      if (oldmessage == message && oldType == type && seconds > 10) {
        oldmessage = message;
        oldTimeInMilliseconds = date;
        return true;
      }
      if (oldmessage.toString().trim() === message.toString().trim()) {
        // if this msg not same
        oldmessage = message;
        oldTimeInMilliseconds = date;
        return false;
      } else {
        oldmessage = message;
        oldTimeInMilliseconds = date;
        return true;
      }
    }
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
      usertype = (coreContext.userinfo[0].UserType.s!=="undefined")?coreContext.userinfo[0].UserType.s:""
      if (usertype === "patient") {
        if(coreContext.userinfo[0].DoctorId!==undefined){
          doctorid = coreContext.userinfo[0].DoctorId.s
        }
        if(coreContext.userinfo[0].DoctorName!==undefined){
          doctorname = coreContext.userinfo[0].DoctorName.s
        }
        //doctorname = (coreContext.userinfo[0].DoctorName!=="undefined")?coreContext.userinfo[0].DoctorName.s:"";
      }
     
      userid = (coreContext.userinfo[0].UserId.n!=="undefined")?coreContext.userinfo[0].UserId.n:""
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