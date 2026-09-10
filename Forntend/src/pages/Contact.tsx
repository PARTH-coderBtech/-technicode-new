import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext"; // Auth hook import kiya

const contactInfo = [
  { icon: Mail, title: "Email Us", value: "techincodeedutech@gmail.com", description: "Response within 24 hours" },
  { icon: Phone, title: "Call Us", value: "+91 9997344359", description: "Mon-Sat, 9 AM - 6 PM" },
  { icon: MapPin, title: "Visit Us", value: "Bulandshahr, UP", description: "" },
];

const Contact = () => {
  const { user } = useAuth(); // User login status check karne ke liye
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API Base URL config
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // LOGIN CHECK: Agar user login nahi hai toh alert dikhao
    if (!user) {
      toast.error("Please login first to send a message!");
      // Aap user ko login page par redirect bhi kar sakte hain agar chahein
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Could not connect to server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="pt-24 pb-12 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in <span className="text-primary">Touch</span></h1>
          <p className="text-muted-foreground">Have questions? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Form */}
            <div className="lg:col-span-3 p-6 md:p-10 bg-card border rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input 
                      placeholder="John Doe"
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com"
                      value={formData.email} 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input 
                    placeholder="Inquiry about Internship"
                    value={formData.subject} 
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea 
                    rows={4} 
                    placeholder="Tell us more..."
                    value={formData.message} 
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                    required 
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
                {!user && (
                  <p className="text-xs text-red-500 mt-2 italic">* You must be logged in to send a message.</p>
                )}
              </form>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-4 p-5 bg-card border rounded-xl hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase">{info.title}</h3>
                    <p className="font-medium">{info.value}</p>
                    <p className="text-xs text-muted-foreground">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;