//     Developed by Harsh Khatri

import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useUserAuth } from "../Context/UserAuthContext";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [LastName, setLastName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);
  const [vari , setVar] = useState("Dj@gmail.com") ;
  const [validateEmail , setValidateEmail] = useState(false);
  const [validatePhone , setValidatePhone] = useState(false); 

  //Getting data from API call
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "customersData"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUser(newData);
  };


  
  //useEffect
  useEffect(() => {
    fetchData();
  }, []);
  
  // Handle submit of user data 
  const handleSubmit = async (e) => {
    e.preventDefault();
 

  const filteredEmail = user.filter(item => item.email === email )
  const filteredPhone = user.filter(item => item.phone === phone )

  if(filteredEmail.length !== 0 || filteredPhone.length !== 0){
    if(filteredEmail.length !== 0 ){
        console.log("Email Exist")
        setTimeout(() => {
            setValidateEmail(false)
        }, 5000);
        return setValidateEmail(true)
    }
    else{
        console.log("Phone Exist")
        setTimeout(() => {
            setValidatePhone(false)
        }, 5000);
        return setValidatePhone(true)
    }
  }


    
    try {
      setError("");
      const docRef = await addDoc(collection(db, "customersData"), {
        email: email,
        phone: phone,
        firstname: FirstName,
        lastname: LastName,
      });
    //   console.log("Document written with ID: ", docRef.id);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              {/* <Card> */}
              <Card.Body>
                <h2 className="text-center mb-4">Sign up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {validateEmail &&  <Alert variant="danger">Email Already Exists</Alert>} 
                {validatePhone && <Alert variant="danger">Phone Number Already Exists</Alert>} 
              </Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="FirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    placeholder="First Name"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  ></Form.Control>
                  <br />
                </Form.Group>
                <Form.Group id="LastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <br />
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Demo@gmail.com"
                    required
                  ></Form.Control>
                </Form.Group>
                <br />
                <Form.Group id="Phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    minLength={10}
                    maxLength={10}
                    placeholder="123-4567-8901"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" className="w-100 text-center mt-2">
                  Sign Up
                </Button>
              </Form>
              {/* </Card> */}
              <div className="w-100 text-center mt-2">
                Already have an account?<Link to="/login">Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
