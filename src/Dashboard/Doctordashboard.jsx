import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../pages/Sidebar";
import {
  appoinmentList,
  bulkDelete,
  updatePatient,
} from "../services/Auth.services";
import { searchData } from "../services/Auth.services";
import { Link } from "react-router-dom";
import Nav from "../pages/Nav";
import ReactPaginate from "react-paginate";
import { removePatient } from "../services/Auth.services";
import { useParams, useNavigate } from "react-router";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { userlogout } from "../Slice/AuthSlice";
import { toast, useToast } from "react-toastify";
import { useDispatch } from "react-redux";

export const Doctordashboard = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  // console.log(id);
  let navigate = useNavigate();
  const [show, setShow] = useState([]);
  const [array, setArray] = useState([]);
  const [input, setInput] = useState([]);

  const [page, setPage] = useState({});
  const [data, setData] = useState([]);
  const [select, setSelect] = useState(1);

  const handlePageClick = (data) => {
    setSelect(data.selected + 1);
  };

  const searchHandler = async (e) => {
    const response = await searchData(e);
    // console.log(response.data.result);
    setData(response.data.result);
  };

  useEffect(() => {
    const func = async () => {
      const response = await appoinmentList(5, select);
      setData(response.data.result.docs);
      console.log(response.data.result);
      setPage(response.data.result.totalPages);
      // setShow(response.data.result);
    };

    func();
    // appoinmentList();
  }, [select]);

  const handleSubmit = async (_id,) => {
   
    const updateResponse = await removePatient(_id);
    console.log("ijni", updateResponse);
    
    window.location.reload();
  };
  const UpdateHandler = async (id) => {
    navigate(`/edit/${id}`)
  };
  const downloadHandler = () => {
    const doc = new jsPDF();
    doc.text("Patient slip", 20, 10);

    doc.autoTable({
      columns: [
        { headers: " PatientName", datakey: "PatientName" },
        { headers: "contact", datakey: "contact" },
        { headers: "email", datakey: "email" },
        { headers: "date", datakey: "date" },
        { headers: "symptoms", datakey: "symptoms" },
      ],
      body: show,
    });
    doc.save("Patient slip");
  };
  const pdfGenerate = (data) => {
    var doc = new jsPDF("landscape", "px", "a4", "false");
    doc.setFont("Helvertica", "bold");
    doc.text(60, 60, ` Name : ${data.PatientName}`);
    doc.text(60, 100, `contact :${data.contact}`);
    doc.text(40, 90, `email :${data.email}`);
    doc.text(30, 80, `date :${data.date}`);
    doc.text(60, 120, `symptoms :${data.symptoms}`);

    doc.save(`${data.PatientName}.pdf`);
  };

  const handleCheck = (e) => {
    const { value, checked } = e.target;
    console.log(value);

    if (checked) {
      setArray([...array, value]);
    } else {
      setArray(array.filter((e) => e !== value));
    }
  };

  const bulkDeleteHandler = async () => {
    const res = await bulkDelete(array);

    const response = await appoinmentList(5, select);
    setData(response.data.result.docs);
    setPage(response.data.result.totalPages);
  };
  //---------Logout------------------------

  const logoutHandler = () => {
    localStorage.removeItem("users");

    localStorage.clear();

    dispatch(userlogout());

    toast.success(
      "Logout Successfully",
      { position: toast.POSITION.TOP_RIGHT },

      { autoClose: 1000 }
    );

    navigate("/login");
  };
  return (
    <>
      <div>
        <div className="navbar">
          <div className="logo">
            <img
              src="https://thumbs.dreamstime.com/b/hospital-logo-template-hospital-logo-template-117487677.jpg"
              alt=""
              width="50px"
              height="50px"
            />
          </div>
          <ul className="nav-links">
          <div>
           <button onClick={logoutHandler} className="">Logout</button>
           </div>
            <Link to="/about">About</Link>
            <Link to="/Doctor">Schedule</Link>
            <Link to="">
              <i class="fa-sharp fa-solid fa-bell"></i>
            </Link>
            <div></div>
            <form>
              <label for="gsearch">Search</label>
              <input
                type="search"
                id="gsearch"
                onChange={(e) => searchHandler(e.target.value)}
              />
            </form>
            <div>
              <img
                src="https://www.freepnglogos.com/uploads/doctor-png/doctor-bulk-billing-doctors-chapel-hill-health-care-medical-3.png"
                alt=""
                width="70px"
                height="70px"
              />
            </div>
          </ul>
        </div>
      </div>
      <marquee>
        <h3>
          <b>Welcome!</b>{" "}
        </h3>
      </marquee>
      <button onClick={bulkDeleteHandler}>Bulk Delete</button>
      <div className="container mt-4">
        <div className="row"></div>
        <div>
          <table className="table table-info table-striped">
            <thead>
              <tr>
                <th>Check</th>
                <th>PatientName</th>
                <th>contact</th>
                <th>email</th>

                <th>Date</th>

                <th>symptoms</th>
                <th>Actoins</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => {
                return (
                  <tr key={index}>
                    <div>
                      <input
                        type="checkbox"
                        value={data._id}
                        checked={data._id.array}
                        onChange={(e) => handleCheck(e)}
                      />
                    </div>
                    <td>{data.PatientName}</td>
                    <td>{data.contact}</td>
                    <td>{data.email}</td>
                    <td>{data.Date}</td>
                    <td>{data.symptoms}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleSubmit(data._id)}
                        className="bi bi-trash"
                      >
                        delete{" "}
                      </Button>
                    </td>

                    <td>
                      <Button
                        variant="danger"
                        onClick={() => UpdateHandler(data._id)}
                        className="bi bi-trash"
                      >
                        update{" "}
                      </Button>
                    </td>
                    <td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-primary"
                          onClick={(e) => pdfGenerate(data)}
                        >
                          PDF
                        </button>
                      </td>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <marquee
          bgcolor="cyan"
          vspace="20"
          hspace="20"
          font-size="10em"
          text-color="red"
        >
          contact us 24*7 <br></br>6399845127
        </marquee>

        {/* pagination */}

        <div class="page_box">
          <p></p>

          <nav aria-label="Page navigation example">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">>"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={page}
              previousLabel="<<"
              renderOnZeroPageCount={null}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
            />
          </nav>
        </div>
      </div>
    </>
  );
};
