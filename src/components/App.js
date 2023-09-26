//     Developed by Harsh Khatri

import React from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import { Col, Container, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "../Context/UserAuthContext";
import PhoneSignUp from "./PhoneSignUp";
import EmailSignIn from "./EmailSignIn";
// import {Row , Col , Container} from 'react-bootstrap'
// import { AuthProvider } from '../Context/AuthContext';

function App() {
  return (
    // <Container className="d-flex align-items-center justify-content-center"
    //   style={{minHeight:"100vh"}}
    // >
    //   <div className='w-100 ' style={{maxWidth : "400px"}}>
    //     <Signup/>
    //   </div>

    // </Container>

    <Container>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/phonesignup" element={<PhoneSignUp />} />
              <Route path="/emailsignup" element={<EmailSignIn />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
