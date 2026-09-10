import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Code, Smartphone, Database, Brain, Palette, 
  PenTool, Megaphone, Users, ArrowRight, Clock, Users2, Globe 
} from "lucide-react";

// Helper to get icons based on category
const getIcon = (category: string) => {
  const cat = category ? category.toLowerCase() : "";
  if (cat.includes("web")) return Code;
  if (cat.includes("app") || cat.includes("mobile")) return Smartphone;
  if (cat.includes("python") || cat.includes("database") || cat.includes("backend") || cat.includes("java")) return Database;
  if (cat.includes("data") || cat.includes("ai") || cat.includes("machine")) return Brain;
  if (cat.includes("marketing")) return Megaphone;
  if (cat.includes("design") || cat.includes("ui") || cat.includes("ux")) return Palette;
  if (cat.includes("write") || cat.includes("content")) return PenTool;
  if (cat.includes("hr") || cat.includes("human")) return Users;
  return Globe;
};

const InternshipCard = ({ internship }: { internship: any }) => {
  const Icon = getIcon(internship.category);

  return (
    <div className="p-6 bg-card border border-border rounded-xl card-hover group h-full flex flex-col transition-all hover:shadow-lg">

      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>

      <h3 className="text-xl font-semibold mb-3 text-foreground">
        {internship.title}
      </h3>

      <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
        {internship.description}
      </p>

      <div className="flex items-center gap-4 mb-5 text-sm text-muted-foreground">

        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-primary" />
          <span>{internship.duration}</span>
        </div>

        <div className="flex items-center gap-1">
          <Users2 className="w-4 h-4 text-primary" />
          <span>Live</span>
        </div>

      </div>
      <div className="flex items-center gap-2 text-sm">

  {internship.paymentType === "Paid" ? (

    <span className="text-green-600 font-medium">
      Paid • {internship.stipend}
    </span>

  ) : (

    <span className="text-orange-500 font-medium">
      Unpaid
    </span>

  )}

</div>

      {/* Only View Details Button */}

      <Link
        to={`/internship/${internship._id}`}
        className="mt-auto"
      >
        <Button variant="default" className="w-full group">

          View Full Details

          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />

        </Button>
      </Link>

    </div>
  );
};
const Internships = () => {
  const [dbInternships, setDbInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sabhi API calls ke liye ek hi base URL ka istemal karein
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch(`${API_URL}/internships/all`);
        
        if (!response.ok) throw new Error("Server response was not ok");
        
        const data = await response.json();

        if (data.success) {
          setDbInternships(data.data || []);
        } else if (Array.isArray(data)) {
          setDbInternships(data);
        }
      } catch (error) {
        console.error("Error fetching internships:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, [API_URL]);

  // Data Filtering
  const techInternships = dbInternships.filter(
  (item: any) => item.type?.trim().toLowerCase() === "tech"
);

const nonTechInternships = dbInternships.filter(
  (item: any) => item.type?.trim().toLowerCase() === "non-tech"
);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Explore <span className="text-primary">Internships</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kickstart your career with our industry-verified programs.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground animate-pulse">Loading Opportunities...</p>
        </div>
      ) : (
        <div className="pb-20">
          {/* Tech Internships Section */}
          <section className="py-12 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-2">Tech Internships</h2>
                <p className="text-muted-foreground">Hands-on technical roles and development.</p>
              </div>
              {techInternships.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {techInternships.map((internship: any) => (
                    <InternshipCard key={internship._id} internship={internship} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-xl border-border">
                  <p className="text-muted-foreground">No Tech internships posted yet.</p>
                </div>
              )}
            </div>
          </section>

          {/* Non-Tech Internships Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-2">Non-Tech Internships</h2>
                <p className="text-muted-foreground">Management, marketing, and creative roles.</p>
              </div>
              {nonTechInternships.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {nonTechInternships.map((internship: any) => (
                    <InternshipCard key={internship._id} internship={internship} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-xl border-border">
                  <p className="text-muted-foreground">No Non-Tech internships posted yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
};

export default Internships;