import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

const EditProfile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setName(user.name || "");
    setEmail(user.email || "");
  }, [user, navigate]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message || "Failed to update profile"
        );
        return;
      }

      // Update AuthContext + localStorage
      login(
        {
          name: data.user.name,
          email: data.user.email,
          isAdmin: data.user.isAdmin || false,
        },
        token || ""
      );

      toast.success("Profile updated successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Update Profile Error:",
        error
      );

      toast.error(
        "Server connection failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">

      <div className="max-w-xl mx-auto">

        {/* BACK BUTTON */}

        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* CARD */}

        <div className="bg-card border border-border rounded-2xl shadow-xl p-6 md:p-8">

          {/* HEADER */}

          <div className="flex items-center gap-4 mb-8">

            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">

              <User className="w-8 h-8 text-primary" />

            </div>

            <div>

              <h1 className="text-2xl font-bold text-foreground">
                Edit Profile
              </h1>

              <p className="text-sm text-muted-foreground mt-1">
                Update your account information
              </p>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}

            <div className="space-y-2">

              <Label htmlFor="name">
                Full Name
              </Label>

              <div className="relative">

                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <Input
                  id="name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="pl-10"
                  required
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="space-y-2">

              <Label htmlFor="email">
                Email Address
              </Label>

              <div className="relative">

                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="pl-10 bg-muted cursor-not-allowed"
                />

              </div>

              <p className="text-xs text-muted-foreground">
                Email address cannot be changed.
              </p>

            </div>

            {/* SAVE BUTTON */}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 gap-2"
            >

              <Save className="w-4 h-4" />

              {isLoading
                ? "Saving..."
                : "Save Changes"}

            </Button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditProfile;