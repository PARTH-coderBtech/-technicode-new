import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditInternship = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    paymentType: "Unpaid",
    stipend: "",
    description: "",
    fullDescription: "",
    category: "",
    type: "Tech",
    duration: "",
    location: "Remote",
    openings: "Multiple",
    status: "Open",

    responsibilities: "",
    skills: "",
    whoCanApply: "",
    learning: "",
    perks: "",
  });

  // ==========================================
  // FETCH INTERNSHIP
  // ==========================================

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await fetch(
          `${API_URL}/internships/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch internship"
          );
        }

        const internship = data.data;

        setFormData({
          title: internship.title || "",
          paymentType: internship.paymentType || "Unpaid",
          stipend:
            internship.paymentType === "Paid"
              ? internship.stipend || ""
              : "",

          description: internship.description || "",
          fullDescription: internship.fullDescription || "",

          category: internship.category || "",
          type: internship.type || "Tech",
          duration: internship.duration || "",
          location: internship.location || "Remote",
          openings: internship.openings || "Multiple",
          status: internship.status || "Open",

          responsibilities:
            internship.responsibilities?.join("\n") || "",

          skills:
            internship.skills?.join(", ") || "",

          whoCanApply:
            internship.whoCanApply?.join("\n") || "",

          learning:
            internship.learning?.join("\n") || "",

          perks:
            internship.perks?.join("\n") || "",
        });
      } catch (error: any) {
        console.error("Fetch Internship Error:", error);

        toast.error(
          error.message || "Failed to load internship"
        );

        navigate("/admin/add");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInternship();
    }
  }, [id, API_URL, navigate]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // UPDATE INTERNSHIP
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        title: formData.title.trim(),

        paymentType: formData.paymentType,

        // Unpaid internship ke liye stipend empty rahega
        stipend:
          formData.paymentType === "Paid"
            ? formData.stipend.trim()
            : "",

        description: formData.description.trim(),

        fullDescription:
          formData.fullDescription.trim(),

        category: formData.category.trim(),

        type: formData.type,

        duration: formData.duration.trim(),

        location: formData.location.trim(),

        openings: formData.openings.trim(),

        status: formData.status,

        responsibilities:
          formData.responsibilities
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),

        skills:
          formData.skills
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),

        whoCanApply:
          formData.whoCanApply
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),

        learning:
          formData.learning
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),

        perks:
          formData.perks
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
      };

      const response = await fetch(
        `${API_URL}/internships/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update internship"
        );
      }

      toast.success(
        "Internship updated successfully!"
      );

      navigate("/admin/add");
    } catch (error: any) {
      console.error(
        "Update Internship Error:",
        error
      );

      toast.error(
        error.message ||
          "Failed to update internship"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-lg font-semibold text-[#071B2A]">
          Loading internship...
        </p>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-100 pt-20 pb-10">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}

        <div className="bg-[#071B2A] text-white rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold">
            Edit Internship
          </h1>

          <p className="text-gray-300 mt-2">
            Update internship details below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
        >

          {/* BASIC DETAILS */}

          <div>
            <h2 className="text-xl font-bold text-[#071B2A] mb-4">
              Basic Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* TITLE */}

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Internship Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                />
              </div>

              {/* CATEGORY */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                />
              </div>

              {/* TYPE */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                >
                  <option value="Tech">
                    Tech
                  </option>

                  <option value="Non-Tech">
                    Non-Tech
                  </option>
                </select>
              </div>

              {/* DURATION */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration
                </label>

                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 3 Months"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                />
              </div>

              {/* LOCATION */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                />
              </div>

              {/* OPENINGS */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Openings
                </label>

                <input
                  type="text"
                  name="openings"
                  value={formData.openings}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                />
              </div>

              {/* STATUS */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                >
                  <option value="Open">
                    Open
                  </option>

                  <option value="Closed">
                    Closed
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* PAYMENT */}

          <div className="border-t pt-6">

            <h2 className="text-xl font-bold text-[#071B2A] mb-4">
              Payment Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Type
                </label>

                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                >
                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Unpaid">
                    Unpaid
                  </option>
                </select>
              </div>

              {/* STIPEND ONLY FOR PAID */}

              {formData.paymentType === "Paid" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stipend
                  </label>

                  <input
                    type="text"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleChange}
                    placeholder="e.g. ₹10,000/month"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                  />
                </div>
              )}

            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="border-t pt-6">

            <h2 className="text-xl font-bold text-[#071B2A] mb-4">
              Description
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Short Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Description
                </label>

                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  rows={7}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black resize-none"
                />
              </div>

            </div>
          </div>

          {/* RESPONSIBILITIES */}

          <div className="border-t pt-6">

            <h2 className="text-xl font-bold text-[#071B2A] mb-4">
              Internship Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Responsibilities
                </label>

                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows={6}
                  placeholder={`Enter one responsibility per line`}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Skills
                </label>

                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={4}
                  placeholder="React, Node.js, MongoDB, Git"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Who Can Apply
                </label>

                <textarea
                  name="whoCanApply"
                  value={formData.whoCanApply}
                  onChange={handleChange}
                  rows={5}
                  placeholder={`Enter one point per line`}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Learning
                </label>

                <textarea
                  name="learning"
                  value={formData.learning}
                  onChange={handleChange}
                  rows={5}
                  placeholder={`Enter one learning point per line`}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Perks
                </label>

                <textarea
                  name="perks"
                  value={formData.perks}
                  onChange={handleChange}
                  rows={5}
                  placeholder={`Enter one perk per line`}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black resize-none"
                />
              </div>

            </div>
          </div>

          {/* BUTTONS */}

          <div className="border-t pt-6 flex flex-col sm:flex-row gap-4">

            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#071B2A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0b2a40] transition disabled:opacity-50"
            >
              {saving
                ? "Updating..."
                : "Update Internship"}
            </button>

            <button
              type="button"
              onClick={() => navigate("admin/add")}
              className="flex-1 border border-gray-300 text-[#071B2A] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditInternship;