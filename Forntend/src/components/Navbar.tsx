import { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  Menu,
  X,
  LogOut,
  UserCircle,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import LogoImage from "@/assets/logo.png";

import { useAuth } from "@/context/AuthContext";


const ADMIN_EMAIL = "krishk99973@gmail.com";


const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Internships", path: "/internships" },
  { name: "Founders", path: "/founders" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
];


export const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const { user, logout } = useAuth();


  // ADMIN CHECK

  const isAdmin =
    user?.email?.toLowerCase() ===
    ADMIN_EMAIL.toLowerCase();


  return (

    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-lg shadow-background/50 border-b border-border">

      <div className="container mx-auto px-4">


        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between h-16">


          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-2 group"
          >

            <div className="w-10 h-10 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110">

              <img
                src={LogoImage}
                alt="TechInCode Logo"
                className="w-full h-full object-contain"
              />

            </div>


            <span className="font-poppins font-bold text-lg text-foreground">

              TechInCode{" "}

              <span className="text-primary">
                EduTech
              </span>

            </span>

          </Link>



          {/* ================= DESKTOP NAVIGATION ================= */}

          <div className="hidden lg:flex items-center gap-6">

            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}

                className={cn(

                  "nav-link py-1 transition-all duration-200 hover:text-primary text-sm font-medium",

                  location.pathname === link.path
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"

                )}

              >

                {link.name}

              </Link>

            ))}

          </div>



          {/* ================= DESKTOP USER SECTION ================= */}

          <div className="hidden lg:flex items-center gap-3">


            {user ? (

              <div className="flex items-center gap-3">


                {/* USER NAME */}

                <div className="flex items-center gap-2 text-sm font-semibold text-foreground bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">

                  <UserCircle className="w-5 h-5 text-primary" />

                  <span>

                    Hi, {user.name}

                  </span>

                </div>



                {/* ================= NORMAL USER DASHBOARD ================= */}

                {user && !isAdmin && (

                  <Link to="/dashboard">

                    <Button

                      variant="outline"

                      size="sm"

                      className="border-primary text-primary hover:bg-primary hover:text-white gap-2"

                    >

                      <LayoutDashboard className="w-4 h-4" />

                      Dashboard

                    </Button>

                  </Link>

                )}



                {/* ================= ADMIN DASHBOARD ================= */}

                {user && isAdmin && (

                  <Link to="/admin/dashboard">

                    <Button

                      variant="outline"

                      size="sm"

                      className="border-primary text-primary hover:bg-primary hover:text-white gap-2"

                    >

                      <ShieldCheck className="w-4 h-4" />

                      Admin Panel

                    </Button>

                  </Link>

                )}



                {/* ================= LOGOUT ================= */}

                <Button

                  variant="ghost"

                  size="sm"

                  onClick={logout}

                  className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"

                >

                  <LogOut className="w-4 h-4 mr-2" />

                  Logout

                </Button>


              </div>

            ) : (

              <>


                {/* LOGIN */}

                <Link
                  to="/auth"
                  state={{ mode: "login" }}
                >

                  <Button

                    variant="outline"

                    size="sm"

                    className="hover:bg-primary/10 transition-colors"

                  >

                    Login

                  </Button>

                </Link>



                {/* SIGNUP */}

                <Link
                  to="/auth"
                  state={{ mode: "signup" }}
                >

                  <Button

                    variant="default"

                    size="sm"

                    className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"

                  >

                    Sign Up

                  </Button>

                </Link>


              </>

            )}


          </div>



          {/* ================= MOBILE MENU BUTTON ================= */}

          <button

            onClick={() => setIsOpen(!isOpen)}

            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"

          >

            {isOpen ? (

              <X className="w-6 h-6" />

            ) : (

              <Menu className="w-6 h-6" />

            )}

          </button>


        </div>



        {/* ================= MOBILE NAVIGATION ================= */}

        {isOpen && (

          <div className="lg:hidden py-4 border-t border-border bg-card animate-in fade-in slide-in-from-top-4">

            <div className="flex flex-col gap-2">


              {/* NAVIGATION LINKS */}

              {navLinks.map((link) => (

                <Link

                  key={link.path}

                  to={link.path}

                  onClick={() => setIsOpen(false)}

                  className={cn(

                    "px-4 py-2 rounded-lg transition-colors font-medium text-sm",

                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"

                  )}

                >

                  {link.name}

                </Link>

              ))}



              {/* ================= NORMAL USER MOBILE DASHBOARD ================= */}

              {user && !isAdmin && (

                <Link

                  to="/dashboard"

                  onClick={() => setIsOpen(false)}

                  className="px-4 py-3 text-primary font-bold flex items-center gap-2 hover:bg-primary/10 rounded-lg"

                >

                  <LayoutDashboard className="w-5 h-5" />

                  My Dashboard

                </Link>

              )}



              {/* ================= ADMIN MOBILE DASHBOARD ================= */}

              {user && isAdmin && (

                <Link

                  to="/admin/dashboard"

                  onClick={() => setIsOpen(false)}

                  className="px-4 py-3 text-primary font-bold flex items-center gap-2 hover:bg-primary/10 rounded-lg"

                >

                  <ShieldCheck className="w-5 h-5" />

                  Admin Panel

                </Link>

              )}



              {/* ================= MOBILE AUTH SECTION ================= */}

              <div className="flex flex-col gap-2 mt-4 px-4 border-t border-border pt-4">


                {user ? (

                  <>


                    {/* USER INFO */}

                    <div className="flex items-center gap-2 px-2 py-2 text-primary font-bold">

                      <UserCircle className="w-5 h-5" />

                      <div className="flex flex-col">

                        <span>

                          Hi, {user.name}

                        </span>


                        {isAdmin && (

                          <span className="text-xs text-muted-foreground">

                            Administrator

                          </span>

                        )}

                      </div>

                    </div>



                    {/* LOGOUT */}

                    <Button

                      variant="destructive"

                      size="sm"

                      onClick={() => {

                        logout();

                        setIsOpen(false);

                      }}

                      className="w-full"

                    >

                      <LogOut className="w-4 h-4 mr-2" />

                      Logout

                    </Button>


                  </>

                ) : (

                  <>


                    {/* LOGIN */}

                    <Link

                      to="/auth"

                      state={{ mode: "login" }}

                      onClick={() => setIsOpen(false)}

                    >

                      <Button

                        variant="outline"

                        size="sm"

                        className="w-full mb-2"

                      >

                        Login

                      </Button>

                    </Link>



                    {/* SIGNUP */}

                    <Link

                      to="/auth"

                      state={{ mode: "signup" }}

                      onClick={() => setIsOpen(false)}

                    >

                      <Button

                        variant="default"

                        size="sm"

                        className="w-full bg-gradient-to-r from-primary to-purple-600"

                      >

                        Sign Up

                      </Button>

                    </Link>


                  </>

                )}


              </div>


            </div>

          </div>

        )}


      </div>

    </nav>

  );

};