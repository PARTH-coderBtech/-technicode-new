import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

  // ==============================
  // FETCH APPLICATIONS
  // ==============================

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/apply/applications`
      );

      setApplications(
        response.data.applications || []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load applications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ==============================
  // UPDATE STATUS
  // ==============================

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await axios.patch(
        `${API_URL}/apply/applications/${id}/status`,
        {
          status,
        }
      );

      toast.success(
        `Application marked as ${status}`
      );

      // Instant UI update

      setApplications((prev) =>
        prev.map((application) =>
          application._id === id
            ? {
                ...application,
                status,
              }
            : application
        )
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update status"
      );
    }
  };

  // ==============================
  // STATUS COLOR
  // ==============================

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";

      case "Active":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-purple-100 text-purple-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ==============================
  // LOADING SCREEN
  // ==============================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <p className="text-lg font-semibold text-[#071B2A]">
          Loading applications...
        </p>

      </div>
    );
  }

  // ==============================
  // MAIN UI
  // ==============================

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-[#071B2A]">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-[#071B2A]">
            Internship Applications
          </h1>

          <p className="text-gray-600 mt-2">
            Manage and update student applications
          </p>

        </div>


        {/* EMPTY STATE */}

        {applications.length === 0 ? (

          <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-gray-200">

            <p className="text-gray-600">
              No applications found.
            </p>

          </div>

        ) : (

          /* APPLICATION LIST */

          <div className="grid gap-5">

            {applications.map((application) => (

              <div
                key={application._id}
                className="bg-white text-[#071B2A] rounded-xl border border-gray-200 p-6 shadow-sm"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">


                  {/* USER INFORMATION */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 flex-1">


                    {/* FULL NAME */}

                    <div>

                      <p className="text-xs text-gray-500 mb-1">
                        Full Name
                      </p>

                      <p className="font-semibold text-[#071B2A]">
                        {application.fullName || "N/A"}
                      </p>

                    </div>


                    {/* EMAIL */}

                    <div>

                      <p className="text-xs text-gray-500 mb-1">
                        Email
                      </p>

                      <p className="font-medium text-[#071B2A] break-all">
                        {application.email || "N/A"}
                      </p>

                    </div>


                    {/* PHONE */}

                    <div>

                      <p className="text-xs text-gray-500 mb-1">
                        Phone
                      </p>

                      <p className="font-medium text-[#071B2A]">
                        {application.phone || "N/A"}
                      </p>

                    </div>


                    {/* COLLEGE */}

                    <div>

                      <p className="text-xs text-gray-500 mb-1">
                        College
                      </p>

                      <p className="font-medium text-[#071B2A]">
                        {application.college || "N/A"}
                      </p>

                    </div>


                    {/* INTERNSHIP */}

                    <div>

                      <p className="text-xs text-gray-500 mb-1">
                        Internship
                      </p>

                      <p className="font-bold text-[#00AEEF]">
                        {application.internship || "N/A"}
                      </p>

                    </div>


                    {/* APPLICATION ID */}

                    <div>

                      <p className="text-xs text-gray-500 mb-1">
                        Application ID
                      </p>

                      <p className="font-medium text-[#071B2A] text-sm break-all">
                        {application._id}
                      </p>

                    </div>


                  </div>


                  {/* STATUS SECTION */}

                  <div className="flex flex-col gap-3 min-w-[190px]">


                    {/* CURRENT STATUS */}

                    <span
                      className={`text-center px-3 py-2 rounded-lg text-sm font-semibold ${getStatusColor(
                        application.status || "Pending"
                      )}`}
                    >

                      {application.status || "Pending"}

                    </span>


                    {/* STATUS DROPDOWN */}

                    <select

                      value={
                        application.status || "Pending"
                      }

                      onChange={(e) =>
                        updateStatus(
                          application._id,
                          e.target.value
                        )
                      }

                      className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#00AEEF] bg-white text-[#071B2A] font-medium cursor-pointer"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Accepted">
                        Accepted
                      </option>

                      <option value="Active">
                        Active
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>

                    </select>


                  </div>


                </div>


                {/* DATE */}

                <div className="mt-6 pt-4 border-t border-gray-200">

                  <p className="text-xs text-gray-500">

                    Applied on{" "}

                    <span className="font-medium text-[#071B2A]">

                      {application.createdAt
                        ? new Date(
                            application.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "N/A"}

                    </span>

                  </p>

                </div>


              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminApplications;