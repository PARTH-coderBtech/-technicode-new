import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages Imports
import InternshipDetails from "./pages/InternshipDetails";
import VerifyCertificate from "./pages/VerifyCertificate.tsx";
import GenerateCertificate from "./pages/GenerateCertificate";
import CertificateDetails from "./pages/CertificateDetails.tsx";
import AdminDashboard from "./pages/AdminDashboard";
import Index from "./pages/Index";
import About from "./pages/About";
import Internships from "./pages/Internships";
import Apply from "./pages/Apply";
import Founders from "./pages/Founders";
import Certificate from "./pages/Certificate";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AuthPage } from "./pages/AuthPage";
import AddInternship from "./pages/AddInternship"; // Naya Admin Page
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminApplications from "./pages/AdminApplications";

// Context Import
import { AuthProvider } from "./context/AuthContext";

// QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Global Notifications */}
        <Toaster />
        <Sonner position="top-center" richColors closeButton /> 
        
        <BrowserRouter>
          {/* AuthProvider wraps everything to share user state */}
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/apply" element={
                
                <ProtectedRoute>
                    <Apply />
                  </ProtectedRoute>
            
            } />
              <Route path="/founders" element={<Founders />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/internship/:id" element={<InternshipDetails />}/>
              <Route
  path="/dashboard"
  element={
                    <Dashboard />


  }
/>
               <Route
  path="/admin/generate-certificate"
  element={<GenerateCertificate />}
/>
<Route
  path="/admin/applications"
  element={<AdminApplications />}
/>
<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>
               <Route
               

          path="/verify"

          element={<VerifyCertificate />}

        />


        <Route

          path="/verify/:certificateId"

          element={
            <CertificateDetails />
          }

        />

              {/* Admin Protected Route */}
              <Route path="/admin/add" element={<AddInternship />} />

              {/* 404 Route - Always keep this at the end */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;