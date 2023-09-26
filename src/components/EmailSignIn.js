import React, { useState } from "react";

import sgMail from "@sendgrid/mail";
import { Button, Form } from "react-bootstrap";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default function EmailSignIn() {
  const [email, setEmail] = useState("");
  //   const [message, setMessage] = useState("");

  const onMessage = (fields) => {
    fields.preventDefault() ; 
    console.log(email)
    const message = {
      to: email,
      from: "khatriharsh86@gmail.com",
      subject: "Login OTP",
      html: `<p> <strong>Name </strong> ${email}</p> 
            <p>  ${email}</p>`,
    };

    sgMail
      .send(message)
      .then(() => {
        console.log("email sent");
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  };

  return (
    <>
      <Form onSubmit={onMessage}>
        <Form.Group className="mb-3" controlId="formBasicEmailVerification">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicOTP">
          <Button className="primary" onClick={onMessage}>Send OTP</Button>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" 
        //   type="Submit"
          >
            Log In
          </Button>
        </div>
      </Form>
    </>
  );
}
