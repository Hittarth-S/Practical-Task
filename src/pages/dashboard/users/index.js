/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

import { Row, Col, Button, Card, Modal } from "react-bootstrap";

import DataTable from "react-data-table-component";

import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";
import moment from 'moment'

/* ICON IMPORTS */
import ViewIcon from "@iconscout/react-unicons/icons/uil-eye";
import EditIcon from "@iconscout/react-unicons/icons/uil-edit";
import DeleteIcon from "@iconscout/react-unicons/icons/uil-user-times";

/* Form Control */
import { useFormik } from "formik";
import * as yup from "yup";

/* API IMPORTS */
import {
  deleteUsers,
  editUsersDetailsById,
  getUsersList,
} from "../../../service/api";
import { useEffect } from "react";

const findUpper = (string1, string2) => {
  let extractedString = [];
  function extractLetter(string) {
    for (var i = 0; i < string.length; i++) {
      if (
        string.charAt(i) !== " "
      ) {
        return string.charAt(i).toUpperCase()
      }
    }
  }

  extractedString[0] = extractLetter(string1);
  if (string2) {
    extractedString[1] = extractLetter(string2);
  }

  if (extractedString.length > 1) {
    return extractedString[0] + extractedString[1];
  } else {
    return extractedString[0];
  }
};

/* Validation Schema  */
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  mobile: yup.number().required("Phone Number is Required"),
  email: yup.string().email().required("Email is Required"),
  status: yup.number().required("Status is Required")
});
const Users = () => {
  /* MODAL STATES */
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const columns = [
    {
      name: "User",
      grow: "2",
      selector: (row) => (
        <div className="user-detail">
          {row?.firstName ? <div className="avatar">{findUpper(row?.firstName, row?.lastName)}</div> : ''}
          <h5>{row?.firstName + ' ' + row?.lastName} </h5>
        </div>
      ),
    }, {
      name: "Phone Number",
      selector: (row) => <span className="light-text">{row?.mobile ? row?.mobile : '-'}</span>,
    },
    {
      name: "Email",
      selector: (row) => <span className="light-text">{row.email}</span>,
    },
    {
      name: "Created At",
      selector: (row) => <span className="light-text ">{moment(row?.createdAt).format('MMM, DD YYYY, hh:mm A')} </span>,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="table-actions">
          <ViewIcon
            color="#8094AE"
            size="20"
            className="action-btn"
            onClick={() => {
              setViewModal(!viewModal);
              setViewData(row);
            }}
          />
          <EditIcon
            color="#8094AE"
            size="20"
            className="action-btn"
            onClick={() => {
              setEditData(row);
              setEditModal(!editModal)
            }}
          />
          <DeleteIcon color="#8094AE" size="20" onClick={() => {
            setDeleteModal(!deleteModal);
            setDeleteId(row?._id);
          }} className="action-btn" />
        </div>
      ),
    }
  ];

  const [loading, setLoading] = useState(false);
  /* LOADING SCREEN FOR DATATABLE */
  const LoadingScreen = () => {
    return <div className="pagination-loading-screen">
      <p>Please wait!</p>
      <p>We are fetching data </p>
    </div>
  }

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [fetchData, setFetchedData] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);

  const [search, setSearch] = useState(null);

  const handlePerPageChange = async (e) => {
    setSizePerPage(e)
  };
  const handlePageChange = async (e) => {
    setPage(e)
  };

  const [viewData, setViewData] = useState(null);
  const getLandingPageFormData = () => {
    let params;
    if (search) {
      params = {
        page: page,
        sizePerPage: sizePerPage,
        search
      };
    } else {
      params = {
        page: page,
        sizePerPage: sizePerPage
      };
    }
    setLoading(true)
    getUsersList(params)
      .then((res) => {
        setFetchedData(res?.data?.docs);
        setTotalDocs(res?.data?.totalDocs);
      }).finally(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.log("Error While Fetching Users  List", error);
      });
  }

  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = () => {
    deleteUsers(deleteId)
      .then((res) => {
        getLandingPageFormData();
        toast.success(res?.message);
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message);
      })
      .finally((res) => {
        setDeleteModal(!deleteModal);
      });
  };

  const [editData, setEditData] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  useEffect(() => {
    if (editData !== null) {
      Object.entries(editData).forEach((entry) => {
        const [key, value] = entry;
        if (validationSchema?.fields?.hasOwnProperty(key)) {
          formikEditForm.setFieldValue(key, value);
        }
      });
    }
  }, [editData]);

  /* FORM VALUES HANDLING */
  const formikEditForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      status: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setEditLoading(true);
      editUsersDetailsById(editData?._id, values)
        .then((res) => {
          if (res?.status) {
            toast.success(res?.message);
            getLandingPageFormData();
          } else {
            toast.error(res?.message);
          }
        })
        .catch((e) => {
          setEditLoading(false);
          toast.error(e?.response?.data?.message);
        })
        .finally((res) => {
          setEditLoading(false);
        });
    },
  });

  useEffect(() => {
    getLandingPageFormData()
  }, [page, sizePerPage, search])

  return (
    <section className="users">
      {/* BACKGROUND BANNER */}
      <div className="bg-blue-banner" />

      <div className="container">
        {/* PAGE HEADING */}
        <div className="page-head">
          <Row className="align-center">
            <Col lg="12" sm="12">
              <h1>Users  List</h1>
              <p style={{ fontSize: "15px" }}>
                Glance through your users list  and edit their information
              </p>
            </Col>
          </Row>
        </div>

        {/* USERS LIST */}
        <div className="users-table">
          <Card className="users-list">
            <Card.Header className="users-list-header">
              <div className="right-header">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search user"
                  name="searchUser"
                  id="searchUser"
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                />
              </div>
            </Card.Header>
            <Card.Body className="users-list-body">
              <DataTable
                columns={columns}
                data={totalDocs > 0 ? fetchData : []}
                progressPending={loading}
                progressComponent={<LoadingScreen />}
                pagination
                paginationServer
                paginationTotalRows={totalDocs}
                onChangeRowsPerPage={handlePerPageChange}
                onChangePage={handlePageChange}
              />
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* View MODAL */}
      <Modal
        centered
        backdrop="static"
        show={viewModal}
        onHide={() => setViewModal(!viewModal)}
      >
        <Modal.Header className="delete-user-modal-header">
          <h5>Users  Details</h5>
        </Modal.Header>
        <Modal.Body className="delete-user-modal-body">
          <p><strong>Name: </strong>{viewData?.firstName} {viewData?.lastName}</p>
          <p><strong>Email: </strong>{viewData?.email}</p>
          <p><strong>Phone Number: </strong>{viewData?.mobile ? viewData?.mobile : '-'}</p>
          <p><strong>Created At: </strong> {moment(viewData?.createdAt).format('MMM, DD YYYY, hh:mm A')}</p>
        </Modal.Body>
        <Modal.Footer className="add-user-modal-footer">
          <Button
            className="cancel-btn"
            onClick={() => setViewModal(!viewModal)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        centered
        backdrop="static"
        show={deleteModal}
        onHide={() => setDeleteModal(!deleteModal)}
      >
        <Modal.Header className="delete-user-modal-header">
          <h5>Confirm Delete</h5>
        </Modal.Header>
        <Modal.Body className="delete-user-modal-body">
          <p>Are you sure you want to delete this user details ?</p>
        </Modal.Body>
        <Modal.Footer className="add-user-modal-footer">
          <Button
            className="cancel-btn"
            onClick={() => {
              setViewData(null)
              setDeleteModal(!deleteModal)
            }}
          >
            Cancel
          </Button>
          <Button className="proceed-btn" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* EDIT USER MODAL */}
      <Modal
        centered
        size="md"
        show={editModal}
        onHide={() => setEditModal(!editModal)}
      >
        <form onSubmit={formikEditForm.handleSubmit} id="edit-form" className="add-user-form">
          <Modal.Header className="add-user-modal-header">
            <h5>Edit Contact</h5>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg="6" sm="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="firstName"
                    placeholder="First Name"
                    onChange={formikEditForm.handleChange}
                    value={formikEditForm?.values?.firstName}
                  />
                  {formikEditForm.errors.firstName &&
                    formikEditForm.touched.firstName && (
                      <small style={{ color: "red" }}>
                        {formikEditForm.errors.firstName}
                      </small>
                    )}
                </div>
              </Col>
              <Col lg="6" sm="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="lastName"
                    placeholder="Last Name"
                    onChange={formikEditForm.handleChange}
                    value={formikEditForm?.values?.lastName}
                  />
                  {formikEditForm.errors.lastName &&
                    formikEditForm.touched.lastName && (
                      <small style={{ color: "red" }}>
                        {formikEditForm.errors.lastName}
                      </small>
                    )}
                </div>
              </Col>

              <Col lg="12" sm="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="placeholder@roundtechsquare.com"
                    onChange={formikEditForm.handleChange}
                    value={formikEditForm?.values?.email}
                    defaultValue={formikEditForm?.values?.email}
                  />
                  {formikEditForm.errors.email &&
                    formikEditForm.touched.email && (
                      <small style={{ color: "red" }}>
                        {formikEditForm.errors.email}
                      </small>
                    )}
                </div>
              </Col>
              <Col lg="12" sm="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone
                  </label>
                  <PhoneInput
                    placeholder="Phone Number"
                    defaultCountry="US"
                    className="phone-control"
                    onChange={(e) => {
                      formikEditForm.setFieldValue('mobile', e)
                    }}
                    value={formikEditForm?.values?.mobile}
                    defaultValue={formikEditForm?.values?.mobile}
                  />
                  {formikEditForm.errors.mobile &&
                    formikEditForm.touched.mobile && (
                      <small style={{ color: "red" }}>
                        {formikEditForm.errors.mobile}
                      </small>
                    )}
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="add-user-modal-footer">
            <Button
              className="cancel-btn"
              onClick={() => setEditModal(!editModal)}
            >
              Cancel
            </Button>
            {editLoading ? (
              <Button className="proceed-btn" type="button">
                Please Wait...
              </Button>
            ) : (
              <Button className="proceed-btn" type="submit">Save details</Button>
            )}

          </Modal.Footer>
        </form>
      </Modal>
    </section>
  );
};

export default Users;