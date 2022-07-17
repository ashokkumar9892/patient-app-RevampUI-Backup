/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { CoreContext } from "../context/core-context";
import { Table, Pagination, Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { PencilSquare, Trash, Person } from "react-bootstrap-icons";
import { IconName } from "react-icons/bs";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Pie } from 'react-chartjs-2';
import swal from 'sweetalert';

import Input from "./common/Input";
import * as React from "react";
import Switch from "@material-ui/core/Switch";
import moment from 'moment';
import DataGridComponent from "./common/DataGridComponent";

import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
} from "@material-ui/data-grid";

import Loader from "react-loader-spinner";
import { render } from "react-dom";
const Moment = require("moment");
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnHeaderCheckbox": {
      display: "block",
      pointerEvents: "none",
      disabled: "disabled",
    },
  },
}));

const BillingPatient = (props) => {
  const [rows,setrows]=useState(JSON.parse(localStorage.getItem("B_patient")));
  const [checked, setChecked] = useState(false);
const onToggleChangeActiveUsers = (event) => {
  setChecked(event.target.checked);
  
};
  const columns = [
    {
      field: "name",
      headerName: "Patient Name",
      width: 220,
      type: "string",
      
    },
    
    {
      field: "bills",
      headerName: "Bills",
      
      editable: false,
      width: 200,
    },
    {
      field: "timeLeft",
      headerName: "Time to Next Bill(mins)",
      type: "number",
      editable: false,
      width: 250,
    },
    {
      field: "RPM Mins",
      headerName: "RPM Mins",
      type: "number",
      editable: false,
      width: 150,
    },
    {
      field: "CCM Mins",
      headerName: "CCM Mins",
      type: "number",
      editable: false,
      width: 150,
    },
    

  ];
  const renderBills = () => {
    if (rows.length == 0) {
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
    
    if (
      rows.length>0
    ) {
      //coreContext.bloodpressureData  = coreContext.bloodpressureData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
      return (
        // <div style={{ height: 680, width: "100%" }}>
        //   {/* {coreContext.bloodglucoseData} */}
        //   <DataGrid
          
        //     rows={rows}
        //     columns={columns}
        //     pageSize={10}
        //     // sortingOrder={["desc", "asc"]}
        //     // sortModel={[{ field: "MeasurementDateTime", sort: "desc" }]}
        //   />
        // </div>
        <DataGridComponent rows={rows} columns={columns} />
      );
    } else {
      return (
        <div
          style={{
            height: 60,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <h1>No data Found</h1>
        </div>
      );
    }
    

  }
  const rendercharts=()=>{
    const l=rows.map((curr)=>curr.name+":"+curr.bills)
    const value=rows.map((curr)=>curr.bills)
    const data = {
      labels: l,
      datasets: [
        {
          label: '# of Votes',
          data: value,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return(
      <Pie data={data} />
    )

  }

  return (
    <div className="col">
    <div className="page-title-container mb-3">
    <div className="row">
    <div className="col mb-2">
    <h1 className="mb-2 pb-0 display-4" id="title">Billing Information
    </h1>
    
    </div>
    <div className="col-sm-1 col-2" style={{width:"70px"}}>
                                                <div className="form-group"><label for="inputName" className="text-14 mts text-black"><strong>Show Charts</strong></label>
                                                    
                                           </div>
                                            </div>
	
    <div className="col-sm-3 col-5"><label className="switch">
                                 <input type="checkbox" checked={checked} onChange={onToggleChangeActiveUsers}/>
                             <span className="slider round"></span>
                                 </label> </div>

    </div>
    </div>
    
    <div className="row">
    <div className="col-xl-12">
   
    <div className="card mb-3">	
    
    <div className="card-body">
   
    <div className="row">
    <div className="col-xl-12">
    <div className="table-responsive-sm mb-0">
      {(checked)?rendercharts():renderBills()}
    
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

export { BillingPatient };
