import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  verifyCertificate,
} from "../services/certificateService";


const CertificateDetails = () => {

  const { certificateId } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [data, setData] =
    useState<any>(null);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const fetchCertificate =
      async () => {

        try {

          const response =
            await verifyCertificate(
              certificateId
            );

          setData(response);

        } catch (error: any) {

          setError(
            error.response?.data?.message ||
            "Certificate verification failed"
          );

        } finally {

          setLoading(false);

        }

      };


    if (certificateId) {

      fetchCertificate();

    }

  }, [certificateId]);


  /* LOADING */

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">

        <div className="w-12 h-12 border-4 border-[#00AEEF] border-t-transparent rounded-full animate-spin mb-4"></div>

        <p className="text-[#071B2A] font-medium">
          Verifying certificate...
        </p>

      </div>

    );

  }


  /* ERROR */

  if (error) {

    return (

      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

        <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full border border-gray-200">

          <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">

            <span className="text-red-500 text-4xl">
              ✕
            </span>

          </div>


          <h2 className="text-2xl font-bold text-[#071B2A] mt-6">

            Certificate Not Verified

          </h2>


          <p className="text-gray-600 mt-3">

            {error}

          </p>


          <Link
            to="/certificate"
            className="inline-block mt-6 bg-[#071B2A] text-white px-6 py-3 rounded-lg hover:bg-[#0b2a40] transition"
          >

            Try Again

          </Link>

        </div>

      </div>

    );

  }


  /* SAFETY CHECK */

  if (!data || !data.certificate) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <p className="text-[#071B2A]">
          Certificate data not found.
        </p>

      </div>

    );

  }


  const certificate =
    data.certificate;


  return (

    <div className="min-h-screen bg-slate-100 py-12 px-5">


      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">


        {/* VERIFIED HEADER */}

        <div className="bg-[#071B2A] text-white text-center py-10 px-5">


          <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg">

            ✓

          </div>


          <h1 className="text-3xl font-bold mt-5 text-white">

            Certificate Verified

          </h1>


          <p className="text-cyan-300 mt-2">

            This certificate is officially issued by TechInCode EduTech

          </p>


        </div>



        {/* CERTIFICATE DETAILS */}

        <div className="p-8">


          <div className="flex items-center justify-between mb-8 border-b pb-5">

            <div>

              <p className="text-sm text-gray-500">

                Certificate Status

              </p>


              <p className="text-green-600 font-bold text-lg">

                ✓ Verified & Authentic

              </p>

            </div>


            <div className="text-right">

              <p className="text-sm text-gray-500">

                Certificate Type

              </p>


              <p className="font-semibold text-[#071B2A]">

                {certificate.certificateType || "INTERNSHIP"}

              </p>

            </div>

          </div>



          {/* DETAILS GRID */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">


            {/* Certificate ID */}

            <div className="bg-slate-50 border border-gray-100 rounded-xl p-5">

              <p className="text-sm text-gray-500 mb-2">

                Certificate ID

              </p>


              <p className="font-bold text-[#071B2A] break-all">

                {certificate.certificateId}

              </p>

            </div>



            {/* Recipient Name */}

            <div className="bg-slate-50 border border-gray-100 rounded-xl p-5">

              <p className="text-sm text-gray-500 mb-2">

                Recipient Name

              </p>


              <p className="font-bold text-[#071B2A] text-lg">

                {certificate.recipientName}

              </p>

            </div>



            {/* Internship Role */}

            <div className="bg-slate-50 border border-gray-100 rounded-xl p-5">

              <p className="text-sm text-gray-500 mb-2">

                Internship Role

              </p>


              <p className="font-semibold text-[#071B2A]">

                {certificate.role}

              </p>

            </div>



            {/* Domain */}

            <div className="bg-slate-50 border border-gray-100 rounded-xl p-5">

              <p className="text-sm text-gray-500 mb-2">

                Domain

              </p>


              <p className="font-semibold text-[#071B2A]">

                {certificate.domain}

              </p>

            </div>



            {/* Duration */}

            <div className="bg-slate-50 border border-gray-100 rounded-xl p-5">

              <p className="text-sm text-gray-500 mb-2">

                Internship Duration

              </p>


              <p className="font-semibold text-[#071B2A]">

                {certificate.startDate
                  ? new Date(
                      certificate.startDate
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "N/A"
                }

                {" - "}

                {certificate.endDate
                  ? new Date(
                      certificate.endDate
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "N/A"
                }

              </p>

            </div>



            {/* Issued By */}

            <div className="bg-slate-50 border border-gray-100 rounded-xl p-5">

              <p className="text-sm text-gray-500 mb-2">

                Issued By

              </p>


              <p className="font-semibold text-[#071B2A]">

                {certificate.issuedBy ||
                  "TechInCode EduTech"}

              </p>

            </div>


          </div>



          {/* SKILLS */}

          {certificate.skills &&
            certificate.skills.length > 0 && (

              <div className="mt-8">

                <p className="text-sm text-gray-500 mb-3">

                  Skills Acquired

                </p>


                <div className="flex flex-wrap gap-2">

                  {certificate.skills.map(
                    (
                      skill: string,
                      index: number
                    ) => (

                      <span
                        key={index}
                        className="bg-cyan-50 text-[#071B2A] border border-cyan-200 px-3 py-1 rounded-full text-sm font-medium"
                      >

                        {skill}

                      </span>

                    )
                  )}

                </div>

              </div>

            )}



          {/* PROJECTS */}

          {certificate.projectsCompleted > 0 && (

            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">

              <p className="text-sm text-gray-500">

                Projects Completed

              </p>


              <p className="text-3xl font-bold text-[#071B2A] mt-1">

                {certificate.projectsCompleted}

              </p>

            </div>

          )}



          {/* ACTION BUTTONS */}

          <div className="mt-10 flex flex-col sm:flex-row gap-4">


            {/* View Certificate */}

            {certificate.pdfUrl && (

              <a
                href={certificate.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center bg-[#00AEEF] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >

                View Original Certificate

              </a>

            )}



            {/* Verify Another */}

            <Link
              to="/certificate"
              className="flex-1 text-center border-2 border-[#071B2A] text-[#071B2A] py-3 rounded-lg font-semibold hover:bg-[#071B2A] hover:text-white transition"
            >

              Verify Another Certificate

            </Link>


          </div>



          {/* FOOTER */}

          <div className="mt-8 pt-6 border-t text-center">

            <p className="text-xs text-gray-400">

              This certificate can be independently verified through
              TechInCode EduTech's official certificate verification system.

            </p>

          </div>


        </div>


      </div>


    </div>

  );

};


export default CertificateDetails;