import { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import { Navigate , useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";

import {
  Trash2,
  PlusCircle,
  Loader2,
  Plus,
  X
} from "lucide-react";


const AddInternship = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [internships, setInternships] = useState<any[]>([]);


  const [formData, setFormData] = useState({

    title: "",

    paymentType: "Unpaid",

     stipend: "",

    duration: "",

    category: "",

    description: "",

    fullDescription: "",

    type: "Tech",

    location: "Remote",

    openings: "",

    responsibilities: [] as string[],

    skills: [] as string[],

    whoCanApply: [] as string[],

    learning: [] as string[],

    perks: [] as string[]

  });


  /* Temporary input states */

  const [responsibilityInput, setResponsibilityInput] = useState("");

  const [skillInput, setSkillInput] = useState("");

  const [eligibilityInput, setEligibilityInput] = useState("");

  const [learningInput, setLearningInput] = useState("");

  const [perkInput, setPerkInput] = useState("");


  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";


  /* =========================
     FETCH INTERNSHIPS
  ========================= */

  const fetchInternships = async () => {

    try {

      const res = await fetch(
        `${API_BASE}/internships/all`
      );

      if (!res.ok) {

        throw new Error(
          `HTTP error! status: ${res.status}`
        );

      }


      const data = await res.json();


      if (data.success) {

        setInternships(data.data || []);

      } else if (Array.isArray(data)) {

        setInternships(data);

      }


    } catch (err) {

      console.error(
        "Fetch error details:",
        err
      );

    }

  };


  useEffect(() => {

    fetchInternships();

  }, []);


  if (!user?.isAdmin) {

    return <Navigate to="/" replace />;

  }


  /* =========================
     DELETE INTERNSHIP
  ========================= */

  const handleDelete = async (id: string) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this internship?"
      )
    ) return;


    try {

      const res = await fetch(
        `${API_BASE}/internships/${id}`,
        {
          method: "DELETE"
        }
      );


      if (!res.ok) {

        throw new Error(
          "Delete request failed"
        );

      }


      const data = await res.json();


      if (data.success) {

        toast.success(
          "Internship deleted successfully!"
        );

        fetchInternships();

      }


    } catch (err) {

      toast.error(
        "Failed to delete internship"
      );

      console.error(err);

    }

  };


  /* =========================
     ADD ITEM TO ARRAY
  ========================= */

  const addArrayItem = (

    field:
      | "responsibilities"
      | "skills"
      | "whoCanApply"
      | "learning"
      | "perks",

    value: string,

    setValue: (value: string) => void

  ) => {

    if (!value.trim()) return;


    setFormData((prev) => ({

      ...prev,

      [field]: [
        ...prev[field],
        value.trim()
      ]

    }));


    setValue("");

  };


  /* =========================
     REMOVE ARRAY ITEM
  ========================= */

  const removeArrayItem = (

    field:
      | "responsibilities"
      | "skills"
      | "whoCanApply"
      | "learning"
      | "perks",

    index: number

  ) => {

    setFormData((prev) => ({

      ...prev,

      [field]: prev[field].filter(
        (_, i) => i !== index
      )

    }));

  };


  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setIsLoading(true);


    try {
      const res = await fetch(
        `${API_BASE}/internships/add`,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)

        }
      );


      const data = await res.json();


      if (res.ok && data.success) {

        toast.success(
          "Internship Posted Successfully!"
        );


        /* Reset Form */

        setFormData({

          title: "",

          duration: "",

          category: "",

          description: "",

          fullDescription: "",

          type: "Tech",

          location: "Remote",
          
          paymentType: "Unpaid",

          stipend: "",

          openings: "",

          responsibilities: [],

          skills: [],

          whoCanApply: [],

          learning: [],

          perks: []

        });


        fetchInternships();


      } else {

        throw new Error(
          data.message ||
          "Failed to post internship"
        );

      }


    } catch (err: any) {

      toast.error(
        err.message ||
        "Error posting internship"
      );

      console.error(
        "Submit error:",
        err
      );


    } finally {

      setIsLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-background">

      <Navbar />


      <div className="container mx-auto pt-28 pb-10 px-4 grid grid-cols-1 xl:grid-cols-3 gap-8">


        {/* ================= FORM ================= */}

        <div className="xl:col-span-2 bg-card p-6 md:p-8 rounded-2xl border border-border shadow-xl">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

  <div>
    <h1 className="text-3xl font-bold">
      Admin Panel
    </h1>

    <p className="text-muted-foreground mt-1">
      Manage internships and certificates
    </p>
  </div>

  <Button
    type="button"
    onClick={() => navigate("/admin/generate-certificate")}
    className="flex items-center gap-2"
  >
    Generate Certificate
  </Button>

</div>
          <div className="flex items-center gap-3 mb-8">

            <div className="p-3 rounded-xl bg-primary/10">

              <PlusCircle className="text-primary w-6 h-6" />

            </div>


            <div>

              <h1 className="text-2xl font-bold">

                Post New Internship

              </h1>

              <p className="text-sm text-muted-foreground">

                Fill complete internship details.

              </p>

            </div>

          </div>



          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >


            {/* BASIC INFORMATION */}

            <div className="space-y-4">

              <h2 className="text-lg font-semibold border-b pb-3">

                Basic Information

              </h2>


              <div className="space-y-2">

                <Label>
                  Internship Title *
                </Label>

                <Input
                  value={formData.title}

                  placeholder="e.g. React.js Developer Intern"

                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value
                    })
                  }

                  required
                />

              </div>


              <div className="grid md:grid-cols-2 gap-4">


                <div className="space-y-2">

                  <Label>
                    Duration *
                  </Label>

                  <Input
                    value={formData.duration}

                    placeholder="e.g. 3 Months"

                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: e.target.value
                      })
                    }

                    required
                  />

                </div>


                <div className="space-y-2">

                  <Label>
                    Category *
                  </Label>

                  <Input
                    value={formData.category}

                    placeholder="e.g. Web Development"

                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value
                      })
                    }

                    required
                  />

                </div>


              </div>


              <div className="grid md:grid-cols-2 gap-4">


                <div className="space-y-2">

                  <Label>
                    Internship Type
                  </Label>


                  <select

                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"

                    value={formData.type}

                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value
                      })
                    }

                  >

                    <option value="Tech">

                      Tech Internship

                    </option>

                    <option value="Non-Tech">

                      Non-Tech Internship

                    </option>

                  </select>

                </div>


                <div className="space-y-2">

                  <Label>
                    Location
                  </Label>

                  <Input
                    value={formData.location}

                    placeholder="Remote / Delhi / Hybrid"

                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: e.target.value
                      })
                    }

                  />

                </div>


              </div>


              {/* PAYMENT TYPE + OPENINGS */}

<div className="grid md:grid-cols-2 gap-4">

  {/* Payment Type */}

  <div className="space-y-2">

    <Label>
      Payment Type *
    </Label>

    <select
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"

      value={formData.paymentType}

      onChange={(e) =>
        setFormData({
          ...formData,

          paymentType: e.target.value,

          stipend:
            e.target.value === "Unpaid"
              ? ""
              : formData.stipend
        })
      }
    >

      <option value="Unpaid">
        Unpaid Internship
      </option>

      <option value="Paid">
        Paid Internship
      </option>

    </select>

  </div>


  {/* Number of Openings */}

  <div className="space-y-2">

    <Label>
      Number of Openings
    </Label>

    <Input
      value={formData.openings}

      placeholder="e.g. 5"

      onChange={(e) =>
        setFormData({
          ...formData,
          openings: e.target.value
        })
      }
    />

  </div>

</div>


{/* STIPEND - ONLY FOR PAID */}

{formData.paymentType === "Paid" && (

  <div className="space-y-2">

    <Label>
      Stipend *
    </Label>

    <Input
      value={formData.stipend}

      placeholder="e.g. ₹5,000/month"

      onChange={(e) =>
        setFormData({
          ...formData,
          stipend: e.target.value
        })
      }

      required
    />

  </div>

)}

            </div>



            {/* DESCRIPTION */}

            <div className="space-y-4">

              <h2 className="text-lg font-semibold border-b pb-3">

                Internship Description

              </h2>


              <div className="space-y-2">

                <Label>
                  Short Description *
                </Label>

                <textarea

                  value={formData.description}

                  className="w-full p-3 bg-background border rounded-md text-sm min-h-[100px] focus:ring-2 focus:ring-primary outline-none"

                  placeholder="Short description shown on internship card..."

                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value
                    })
                  }

                  required

                />

              </div>


              <div className="space-y-2">

                <Label>
                  Full Description
                </Label>

                <textarea

                  value={formData.fullDescription}

                  className="w-full p-3 bg-background border rounded-md text-sm min-h-[180px] focus:ring-2 focus:ring-primary outline-none"

                  placeholder="Write complete internship description..."

                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullDescription: e.target.value
                    })
                  }

                />

              </div>

            </div>



            {/* RESPONSIBILITIES */}

            <div className="space-y-4">

              <h2 className="text-lg font-semibold border-b pb-3">

                Roles & Responsibilities

              </h2>


              <div className="flex gap-2">

                <Input

                  value={responsibilityInput}

                  placeholder="Add responsibility..."

                  onChange={(e) =>
                    setResponsibilityInput(
                      e.target.value
                    )
                  }

                  onKeyDown={(e) => {

                    if (e.key === "Enter") {

                      e.preventDefault();

                      addArrayItem(
                        "responsibilities",
                        responsibilityInput,
                        setResponsibilityInput
                      );

                    }

                  }}

                />


                <Button
                  type="button"

                  onClick={() =>
                    addArrayItem(
                      "responsibilities",
                      responsibilityInput,
                      setResponsibilityInput
                    )
                  }
                >

                  <Plus className="w-4 h-4" />

                </Button>

              </div>


              <div className="space-y-2">

                {formData.responsibilities.map(
                  (item, index) => (

                    <div
                      key={index}

                      className="flex items-center justify-between p-3 border rounded-lg"
                    >

                      <span className="text-sm">

                        {item}

                      </span>


                      <Button

                        type="button"

                        variant="ghost"

                        size="icon"

                        onClick={() =>
                          removeArrayItem(
                            "responsibilities",
                            index
                          )
                        }

                      >

                        <X className="w-4 h-4" />

                      </Button>

                    </div>

                  )
                )}

              </div>

            </div>



            {/* SKILLS */}

            <div className="space-y-4">

              <h2 className="text-lg font-semibold border-b pb-3">

                Required Skills

              </h2>


              <div className="flex gap-2">

                <Input

                  value={skillInput}

                  placeholder="Add skill e.g. React.js"

                  onChange={(e) =>
                    setSkillInput(e.target.value)
                  }

                  onKeyDown={(e) => {

                    if (e.key === "Enter") {

                      e.preventDefault();

                      addArrayItem(
                        "skills",
                        skillInput,
                        setSkillInput
                      );

                    }

                  }}

                />


                <Button
                  type="button"

                  onClick={() =>
                    addArrayItem(
                      "skills",
                      skillInput,
                      setSkillInput
                    )
                  }
                >

                  <Plus className="w-4 h-4" />

                </Button>

              </div>


              <div className="flex flex-wrap gap-2">

                {formData.skills.map(
                  (item, index) => (

                    <div
                      key={index}

                      className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm"
                    >

                      {item}


                      <button
                        type="button"

                        onClick={() =>
                          removeArrayItem(
                            "skills",
                            index
                          )
                        }
                      >

                        <X className="w-3 h-3" />

                      </button>

                    </div>

                  )
                )}

              </div>

            </div>



            {/* WHO CAN APPLY */}

            <div className="space-y-4">

              <h2 className="text-lg font-semibold border-b pb-3">

                Who Can Apply?

              </h2>


              <div className="flex gap-2">

                <Input

                  value={eligibilityInput}

                  placeholder="Add eligibility requirement..."

                  onChange={(e) =>
                    setEligibilityInput(
                      e.target.value
                    )
                  }

                  onKeyDown={(e) => {

                    if (e.key === "Enter") {

                      e.preventDefault();

                      addArrayItem(
                        "whoCanApply",
                        eligibilityInput,
                        setEligibilityInput
                      );

                    }

                  }}

                />


                <Button
                  type="button"

                  onClick={() =>
                    addArrayItem(
                      "whoCanApply",
                      eligibilityInput,
                      setEligibilityInput
                    )
                  }
                >

                  <Plus className="w-4 h-4" />

                </Button>

              </div>


              <div className="space-y-2">

                {formData.whoCanApply.map(
                  (item, index) => (

                    <div
                      key={index}

                      className="flex justify-between items-center p-3 border rounded-lg"
                    >

                      <span className="text-sm">

                        {item}

                      </span>


                      <Button

                        type="button"

                        variant="ghost"

                        size="icon"

                        onClick={() =>
                          removeArrayItem(
                            "whoCanApply",
                            index
                          )
                        }

                      >

                        <X className="w-4 h-4" />

                      </Button>

                    </div>

                  )
                )}

              </div>

            </div>



            {/* LEARNING */}

            <div className="space-y-4">

              <h2 className="text-lg font-semibold border-b pb-3">

                What You Will Learn

              </h2>


              <div className="flex gap-2">

                <Input

                  value={learningInput}

                  placeholder="Add learning outcome..."

                  onChange={(e) =>
                    setLearningInput(
                      e.target.value
                    )
                  }

                  onKeyDown={(e) => {

                    if (e.key === "Enter") {

                      e.preventDefault();

                      addArrayItem(
                        "learning",
                        learningInput,
                        setLearningInput
                      );

                    }

                  }}

                />


                <Button
                  type="button"

                  onClick={() =>
                    addArrayItem(
                      "learning",
                      learningInput,
                      setLearningInput
                    )
                  }
                >

                  <Plus className="w-4 h-4" />

                </Button>

              </div>


              <div className="space-y-2">

                {formData.learning.map(
                  (item, index) => (

                    <div
                      key={index}

                      className="flex justify-between items-center p-3 border rounded-lg"
                    >

                      <span className="text-sm">

                        {item}

                      </span>


                      <Button

                        type="button"

                        variant="ghost"

                        size="icon"

                        onClick={() =>
                          removeArrayItem(
                            "learning",
                            index
                          )
                        }

                      >

                        <X className="w-4 h-4" />

                      </Button>

                    </div>

                  )
                )}

              </div>

            </div>



            {/* PERKS */}

            <div className="space-y-4">

              <h2 className="text-lg font-semibold border-b pb-3">

                Perks & Benefits

              </h2>


              <div className="flex gap-2">

                <Input

                  value={perkInput}

                  placeholder="Add perk or benefit..."

                  onChange={(e) =>
                    setPerkInput(
                      e.target.value
                    )
                  }

                  onKeyDown={(e) => {

                    if (e.key === "Enter") {

                      e.preventDefault();

                      addArrayItem(
                        "perks",
                        perkInput,
                        setPerkInput
                      );

                    }

                  }}

                />


                <Button
                  type="button"

                  onClick={() =>
                    addArrayItem(
                      "perks",
                      perkInput,
                      setPerkInput
                    )
                  }
                >

                  <Plus className="w-4 h-4" />

                </Button>

              </div>


              <div className="space-y-2">

                {formData.perks.map(
                  (item, index) => (

                    <div
                      key={index}

                      className="flex justify-between items-center p-3 border rounded-lg"
                    >

                      <span className="text-sm">

                        {item}

                      </span>


                      <Button

                        type="button"

                        variant="ghost"

                        size="icon"

                        onClick={() =>
                          removeArrayItem(
                            "perks",
                            index
                          )
                        }

                      >

                        <X className="w-4 h-4" />

                      </Button>

                    </div>

                  )
                )}

              </div>

            </div>



            {/* SUBMIT */}

            <Button

              disabled={isLoading}

              type="submit"

              className="w-full h-12 text-base"

            >

              {isLoading ? (

                <>

                  <Loader2 className="animate-spin w-5 h-5 mr-2" />

                  Posting Internship...

                </>

              ) : (

                "Create Internship"

              )}

            </Button>


          </form>

        </div>



        {/* ================= CURRENT LIST ================= */}

        <div className="bg-card p-6 rounded-2xl border border-border shadow-xl h-fit xl:sticky xl:top-24">

          <h2 className="text-xl font-bold mb-2">

            Current Internships

          </h2>


          <p className="text-sm text-muted-foreground mb-6">

            Manage your posted internships.

          </p>


          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">


            {internships &&
            internships.length > 0 ? (

              internships.map((item: any) => (

                <div

                  key={item._id}

                  className="flex items-center justify-between gap-3 p-4 border rounded-xl bg-background/50 hover:border-primary/50 transition-colors"

                >

                  <div className="min-w-0">

                    <h3 className="font-semibold truncate">

                      {item.title}

                    </h3>


                    <p className="text-xs text-muted-foreground mt-1">

                      {item.type} • {item.category}

                    </p>


                    <p className="text-xs text-muted-foreground mt-1">

                      {item.duration}

                    </p>

                  </div>


                  <Button

                    variant="destructive"

                    size="icon"

                    onClick={() =>
                      handleDelete(item._id)
                    }

                  >

                    <Trash2 className="w-4 h-4" />

                  </Button>

                </div>

              ))

            ) : (

              <div className="text-center py-10 text-muted-foreground border border-dashed rounded-xl">

                No internships found.
                <br />
                Add your first internship!

              </div>

            )}

          </div>

        </div>


      </div>

    </div>

  );

};


export default AddInternship;