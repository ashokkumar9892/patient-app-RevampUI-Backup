import React,{useEffect,useContext,useState} from 'react';
import { CoreContext } from "../context/core-context";
import Loader from "react-loader-spinner";
const ChatLink = () => {
    const coreContext = useContext(CoreContext);

    useEffect(()=>{
        coreContext.fetchChatLink(70);
        

    },[])



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
                <p className="card-text">Please Click on below Link to Chat</p>
                <a href={Link} target="_blank" className="card-link">Click Me!!</a>
                
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
    
    <div className="row">
        {coreContext.patients.map((curr)=>renderuser(curr))}
   </div>
    
    </div></div></div></div>
  )
}

export default ChatLink