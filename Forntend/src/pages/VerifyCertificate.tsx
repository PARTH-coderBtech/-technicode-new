import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";


const VerifyCertificate = () => {

  const [certificateId, setCertificateId] =
    useState("");

  const navigate = useNavigate();


  const handleVerify = (e) => {

    e.preventDefault();


    if (!certificateId.trim()) {

      alert(
        "Please enter certificate ID"
      );

      return;

    }


    navigate(

      `/verify/${certificateId.toUpperCase()}`

    );

  };


  return (

    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">


        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-[#071B2A]">

            TechInCode

          </h1>


          <p className="text-gray-500 mt-2">

            Certificate Verification

          </p>

        </div>


        <form onSubmit={handleVerify}>


          <label className="block mb-2 font-medium">

            Certificate ID

          </label>


          <input

            type="text"

            placeholder="TIC-INT-2026-000001"

            value={certificateId}

            onChange={(e) =>
              setCertificateId(
                e.target.value
              )
            }

            className="w-full border rounded-lg px-4 py-3 outline-none focus:border-cyan-500"

          />


          <button

            type="submit"

            className="w-full mt-5 bg-[#071B2A] text-white py-3 rounded-lg hover:bg-[#00AEEF] transition"

          >

            Verify Certificate

          </button>


        </form>


        <p className="text-xs text-gray-400 text-center mt-6">

          Verify certificates officially issued by TechInCode.

        </p>


      </div>

    </div>

  );

};


export default VerifyCertificate;