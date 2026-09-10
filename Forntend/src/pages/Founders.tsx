import { Layout } from "@/components/Layout";
import { Linkedin, Twitter, Mail } from "lucide-react";

const founders = [
  {
    name: "krish",
    role: "Founder ",
    bio: "A young tech entrepreneur and founder of TechInCode, passionate about building platforms that help students gain real-world tech skills and industry exposure.",
    image: "/images/krish.jpg",
    linkedin: "https://www.linkedin.com/in/krish-k-b99534318/",
    twitter: "#",
    email: "krishk99973@gmail.com",
  },
  {
    name: "Parth agrawal",
    role: "Co-Founder ",
    bio: "Co-Founder at TechInCode, focused on student growth, skill development, and creating meaningful internship opportunities that prepare students for the tech industry.",
    image: "/images/Parth agrawal.jpeg",
    linkedin: "https://www.linkedin.com/in/parth-agrawal-636534318/",
    twitter: "#",
    email: "parthagrawal2006asr@gmail.com",
  },
];

const Founders = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="gradient-text">Leadership</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The passionate team behind TechInCode EduTech, dedicated to transforming careers and empowering the next generation.
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="p-8 bg-card border border-border rounded-xl card-hover text-center group"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full gradient-bg opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-border group-hover:border-primary/50 transition-colors"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{founder.name}</h3>
                <p className="text-primary font-medium mb-4">{founder.role}</p>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{founder.bio}</p>
                <div className="flex justify-center gap-3">
                  <a
                    href={founder.linkedin}
                    className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={founder.twitter}
                    className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${founder.email}`}
                    className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      
    </Layout>
  );
};

export default Founders;
