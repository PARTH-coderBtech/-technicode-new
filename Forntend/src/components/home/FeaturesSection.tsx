import { Briefcase, Award, FileText, Users } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Real-World Projects",
    description: "Work on industry-relevant projects that prepare you for actual job scenarios.",
  },
  {
    icon: Award,
    title: "Verified Certificate",
    description: "Earn recognized certificates that validate your skills to potential employers.",
  },
  {
    icon: FileText,
    title: "Letter of Recommendation",
    description: "Get personalized LORs from industry mentors to boost your career prospects.",
  },
  {
    icon: Users,
    title: "Mentor Support",
    description: "Learn from experienced professionals who guide you throughout your journey.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="gradient-text">Students Love Us</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to kickstart your career in tech
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 bg-card border border-border rounded-xl card-hover group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-5 group-hover:animate-glow-pulse">
                <feature.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
