import React, { useState, useEffect } from 'react';
import axios from "axios";
import { getToken } from "../api/api";
import DatePicker from "react-datepicker";
import Loader from "react-loader-spinner";
import DataGrid from "./datagrid";
import "./booked.css"

const Booked = () => {
  const [bookApptData, setBookApptData] = useState([])
  const [sortData , setSortData]= useState([])
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState([])
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setTodate] = useState(new Date())
  const [sortList, setSortList] = useState("Booked_Appointments")
  const findAfterSevenDate = () => {
    var datt = new Date();
    datt.setDate(datt.getDate() + 7);
    return datt;

  }
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const GetProviderList = async () => {
    setLoading(true)
    const url = `https://appointmentapi.apatternclinic.com/v1/24451/providers`
    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + await getToken(),
        },
      }).then((response) => {
        setLoading(false)
        setProvider(response.data.providers)

      })
  }

  const BookedApptapi = async (fromdate, todate) => {
    setLoading(true)
    const url = `https://appointmentapi.apatternclinic.com/v1/24451/appointments/booked?practiceid=24451&startdate=${fromdate}&showinsurance=true&enddate=${todate}&departmentid=1&showpatientdetail=true`
    axios
      .get(url, {
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + await getToken(),
        },
      }).then((response) => {
        let data = []

        response.data.appointments && response.data.appointments.length > 0 &&
          response.data.appointments.map((item, index) => {
            let dateTime = item.date + " " + item.starttime
            let obj = {
              patientid: item.patientid,
              PatientName: item.patient.firstname + item.patient.lastname,
              DOB: item.patient.dob,
              Chart: "-",
              Provider: provider?.find((it) => it.providerid == item.hl7providerid)?.displayname,
              date: item.date,
              StartTime: formatAMPM(new Date(dateTime)),
              ApptType: item.appointmenttype,
              Appt: item.appointmenttypeid,
              Pre: "-",
              Insurance: item.insurances ? item.insurances.insuranceplanname : "_",
              EB: "_",
              D: "_",
              Copay: item.copay,
              Paid: 0,
              Balance: item.patient.balances.balance,
              lastmodified: item.lastmodified
            }
            data.push(obj)
          })
        if (data.length > 0) {
          const sortedAsc = data.sort(
            (objA, objB) => Number(new Date(objA.date)) - Number(new Date(objB.date)),
          );
          setBookApptData(sortedAsc.reverse())
        }
        else {
          setBookApptData(data)
        }
        setLoading(false)
      })
  }

  const dateFormate = (date) => {
    let datt = new Date(date);
    return (((datt.getMonth() > 8) ? (datt.getMonth() + 1) : ('0' + (datt.getMonth() + 1))) + '/' + ((datt.getDate() > 9) ? datt.getDate() : ('0' + datt.getDate())) + '/' + datt.getFullYear());
  }

  function filterFromDate(da) {
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);
    console.log(new Date(da.lastmodified),new Date(fromDate), new Date(toDate), new Date(da.lastmodified) >= new Date(fromDate) && new Date(da.lastmodified) <= new Date(toDate))
    return (new Date(da.lastmodified) >= new Date(fromDate) && new Date(da.lastmodified) <= new Date(toDate));
  }

  useEffect(() => {
    setFromDate(new Date())
    setTodate(findAfterSevenDate())
    GetProviderList()
  }, [])

  useEffect(() => {
    if (sortList === "Booked_Appointments" && bookApptData?.length > 0) {
      let data =[...bookApptData];
      const sortedAsc = data.sort(
        (objA, objB) => Number(new Date(objA.date)) - Number(new Date(objB.date)),
      );
      setSortData([...sortedAsc.reverse()])
    }
    else if (sortList === "Booked_Date" && bookApptData?.length > 0) {
     let  todate = new Date(toDate)
     let fromdate = new Date(fromDate)
     todate.setMonth(todate.getMonth() + 6)
     fromdate.setMonth(fromdate.getMonth() - 6)
      BookedApptapi(dateFormate(fromdate) , dateFormate(todate) )

      // let data =[...bookApptData];
      // console.log(typeof(data),"check type of")
      // const sortedAsc = data.sort(
      //   (objA, objB) => Number(new Date(objA.lastmodified)) - Number(new Date(objB.lastmodified)),
      // );
      // setBookApptData(sortedAsc.reverse())
    }
  }, [sortList])

  useEffect(()=>{
    if (sortList === "Booked_Appointments" && bookApptData?.length > 0) {
      let data =[...bookApptData];
      const sortedAsc = data.sort(
        (objA, objB) => Number(new Date(objA.date)) - Number(new Date(objB.date)),
      );
      setSortData([...sortedAsc.reverse()])
    }
    else if (sortList === "Booked_Date" && bookApptData?.length > 0) {
      let data = bookApptData.filter(filterFromDate)
      console.log(data,"check filter data")
      const sortedAsc = data.sort(
        (objA, objB) => Number(new Date(objA.lastmodified).getTime()) - Number(new Date(objB.lastmodified).getTime()),
      );

      console.log(sortedAsc,data,"filter data")
      setSortData([...sortedAsc.reverse()])
    }

  },[bookApptData])

  useEffect(() => {
    BookedApptapi(dateFormate(fromDate), dateFormate(toDate))
  }, [provider])

  const checkToDateGreaterthanfromDate = (fromDate, toDate) => {
    let d1 = new Date(fromDate);
    let d2 = new Date(toDate);
    if (d1.getTime() > d2.getTime()) {
      alert(" To date should be greater than from date ")
    }
    else {
      setTodate(toDate);
    }
  }

  useEffect(() => {
    BookedApptapi(dateFormate(fromDate), dateFormate(toDate))
  }, [toDate])

  return (<>
    <div>
      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
        Booked Appointments
      </p>
    </div>
    <div  className='filterDiv'>
      <div className='datePicker'>
      <div >
        <label>From:</label>
      </div>
      <div  style={{marginLeft:"12px"}}>
        <DatePicker
          selected={fromDate}
          onChange={(e) => {
            setFromDate(e)
          }}
          value={fromDate}
        // dateFormat="MM/dd/yyyy hh:mm:ss aa"
        />
      </div>
      <div style={{marginLeft:"12px"}} >
        <label>To:</label>
      </div>
      <div style={{marginLeft:"12px"}} >
        <DatePicker
          selected={toDate}
          onChange={(e) => {
            checkToDateGreaterthanfromDate(fromDate, e)
          }}
          value={toDate}
        />
      </div>
      <div >
      </div>
      </div>
      <div className='filterdiv'>
      <span style={{marginLeft:"12px"}}>Filter</span>
      
      <select  style={{ width: "172px", height: "28px",marginLeft:"12px" }}
        value={sortList} onChange={(e) => { setSortList(e.target.value) }}
      >
        <option title='sort by Booked Appointments' value="Booked_Appointments"> Appointment Date</option>
        <option title='sort by Booked Date ' value="Booked_Date">Today Booked</option>
      </select>
      </div>
      </div>
      
   
    {loading ?
      <div className="d-flex justify-content-center">
        <Loader type="Circles" color="#00BFFF" height={100} width={100} />
      </div>
      : <DataGrid data={sortData} />}

  </>)
}

export default Booked;