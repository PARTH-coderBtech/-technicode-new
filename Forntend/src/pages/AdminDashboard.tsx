import { Link, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Award,
  PlusCircle,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const ADMIN_EMAIL = "krishk99973@gmail.com";

const AdminDashboard = () => {
  const { user } = useAuth();

  // Only admin can access this page
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  const adminOptions = [
    {
      title: "Manage Applications",
      description:
        "View all internship applications and update their status.",
      icon: FileText,
      link: "/admin/applications",
      color: "bg-blue-500",
    },
    {
      title: "Generate Certificate",
      description:
        "Generate and issue internship certificates to students.",
      icon: Award,
      link: "/admin/generate-certificate",
      color: "bg-purple-500",
    },
    {
      title: "Add Internship",
      description:
        "Create and publish new internship opportunities.",
      icon: PlusCircle,
      link: "/admin/add",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-[#071B2A]">

      {/* HEADER */}

      <div className="bg-[#071B2A] text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <Link
            to="/"
            className="text-2xl font-bold"
          >
            Tech
            <span className="text-[#00D1FF]">
              In
            </span>
            Code
          </Link>


          <div className="flex items-center gap-4">

            <div className="hidden sm:block text-right">

              <p className="font-semibold">
                {user?.name}
              </p>

              <p className="text-xs text-gray-300">
                Administrator
              </p>

            </div>


            <div className="w-11 h-11 rounded-full bg-[#00AEEF] flex items-center justify-center font-bold text-lg">

              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "A"}

            </div>

          </div>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="max-w-7xl mx-auto px-6 py-10">


        {/* TITLE */}

        <div className="mb-10">

          <div className="flex items-center gap-3 mb-3">

            <div className="w-12 h-12 rounded-xl bg-[#071B2A] flex items-center justify-center">

              <ShieldCheck className="text-[#00D1FF] w-7 h-7" />

            </div>


            <div>

              <h1 className="text-3xl font-bold">

                Admin Dashboard

              </h1>

              <p className="text-gray-500 mt-1">

                Manage TechInCode internships, applications and certificates.

              </p>

            </div>

          </div>

        </div>


        {/* WELCOME CARD */}

        <div className="bg-gradient-to-r from-[#071B2A] to-[#0b2a40] rounded-2xl p-8 text-white mb-8">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-[#00AEEF] rounded-full flex items-center justify-center">

              <LayoutDashboard className="w-7 h-7" />

            </div>


            <div>

              <h2 className="text-2xl font-bold">

                Welcome back, {user?.name?.split(" ")[0] || "Admin"} 👋

              </h2>

              <p className="text-gray-300 mt-1">

                You have administrator access to TechInCode.

              </p>

            </div>

          </div>

        </div>


        {/* ADMIN OPTIONS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {adminOptions.map((option) => {

            const Icon = option.icon;

            return (

              <Link
                key={option.title}
                to={option.link}
                className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                <div
                  className={`w-14 h-14 ${option.color} rounded-xl flex items-center justify-center mb-5`}
                >

                  <Icon className="text-white w-7 h-7" />

                </div>


                <h3 className="text-xl font-bold text-[#071B2A]">

                  {option.title}

                </h3>


                <p className="text-gray-500 mt-2 text-sm leading-relaxed">

                  {option.description}

                </p>


                <div className="mt-5 text-[#00AEEF] font-semibold flex items-center gap-2">

                  Manage →

                </div>

              </Link>

            );

          })}

        </div>


        {/* BACK BUTTON */}

        <div className="mt-10">

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 px-5 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >

            <ArrowLeft size={18} />

            Back to Website

          </Link>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;