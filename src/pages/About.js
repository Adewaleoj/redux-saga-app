import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";

const About = () => {
  return (
    <div style={{marginTop: "100px"}}>
      <MDBTypography note noteColor="primary">
        This application is built using redux saga. Fetched API using axios, users can add their details to the list, 
        search, paginate, sort using their details. different logics were put into play.</MDBTypography>
    </div>
  );
};

export default About;
