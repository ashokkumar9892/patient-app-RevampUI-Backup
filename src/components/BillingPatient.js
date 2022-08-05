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
 
  Tooltip
 
} from "@material-ui/core";

import Loader from "react-loader-spinner";
import { render } from "react-dom";
import { CheckRounded } from "@material-ui/icons";
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
  const [complex, setComplex] = useState();
  const diag=["Select Diagnosis Id","D45- Polycythemia vera",
  "G47.33- Obstructive sleep apnea (adult) (pediatric)",
  "I10- Essential (primary) hypertension","K219",
  "I13.10- Hypertensive heart and chronic kidney disease without heart",
  "failure ",
  "I509- Heart failure, unspecified",
  "E03.9- Hypothyroidism, unspecified",
  "E11.65- Type 2 diabetes mellitus with hyperglycemia",
  "E11.9- Type 2 diabetes mellitus without complications",
  "E61.1- Iron deficiency",
  "E66.3- Overweight",
  "E66.01- Morbid (severe) obesity due to excess calories",
  "E66.9- Obesity, unspecified",
  "E78.5- Hyperlipidemia, unspecified",
  "F33.2- Major depressive disorder, recurrent severe without psychotic",
  "features",
  "F41.1- Generalized anxiety disorder",
  "H10.9- Unspecified conjunctivitis",
  "J32.4- Chronic pansinusitis",
  "J45.40- Moderate persistent asthma, uncomplicated",
  "J45.41- Moderate persistent asthma with (acute) exacerbation",
  "K58.2- Mixed irritable bowel syndrome",
  "M25.562- Pain in left knee",
  "M54.50- Low back pain, unspecified",
  "M79.7- Fibromyalgia",
  "N92.5- Other specified irregular menstruation",
  "R03.0- Elevated blood-pressure reading, without diagnosis of",
  "hypertension",
  "R53.83- Other fatigue",
  "R73.03- Prediabetes",
  "Z68.41- Body mass index [BMI] 40.0-44.9, adult",
  "Z68.44- Body mass index [BMI] 60.0-69.9, adult",
  "K580- unspecified",
"N182- Chronic kidney disease, stage 2 (mild)",
"J449- Chronic obstructive pulmonary disease",
"E1140- Type 2 diabetes mellitus with diabetic neuropathy",
"E11.51- Type 2 diabetes mellitus with diabetic peripheral angiopathy without gangrene",
"I739- Peripheral vascular disease, unspecified",
"I25.10- Atherosclerotic heart disease of native coronary artery without angina pectoris",
"G4709- Other insomnia",
"I639- unspecified",
"E10.9- unspecified",
"L67- unspecified",
"L67.1- unspecified",
"L82.1- unspecified",
"E1132999 - unspecified",
"E663- unspecified",
"N925 - unspecified",
"H109 - unspecified"]
  const coreContext = useContext(CoreContext);
const onToggleChangeActiveUsers = (event) => {
  setChecked(event.target.checked);
  
};
const updateotp=(id,otp)=>{
  coreContext.fetchPatientListfromApi(localStorage.getItem("userType"),localStorage.getItem("userId"))
  const bpatient=[...JSON.parse(localStorage.getItem("B_patient"))]
  const b=[]
  JSON.parse(localStorage.getItem("B_patient")).map((curr)=>{
    if(curr.userId===id){
      const hi={...curr,"otp":otp.toString()}
     
      b.push(hi)
    }else{
      b.push(curr)
    }

  })
  console.log(b,"sa")
  
  localStorage.removeItem("B_patient")
  localStorage.setItem("B_patient", JSON.stringify(b));
  setrows(JSON.parse(localStorage.getItem("B_patient")))
  

}
const handlecptcode=(cpt)=>{
  var obj=JSON.parse(cpt)
  var str=""

  for(var i=0;i<obj.length;i++){
    str=str+[...new Set(Object.values(obj[i]))]
  }
  
  return str

}
  const columns = [
    {
      field: "name",
      headerName: "Patient Name",
      width: 220,
      type: "string",
      
    },
    
    {
      field: "rpmbills",
      headerName: "RPM Bills",
      editable: false,
      width: 110,
        renderCell: (params) => (
        (params.row.value>3)?3:params.row.value
        )
    },
    {
      field: "ccmbills",
      headerName: "CCM Bills",
      editable: false,
      width: 110,
      renderCell: (params) => (
        (params.row.value>3)?3:params.row.value
        )
    },
    
    {
      field: "cptcode",
      headerName: "CPT Code",
      
      editable: false,
      width: 150,
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
      
      editable: false,
      width: 150,
    },
    {
      field: "otp",
      headerName: "Complex",
      
      editable: false,
      width: 105,
      renderCell: (params) => (
        
        <>
      
        <div style={{marginLeft:"2em"}}>
  <input type="checkbox" checked={params.row.otp==='true'} onChange={(e)=>{coreContext.UpdateNotes(coreContext.patients.filter((curr)=>curr.userId===params.row.userId)[0],"",e.target.checked,"");setComplex(e.target.checked);updateotp(params.row.userId,e.target.checked);coreContext.cleanup1()}} />
  
</div>
        </>
      ),
    },
    
    {
      field: "diagnosisId",
      headerName: "Diagnosis",
      
      editable: false,
      width: 500,
      renderCell: (params) =>  (
        <>      
       {params.row.diagnosisId.split(",").map((curr,index)=><Tooltip title={diag.filter((curr1)=>curr1.includes(curr))[0]}>
            <p>{(curr!=="")?curr:""}{(index+1!==params.row.diagnosisId.split(",").length && curr!=="")?" , ":""} </p>
          </Tooltip>)}
          </>
        
        
       ),
    }
    

  ];
  const renderBills = () => {
    if (coreContext.patients.length == 0) {
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
      coreContext.patients.length>0
    ) {
      // //coreContext.bloodpressureData  = coreContext.bloodpressureData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
      // const updatedrows=[]
      // rows.map((curr)=>{
      //   const curr1={...curr}
        
      //     curr1['diagnosisId']=coreContext.patients.filter((curr2)=>curr.userId===curr2.userId)[0].diagnosisId
      //     curr1['otp']=coreContext.patients.filter((curr2)=>curr.userId===curr2.userId)[0].otp
      //     updatedrows.push(curr1)
        
      // })
       console.log("updatedrows",JSON.parse(localStorage.getItem("B_patient")))
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
  useEffect(renderBills, [rows]);
  useEffect(()=>{coreContext.fetchPatientListfromApi(localStorage.getItem("userType"),localStorage.getItem("userId"))}
  ,[complex]);

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
      options: {
        indexAxis: 'y'
      }
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
