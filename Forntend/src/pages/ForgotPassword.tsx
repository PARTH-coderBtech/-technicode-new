import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // ===============================
  // SEND OTP
  // ===============================
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Failed to send OTP"
        );
      }

      toast.success("OTP sent to your email");

      setStep(2);

    } catch (error: any) {
      toast.error(
        error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // RESET PASSWORD
  // ===============================
  const handleResetPassword = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword
          })
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Failed to reset password"
        );
      }

      toast.success(
        "Password reset successfully!"
      );

      setTimeout(() => {
        navigate("/auth");
      }, 1000);

    } catch (error: any) {
      toast.error(
        error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex items-center justify-center px-4 pt-32 pb-16">

        <div className="w-full max-w-md">

          <div className="bg-card border border-border rounded-2xl shadow-xl p-6 md:p-8">

            {/* Back */}
            <button
              type="button"
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>

            {/* HEADER */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">
                Forgot Password?
              </h1>

              <p className="text-sm text-muted-foreground mt-2">
                {step === 1
                  ? "Enter your registered email address"
                  : "Enter the OTP and create a new password"}
              </p>
            </div>

            {/* ================= STEP 1 ================= */}
            {step === 1 && (
              <form
                onSubmit={handleSendOTP}
                className="space-y-5"
              >

                <div className="space-y-2">
                  <Label>Email Address</Label>

                  <Input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>

              </form>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 2 && (
              <form
                onSubmit={handleResetPassword}
                className="space-y-5"
              >

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label>Email</Label>

                  <Input
                    type="email"
                    value={email}
                    disabled
                  />
                </div>

                {/* OTP */}
                <div className="space-y-2">
                  <Label>OTP</Label>

                  <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    placeholder="Enter 6 digit OTP"
                    required
                  />
                </div>

                {/* NEW PASSWORD */}
                <div className="space-y-2">
                  <Label>New Password</Label>

                  <div className="relative">

                    <Input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(
                          e.target.value
                        )
                      }
                      placeholder="Enter new password"
                      className="pr-10"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>

                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="space-y-2">
                  <Label>
                    Confirm Password
                  </Label>

                  <div className="relative">

                    <Input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      placeholder="Confirm new password"
                      className="pr-10"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>

                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-[#00AEEF] hover:underline"
                >
                  Resend OTP
                </button>

              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;