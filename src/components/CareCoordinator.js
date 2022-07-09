import React, { useState, useContext, useEffect } from "react";
import { CoreContext } from "../context/core-context";
import { Modal, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import Input from "./common/Input";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import DataGridComponent from "./common/DataGridComponent";



const CareCoordinator = (props) => {
  const coreContext = useContext(CoreContext);

  useEffect(coreContext.checkLocalAuth, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [patientId, setPatientId] = useState("");
  const [editcarecoordinator, seteditcarecoordinator] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
    fetchCareCoordinator();
  };
  const handleModalShow = () => setShowModal(true);

  const [showModal, setShowModal] = useState(false);

  const editCareCoordinator = () => {};

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const fetchCareCoordinator = () => {
    const patientId = props.match.params.patient;
    setPatientId(patientId);
    coreContext.fetchCareCoordinator();
  };
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setVerificationCode("");
  };
  useEffect(resetForm, [coreContext.resetForm]);

  useEffect(fetchCareCoordinator, [JSON.stringify(coreContext.ccData)]);
  const columns = [
    {
      field: "name",
      headerName: "Care Coordinator Name",
      width: 150,
      flex:1,
    },
    {
      field: "email",
      headerName: "Email",
      editable: false,
      width: 150,
      flex:1,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      editable: false,
      flex:1,
    },
    {
      field: "",
      headerName: "Action",
      width: 150,
      flex:1,

      renderCell: (params) => (
        <div style={{marginLeft:"3em"}}>
          {" "}
          <a href="#" onClick={() => showEditForm(params.row)}>
            {" "}
            <PencilSquare />
          </a>
          <a href="#" onClick={() => deletePatient(params.row)}>
            {" "}
            <Trash />
          </a>
        </div>
      ),
    },
  ];

  const showEditForm = (patient) => {
    setName(patient.name);
    setPhone(patient.phone);
    setEmail(patient.email);
    //setPatientId(patient.id);
    setPatientId(patient.doctor_id);
    handleModalShow();
    seteditcarecoordinator(patient);
  };

  const deletePatient = (patient) => {
    swal({
      title: "Are you sure?",

      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        coreContext.DeleteCareCoordinator(
          patient,
          "carecoordinator",
          "Care Coordinator"
        );
        coreContext.setccData([]);
      } else {
        swal("Delete Cancelled");
      }
    });
  };
  const renderCoordinators = () => {
    if (coreContext.ccData.length == 0) {
      return (
        <div
          style={{
            height: 680,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          <Loader type="Circles" color="#00BFFF" height={100} width={100} />
        </div>
      );
    }
    if (coreContext.ccData.length > 0) {
      return (
        // <div style={{ height: 680, width: "100%" }}>
        //   <DataGrid
        //     rows={coreContext.ccData}
        //     columns={columns}
        //     pageSize={10}
        //     sortModel={[{ field: "name", sort: "asc" }]}
        //   />
        // </div>
        <DataGridComponent rows={coreContext.ccData} columns={columns} sortModal={[{ field: "name", sort: "asc" }]}/>
      );
    }
  };

  return (
    <>
      <Modal
        show={coreContext.showProviderModal}
        onHide={coreContext.handleProviderModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verification Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the verification code sent on your Email ID</p>
          <input
            type="text"
            class="form-control"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              coreContext.verifyProviderVerificationCode(
                verificationCode,
                email,
                "CareCoordinator"
              );
              handleModalClose();
            }}>
            Submit
          </Button>
          <Button
            variant="secondary"
            onClick={coreContext.handleProviderModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Care Coordinator </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label>Name</label>
              <Input
                label="Name"
                elementType="text"
                minLength={5}
                maxLength={55}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
                required={true}
                register={register}
                errors={errors}
              />
            </div>
          
          
            <div className="col-md-6">
            <label>Phone</label>
              <Input
                label="Phone"
                elementType="text"
                placeholder="Enter phone"
                onChange={(e) => setPhone(e.target.value)}
                required={true}
                minLength={5}
                maxLength={55}
                register={register}
                errors={errors}
                name="phone"
                value={phone}
              />
            </div>
          </div>
<div className="row" style={{marginTop:"1%"}}>
          <Input
            blockButton={true}
            value="Submit"
            onClick={() => {
              coreContext.UpdateCareCoordinator(name, phone, email, patientId,editcarecoordinator);
              coreContext.setccData([]);
              handleModalClose();
            }}
            elementType="button"
            variant="primary"
            
          />
          </div>
          <br />
          <center> {coreContext.renderLoader()}</center>
          <center>
            {" "}
            <Input variant="danger" label={message} elementType="label" />
          </center>
        </Modal.Body>
      </Modal>
    
    <div className="col">
        <div className="page-title-container mb-3">
          <div className="row">
            <div className="col mb-2">
              <h1 className="mb-2 pb-0 display-4" id="title">
                Care Coordinator Information
              </h1>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div class="col-xl-4">
                    <div class="form-floating mb-3">
                    <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            class="form-control mb-2 mr-sm-2"
            placeholder="Care Coordinator Name"
          />
                      <label>Care Coordinator Name</label>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="form-floating mb-3">
                    <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            class="form-control mb-2 mr-sm-2"
            placeholder="Enter email"
          />
                      <label>Enter Email</label>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="form-floating mb-3">
                    <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            class="form-control mb-2 mr-sm-2"
            placeholder="Enter phone"
          />
                      <label>Enter Phone</label>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="form-floating mb-3">
                    <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            class="form-control mb-2 mr-sm-2"
            placeholder="Enter password"
          />
                      <label>Enter Password</label>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="form-floating mb-3">
                    <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            class="form-control mb-2 mr-sm-2"
            placeholder="Confirm Enter password"
          />
                      <label>Confirm Password</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4">
                    <button
                      type="button"
                      class="btn btn-md btn-info mb-2"
                      onClick={() =>
                        {coreContext.addCareCoordinator(name, email, phone, password);coreContext.setccData([]);}
                      }
                    >
                      Add Care Coordinator
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="table-responsive-sm mb-0">
                      {renderCoordinators()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export { CareCoordinator };
