
import React, { useState, useContext, useEffect } from "react";
import CheckedIn from "./CheckedIn";
import BookedAppt from "./Booked";
import CheckedOut from "./CheckedOut";
import MissedAppt from "./MissedAppt"
import axios from "axios";
import { getToken } from "../api/api";
import Loader from "react-loader-spinner";
const PreRegisterd = () => {
   

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
                                        <BookedAppt/>
                                           
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