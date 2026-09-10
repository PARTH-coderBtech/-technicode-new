import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-bg opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Start Your Internship Journey Today
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
            Join TechInCode EduTech and transform your career with hands-on experience, industry mentorship, and verified certifications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/internships">
              <Button 
                size="xl" 
                className="bg-foreground text-primary hover:bg-foreground/90 font-bold"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="xl" 
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
