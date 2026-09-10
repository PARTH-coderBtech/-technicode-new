import React, { useState } from "react";
import axios from "axios";

const GenerateCertificate = () => {
const [formData, setFormData] = useState({
certificateType: "INTERNSHIP",
recipientName: "",
recipientEmail: "",
role: "",
domain: "",
startDate: "",
endDate: "",
skills: "",
projectsCompleted: 0,
});

const [loading, setLoading] = useState(false);

const handleChange = (
e: React.ChangeEvent<
HTMLInputElement | HTMLSelectElement
>
) => {
const { name, value } = e.target;

setFormData({
  ...formData,
  [name]:
    name === "projectsCompleted"
      ? Number(value)
      : value,
});

};

const handleSubmit = async (
e: React.FormEvent<HTMLFormElement>
) => {
e.preventDefault();

try {
  setLoading(true);

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/certificates`,
    {
      ...formData,

      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    }
  );

  alert(
    `Certificate Generated Successfully!


Certificate ID:
${response.data.certificate.certificateId}`
);


  setFormData({
    certificateType: "INTERNSHIP",
    recipientName: "",
    recipientEmail: "",
    role: "",
    domain: "",
    startDate: "",
    endDate: "",
    skills: "",
    projectsCompleted: 0,
  });

} catch (error: any) {

  console.error(error);

  alert(
    error.response?.data?.message ||
    "Certificate generation failed"
  );

} finally {

  setLoading(false);

}

};

return (
  
 <div className="min-h-screen bg-slate-100 p-4 md:p-8">

  <div className="max-w-3xl mx-auto">

    {/* Header */}

    <div className="mb-8">

      <h1 className="text-3xl font-bold text-[#071B2A]">

        Generate Certificate

      </h1>

      <p className="text-gray-600 mt-2">

        Create and issue a verified certificate
        for an intern.

      </p>

    </div>


    {/* Form */}

    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-5"
    >

      {/* Certificate Type */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">

          Certificate Type

        </label>

        <select
          name="certificateType"
          value={formData.certificateType}
          onChange={handleChange}
          className="w-full border border-gray-300 bg-white text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#00AEEF]"
        >

          <option value="INTERNSHIP">
            Internship Certificate
          </option>

          <option value="EXPERIENCE">
            Experience Certificate
          </option>

          <option value="PROJECT">
            Project Certificate
          </option>

        </select>

      </div>


      {/* Name */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">

          Recipient Full Name

        </label>

        <input
          type="text"
          name="recipientName"
          placeholder="Enter intern full name"
          value={formData.recipientName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-400 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#00AEEF]"
        />

      </div>


      {/* Email */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">

          Recipient Email

        </label>

        <input
          type="email"
          name="recipientEmail"
          placeholder="Enter intern email address"
          value={formData.recipientEmail}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-400 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#00AEEF]"
        />

      </div>


      {/* Role */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">

          Internship Role

        </label>

        <input
          type="text"
          name="role"
          placeholder="Example: MERN Stack Developer"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-400 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#00AEEF]"
        />

      </div>


      {/* Domain */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">

          Domain

        </label>

        <input
          type="text"
          name="domain"
          placeholder="Example: Web Development"
          value={formData.domain}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-400 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#00AEEF]"
        />

      </div>


      {/* Dates */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">

            Start Date

          </label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-white text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#00AEEF]"
          />

        </div>


        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">

            End Date

          </label>

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-white text-black px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#00AEEF]"
          />

        </div>

      </div>


      {/* Skills */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">

          Skills

        </label>

        <input
          type="text"
          name="skills"
          placeholder="React, Node.js, MongoDB"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-400 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#00AEEF]"
        />

        <p className="text-xs text-gray-500 mt-1">

          Separate multiple skills using commas.

        </p>

      </div>


      {/* Projects */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">

          Projects Completed

        </label>

        <input
          type="number"
          name="projectsCompleted"
          min="0"
          placeholder="Number of projects completed"
          value={formData.projectsCompleted}
          onChange={handleChange}
          className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-400 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#00AEEF]"
        />

      </div>


      {/* Submit Button */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#071B2A] hover:bg-[#0d2a3d] disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
      >

        {loading
          ? "Generating Certificate..."
          : "Generate Certificate"}

      </button>

    </form>

  </div>

</div>


);
};

export default GenerateCertificate;
