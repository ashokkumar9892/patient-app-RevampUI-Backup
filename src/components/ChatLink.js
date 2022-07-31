import React,{useEffect,useContext,useState} from 'react';
import { CoreContext } from "../context/core-context";
import Button from 'react-bootstrap/Button';
import Loader from "react-loader-spinner";
import Modal from 'react-bootstrap/Modal';
const signal = require("@microsoft/signalr");
const ChatLink = () => {
    const coreContext = useContext(CoreContext);
    const [doctorid,setdoctorid]=useState();
    const [message,setMessage]=useState();
    const [show, setShow] = useState(false);
    const [pid,setpid]=useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    useEffect(()=>{

      try{
        
        if(localStorage.getItem("userType").includes("doctor")){
          coreContext.fetchChatLink(coreContext.userinfo[0].sno);
          setdoctorid(coreContext.userinfo[0].sno)

        }}
        catch(err)
        {
          //console.warn(err)
           window.location.assign("/login");
        }
        //console.log(coreContext.userinfo,"sahill")
        

    },[])
    const handleNewUserMessage=(pid,newMessage)=>{
      console.log(`New message incoming! ${newMessage}`);
      const token = localStorage.getItem("app_jwt");
      var connection = new signal.HubConnectionBuilder().withUrl("https://annexappapi.apatternplus.com/chatHub").build();
      connection.serverTimeoutInMilliseconds = 6000000;
      const chat=()=>{
  const sendmessage=()=>{
    var req = 
  {   SenderSK: "DOCTOR_"+doctorid ,   //// PATIENT_Id from PatientTable  
  ReceiverSK: "PATIENT_"+pid, Message: newMessage, MessageType: "Text", AuthToken:token }
  
  connection.invoke("SendMessages", req).catch(function (err) {
    return console.error(err.toString())
  
  }      )
  }
  sendmessage();
  const ReceiveMessages=()=>{
    connection.on("ReceiveMessage", function (data) {
      alert("Message Sent Succesfully")    
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
   


    const renderuser = (curr) => {
        if (coreContext.ChatLink.length === 0) {
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
        if (coreContext.ChatLink.length > 0) {
            
                const Name=(coreContext.ChatLink.filter((curr1)=>curr1.senderId==curr.id).length!==0)?coreContext.ChatLink.filter((curr1)=>curr1.senderId==curr.id)[0].chatLink.split(" ")[2]:"No Message from"+ curr.name
                const Link=(coreContext.ChatLink.filter((curr1)=>curr1.senderId==curr.id).length!==0)?coreContext.ChatLink.filter((curr1)=>curr1.senderId==curr.id)[0].chatLink.split(" ")[3]:"#"
return(
<div className="col-xl-4 mt-2">
            
                <div className="card">
              <div className="card-body">
                <h4 className="card-title">{Name}</h4>
                <p className="card-text">Please Click on below Link to continue existing Chat</p>
                <a href={Link} target="_blank" className="card-link mt-2">Click Me!!</a>
                <Button variant="primary" style={{float:"right"}} onClick={()=>{handleShow();setpid(curr.id)}} className="card-link">Initiate Chat</Button>
                
              </div>
            </div>
                    
                    
                    
                    </div>)
            
           
           
      }};
  return (
    <div className="col">
    <div className="page-title-container mb-3">
    <div className="row">
    <div className="col mb-2">
    <h1 className="mb-2 pb-0 display-4" id="title">Chat
    </h1>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label> Type your Message</label>
          <input className='form-control' value={message} onChange={(e)=>setMessage(e.target.value)}/>
        
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{handleClose();handleNewUserMessage(pid,message);setMessage("")}}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    <div className="row">
        {coreContext.patients.map((curr)=>renderuser(curr))}
   </div>
    
    </div></div></div></div>
  )
}

export default ChatLink