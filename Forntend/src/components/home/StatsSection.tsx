import { GraduationCap, Briefcase, Star, Clock } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: "1000+", label: "Students Trained" },
  { icon: Briefcase, value: "50+", label: "Internship Programs" },
  { icon: Star, value: "4.8★", label: "Average Rating" },
  { icon: Clock, value: "24/7", label: "Mentor Support" },
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join our growing community of successful interns
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative p-8 rounded-xl bg-card border border-border text-center group card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-4xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
