
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
    const [provider, setProvider] = useState([])

    const findBeforeSevenDate = () => {
        var datt = new Date();
        datt.setDate(datt.getDate() - 7);
        return (((datt.getMonth() > 8) ? (datt.getMonth() + 1) : ('0' + (datt.getMonth() + 1))) + '/' + ((datt.getDate() > 9) ? datt.getDate() : ('0' + datt.getDate())) + '/' + datt.getFullYear());

    }

    const currentDate = () => {
        let datt = new Date();
        return (((datt.getMonth() > 8) ? (datt.getMonth() + 1) : ('0' + (datt.getMonth() + 1))) + '/' + ((datt.getDate() > 9) ? datt.getDate() : ('0' + datt.getDate())) + '/' + datt.getFullYear());
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
                            Balance: item.patient.balances.balance
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

    useEffect(() => {
        GetProviderList()
        // BookedApptapi()
    }, [])
    useEffect(() => {
        BookedApptapi()
    }, [provider])

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
                                            {
                                                console.log(bookApptData, "bookApptData")
                                            }
                                            {loading ?
                                                <div className="d-flex justify-content-center">
                                                    <Loader type="Circles" color="#00BFFF" height={100} width={100} />
                                                </div>
                                                : <BookedAppt data={bookApptData} />}
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