"use client";
import React, { useState } from "react";
import axios from "axios";
import { getApiUrl } from '../../utils/api';

export const dynamic = 'force-dynamic';
// import "./Payment.css";

const Payment = () => {
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onsubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    axios
      .post(getApiUrl('flousi/pay'), 1200)
      .then((res) => {
        console.log("eee");
        const { result } = res.data;
        window.location.href = result.link;
      })

      .catch((err) => console.log(err));
  };
  console.log(form);

  return (
    <div>
    <div className="p-4">
      <form className="m-4">
        <button className="btn btn-primary mt-4" >
       
        </button>
        <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
<img
  src="/images/payment/flouci-logo.png"
  className="mb-[20px] w-[250px] max-w-xs transition duration-300 ease-in-out hover:scale-110"
  alt="Louvre" onClick={onsubmit} />
</div>
      </form>
    </div>
  </div>
  );
};

export default Payment;