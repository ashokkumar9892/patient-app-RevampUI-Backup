import React from 'react'
import axios from "axios";

const API = () => {
    const sahil=()=>{
        axios.get("https://localhost:44320/timelog",{headers: { 
            
            'Access-Control-Allow-Origin' : 'http://localhost:3000/',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }},).then(res => {
      console.log(res,"new api response")
    });
    }
  return (
    <div><button onClick={()=>sahil()}>ffddddddddddddddddddddddddddddddd</button></div>
  )
}

export default API