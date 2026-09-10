import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import LogoImage from "@/assets/logo.png";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const AuthPage = () => {
  const [authMode, setAuthMode] = useState("login");
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Apna Admin Email yahan fix karein (Temporary frontend check ke liye)
  const ADMIN_EMAIL = "krishk99973@gmail.com"; 

  useEffect(() => {
    if (location.state?.mode) {
      setAuthMode(location.state.mode);
    }
  }, [location]);

  const toggleMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userData = {
      email,
      password,
      name: authMode === "signup" ? `${fname} ${lname}` : undefined,
    };

    try {
      const endpoint = authMode === "login" ? "login" : "signup";
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(authMode === "login" ? "Welcome back!" : "Account created!");
        
        // LOGIN CALL UPDATED: Ab ye sare required fields bhej raha hai
        login(
          { 
            name: data.user.name, 
            email: data.user.email,
            // Agar backend isAdmin nahi bhej raha, toh hum email se check kar lenge
            isAdmin: data.user.email === ADMIN_EMAIL || data.user.isAdmin 
          }, 
          data.token
        ); 
        
        navigate("/"); 
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server connection failed. Is backend running?");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="w-full max-w-[420px] z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 mb-4 p-2 bg-card rounded-2xl shadow-xl shadow-primary/10 border border-border">
            <img src={LogoImage} alt="TechInCode" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-poppins text-white">
            {authMode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
        </div>

        <div className="bg-card/50 backdrop-blur-xl p-8 rounded-3xl border border-border shadow-2xl shadow-black/5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {authMode === "signup" && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-2">
                  <Label htmlFor="fname">First Name</Label>
                  <Input value={fname} onChange={(e) => setFname(e.target.value)} id="fname" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input value={lname} onChange={(e) => setLname(e.target.value)} id="lname" placeholder="Doe" required />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="name@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="••••••••" required />
            </div>

            <Button disabled={isLoading} type="submit" className="w-full h-11 bg-gradient-to-r from-primary to-purple-600 font-semibold shadow-lg mt-2 text-white">
              {isLoading ? "Processing..." : authMode === "login" ? "Sign In" : "Register Now"}
            </Button>
          </form>
        </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
          {authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleMode} className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
            {authMode === "login" ? "Create Account" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};