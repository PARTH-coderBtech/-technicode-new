import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

import {
  ArrowLeft,
  Clock,
  MapPin,
  Briefcase,
  IndianRupee,
  CheckCircle2,
  CalendarDays,
  Users,
  Building2,
  GraduationCap,
  Gift,
  Sparkles,
  Brain
} from "lucide-react";

const InternshipDetails = () => {
  const { id } = useParams();

  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await fetch(
          `${API_URL}/internships/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch internship");
        }

        const data = await response.json();
        console.log("FULL API RESPONSE:", data);
        if (data.success) {
          setInternship(data.data);
        } else {
          setInternship(data);
        }

      } catch (error) {
        console.error("Error fetching internship:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id, API_URL]);


  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">

          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />

          <p className="mt-5 text-muted-foreground">
            Loading internship details...
          </p>

        </div>
      </Layout>
    );
  }


  if (!internship) {
    return (
      <Layout>

        <div className="min-h-[70vh] flex flex-col items-center justify-center">

          <h1 className="text-3xl font-bold">
            Internship Not Found
          </h1>

          <p className="text-muted-foreground mt-3">
            The internship you are looking for does not exist.
          </p>

          <Link to="/internships">
            <Button className="mt-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Internships
            </Button>
          </Link>

        </div>

      </Layout>
    );
  }


  const SectionTitle = ({
    icon: Icon,
    title
  }: {
    icon: any;
    title: string;
  }) => (
    <div className="flex items-center gap-3 mb-6">

      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">

        <Icon className="w-5 h-5 text-primary" />

      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

    </div>
  );


  const ListItem = ({ children }: { children: React.ReactNode }) => (
    <div className="flex gap-3">

      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />

      <p className="text-muted-foreground leading-relaxed">
        {children}
      </p>

    </div>
  );


  return (
    <Layout>

      <div className="min-h-screen bg-background">

        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden border-b border-border bg-card/20">

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">

            <Link to="/internships">

              <Button
                variant="ghost"
                className="mb-8"
              >

                <ArrowLeft className="w-4 h-4 mr-2" />

                Back to Internships

              </Button>

            </Link>


            <div className="max-w-5xl">

              {/* Badge */}

              <div className="flex flex-wrap gap-3 mb-5">

                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">

                  {internship.type || "Internship"}

                </span>


                {internship.category && (

                  <span className="px-4 py-1.5 rounded-full bg-secondary text-sm font-medium">

                    {internship.category}

                  </span>

                )}

              </div>


              {/* Title */}

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">

                {internship.title}

              </h1>


              {/* Short Description */}

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">

                {internship.description}

              </p>


              {/* Quick Info */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

                {/* Duration */}

                <div className="p-5 bg-background border border-border rounded-2xl">

                  <Clock className="w-5 h-5 text-primary mb-3" />

                  <p className="text-xs text-muted-foreground mb-1">
                    Duration
                  </p>

                  <p className="font-semibold">
                    {internship.duration || "Not specified"}
                  </p>

                </div>


                {/* Location */}

                <div className="p-5 bg-background border border-border rounded-2xl">

                  <MapPin className="w-5 h-5 text-primary mb-3" />

                  <p className="text-xs text-muted-foreground mb-1">
                    Location
                  </p>

                  <p className="font-semibold">
                    {internship.location || "Remote"}
                  </p>

                </div>


                {/* Stipend */}

                {/* Payment / Stipend */}

<div className="p-5 bg-background border border-border rounded-2xl">

  <IndianRupee className="w-5 h-5 text-primary mb-3" />

  <p className="text-xs text-muted-foreground mb-1">
    {internship.paymentType === "Paid"
      ? "Stipend"
      : "Payment Type"}
  </p>

  <p className="font-semibold">

    {internship.paymentType === "Paid"
      ? internship.stipend || "Not specified"
      : "Unpaid"}

  </p>

</div>


                {/* Openings */}

                <div className="p-5 bg-background border border-border rounded-2xl">

                  <Users className="w-5 h-5 text-primary mb-3" />

                  <p className="text-xs text-muted-foreground mb-1">
                    Openings
                  </p>

                  <p className="font-semibold">
                    {internship.openings || "Multiple"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ================= MAIN CONTENT ================= */}

        <section className="container mx-auto px-4 py-12 md:py-16">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">


            {/* LEFT CONTENT */}

            <div className="lg:col-span-2 space-y-12">


              {/* ABOUT */}

              <div>

                <SectionTitle
                  icon={Briefcase}
                  title="About the Internship"
                />

                <div className="p-6 md:p-8 rounded-2xl border border-border bg-card/30">

                  <p className="text-muted-foreground leading-8 whitespace-pre-line">

                    {internship.fullDescription ||
                      internship.description}

                  </p>

                </div>

              </div>



              {/* RESPONSIBILITIES */}

              {internship.responsibilities &&
                internship.responsibilities.length > 0 && (

                  <div>

                    <SectionTitle
                      icon={CalendarDays}
                      title="Roles & Responsibilities"
                    />

                    <div className="space-y-4">

                      {internship.responsibilities.map(
                        (item: string, index: number) => (

                          <ListItem key={index}>
                            {item}
                          </ListItem>

                        )
                      )}

                    </div>

                  </div>

                )}



              {/* SKILLS */}

              {internship.skills &&
                internship.skills.length > 0 && (

                  <div>

                    <SectionTitle
                      icon={Sparkles}
                      title="Required Skills"
                    />

                    <div className="flex flex-wrap gap-3">

                      {internship.skills.map(
                        (skill: string, index: number) => (

                          <span
                            key={index}
                            className="px-4 py-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary font-medium text-sm"
                          >

                            {skill}

                          </span>

                        )
                      )}

                    </div>

                  </div>

                )}



              {/* WHO CAN APPLY */}

              {internship.whoCanApply &&
                internship.whoCanApply.length > 0 && (

                  <div>

                    <SectionTitle
                      icon={GraduationCap}
                      title="Who Can Apply?"
                    />

                    <div className="space-y-4">

                      {internship.whoCanApply.map(
                        (item: string, index: number) => (

                          <ListItem key={index}>
                            {item}
                          </ListItem>

                        )
                      )}

                    </div>

                  </div>

                )}



              {/* LEARNING */}

              {internship.learning &&
                internship.learning.length > 0 && (

                  <div>

                    <SectionTitle
                      icon={Brain}
                      title="What You Will Learn"
                    />

                    <div className="space-y-4">

                      {internship.learning.map(
                        (item: string, index: number) => (

                          <ListItem key={index}>
                            {item}
                          </ListItem>

                        )
                      )}

                    </div>

                  </div>

                )}



              {/* PERKS */}

              {internship.perks &&
                internship.perks.length > 0 && (

                  <div>

                    <SectionTitle
                      icon={Gift}
                      title="Perks & Benefits"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {internship.perks.map(
                        (perk: string, index: number) => (

                          <div
                            key={index}
                            className="p-5 rounded-xl border border-border bg-card flex gap-3 items-center"
                          >

                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />

                            <span className="font-medium">
                              {perk}
                            </span>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                )}

            </div>



            {/* ================= RIGHT SIDEBAR ================= */}

            <div className="relative">


              <div className="sticky top-24">

                <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">

                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">

                    <Briefcase className="w-7 h-7 text-primary" />

                  </div>


                  <h3 className="text-2xl font-bold mb-3">

                    Ready to Apply?

                  </h3>


                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">

                    Take the next step in your career journey and gain
                    hands-on experience through this internship.

                  </p>


                  <Link
                    to={`/apply?internship=${encodeURIComponent(
                      internship.title
                    )}`}
                  >

                    <Button className="w-full py-6 text-base">

                      Apply Now

                      <Users className="w-5 h-5 ml-2" />

                    </Button>

                  </Link>


                  <div className="border-t border-border mt-6 pt-6 space-y-4 text-sm">


                    <div className="flex justify-between">

                      <span className="text-muted-foreground">
                        Duration
                      </span>

                      <span className="font-medium">
                        {internship.duration || "N/A"}
                      </span>

                    </div>


                    <div className="flex justify-between">

                      <span className="text-muted-foreground">
                        Location
                      </span>

                      <span className="font-medium">
                        {internship.location || "Remote"}
                      </span>

                    </div>


                    <div className="flex justify-between">

                      <span className="text-muted-foreground">
                        Internship Type
                      </span>

                      <span className="font-medium">
                        {internship.type || "N/A"}
                      </span>

                    </div>


                    <div className="flex justify-between">

                      <span className="text-muted-foreground">
                        Status
                      </span>

                      <span className="text-green-500 font-medium">
                        Open
                      </span>

                    </div>


                  </div>

                </div>


                {/* Additional Info */}

                <div className="mt-6 p-5 rounded-2xl bg-primary/5 border border-primary/10">

                  <div className="flex gap-3">

                    <Building2 className="w-5 h-5 text-primary shrink-0" />

                    <div>

                      <p className="font-semibold mb-1">
                        Real World Experience
                      </p>

                      <p className="text-sm text-muted-foreground">

                        Work on practical projects and build your
                        professional portfolio.

                      </p>

                    </div>

                  </div>

                </div>


              </div>

            </div>

          </div>

        </section>

      </div>

    </Layout>
  );
};

export default InternshipDetails;