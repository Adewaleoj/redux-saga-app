import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationLink,
  MDBPaginationItem
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserStart, loadUsersStart, filterUserStart, sortUserStart } from "../redux/actions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Home = () => {
  const { users, loading, pageLimit, currentPage, paginationMode } = useSelector((state) => state.data);
const [sortValue, setSortValue] = useState("");  
  const sortOption = ["Name", "Email", "Phone", "Address", "Status"];
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsersStart({ start: 0, end: 4, currentPage: 0}));
  }, []);


  
  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: "150px" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete user ?")) {
      dispatch(deleteUserStart(id));
      toast.success("User Delete Successfully");
      setTimeout(() => dispatch(loadUsersStart({ start: 0, end: 4, currentPage: 0})))
    }
  };

const onFilterChange = (value) => {
  dispatch(filterUserStart(value));
} 

const onSortChange = (e) => {
  let sortValue = e.target.value
  .toLowerCase()
  .split(" ")
  .map((s) => s.charAt(0)
  .toUpperCase() + s.substring(1)).join(" ");
 if(sortOption.includes(sortValue)){
  setSortValue(e.target.value);
  dispatch(sortUserStart(e.target.value)) 
  } else {
    dispatch(loadUsersStart());
    setSortValue("");
  }
 };

const renderPagination = () => {
if (currentPage === 0) {
  return (
  <MDBPagination className="mb-0" >
    <MDBPaginationItem>
    <MDBPaginationLink>1</MDBPaginationLink>
    </MDBPaginationItem>
    <MDBPaginationItem>
<MDBBtn onClick={() => dispatch(loadUsersStart({start: 4, end: 8, currentPage: 1}))}>Next</MDBBtn>
    </MDBPaginationItem>
  </MDBPagination>)
} else if (currentPage < pageLimit -1 && users.length === pageLimit) {
 return(
 <MDBPagination className="mb-0">
  <MDBPaginationItem>
<MDBBtn onClick={() => dispatch(loadUsersStart({start: (currentPage - 1) * 4, end: currentPage * 4, currentPage: -1}))}>Prev</MDBBtn>
</MDBPaginationItem>
  <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
  <MDBPaginationItem>
<MDBBtn onClick={() => dispatch(loadUsersStart({start: (currentPage + 1) * 4, end: (currentPage + 2) * 4, currentPage: 1}))}>Next</MDBBtn>
  </MDBPaginationItem>
</MDBPagination>
 );
} else {
  return(
  <MDBPagination className="mb-0">
  <MDBPaginationItem>
<MDBBtn onClick={() => dispatch(loadUsersStart({start: (currentPage - 1) * 4, end: currentPage * 4, currentPage: -1,}))}>Prev</MDBBtn>
    <MDBPaginationItem>
    {/* <MDBPaginationLink>currentPage + 1</MDBPaginationLink> */}
    </MDBPaginationItem>
  </MDBPaginationItem>
</MDBPagination>)
}
}

  return (
    <MDBContainer >
<div className="container" style={{ marginTop: "150px" }}>
      <MDBTable >
        <MDBTableHead dark>
          <tr >
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        {users.length === 0 ? (<MDBTableBody className="align-center mb-0">
<tr>
  <td colSpan={8} className="text-center mb-0">No Data Found</td>
</tr>
        </MDBTableBody>) : (
          users.map((item, index) => (
            <MDBTableBody>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.status}</td>
                <td>
                  <MDBBtn
                    className="m-1"
                    tag="a"
                    color="none"
                    onClick={() => handleDelete(item.id)}
                  >
                    {" "}
                    <MDBTooltip title="Delete" tag="a">
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "#dd4b39" }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </MDBBtn>{" "}
                  <Link to={`/editUser/${item.id}`}>
                    <MDBTooltip title="Edit" tag="none">
                      <MDBIcon
                        fas
                        icon="pen"
                        style={{ color: "#55acee", marginBottom: "10px" }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </Link>{" "}
                  <Link to={`/userInfo/${item.id}`}>
                    <MDBTooltip title="View" tag="none">
                      <MDBIcon
                        fas
                        icon="eye"
                        size="lg"
                        style={{ color: "#3b5998", marginBottom: "10px" }}
                      />
                    </MDBTooltip>
                  </Link>
                </td>
              </tr>
            </MDBTableBody>
          )))}
      </MDBTable>
{paginationMode ? <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "250px",
          alignContent: "center",
        }}>{renderPagination()}</div>: null}
    </div>
    {users.length > 0 && (<MDBRow>
      <MDBCol size="8">
<h5>Sort By:</h5>
<select style={{width: "50%", borderRadius: "2px", height:"35px"}}
 onChange={onSortChange} 
   value={sortValue} >
    <option>Please Select Value</option>
    {sortOption.map((item, index) => (
      <option value={item.toLowerCase()} key={index}>{item}</option>
    ))}
   </select>
      </MDBCol>
      <MDBCol size="4">
<h5>Filter By Status:</h5>
<MDBBtnGroup>
  <MDBBtn color="success" onClick={() => onFilterChange("Active")}>Active</MDBBtn>
  <MDBBtn color="danger" onClick={() => onFilterChange("Inactive")} style={{marginLeft: "2px"}}>Inactive</MDBBtn>

</MDBBtnGroup>
      </MDBCol>
    </MDBRow>)}
    </MDBContainer>
    
  );
};

export default Home;
