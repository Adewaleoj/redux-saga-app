import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const options = [{
  label: "Active",
  value : "active"
},
{
  label: "Inactive",
  value : "Inactive"
},
]


const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { users } = useSelector((state) => state.data);
  const { name, email, phone, address, status } = formValue;
  const [editMode, setEditMode] = useState(false);
  const [statusErrMsg, setStatusErrMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((item) => item.id === Number(id));
      setFormValue({ ...singleUser });
    }
  }, [id]);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!status) {
      setStatusErrMsg("Please provide a Status")
    }
    if (name && email && phone && address && status) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User Added Successfully");
        setTimeout(() => navigate("/"), 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
        toast.success("User Updated Successfully");
        setTimeout(() => navigate("/"), 500);
      }
    }
  };

  const onDropdownChange = (e) => {
    setStatusErrMsg(null);
    setFormValue({ ...formValue, status: e.target.value })
  }

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      {/* <form onSubmit={handleSubmit}> */}
      <p className="fs-2 fw-bold">
        {editMode ? "Update User Detail" : "Add User Detail"}
      </p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={name || ""}
          name="name"
          type="text"
          onChange={onChange}
          required
          label="Name"
          validation="Please provide a name."
          invalid
        />
        <br />
        <MDBInput
          value={email || ""}
          name="email"
          onChange={onChange}
          required
          label="Email"
          type="email"
          validation="Please provide an email."
          invalid
        />
        <br />
        <MDBInput
          value={phone || ""}
          name="phone"
          onChange={onChange}
          required
          label="Phone"
          type="number"
          validation="Please provide a phone no."
          invalid
        />
        <br />
        <MDBInput
          value={address || ""}
          name="address"
          type="text"
          onChange={onChange}
          required
          label="Address"
          validation="Please provide an address"
          invalid
        />
        <br />
        <select  onChange={onDropdownChange} 
        value={status}
        style={{width: "100%", borderRadius: "2px", height: "35px", borderColor: "6543ef"}}>
          <option>Please select status</option>
          {options.map((option, index) => (
            <option value={option.label || ""}
            key={index}
            >{option.label}
             </option>
          ))}
        </select>
        {statusErrMsg && <div style={{color : "red", textAlign: "left", fontSize: "15px"}}>
            {statusErrMsg}
            </div>
        }
        <br />
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px" }} type="submit">
            {editMode ? "Update" : "Add"}
          </MDBBtn>
          <MDBBtn onClick={() => navigate("/")} color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
      {/* </form> */}
    </MDBValidation>
  );
};

export default AddEditUser;
