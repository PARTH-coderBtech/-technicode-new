import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Lock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";


const Apply = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const prefilledInternship = searchParams.get("internship") || "";
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "", 
    phone: "",
    college: "",
    internship: prefilledInternship,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Jab user login kare toh email auto-fill ho jaye
  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. LOGIN ALERT LOGIC: Agar login nahi hai toh bas alert do
    if (!user) {
      toast.error("Access Denied! Please login first to apply for internships.", {
        description: "You will be redirected to the login page in 2 seconds.",
        duration: 3000,
      });
      
      // Optional: 2 second baad login par bhej do (user experience ke liye)
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        toast.success("Application submitted successfully!");
      } else {
        toast.error(data.message || "Failed to submit application.");
      }
    } catch (error) {
      toast.error("Server connection failed. Make sure backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20 min-h-[80vh] flex items-center bg-background">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Application Sent!</h1>
              <p className="text-muted-foreground mb-8">
                Thank you {formData.fullName}! We've received your application for <span className="text-primary font-bold">{formData.internship}</span>.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>Submit Another</Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-3">Apply for <span className="text-primary">Internship</span></h1>
              <p className="text-muted-foreground">
                Join our industry-ready programs to boost your career.
              </p>
              {!user && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-600 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  Note: Login is required to submit the form.
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-8 bg-card border border-border rounded-2xl space-y-6 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp Number</Label>
                  <Input 
                    id="phone"
                    placeholder="+91..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="Your registered email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  readOnly={!!user} // User login hai toh email change nahi kar sakta
                  className={user ? "bg-muted cursor-not-allowed" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="college">College / University</Label>
                <Input 
                  id="college"
                  placeholder="College name & Degree"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">

  <Label htmlFor="internship">
    Selected Internship
  </Label>

  <Input
    id="internship"
    value={formData.internship}
    readOnly
    className="bg-muted cursor-not-allowed font-medium"
  />

</div>

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full py-6 text-lg font-bold transition-all hover:scale-[1.01]"
              >
                {isSubmitting ? "Processing..." : "Submit Application"}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border">
                <Lock className="w-3 h-3" />
                <span>Your application is encrypted and secure</span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Apply;