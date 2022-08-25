import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import Loader from "react-loader-spinner";
import DataGridComponent from './common/DataGridComponent';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";



const Moment = require('moment');

const WeightNew = (props) => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);
   

    const fetchWeight = () => {
        const deviceid=coreContext.deviceDataForPatient.filter((a)=>a.DeviceType=='WS').map((b)=>b.deviceID)
        
    coreContext.fetchnewWSDataForPatient("patientId","userType",deviceid);
     
    }
    useEffect(fetchWeight, [coreContext.newweightDataForPatient.length,JSON.stringify(coreContext.deviceDataForPatient)]);
   

    const columns = [
        {
          field: 'weight',
          headerName: 'Weight (lbs)',
          
          editable: false,
          flex:1,
        },
        {
            field: 'MeasurementDateTime',
            headerName: 'Date Recorded',
            width: 310,
            editable: false,
            type: 'date',
            flex:1,
          valueFormatter: (params) => {
            const valueFormatted = Moment(params.value).format('MM-DD-YYYY hh:mm A')
             return `${valueFormatted}`;
           },
            
          },
          {
            field: 'DeviceId',
            headerName: 'Device Id',
            editable: false,
            flex:1,
          },
    
      ];

    
     
    const renderWeight = () => {
      if (coreContext.patientsForPatient.length == 0) {
        return (
            <div style={{ height: 680, width: '100%',display: 'flex',  justifyContent:'center', marginTop: '10px', alignItems:'center' }}>
                 <Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
        /></div>
          );
    }
      let dgcolumns = columns;
      
        if (coreContext.patientsForPatient.length > 0){
        
      const rows=coreContext.newweightDataForPatient
              //  coreContext.newweightDataForPatient  = coreContext.newweightDataForPatient.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
        return (
            <DataGridComponent rows={rows} columns={dgcolumns} sortModal={[{ field: "MeasurementDateTime", sort: "desc" }]}/>
          );
        }
        else{
          return(
            <div style={{ height: 60, width: '100%',display: 'flex',  justifyContent:'center', marginTop: '10px', alignItems:'center' }}>
                <h1>No data Found</h1>
                </div>)
         }
        
       
    }
useEffect(()=>{
    renderWeight()
},[coreContext.newweightDataForPatient.length])

    return(
    
    <div className="col">
    <div className="page-title-container mb-3">
    <div className="row">
    <div className="col mb-2">
    <h1 className="mb-2 pb-0 display-4" id="title">Weight Information
    </h1>
    </div>
    </div>
    </div>
    
    <div className="row">
    <div className="col-xl-12">
   
    <div className="card mb-3">	
    
    <div className="card-body">
    <div className="row">
    <div className="col-xl-12">
    <div className="table-responsive-sm mb-0">
      {renderWeight()}
    
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



export {WeightNew}