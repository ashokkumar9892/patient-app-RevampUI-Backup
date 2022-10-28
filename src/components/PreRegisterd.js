
import React, { useState, useContext, useEffect } from "react";
import CheckedIn from "./CheckedIn";
import BookedAppt from "./Booked";
import CheckedOut from "./CheckedOut";
import MissedAppt from "./MissedAppt"
import axios from "axios";
import { getToken } from "../api/api";
import Loader from "react-loader-spinner";
const PreRegisterd = () => {
    const token = localStorage.getItem("app_jwt");
    const [bookApptData, setBookApptData] = useState([])
    const [loading, setLoading] = useState(false)

    const findBeforeSevenDate = () => {
        var datt = new Date();
        datt.setDate(datt.getDate() - 7);
        return(((datt.getMonth() > 8) ? (datt.getMonth() + 1) : ('0' + (datt.getMonth() + 1))) + '/' + ((datt.getDate() > 9) ? datt.getDate() : ('0' + datt.getDate())) + '/' + datt.getFullYear());
       
    }

    const currentDate=()=>{
        let datt = new Date();
        return(((datt.getMonth() > 8) ? (datt.getMonth() + 1) : ('0' + (datt.getMonth() + 1))) + '/' + ((datt.getDate() > 9) ? datt.getDate() : ('0' + datt.getDate())) + '/' + datt.getFullYear());
    }

    const findEndDate = (startDate, duration) => {
        let tim = startDate.split(":")
        let ti = tim[0]
        let mm = tim[1]
        if (parseInt(mm) + duration > 0) {
            ti = parseInt(ti) + parseInt((parseInt(mm) + duration) / 60);
            mm = parseInt((parseInt(mm) + duration) % 60)

            return (`${ti} : ${mm}`)
        }
        else {
            return (`${ti} : ${parseInt(mm) + duration}`)
        }
    }
    const BookedApptapi = async () => {
        setLoading(true)
        const url = `https://appointmentapi.apatternclinic.com/v1/24451/appointments/booked?practiceid=24451&startdate=${findBeforeSevenDate()}&showinsurance=true&enddate=${currentDate()}&departmentid=1&showpatientdetail=true`
        axios
            .get(url, {
                headers: {
                    Accept: "application/json, text/plain, */*",
                    Authorization: "Bearer " + await getToken(),
                },
            }).then((response) => {
                setLoading(false)
                let data = []
                response.data.appointments && response.data.appointments.length > 0 &&
                    response.data.appointments.map((item, index) => {
                        let obj = {
                            patientid: item.patientid,
                            PatientName: item.patient.firstname + item.patient.lastname,
                            DOB: item.patient.dob,
                            Chart: "-",
                            Provider: item.hl7providerid,
                            StartTime: item.starttime,
                            ApptType: item.appointmenttype,
                            Appt: item.appointmenttypeid,
                            Pre: "-",
                            Insurance: item.insurances ? item.insurances.insuranceplanname : "_",
                            EB: "_",
                            D: "_",
                            Copay: item.copay,
                            Paid: 0,
                            Balance: item.patient.balances.balance
                        }
                        data.push(obj)
                        console.log(obj, "check obj ")
                    })
                setBookApptData(data)
            })
    }

    useEffect(() => {
        BookedApptapi()
    }, [])

    return (<>
        <div className="col">
            <div className="page-title-container mb-3">
                <div className="row">
                    <div className="col mb-2">
                        <h1 className="mb-2 pb-0 display-4" id="title">Pre Registration Information
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
                                        {/* <div style={{ width: "100%", border: "1px solid #c9c9c9", padding: "10px", paddingTop: "9px", borderRadius: "10px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                                            <i class="bi bi-search"></i>
                                            <input placeholder="Search here " style={{ width: "90%", margin: "4px", outline: "none", border: "none" }} />
                                        </div> */}
                                        <div>

                                        {loading ?
                                        <div className="d-flex justify-content-center">
                                        <Loader type="Circles" color="#00BFFF" height={100} width={100} />
                                        </div>
                                            :<BookedAppt data={bookApptData} />}
                                            {/* <CheckedIn />
                                            <CheckedOut />
                                            <MissedAppt /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export { PreRegisterd };