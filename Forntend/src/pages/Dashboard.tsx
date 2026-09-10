import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(savedUser);

        setUser(parsedUser);

        // ==============================
        // FETCH USER CERTIFICATES
        // ==============================

        try {
          const certificateResponse = await axios.get(
            `${API_URL}/certificates/my-certificates`,
            {
              params: {
                email: parsedUser.email,
              },
            }
          );

          setCertificates(
            certificateResponse.data.certificates || []
          );
       } catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("CERTIFICATE API ERROR:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
  } else {
    console.error("CERTIFICATE API ERROR:", error);
  }

  setCertificates([]);
}

        // ==============================
        // FETCH USER APPLICATIONS
        // ==============================

        try {
          const applicationResponse = await axios.get(
            `${API_URL}/apply/my-applications`,
            {
              params: {
                email: parsedUser.email,
              },
            }
          );

          setApplications(
            applicationResponse.data.applications || []
          );
        } catch (error) {
          console.log("Applications not available yet");
          setApplications([]);
        }

      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_URL]);

  // ==============================
  // ACTIVE INTERNSHIPS COUNT
  // ==============================

  const activeInternships = applications.filter(
    (application) =>
      application.status === "Accepted" ||
      application.status === "Active" ||
      application.status === "Ongoing"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex justify-center items-center">
        <p className="text-lg text-[#071B2A] font-semibold">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-[#071B2A] pt-16">

      {/* HEADER */}

      <div className="bg-[#071B2A] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <Link
            to="/"
            className="text-2xl font-bold text-white"
          >
            Tech
            <span className="text-[#00D1FF]">
              In
            </span>
            Code
          </Link>

          <div className="flex items-center gap-3">

            <div className="text-right hidden sm:block">

              <p className="font-semibold text-white">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-300">
                {user?.email || ""}
              </p>

            </div>

            <div className="w-10 h-10 rounded-full bg-[#00AEEF] flex items-center justify-center font-bold text-white">

              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}

            </div>

          </div>

        </div>
      </div>


      <div className="max-w-7xl mx-auto p-6">

        {/* WELCOME */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-[#071B2A]">

            Welcome back,{" "}
            {user?.name?.split(" ")[0] || "User"} 👋

          </h1>

          <p className="text-gray-600 mt-2">

            Track your internships, applications and certificates
            from one place.

          </p>

        </div>


        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">


          {/* APPLICATIONS */}

          <div className="bg-white text-black rounded-xl p-6 shadow-sm border border-gray-200">

            <p className="text-gray-600 text-sm font-medium">
              Applications
            </p>

            <h2 className="text-3xl font-bold text-[#071B2A] mt-2">
              {applications.length}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Total applications submitted
            </p>

          </div>


          {/* ACTIVE INTERNSHIPS */}

          <div className="bg-white text-black rounded-xl p-6 shadow-sm border border-gray-200">

            <p className="text-gray-600 text-sm font-medium">
              Active Internships
            </p>

            <h2 className="text-3xl font-bold text-[#071B2A] mt-2">
              {activeInternships.length}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Currently active internships
            </p>

          </div>


          {/* CERTIFICATES */}

          <div className="bg-white text-black rounded-xl p-6 shadow-sm border border-gray-200">

            <p className="text-gray-600 text-sm font-medium">
              Certificates
            </p>

            <h2 className="text-3xl font-bold text-[#071B2A] mt-2">
              {certificates.length}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Certificates earned
            </p>

          </div>

        </div>


        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


          {/* PROFILE */}

          <div className="bg-white text-black rounded-xl p-6 shadow-sm border border-gray-200">

            <div className="flex justify-between items-center mb-5">
  <h2 className="text-xl font-bold text-[#071B2A]">
    My Profile
  </h2>

  <Link
    to="/edit-profile"
    className="bg-[#071B2A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0b2a40] transition"
  >
    Edit Profile
  </Link>
</div>



            <div className="space-y-4">

              <div>

                <p className="text-xs text-gray-500">
                  Full Name
                </p>

                <p className="font-semibold text-black mt-1">
                  {user?.name || "N/A"}
                </p>

              </div>


              <div>

                <p className="text-xs text-gray-500">
                  Email Address
                </p>

                <p className="font-semibold text-black break-all mt-1">
                  {user?.email || "N/A"}
                </p>

              </div>


              <div>

                <p className="text-xs text-gray-500">
                  Account Type
                </p>

                <p className="font-semibold text-black mt-1">
                  Student / Intern
                </p>

              </div>

            </div>

          </div>


          {/* RECENT APPLICATIONS */}

          <div className="bg-white text-black rounded-xl p-6 shadow-sm border border-gray-200 lg:col-span-2">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold text-[#071B2A]">
                Recent Applications
              </h2>

              {applications.length > 0 && (
                <span className="text-sm text-gray-500">
                  {applications.length} Total
                </span>
              )}

            </div>


            {applications.length === 0 ? (

              <div className="text-center py-10">

                <p className="text-gray-600">
                  You haven't applied for any internships yet.
                </p>

                <Link
                  to="/internships"
                  className="inline-block mt-4 bg-[#071B2A] text-white px-5 py-2 rounded-lg hover:bg-[#0b2a40] transition"
                >
                  Explore Internships
                </Link>

              </div>

            ) : (

              <div className="space-y-4">

                {applications
                  .slice(0, 5)
                  .map((application: any) => (

                    <div
                      key={application._id}
                      className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                    >

                      <div>

                        <h3 className="font-semibold text-black text-lg">

                          {application.internship ||
                            application.internshipTitle ||
                            "Internship"}

                        </h3>


                        <div className="flex flex-wrap gap-3 mt-2">

                          <p className="text-sm text-gray-500">

                            Applied on{" "}

                            {application.createdAt
                              ? new Date(
                                  application.createdAt
                                ).toLocaleDateString()
                              : "Recently"}

                          </p>


                          {application.college && (

                            <p className="text-sm text-gray-500">

                              {application.college}

                            </p>

                          )}

                        </div>

                      </div>


                      {/* STATUS */}

                      <span
                        className={`px-3 py-1.5 text-xs rounded-full font-semibold whitespace-nowrap

                        ${
                          application.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : application.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : application.status === "Active" ||
                              application.status === "Ongoing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {application.status || "Pending"}

                      </span>

                    </div>

                  ))}

              </div>

            )}

          </div>

        </div>


        {/* ACTIVE INTERNSHIPS SECTION */}

        <div className="bg-white text-black rounded-xl p-6 shadow-sm border border-gray-200 mt-6">

          <div className="flex justify-between items-center mb-5">

            <div>

              <h2 className="text-xl font-bold text-[#071B2A]">
                Active Internships
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Internships currently assigned to you
              </p>

            </div>

          </div>


          {activeInternships.length === 0 ? (

            <div className="text-center py-8">

              <p className="text-gray-600">
                No active internships yet.
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Your accepted internships will appear here.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {activeInternships.map((application: any) => (

                <div
                  key={application._id}
                  className="border border-green-200 bg-green-50 rounded-xl p-5"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="font-bold text-lg text-[#071B2A]">

                        {application.internship ||
                          application.internshipTitle ||
                          "Internship"}

                      </h3>


                      <p className="text-sm text-gray-600 mt-2">

                        {application.college}

                      </p>

                    </div>


                    <span className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">

                      Active

                    </span>

                  </div>


                  <div className="mt-4 pt-4 border-t border-green-200">

                    <p className="text-sm text-gray-600">

                      Status:{" "}

                      <span className="font-semibold text-green-700">

                        {application.status}

                      </span>

                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* CERTIFICATES */}

        <div className="bg-white text-black rounded-xl p-6 shadow-sm border border-gray-200 mt-6">

          <div className="flex justify-between items-center mb-5">

            <div>

              <h2 className="text-xl font-bold text-[#071B2A]">
                My Certificates
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                View and verify your issued certificates
              </p>

            </div>

          </div>


          {certificates.length === 0 ? (

            <p className="text-gray-600 text-center py-8">
              No certificates issued yet.
            </p>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {certificates.map((certificate: any) => (

                <div
                  key={certificate._id}
                  className="border border-gray-300 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
                >

                  <span className="inline-block bg-[#00D1FF]/20 text-[#071B2A] px-3 py-1 rounded-full text-xs font-bold mb-3">

                    {certificate.certificateType || "INTERNSHIP"}

                  </span>


                  <h3 className="font-bold text-lg text-[#071B2A]">

                    {certificate.role ||
                      "Internship Certificate"}

                  </h3>


                  <div className="mt-4 space-y-3">

                    <div>

                      <p className="text-xs text-gray-500">
                        Certificate ID
                      </p>

                      <p className="font-semibold text-black break-all">

                        {certificate.certificateId}

                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-gray-500">
                        Domain
                      </p>

                      <p className="font-semibold text-black">

                        {certificate.domain}

                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-gray-500">
                        Duration
                      </p>

                      <p className="font-semibold text-black">

                        {certificate.startDate
                          ? new Date(
                              certificate.startDate
                            ).toLocaleDateString()
                          : "N/A"}

                        {" - "}

                        {certificate.endDate
                          ? new Date(
                              certificate.endDate
                            ).toLocaleDateString()
                          : "N/A"}

                      </p>

                    </div>

                  </div>


                  {/* VERIFY */}

                  <Link
                    to={`/verify/${certificate.certificateId}`}
                    className="w-full mt-5 bg-[#071B2A] text-white px-4 py-3 rounded-lg hover:bg-[#0b2a40] transition flex items-center justify-center font-semibold"
                  >

                    Verify Certificate

                  </Link>


                  {/* DOWNLOAD */}

                  {certificate.pdfUrl && (

                    <a
                      href={certificate.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full mt-3 bg-[#00AEEF] text-white px-4 py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center font-semibold"
                    >

                      View & Download Certificate

                    </a>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>


        {/* QUICK ACTIONS */}

        <div className="mt-6 bg-[#071B2A] rounded-xl p-6 text-white">

          <h2 className="text-xl font-bold text-white">
            Quick Actions
          </h2>


          <div className="flex flex-wrap gap-4 mt-5">

            <Link
              to="/internships"
              className="bg-[#00AEEF] text-white px-5 py-3 rounded-lg hover:opacity-90 transition font-medium"
            >

              Explore Internships

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;