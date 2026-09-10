import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Empowering Future Tech Leaders</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Learn. Intern.</span>
              <br />
              <span className="gradient-text">Launch Your Career</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Industry-ready internships with real-world projects. Gain hands-on experience, earn verified certificates, and kickstart your tech career.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/internships">
                <Button variant="hero" size="xl">
                  Explore Internships
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="heroOutline" size="xl">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold gradient-text">1000+</p>
                <p className="text-sm text-muted-foreground">Students Trained</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">50+</p>
                <p className="text-sm text-muted-foreground">Internship Programs</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">4.8★</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="hidden lg:flex justify-center items-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-glow-pulse flex items-center justify-center">
                <div className="w-[400px] h-[400px] rounded-full bg-card border border-border flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-20 h-20 mx-auto rounded-2xl gradient-bg flex items-center justify-center animate-float">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Start Coding Today</h3>
                    <p className="text-sm text-muted-foreground">Join thousands of students building their future</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-10 right-0 w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: "0.5s" }}>
                <span className="text-2xl">🚀</span>
              </div>
              <div className="absolute bottom-20 left-0 w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: "1s" }}>
                <span className="text-2xl">💻</span>
              </div>
              <div className="absolute top-1/2 right-[-20px] w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: "1.5s" }}>
                <span className="text-2xl">🎓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
