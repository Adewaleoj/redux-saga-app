import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadUsersStart, searchUserStart } from "../redux/actions";

const Header = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUserStart(searchTerm));
    setSearchTerm("");
  }
  
  return (
    <>
      <MDBNavbar expand="lg" light bgColor="success">
        <MDBContainer fluid>
          <MDBNavbarBrand className="text-white">
            <span style={{ marginRight: "10px" }}>
              <MDBIcon fas icon="book-open" />
            </span>{" "}
            Contact
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="text-white"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink>
                  <NavLink className="text-white" to="/addUser">
                    Add User
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <NavLink className="text-white" to="/about">
                    About
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
              <input type="text"className="form-control" placeholder="Search Name...." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
              <MDBBtn color="dark" type="submit">Search</MDBBtn>
                  </form>
                  <MDBBtn color="info" style={{marginLeft: "4px"}} onClick={() => dispatch(loadUsersStart({ start: 0, end: 4, currentPage: 0}))}>Reset</MDBBtn>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
