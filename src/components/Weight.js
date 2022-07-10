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

const Weight = (props) => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);
    const [patientId, setPatientId] = useState('');
    const [userType, setUserType] = useState('');

    const fetchWeight = () => {
        let userType = localStorage.getItem("userType");
        let patientId = localStorage.getItem("userId");
        // check page if left side menu.
        if(window.location.href.substring('weight')> 0)
        {
          coreContext.fetchWSData(patientId,userType);
        }
        if(window.location.href.indexOf('patient-summary') >0 )
        {
            patientId = localStorage.getItem("ehrId");
            userType = 'patient';
            // clear this otherwise will be problem
            localStorage.removeItem("ehrId");
        }
        setUserType(userType);
      coreContext.fetchWSData(patientId,userType);
     
    }
    useEffect(fetchWeight, [coreContext.weightData.length]);
   

    const columns = [
        { field: 
          'UserName', 
          headerName: 'Patient Name', 
           
          flex:1,  
          type: 'string',
          renderCell: (params) => (
            <div style={{marginLeft:"3em",paddingBottom:"1em"}}>
            <Link  to={`/patient-summary/${btoa(params.row.userId)}`}> {params.row.UserName} </Link></div>
          )
        },
        {
          field: 'weight',
          headerName: 'Weight',
          
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
            field: 'CreatedDate',
            headerName: 'Date Received',
            width: 200,
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
          {
            field: 'readingId',
            headerName: 'Reading Id',
            type: 'number',
            editable: false,
            flex:1,
          },
          // { 
          //   field: "sortDateColumn", 
          //   headerName: "Action",
          //   width: 300,
            
          //   renderCell: (params) => (
          //       <div>  <Link to="#" onClick={() => showEditForm(params.row)}>  <PencilSquare /></Link>
          //       <Link to="#" onClick={() => deletePatient(params.row)}>  <Trash /></Link>
          //       </div>
            
          //    )
          //   }         

      ];

      const showEditForm = (patient) => {
      }
      const deletePatient = (patient) => {
      }


      const patientcolumns = [
        // { field: 
        //   'UserName', 
        //   headerName: 'Patient Name', 
        //   width: 200 ,  
        //   type: 'string',
        // },
        {
          field: 'MeasurementDateTime',
          headerName: 'Date Recorded',
          
          editable: false,
          flex:1,
          type: 'date',
        
        valueFormatter: (params) => {
          const valueFormatted = Moment(params.value).format('MM-DD-YYYY hh:mm A')
           return `${valueFormatted}`;
         },
        },
        {
          field: 'weight',
          headerName: 'Weight (lbs)',
          type: 'number',
          editable: false,
          flex:1,
        },
        
          // // {
          // //   field: 'CreatedDate',
          // //   headerName: 'Date Received',
          // //   width: 200,
          // //   editable: false,
          // //   type: 'date',
          // // width: 200,
          // // valueFormatter: (params) => {
          // //   const valueFormatted = Moment(params.value).format('MM-DD-YYYY hh:mm A')
          // //    return `${valueFormatted}`;
          // //  },
           
          // },
          {
            field: 'DeviceId',
            headerName: 'Device Id',
            editable: false,
            flex:1,
          },
          {
            field: 'readingId',
            headerName: 'Reading Id',
            type: 'number',
            editable: false,
            flex:1,
          },
          // { 
          //   field: "sortDateColumn", 
          //   headerName: "Action"
           
          // }         

      ];
      
      //https://material-ui.com/components/data-grid/

    const renderWeight = () => {
      if (coreContext.weightData.length == 0) {
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
      if(userType === 'patient'){
         dgcolumns = patientcolumns;
      }
      
        if (coreContext.weightData.length > 0 &&coreContext.weightData[0].UserName!==undefined){
          const id=coreContext.patients.map((curr)=>curr.userId)
      const rows=coreContext.weightData.filter((curr)=>id.includes(curr.userId))
      console.log(rows,"bith data")
        //  coreContext.weightData  = coreContext.weightData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
        return (
            // <div style={{ height: 680, width: '100%' }}>
            //   <DataGrid
            //     rows={coreContext.weightData}
            //     columns={dgcolumns}
            //     sortingOrder={['desc', 'asc']}
            //     pageSize={10}
            //     sortModel={[{ field: 'MeasurementDateTime', sort: 'desc' }]}
            //   />
            // </div>
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



export {Weight}