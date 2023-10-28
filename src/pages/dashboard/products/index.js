/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

/* BootStrap Components Import */
import { Row, Col, Button, Card, Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

/* Custom Data Table Library Import */
import DataTable from "react-data-table-component";

/* Custom Toast Notification */
import { toast } from "react-toastify";

/* Date / Time Fromatter */
import moment from 'moment'

/* ICON IMPORTS */
import ViewIcon from "@iconscout/react-unicons/icons/uil-eye";
import EditIcon from "@iconscout/react-unicons/icons/uil-edit";
import DeleteIcon from "@iconscout/react-unicons/icons/uil-user-times";

/* API IMPORTS */
import {
  deleteProduct,
  getProductList,
} from "../../../service/api";


const findUpper = (string) => {

  let extractedString = [];

  let splittedString = string?.split(" ");
  let string1 = splittedString?.[0];
  let string2 = splittedString?.[1];

  function extractLetter(string) {
    for (var i = 0; i < string.length; i++) {
      if (
        string?.charAt(i) !== " "
      ) {
        return string?.charAt(i)?.toUpperCase()
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

const Users = () => {

  const navigate = useNavigate();

  /* MODAL STATES */
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const columns = [
    {
      name: "Product Name",
      grow: "2",
      selector: (row) => (
        <div className="user-detail">
          {row?.name ? <div className="avatar">{findUpper(row?.name)}</div> : ''}

          <h5>{row?.name} </h5>
        </div>
      ),
    }, {
      name: "Price",
      selector: (row) => <span className="light-text">₹{row.price}</span>,
    },
    {
      name: "Description",
      grow: "2",
      selector: (row) => <span className="light-text">{row.description}</span>,
    },
    {
      name: "Status",
      selector: (row) => {
        if (row?.status === 'active') {
          return <span className="light-text text-capitalize"><Button variant="outline-success" className="text-sm text-capitalize pt-0 py-0" >{row.status}</Button> </span>
        }

        else if (row?.status === 'inactive') {
          return <span className="light-text text-capitalize"><Button variant="outline-danger" className="text-sm text-capitalize pt-0 py-0" >{row.status}</Button> </span>
        }

        else if (row?.status === 'comingSoon') {
          return <span className="light-text text-capitalize"><Button variant="outline-secondary" className="text-sm text-capitalize pt-0 py-0" >{row.status}</Button> </span>
        }

      },
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
              navigate('/products/edit/' + row?._id)
              // setEditData(row);
              // setEditModal(!editModal)
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

  // States
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
  const getProductListing = () => {
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
    getProductList(params)
      .then((res) => {
        setFetchedData(res?.data?.docs);
        setTotalDocs(res?.data?.totalDocs);
      }).finally(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.log("Error While Fetching Product  List", error);
      });
  }

  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = () => {
    deleteProduct(deleteId)
      .then((res) => {
        getProductListing();
        toast.success(res?.message);
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message);
      })
      .finally((res) => {
        setDeleteModal(!deleteModal);
      });
  };

  useEffect(() => {
    getProductListing()
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
              <h1>Product  Page Leads</h1>
              <p style={{ fontSize: "15px" }}>
                Glance through your products and edit their information
              </p>
            </Col>
          </Row>
        </div>

        {/* USERS LIST */}
        <div className="users-table">
          <Card className="users-list">
            <Card.Header className="users-header">
              {/* PAGE HEADING */}
              <div className="right-header">
                <Row className="align-center py-2">
                  <Col lg="2" sm="12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      name="searchUser"
                      id="searchUser"
                      onChange={(e) => {
                        setSearch(e.target.value)
                      }}
                    />
                  </Col>
                  <Col lg={'8'} sm={0}></Col>
                  <Col lg="2" sm="12">
                    <div className="d-flex resp-start">
                      <Button
                        className="import-btn bg-black border-0"
                        onClick={() => {
                          navigate("/products/add");
                        }}
                      >
                        {" "}

                        Add Product
                      </Button>
                    </div>
                  </Col>
                </Row>

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
          <h5>Product  Details</h5>
        </Modal.Header>
        <Modal.Body className="delete-user-modal-body">
          <p><strong>Product Name: </strong>{viewData?.name}</p>
          <p><strong>Price: </strong>₹{viewData?.price}</p>

          <p><strong>Description: </strong>{viewData?.description}</p>
          <p><strong>Created At: </strong> {moment(viewData?.createdAt).format('MMM, DD YYYY, hh:mm A')}</p>


          <h6>Images</h6>
          <Row>
            {viewData?.image?.length > 0 ? (
              viewData?.image?.map((element, index) => {
                return <Col sm={12} lg={4} className="file-uploader pb-2">
                  <a href={element?.url} target="_blank" rel="noreferrer">
                    <div className="uploaded-image mt-2 mx-0">
                      <img src={element?.url} alt="Profile" />
                    </div>
                  </a>
                </Col>
              })
            ) : <p>No Images Found</p>}

          </Row>
          <div className="d-flex">


          </div>
        </Modal.Body>
        <Modal.Footer className="add-user-modal-footer">
          <Button
            className="cancel-btn"
            onClick={() => {
              setViewData(null)
              setViewModal(!viewModal)
            }}
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
          <p>Are you sure you want to delete this product details ?</p>
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

    </section>
  );
};

export default Users;