//    Developed by Harsh Khatri

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../Context/UserAuthContext";
import OtpInput from "otp-input-react";

export default function PhoneSignUp() {
  const [number, setNumber] = useState("7489912153");
  const [error, setError] = useState("");
  const { setUpRecaptcha } = useUserAuth();
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState("");
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();
  const [inputOtp , setInputOtp] = useState()
  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined) {
      setTimeout(() => {
        setError("");
      }, 3000);
      return setError("Enter the valid number");
    }
    try {
      const response = await setUpRecaptcha(number);
      console.log(flag);
      setFlag(false);
      setConfirmObj(response);
      console.log("response", response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log(otp);
    console.log( "input type"  , inputOtp);

    if (otp === "" || otp === null) return;
    try {
      setError("");
      await confirmObj.confirm(otp);
      navigate("/");
    } catch (err) {
      setTimeout(() => {
        setError("");
      }, 4000);
      setError("OTP is invalid");
      console.log(err.message);
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <div className="p-4 box">
                <h2 className="mb-3">Login With Phone</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form
                  onSubmit={getOtp}
                  style={{ display: flag ? "block" : "none" }}
                >
                  <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <PhoneInput
                      defaultCountry="IN"
                      value=""
                      placeholder="123-456-7891"
                      onChange={setNumber}
                    />
                    {/* Verification captcha  */}
                    &nbsp;
                    <div
                      id="recaptcha-container"
                      className="text-align-center"
                    ></div>
                  </Form.Group>
                  <div className="btn">
                    <Button variant="secondary">Cancel</Button> &nbsp;
                    <Button variant="primary" type="Submit">
                      Send OTP
                    </Button>
                  </div>

                  {/* <div className="d-grid gap-2">
                      <Button variant="primary" type="submit">
                        Log In
                      </Button>
                    </div> */}
                </Form>

                <Form
                  onSubmit={verifyOtp}
                  style={{ display: !flag ? "block" : "none" }}
                >
                  <Form.Group className="mb-3" controlId="formBasicOtp">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control
                      type="otp"
                      placeholder="123-456-7891"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    {/* Verification captcha  */}
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Verify OTP
                    </Button>
                  </div>
                  &nbsp;
                  <div className="d-grid gap-2">
                    <OtpInput OTPLength={6} otpType="number" autoFocus value={inputOtp} onChange={setInputOtp}></OtpInput>
                  </div>
                  &nbsp;
                </Form>

                <hr />
                {/* <div>
                  <GoogleButton
                    className="g-btn"
                    type="dark"
                    // onClick={handleGoogleSignIn}
                  />
                </div> */}
                <br />
                <Link to="/login">
                  <div className="d-grid gap-2">
                    <Button variant="primary">Email Sign In</Button>
                  </div>
                </Link>
              </div>
              <div className="p-4 box mt-3 text-center">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
